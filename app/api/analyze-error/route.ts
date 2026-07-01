import { NextResponse } from 'next/server';
import { validateKey, decrementUsage } from '@/lib/key-manager';
import https from 'https';

interface SingleErrorResult {
  original_question: {
    question_text: string;
    student_answer?: string;
    correct_answer: string;
  };
  error_analysis: {
    error_type: string;
    reason: string;
    knowledge_point: string;
  };
  practice_questions: Array<{
    id: number;
    question: string;
    options: string[];
    answer: string;
    explanation: string;
  }>;
}

interface AnalysisResult {
  errors: SingleErrorResult[];
  total_errors_found: number;
  images_processed: number;
}

export async function POST(request: Request) {
  try {
    const { code, images, grade = '小学' } = await request.json();

    // 1. 验证卡密
    const keyValidation = await validateKey(code.trim().toUpperCase());
    if (!keyValidation.valid) {
      return NextResponse.json({
        success: false,
        message: keyValidation.message
      }, { status: 401 });
    }

    // 2. 验证图片
    if (!Array.isArray(images) || images.length === 0) {
      return NextResponse.json({
        success: false,
        message: '请上传至少1张错题图片'
      }, { status: 400 });
    }

    if (images.length > 3) {
      return NextResponse.json({
        success: false,
        message: '最多支持3张图片'
      }, { status: 400 });
    }

    // 3. 调用AI分析所有错题（一次性处理所有图片）
    const result = await analyzeAllErrors(images, grade);

    // 4. 扣减使用次数（只扣1次，不管有多少错题）
    await decrementUsage(code.trim().toUpperCase());

    // 5. 返回结果
    return NextResponse.json({
      success: true,
      data: result
    });

  } catch (error: any) {
    console.error('错题分析失败:', error);
    return NextResponse.json({
      success: false,
      message: error.message || '分析失败，请重试'
    }, { status: 500 });
  }
}

/**
 * 调用Applesay API分析所有错题（支持多张图片，每张图可能包含多个错题）
 */
async function analyzeAllErrors(images: string[], grade: string): Promise<AnalysisResult> {
  const apiUrl = process.env.APPLESAY_API_BASE_URL;
  const apiKey = process.env.APPLESAY_API_KEY;
  const model = process.env.APPLESAY_MODEL;

  if (!apiUrl || !apiKey || !model) {
    throw new Error('缺少AI API配置');
  }

  // 构造提示词
  const prompt = `你是一位专业的小学英语老师，擅长分析学生的错题。

我上传了${images.length}张英语错题图片。请仔细查看图片，完成以下任务：

**核心要求 - 禁止幻觉**：
1. **只分析图片中实际可见的错题**：严禁编造图片中不存在的题目
2. **有多少分析多少**：如果图片中只有1道错题，就只分析1道；有3道就分析3道
3. **逐字提取**：题目内容必须从图片中逐字提取，不要改写或概括

**分析任务**：
对于图片中**实际存在的**每个错题，请完成以下分析：

1. **识别题目**：逐字提取题目内容（不要改写）
2. **找出错误**：学生答案的错误点（如有作答）
3. **分析错因**：
   - 错误类型（如：时态错误、词汇混淆、语法错误、介词错误等）
   - 详细错因分析（为什么错？知识点漏洞在哪里？）
   - 考查的知识点
4. **举一反三**：为该错题生成3道同类型练习题，每道题包含：
   - 题目（难度符合小学水平，根据原题难度自动调整）
   - 4个选项（A、B、C、D）
   - 正确答案
   - 详细解析

**重要提醒**：
- ❌ 禁止编造图片中不存在的错题
- ❌ 禁止为了"凑数"而添加额外的错题
- ✅ 如果图片清晰可见，请务必分析其中的错题
- ✅ 如果图片中有题目作答标记（如✗、圈出等），优先分析被标记的错题

**输出格式**（只返回JSON数组，不要任何额外文字）：
[
  {
    "original_question": {
      "question_text": "从图片中逐字提取的题目内容",
      "student_answer": "学生的错误答案（如有作答）",
      "correct_answer": "正确答案"
    },
    "error_analysis": {
      "error_type": "错误类型",
      "reason": "详细错因分析",
      "knowledge_point": "考查的知识点"
    },
    "practice_questions": [
      {
        "id": 1,
        "question": "练习题1",
        "options": ["A. 选项1", "B. 选项2", "C. 选项3", "D. 选项4"],
        "answer": "B",
        "explanation": "详细解析"
      },
      {
        "id": 2,
        "question": "练习题2",
        "options": ["A. 选项1", "B. 选项2", "C. 选项3", "D. 选项4"],
        "answer": "A",
        "explanation": "详细解析"
      },
      {
        "id": 3,
        "question": "练习题3",
        "options": ["A. 选项1", "B. 选项2", "C. 选项3", "D. 选项4"],
        "answer": "C",
        "explanation": "详细解析"
      }
    ]
  }
]
注意：数组中只包含图片中实际存在的错题数量。如果图片只有1道错题，数组长度就是1；有3道错题，数组长度就是3。`;

  // 构造包含所有图片的消息
  const imageContent = images.map(img => ({
    type: 'image_url',
    image_url: { url: img }
  }));

  const messages = [
    {
      role: 'user',
      content: [
        {
          type: 'text',
          text: prompt
        },
        ...imageContent
      ]
    }
  ];

  // 尝试调用API，最多重试2次
  let retries = 2;
  while (retries > 0) {
    try {
      const result = await new Promise<any>((resolve, reject) => {
        const url = new URL(`${apiUrl}/v1/chat/completions`);
        const postData = JSON.stringify({
          model: model,
          messages: messages,
          temperature: 0.7,
          max_tokens: 8000  // 增加到 8000，支持多个错题
        });

        const options = {
          hostname: url.hostname,
          port: url.port || 443,
          path: url.pathname,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            'Content-Length': Buffer.byteLength(postData)
          },
          rejectUnauthorized: false,
          timeout: 180000  // 3分钟超时
        };

        const req = https.request(options, (res) => {
          let data = '';

          res.on('data', (chunk) => {
            data += chunk;
          });

          res.on('end', () => {
            try {
              if (res.statusCode !== 200) {
                reject(new Error(`API请求失败: ${res.statusCode} ${data}`));
              } else {
                resolve(JSON.parse(data));
              }
            } catch (error) {
              reject(error);
            }
          });
        });

        req.on('error', reject);
        req.on('timeout', () => {
          req.destroy();
          reject(new Error('AI分析超时，请减少错题数量后重试'));
        });

        req.write(postData);
        req.end();
      });

      const content = result.choices[0]?.message?.content;

      if (!content) {
        throw new Error('AI未返回分析结果');
      }

      // 记录原始返回内容用于调试
      console.log('AI返回内容长度:', content.length);
      console.log('AI返回内容前500字符:', content.substring(0, 500));

      // 尝试提取JSON数组（使用括号深度匹配）
      let jsonContent = content;

      // 找到第一个 [ 或 { 的位置
      const firstBrace = content.indexOf('{');
      const firstBracket = content.indexOf('[');

      if (firstBrace === -1 && firstBracket === -1) {
        throw new Error('AI返回的内容中找不到JSON格式');
      }

      // 优先从 [ 开始提取（数组格式）
      let startIndex, searchStr;
      if (firstBracket !== -1 && (firstBrace === -1 || firstBracket < firstBrace)) {
        startIndex = firstBracket;
        searchStr = '[';
      } else {
        startIndex = firstBrace;
        searchStr = '{';
      }

      // 使用括号深度匹配找到完整的JSON
      let depth = 0;
      let endIndex = -1;
      const endChar = searchStr === '[' ? ']' : '}';

      for (let i = startIndex; i < content.length; i++) {
        const char = content[i];
        if (char === searchStr) {
          depth++;
        } else if (char === endChar) {
          depth--;
          if (depth === 0) {
            endIndex = i + 1;
            break;
          }
        } else if (char === '"' && depth > 0) {
          // 跳过字符串内容，避免字符串内的括号干扰
          let j = i + 1;
          while (j < content.length) {
            if (content[j] === '\\' && j + 1 < content.length) {
              j += 2; // 跳过转义字符
            } else if (content[j] === '"') {
              i = j; // 移动到字符串结束位置
              break;
            } else {
              j++;
            }
          }
        }
      }

      if (endIndex === -1) {
        throw new Error('AI返回的JSON格式不完整，找不到匹配的结束符');
      }

      jsonContent = content.substring(startIndex, endIndex);

      console.log('提取的JSON长度:', jsonContent.length);
      console.log('提取的JSON前300字符:', jsonContent.substring(0, 300));

      // 尝试解析 JSON
      let errorsArray: SingleErrorResult[];
      try {
        errorsArray = JSON.parse(jsonContent);
      } catch (parseError) {
        console.error('第一次JSON解析失败，尝试清理:', parseError.message);

        // 如果直接解析失败，尝试清理 JSON 字符串
        // 移除可能存在的注释、多余空格等
        let cleanedJson = jsonContent
          .replace(/\/\/.*$/gm, '') // 移除单行注释
          .replace(/\/\*[\s\S]*?\*\//g, '') // 移除多行注释
          .replace(/\n\s*\n/g, '\n') // 移除多余的空行
          .trim();

        // 尝试修复常见的 JSON 问题
        // 1. 移除尾部逗号
        cleanedJson = cleanedJson.replace(/,(\s*[}\]])/g, '$1');
        // 2. 修复缺少引号的问题（简单处理）
        // 3. 修复多余的逗号

        errorsArray = JSON.parse(cleanedJson);
      }

      // 如果解析的还是单个对象，转换为数组
      if (!Array.isArray(errorsArray)) {
        errorsArray = [errorsArray];
      }

      // 验证返回的数据结构
      if (!Array.isArray(errorsArray)) {
        throw new Error('AI返回的数据格式不正确，必须是数组');
      }

      if (errorsArray.length === 0) {
        throw new Error('无法识别图片中的错题。请确保图片清晰、包含完整的错题内容，并且有明显的学生作答或错题标记（如✗、圈出等）。');
      }

      // 验证每个错题的数据结构
      for (const error of errorsArray) {
        if (!error.original_question || !error.error_analysis || !error.practice_questions) {
          throw new Error('AI返回的错题数据格式不正确');
        }
      }

      return {
        errors: errorsArray,
        total_errors_found: errorsArray.length,
        images_processed: images.length
      };

    } catch (error) {
      retries--;
      if (retries === 0) {
        throw error;
      }
      // 等待1秒后重试
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  throw new Error('错题分析失败，请重试');
}
