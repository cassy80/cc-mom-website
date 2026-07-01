import { NextResponse } from 'next/server';
import { validateKey, decrementUsage } from '@/lib/key-manager';
import { buildGenerateMessages } from '@/lib/prompts';
import type { AdventurePlan } from '@/lib/types';
import { loadVocabulary } from '@/lib/vocabulary';
import https from 'https';

export async function POST(request: Request) {
  try {
    const { code, words, grade, theme } = await request.json();

    // 1. 验证卡密
    const keyValidation = await validateKey(code.trim().toUpperCase());
    if (!keyValidation.valid) {
      return NextResponse.json({
        success: false,
        message: keyValidation.message
      }, { status: 401 });
    }

    // 2. 验证输入（words已经是前端处理好的数组）
    if (!Array.isArray(words) || words.length < 1 || words.length > 10) {
      return NextResponse.json({
        success: false,
        message: '请输入1-10个错词'
      }, { status: 400 });
    }

    // 3. 清理每个单词（去除空格）
    const cleanedWords = words.map((w: string) => w.trim()).filter((w: string) => w.length > 0);

    if (cleanedWords.length === 0) {
      return NextResponse.json({
        success: false,
        message: '请输入有效的错词'
      }, { status: 400 });
    }

    // 4. 调用AI生成闯关定制卷
    const vocabulary = loadVocabulary();
    const plan = await generatePlan(cleanedWords, grade, theme, vocabulary);

    // 5. 扣减使用次数
    await decrementUsage(code.trim().toUpperCase());

    // 6. 返回结果（不返回剩余次数给前端）
    return NextResponse.json({
      success: true,
      data: plan
    });

  } catch (error) {
    console.error('生成失败:', error);
    return NextResponse.json({
      success: false,
      message: '生成失败，请重试'
    }, { status: 500 });
  }
}

/**
 * 调用Applesay API生成主题闯关定制卷
 */
async function generatePlan(words: string[], grade: string, theme: string, vocabulary: Record<string, string[]>): Promise<AdventurePlan> {
  const apiUrl = process.env.APPLESAY_API_BASE_URL;
  const apiKey = process.env.APPLESAY_API_KEY;
  const model = process.env.APPLESAY_MODEL;

  if (!apiUrl || !apiKey || !model) {
    throw new Error('缺少AI API配置');
  }

  const messages = buildGenerateMessages(words, grade, theme, vocabulary);

  // 尝试调用API，最多重试2次
  let retries = 2;
  while (retries > 0) {
    try {
      // 使用原生https模块来处理SSL证书问题
      const result = await new Promise<any>((resolve, reject) => {
        const url = new URL(`${apiUrl}/v1/chat/completions`);
        const postData = JSON.stringify({
          model: model,
          messages: messages,
          temperature: 0.7,
          max_tokens: 3000,
          response_format: { type: 'json_object' }
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
          // 忽略SSL证书错误
          rejectUnauthorized: false
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
        req.write(postData);
        req.end();
      });

      const content = result.choices[0].message.content;

      // 解析JSON响应
      const parsedPlan: any = JSON.parse(content);

      // 确保所有字段都是数组，即使AI返回了不完整的数据
      const plan: AdventurePlan = {
        theme: parsedPlan.theme || '未知主题',
        part0_word_clinic: Array.isArray(parsedPlan.part0_word_clinic) ? parsedPlan.part0_word_clinic : [],
        part1_fill_blank: Array.isArray(parsedPlan.part1_fill_blank) ? parsedPlan.part1_fill_blank : [],
        part2_multiple_choice: Array.isArray(parsedPlan.part2_multiple_choice) ? parsedPlan.part2_multiple_choice : [],
        part3_reading: Array.isArray(parsedPlan.part3_reading) ? parsedPlan.part3_reading : [],
        part4_mini_mission: Array.isArray(parsedPlan.part4_mini_mission) ? parsedPlan.part4_mini_mission : []
      };

      // 验证返回的数据结构
      if (!plan.theme || plan.part0_word_clinic.length === 0 || plan.part1_fill_blank.length === 0 ||
          plan.part2_multiple_choice.length === 0 || plan.part3_reading.length === 0 || plan.part4_mini_mission.length === 0) {
        console.error('AI返回的数据不完整:', JSON.stringify(plan, null, 2));
        throw new Error('AI返回的数据格式不正确，部分内容为空');
      }

      return plan;

    } catch (error) {
      retries--;
      if (retries === 0) {
        throw error;
      }
      // 等待1秒后重试
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  throw new Error('AI生成失败，请重试');
}
