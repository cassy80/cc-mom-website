'use client';

import { useState, useEffect } from 'react';
import type { AdventurePlan } from '@/lib/types';
import { THEMES } from '@/lib/prompts';
import { themeBackgrounds } from '@/lib/theme-backgrounds';

const GRADES = ['1-2年级', '3-4年级', '5-6年级', '7-9年级'];
const STORAGE_KEY = 'saved_card_key';

export default function HomePage() {
  const [code, setCode] = useState('');
  const [savedCode, setSavedCode] = useState('');
  const [words, setWords] = useState('');
  const [grade, setGrade] = useState('3-4年级');
  const [theme, setTheme] = useState('艾莎公主');
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<AdventurePlan | null>(null);
  const [error, setError] = useState('');
  // 移除剩余次数显示，只保留系统内部计数
  const [showAnswers, setShowAnswers] = useState(false);

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

  // 移动端按钮事件绑定
  useEffect(() => {
    const generateButton = document.querySelector('[data-generate-plan]');
    if (generateButton) {
      const handleGenerateClick = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        handleGenerate();
      };
      generateButton.addEventListener('click', handleGenerateClick);
      generateButton.addEventListener('touchend', handleGenerateClick);

      return () => {
        generateButton.removeEventListener('click', handleGenerateClick);
        generateButton.removeEventListener('touchend', handleGenerateClick);
      };
    }
  }, [code, words, grade, theme]); // 依赖这些state，因为handleGenerate会用到它们

  const handleGenerate = async () => {
    // 验证输入
    if (!code.trim()) {
      setError('请输入卡密');
      return;
    }

    if (!words.trim()) {
      setError('请输入错词');
      return;
    }

    const wordList = words.split(/[,，、\s]+/).filter(w => w.trim());
    if (wordList.length < 1 || wordList.length > 10) {
      setError('请输入1-10个错词');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: code.trim().toUpperCase(),
          words: wordList,
          grade,
          theme
        })
      });

      const data = await response.json();

      if (data.success) {
        setPlan(data.data);
        setSavedCode(code.trim().toUpperCase());
        setError('');

        // 保存卡密到localStorage（不保存剩余次数）
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          code: code.trim().toUpperCase(),
          savedAt: new Date().toISOString()
        }));
      } else {
        setError(data.message || '生成失败，请重试');
      }
    } catch (err) {
      setError('网络错误，请检查连接后重试');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSavedCode('');
    setCode('');
    setPlan(null);
    setError('');
  };

  // 是否已保存卡密
  const hasSavedCode = savedCode.length > 0;

  // 获取当前主题的背景配置
  const currentThemeBackground = themeBackgrounds[theme as keyof typeof themeBackgrounds];

  return (
    <div
      className="min-h-screen relative transition-all duration-500"
      style={{
        background: currentThemeBackground?.gradient || '#010102',
        color: currentThemeBackground?.textColor || '#f7f8f8'
      }}
    >
      {/* 背景图片层 */}
      {currentThemeBackground?.backgroundImage && (
        <div
          className="fixed inset-0 z-0"
          style={{
            backgroundImage: `url(${currentThemeBackground.backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.3,
            filter: 'blur(2px)'
          }}
        />
      )}

      {/* 遮罩层 */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background: currentThemeBackground?.gradient || '#010102',
          opacity: 0.85
        }}
      />

      {/* 内容容器 */}
      <div className="relative z-10">
      {/* Header */}
      <header className="border-b border-[#23252a]">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight" style={{ fontFamily: 'Linear Display, SF Pro Display, sans-serif' }}>
                🎮 期末英语错词闯关定制卷
              </h1>
              <p className="text-[#8a8f98] mt-2">沉浸式主题闯关 · AI定制 · 学习提效</p>
            </div>
            <button
              onClick={() => window.history.back()}
              className="text-[#8a8f98] hover:text-[#f7f8f8] transition-colors px-4 py-2 rounded-lg hover:bg-white/5"
              style={{ cursor: 'pointer' }}
            >
              ← 返回
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Input Section */}
        <div className="bg-[#0f1011] border border-[#23252a] rounded-lg p-6 mb-6">
          <div className="space-y-4">
            {/* 已保存卡密提示 */}
            {hasSavedCode && (
              <div className="bg-[#5e6ad2]/10 border border-[#5e6ad2]/30 rounded-md p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-[#d0d6e0] mb-1">
                      ✓ 卡密已激活
                    </div>
                    <div className="text-lg font-semibold text-[#f7f8f8]">
                      {savedCode}
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    type="button"
                    className="text-sm text-[#8a8f98] hover:text-[#f7f8f8] transition-colors touch-manipulation"
                    style={{ minHeight: '44px', padding: '8px 16px' }}
                  >
                    更换卡密
                  </button>
                </div>
              </div>
            )}

            {/* 卡密输入 */}
            {!hasSavedCode && (
              <div>
                <label className="block text-sm font-medium mb-2 text-[#d0d6e0]">
                  卡密 <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="请输入卡密"
                  className="w-full bg-[#010102] border border-[#23252a] rounded-md px-4 py-3 text-[#f7f8f8] placeholder-[#62666d] focus:outline-none focus:border-[#5e6ad2] transition-colors"
                />
              </div>
            )}

            {/* 年级选择 */}
            <div>
              <label className="block text-sm font-medium mb-2 text-[#d0d6e0]">
                选择年级
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full bg-[#010102] border border-[#23252a] rounded-md px-4 py-3 text-[#f7f8f8] focus:outline-none focus:border-[#5e6ad2] transition-colors"
              >
                {GRADES.map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            {/* 主题选择 */}
            <div>
              <label className="block text-sm font-medium mb-2 text-[#d0d6e0]">
                选择探险主题 ⭐️
              </label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full bg-[#010102] border border-[#23252a] rounded-md px-4 py-3 text-[#f7f8f8] focus:outline-none focus:border-[#5e6ad2] transition-colors"
              >
                {THEMES.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* 错词输入 */}
            <div>
              <label className="block text-sm font-medium mb-2 text-[#d0d6e0]">
                输入错词 <span className="text-red-400">*</span>
              </label>
              <textarea
                value={words}
                onChange={(e) => setWords(e.target.value)}
                placeholder="请输入3-5个错词，用逗号隔开（例如：quiet, weather, beautiful）"
                rows={3}
                className="w-full bg-[#010102] border border-[#23252a] rounded-md px-4 py-3 text-[#f7f8f8] placeholder-[#62666d] focus:outline-none focus:border-[#5e6ad2] transition-colors resize-none"
              />
            </div>

            {/* 生成按钮 */}
            <button
              data-generate-plan="true"
              disabled={loading}
              type="button"
              className="w-full bg-[#5e6ad2] hover:bg-[#828fff] text-white font-medium py-3 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
              style={{ minHeight: '48px', cursor: 'pointer', position: 'relative', zIndex: 10 }}
            >
              {loading ? '🎮 生成闯关卷中...' : '🚀 生成闯关定制卷'}
            </button>

            {/* 错误提示 */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Loading Animation */}
        {loading && (
          <div className="bg-[#0f1011] border border-[#23252a] rounded-lg p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#5e6ad2] border-t-transparent mb-4"></div>
            <p className="text-[#d0d6e0] font-medium mb-2">🎨 AI正在为您定制专属闯关冒险</p>
            <p className="text-[#8a8f98] text-sm">预计需要1-3分钟，请耐心等待...</p>
            <p className="text-[#62666d] text-xs mt-2">AI正在根据教材词汇表精心设计内容</p>
          </div>
        )}

        {/* Results Section */}
        {plan && !loading && (
          <>
            {/* 主题标题 */}
            <div className="bg-gradient-to-r from-[#5e6ad2]/20 to-[#5058E3]/20 border border-[#5e6ad2]/30 rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-center mb-2">
                🏆 {plan.theme} 🏆
              </h2>
              <p className="text-center text-[#8a8f98] text-sm">专属错词闯关定制卷</p>
            </div>

            {/* Part 0: 装备补给站 */}
            <div className="bg-[#0f1011] border border-[#23252a] rounded-lg p-6 mb-4">
              <h3 className="text-xl font-semibold mb-4 text-[#f7f8f8] flex items-center gap-2">
                🎒 装备补给站
              </h3>
              <div className="space-y-3">
                {plan.part0_word_clinic.map((item, index) => (
                  <div key={index} className="bg-[#010102] border border-[#23252a] rounded-md p-4">
                    <div className="font-semibold text-lg text-[#f7f8f8] mb-2">{index + 1}. {item.word}</div>
                    <div className="text-sm text-[#d0d6e0] mb-1">
                      <span className="text-[#8a8f98]">音节：</span>
                      {item.syllables.join(' - ')}
                    </div>
                    <div className="text-sm text-[#d0d6e0]">
                      <span className="text-[#8a8f98]">💡 记忆诀窍：</span>
                      {item.memory_trick}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Part 1: 清除路障 */}
            <div className="bg-[#0f1011] border border-[#23252a] rounded-lg p-6 mb-4">
              <h3 className="text-xl font-semibold mb-4 text-[#f7f8f8] flex items-center gap-2">
                🚧 清除路障
              </h3>
              <div className="space-y-3">
                {plan.part1_fill_blank.map((item, index) => (
                  <div key={index} className="border-b border-[#23252a] pb-3 last:border-0 last:pb-0">
                    <div className="text-[#f7f8f8] mb-2">{index + 1}. {item.sentence_with_blank}</div>
                    <div className="text-sm text-[#d0d6e0] space-y-1">
                      {item.options.map((opt, i) => (
                        <div key={i} className="ml-4">
                          {String.fromCharCode(65 + i)}. {opt}
                        </div>
                      ))}
                    </div>
                    <div className={`mt-2 text-sm ${showAnswers ? 'text-[#27a644]' : 'answer-hidden'}`}>
                      ✅ 答案：{item.correct_answer}
                    </div>
                    <div className={`text-sm ${showAnswers ? 'text-[#d0d6e0]' : 'answer-hidden'}`}>
                      💡 解析：{item.explanation}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Part 2: 陷阱识破 */}
            <div className="bg-[#0f1011] border border-[#23252a] rounded-lg p-6 mb-4">
              <h3 className="text-xl font-semibold mb-4 text-[#f7f8f8] flex items-center gap-2">
                ⚠️ 陷阱识破
              </h3>
              <div className="space-y-3">
                {plan.part2_multiple_choice.map((item, index) => (
                  <div key={index} className="border-b border-[#23252a] pb-3 last:border-0 last:pb-0">
                    <div className="text-[#f7f8f8] mb-2">{index + 1}. {item.question}</div>
                    <div className="text-sm text-[#d0d6e0] space-y-1">
                      {item.options.map((opt, i) => (
                        <div key={i} className="ml-4">
                          {String.fromCharCode(65 + i)}. {opt}
                        </div>
                      ))}
                    </div>
                    <div className={`mt-2 text-sm ${showAnswers ? 'text-[#27a644]' : 'answer-hidden'}`}>
                      ✅ 答案：{item.correct_answer}
                    </div>
                    <div className={`text-sm ${showAnswers ? 'text-[#d0d6e0]' : 'answer-hidden'}`}>
                      💡 错因分析：{item.error_analysis}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Part 3: 终极Boss战 */}
            <div className="bg-[#0f1011] border border-[#23252a] rounded-lg p-6 mb-4">
              <h3 className="text-xl font-semibold mb-4 text-[#f7f8f8] flex items-center gap-2">
                👾 终极Boss战
              </h3>
              <div className="mb-4">
                <div className="prose prose-invert max-w-none text-[#d0d6e0] leading-relaxed">
                  {plan.part3_reading.map((item, index) => (
                    <div key={index}>
                      <p className="whitespace-pre-line">{item.story}</p>

                      {item.questions.map((q, qIndex) => (
                        <div key={qIndex} className="mt-4 border-t border-[#23252a] pt-4">
                          <div className="text-[#f7f8f8] mb-2">
                            题目 {index + 1}-{qIndex + 1}. {q.question}
                          </div>
                          <div className="text-sm text-[#d0d6e0] space-y-1">
                            {q.options.map((opt, i) => (
                              <div key={i} className="ml-4">
                                {String.fromCharCode(65 + i)}. {opt}
                              </div>
                            ))}
                          </div>
                          <div className={`mt-2 text-sm ${showAnswers ? 'text-[#27a644]' : 'answer-hidden'}`}>
                            ✅ 答案：{q.correct_answer}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Part 4: 大招释放 */}
            <div className="bg-[#0f1011] border border-[#23252a] rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4 text-[#f7f8f8] flex items-center gap-2">
                ⚡ 大招释放
              </h3>
              <div className="space-y-3">
                {plan.part4_mini_mission.map((item, index) => (
                  <div key={index} className="bg-[#010102] border border-[#23252a] rounded-md p-4">
                    <div className="text-[#f7f8f8] mb-2">
                      任务 {index + 1}: {item.mission}
                    </div>
                    {item.example && (
                      <div className={`text-sm ${showAnswers ? 'text-[#d0d6e0]' : 'answer-hidden'}`}>
                        <span className="text-[#8a8f98]">📝 示例：</span>{item.example}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 答案控制按钮 */}
            <div className="flex justify-center gap-4 mb-6 no-print flex-wrap">
              <button
                onClick={() => setShowAnswers(!showAnswers)}
                type="button"
                className="bg-[#5e6ad2] hover:bg-[#828fff] text-white font-medium px-8 py-3 rounded-md transition-colors active:scale-95 touch-manipulation"
                style={{ minHeight: '48px', cursor: 'pointer' }}
              >
                {showAnswers ? '🙈 隐藏答案' : '👁️ 显示答案'}
              </button>
              <button
                onClick={handlePrint}
                type="button"
                className="bg-[#5058E3] hover:bg-[#6a72f3] text-white font-medium px-8 py-3 rounded-md transition-colors active:scale-95 touch-manipulation"
                style={{ minHeight: '48px', cursor: 'pointer' }}
              >
                🖨️ 打印闯关卷
              </button>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-[#23252a] mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-[#62666d]">
          <p>© 2025 期末英语错词闯关定制卷 · CC妈育见AI</p>
        </div>
      </footer>

      {/* 主题卡通形象 - 固定在右下角 */}
      {currentThemeBackground?.mascot && (
        <div
          className="fixed bottom-4 right-4 w-56 h-56 md:w-80 md:h-80 opacity-90 hover:opacity-100 transition-all duration-300 pointer-events-none animate-float"
          style={{
            backgroundImage: `url(${currentThemeBackground.mascot})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            filter: 'drop-shadow(0 15px 40px rgba(0,0,0,0.4))'
          }}
          title={currentThemeBackground.mascotName}
        />
      )}
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

        .no-print {
          display: none !important;
        }
      }
    `}</style>
    </>
  );
}
