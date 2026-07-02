'use client';

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'saved_card_key';

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

export default function AnalysisPage() {
  const [code, setCode] = useState('');
  const [savedCode, setSavedCode] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState('');

  // 页面加载时读取保存的卡密
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setSavedCode(data.code);
        setCode(data.code);
      } catch (err) {
        console.error('读取保存的卡密失败:', err);
      }
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64 = event.target?.result as string;
          newImages.push(base64);
          if (newImages.length === files.length) {
            setImages([...images, ...newImages]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleAnalyze = async () => {
    // 验证卡密
    if (!code.trim()) {
      setError('请输入卡密');
      return;
    }

    // 验证图片
    if (images.length === 0) {
      setError('请上传错题图片');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/analyze-error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: code.trim().toUpperCase(),
          images
        })
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.data);
        setError('');
        // 保存卡密
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          code: code.trim().toUpperCase(),
          savedAt: new Date().toISOString()
        }));
        setSavedCode(code.trim().toUpperCase());
      } else {
        setError(data.message || '分析失败，请重试');
      }
    } catch (err) {
      setError('网络错误，请检查连接后重试');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setImages([]);
    setResult(null);
    setError('');
  };

  const hasSavedCode = savedCode.length > 0;

  return (
    <div
      className="min-h-screen transition-all duration-500"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#f7f8f8'
      }}
    >
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">
                📷 英语错题分析
              </h1>
              <p className="text-white/70 mt-2">拍照上传错题，AI智能分析错因并生成同类题</p>
            </div>
            <button
              onClick={() => window.history.back()}
              className="text-white/70 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/5"
              style={{ cursor: 'pointer' }}
            >
              ← 返回
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Input Section */}
        <div className="bg-white/10 border border-white/20 rounded-lg p-6 mb-6">
          <div className="space-y-4">
            {/* 已保存卡密提示 */}
            {hasSavedCode && (
              <div className="bg-white/10 border border-white/20 rounded-md p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-white/80 mb-1">
                      ✓ 卡密已激活
                    </div>
                    <div className="text-lg font-semibold">
                      {savedCode}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      localStorage.removeItem(STORAGE_KEY);
                      setSavedCode('');
                      setCode('');
                    }}
                    type="button"
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    更换卡密
                  </button>
                </div>
              </div>
            )}

            {/* 卡密输入 */}
            {!hasSavedCode && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  卡密 <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="请输入卡密"
                  className="w-full bg-white/5 border border-white/20 rounded-md px-4 py-3 placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors"
                />
              </div>
            )}

            {/* 图片上传 */}
            <div>
              <label className="block text-sm font-medium mb-2">
                上传错题图片 <span className="text-red-400">*</span>
              </label>
              <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-white/40 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer block"
                >
                  <div className="text-4xl mb-3">📷</div>
                  <p className="text-white/80 mb-2">点击或拖拽上传错题图片</p>
                  <p className="text-white/50 text-sm">支持 JPG、PNG 格式，最多3张</p>
                </label>
              </div>

              {/* 图片预览 */}
              {images.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {images.map((img, index) => (
                    <div key={index} className="relative">
                      <img
                        src={img}
                        alt={`预览${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border border-white/20"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        type="button"
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white w-6 h-6 rounded-full text-sm transition-colors"
                        style={{ cursor: 'pointer' }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* 温馨提示 */}
              {images.length > 1 && (
                <div className="mt-3 bg-yellow-500/10 border border-yellow-500/30 rounded-md p-3">
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-400 text-lg">💡</span>
                    <div className="text-sm text-yellow-200">
                      <p className="font-medium mb-1">温馨提示</p>
                      <p>建议一次上传1张试卷。多张图片处理时间较长（约3-6分钟），请耐心等待。</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 分析按钮 */}
            <button
              onClick={handleAnalyze}
              disabled={loading || images.length === 0}
              type="button"
              className="w-full bg-white hover:bg-white/90 text-purple-600 font-bold py-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
              style={{ minHeight: '48px', cursor: 'pointer' }}
            >
              {loading ? '🔄 AI分析中...' : '🚀 开始分析错题'}
            </button>

            {/* 错误提示 */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="bg-white/10 border border-white/20 rounded-lg p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mb-4"></div>
            <p className="font-medium mb-2">🤖 AI正在分析错题...</p>
            <p className="text-white/60 text-sm">预计需要30-60秒，请耐心等待...</p>
          </div>
        )}

        {/* Results Section */}
        {result && !loading && (
          <>
            {/* 统计信息 */}
            <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-white/20 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">🎯</div>
                  <div>
                    <div className="text-2xl font-bold">分析完成！</div>
                    <div className="text-white/70">共识别出 {result.total_errors_found} 道错题</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-white/70">处理图片数</div>
                  <div className="text-xl font-semibold">{result.images_processed} 张</div>
                </div>
              </div>
            </div>

            {/* 循环显示所有错题 */}
            {result.errors.map((errorItem, errorIndex) => (
              <div key={errorIndex} className="mb-8">
                {/* 错题标题 */}
                <div className="bg-white/10 border-l-4 border-purple-500 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">📝</span>
                    <span className="text-xl font-semibold">错题 #{errorIndex + 1}</span>
                  </div>
                </div>

                {/* 原题展示 */}
                <div className="bg-white/10 border border-white/20 rounded-lg p-6 mb-4">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    📖 原题展示
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-white/5 rounded-md p-4">
                      <div className="text-sm text-white/70 mb-1">题目内容：</div>
                      <div className="text-lg">{errorItem.original_question.question_text}</div>
                    </div>
                    {errorItem.original_question.student_answer && (
                      <div className="bg-red-500/10 border border-red-500/30 rounded-md p-4">
                        <div className="text-sm text-red-300 mb-1">你的答案：</div>
                        <div className="text-lg text-red-400">{errorItem.original_question.student_answer}</div>
                      </div>
                    )}
                    <div className="bg-green-500/10 border border-green-500/30 rounded-md p-4">
                      <div className="text-sm text-green-300 mb-1">正确答案：</div>
                      <div className="text-lg text-green-400">{errorItem.original_question.correct_answer}</div>
                    </div>
                  </div>
                </div>

                {/* 错因分析 */}
                <div className="bg-white/10 border border-white/20 rounded-lg p-6 mb-4">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    🔍 错因分析
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-white/5 rounded-md p-4">
                      <div className="text-sm text-white/70 mb-1">错误类型：</div>
                      <div className="text-lg text-yellow-300">{errorItem.error_analysis.error_type}</div>
                    </div>
                    <div className="bg-white/5 rounded-md p-4">
                      <div className="text-sm text-white/70 mb-1">考查知识点：</div>
                      <div className="text-lg">{errorItem.error_analysis.knowledge_point}</div>
                    </div>
                    <div className="bg-white/5 rounded-md p-4">
                      <div className="text-sm text-white/70 mb-1">详细分析：</div>
                      <div className="text-white/90 leading-relaxed">{errorItem.error_analysis.reason}</div>
                    </div>
                  </div>
                </div>

                {/* 举一反三练习 */}
                <div className="bg-white/10 border border-white/20 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    ⚡ 举一反三练习
                  </h3>
                  <div className="space-y-4">
                    {errorItem.practice_questions.map((q, index) => (
                      <div key={q.id} className="bg-white/5 rounded-md p-4 border border-white/10">
                        <div className="text-white/90 mb-3">
                          <span className="text-white/60 mr-2">题目{index + 1}：</span>
                          {q.question}
                        </div>
                        <div className="grid grid-cols-2 gap-2 mb-3">
                          {q.options.map((opt, i) => (
                            <div
                              key={i}
                              className={`text-sm p-2 rounded ${
                                opt.startsWith(q.answer)
                                  ? 'bg-green-500/20 border border-green-500/40 text-green-300'
                                  : 'bg-white/5 text-white/80'
                              }`}
                            >
                              {opt}
                            </div>
                          ))}
                        </div>
                        <div className="text-sm text-white/70">
                          💡 解析：{q.explanation}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* 操作按钮 */}
            <div className="flex gap-4">
              <button
                onClick={handleReset}
                type="button"
                className="flex-1 bg-white hover:bg-white/90 text-purple-600 font-semibold py-3 rounded-lg transition-colors active:scale-95"
                style={{ minHeight: '48px', cursor: 'pointer' }}
              >
                🔄 分析下一题
              </button>
              <button
                onClick={() => window.print()}
                type="button"
                className="flex-1 bg-white/20 hover:bg-white/30 text-white font-semibold py-3 rounded-lg transition-colors active:scale-95"
                style={{ minHeight: '48px', cursor: 'pointer' }}
              >
                🖨️ 打印练习
              </button>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-white/50">
          <p>© 2025 英语乐园 · CC妈育见AI</p>
        </div>
      </footer>
    </div>

    {/* 打印水印 */}
    <style jsx global>{`
      @media print {
        body::before {
          content: "CC妈育见AI";
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-45deg);
          font-size: 80px;
          color: rgba(0, 0, 0, 0.05);
          z-index: 9999;
          pointer-events: none;
          white-space: nowrap;
        }

        @page {
          size: A4;
          margin: 2cm;
        }
      }
    `}</style>
    </>
  );
}
