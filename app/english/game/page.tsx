'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

const GRADES = ['1-2年级', '3-4年级', '5-6年级', '7-9年级'];
const STORAGE_KEY = 'saved_card_key';

interface Card {
  id: number;
  text: string;
  type: 'english' | 'chinese';
  pairId: number;
  isSelected: boolean;
  isMatched: boolean;
}

interface WordPair {
  english: string;
  chinese: string;
}

export default function GamePage() {
  const [code, setCode] = useState('');
  const [savedCode, setSavedCode] = useState('');
  const [grade, setGrade] = useState('3-4年级');
  const [gameStarted, setGameStarted] = useState(false);
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [steps, setSteps] = useState(0);
  const [time, setTime] = useState(0);
  const [showVictory, setShowVictory] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // 使用 ref 来存储最新的事件处理函数
  const initGameRef = useRef<(() => Promise<void>) | null>(null);
  const gradeHandlersRef = useRef<Map<string, (e: Event) => void>>(new Map());

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

  // 更新 initGame ref
  useEffect(() => {
    initGameRef.current = async () => {
      // 验证卡密
      if (!code.trim()) {
        setError('请输入卡密');
        return;
      }

      setIsLoading(true);
      setError('');
      try {
        const wordPairs = await getRandomWordPairs(grade);
        if (wordPairs.length === 0) return;

        // 保存卡密
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          code: code.trim().toUpperCase(),
          savedAt: new Date().toISOString()
        }));
        setSavedCode(code.trim().toUpperCase());

        // 创建卡片数组
        const initialCards: Card[] = [];
        wordPairs.forEach((pair, index) => {
          initialCards.push({
            id: index * 2,
            text: pair.english,
            type: 'english',
            pairId: index,
            isSelected: false,
            isMatched: false,
          });
          initialCards.push({
            id: index * 2 + 1,
            text: pair.chinese,
            type: 'chinese',
            pairId: index,
            isSelected: false,
            isMatched: false,
          });
        });

        // 随机打乱卡片顺序
        const shuffledCards = initialCards.sort(() => Math.random() - 0.5);

        setCards(shuffledCards);
        setSelectedCards([]);
        setMatchedPairs(0);
        setSteps(0);
        setTime(0);
        setShowVictory(false);
        setGameStarted(true);
      } finally {
        setIsLoading(false);
      }
    };
  }, [grade, code]);

  // 绑定按钮事件
  useEffect(() => {
    if (!gameStarted) {
      const timer = setTimeout(() => {
        // 绑定"开始游戏"按钮
        const startButton = document.querySelector<HTMLButtonElement>('[data-start-game]');
        if (startButton && initGameRef.current) {
          const handleStart = (e: Event) => {
            e.preventDefault();
            e.stopPropagation();
            initGameRef.current?.();
          };

          startButton.addEventListener('click', handleStart);
          startButton.addEventListener('touchend', handleStart);

          // Cleanup function for start button
          return () => {
            startButton.removeEventListener('click', handleStart);
            startButton.removeEventListener('touchend', handleStart);
          };
        }

        // 绑定年级选择按钮
        const gradeButtons = document.querySelectorAll<HTMLButtonElement>('[data-grade-button]');
        gradeButtons.forEach((btn) => {
          const g = btn.getAttribute('data-grade');
          if (g) {
            const handleGradeSelect = (e: Event) => {
              e.preventDefault();
              setGrade(g);
            };

            btn.addEventListener('click', handleGradeSelect);
            btn.addEventListener('touchend', handleGradeSelect);

            // Store handler for cleanup
            gradeHandlersRef.current.set(g, handleGradeSelect);
          }
        });
      }, 100);

      // Cleanup timeout and grade button handlers
      return () => {
        clearTimeout(timer);
        gradeHandlersRef.current.forEach((handler, grade) => {
          const btn = document.querySelector<HTMLButtonElement>(`[data-grade-button="${grade}"]`);
          if (btn) {
            btn.removeEventListener('click', handler);
            btn.removeEventListener('touchend', handler);
          }
        });
        gradeHandlersRef.current.clear();
      };
    }
  }, [gameStarted]);

  // 计时器
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameStarted && !showVictory && matchedPairs < 10) {
      interval = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, showVictory, matchedPairs]);

  // 格式化时间显示
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 随机获取16个词汇对
  const getRandomWordPairs = useCallback(async (selectedGrade: string): Promise<WordPair[]> => {
    try {
      const response = await fetch('/api/game/vocabulary');
      const data = await response.json();

      if (!data.success) {
        console.error('Failed to load vocabulary:', data.message);
        return [];
      }

      const allWords = data.data[selectedGrade] || [];
      const shuffled = [...allWords].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, 10);
    } catch (error) {
      console.error('Error loading vocabulary:', error);
      return [];
    }
  }, []);

  // 点击卡片
  const handleCardClick = (index: number) => {
    // 如果已经选中2张卡片、或点击的是已选中的卡片、或已匹配的卡片，则忽略
    if (selectedCards.length >= 2 ||
        selectedCards.includes(index) ||
        cards[index].isMatched) {
      return;
    }

    // 选中当前卡片
    const newCards = [...cards];
    newCards[index].isSelected = true;
    setCards(newCards);

    // 添加到已选中列表
    const newSelected = [...selectedCards, index];
    setSelectedCards(newSelected);

    // 如果选中了2张卡片，检查是否匹配
    if (newSelected.length === 2) {
      setSteps(prev => prev + 1);
      const [firstIndex, secondIndex] = newSelected;
      const firstCard = newCards[firstIndex];
      const secondCard = newCards[secondIndex];

      if (firstCard.pairId === secondCard.pairId) {
        // 匹配成功
        setTimeout(() => {
          const updatedCards = [...newCards];
          updatedCards[firstIndex].isMatched = true;
          updatedCards[secondIndex].isMatched = true;
          updatedCards[firstIndex].isSelected = false;
          updatedCards[secondIndex].isSelected = false;
          setCards(updatedCards);
          setSelectedCards([]);
          setMatchedPairs(prev => {
            const newCount = prev + 1;
            // 检查是否全部匹配完成
            if (newCount === 10) {
              setTimeout(() => setShowVictory(true), 500);
            }
            return newCount;
          });
        }, 300);
      } else {
        // 匹配失败，取消选中
        setTimeout(() => {
          const updatedCards = [...newCards];
          updatedCards[firstIndex].isSelected = false;
          updatedCards[secondIndex].isSelected = false;
          setCards(updatedCards);
          setSelectedCards([]);
        }, 800);
      }
    }
  };

  // 重新开始
  const handleRestart = () => {
    if (initGameRef.current) {
      initGameRef.current();
    }
  };

  // 返回选择年级
  const handleBackToSelect = () => {
    setGameStarted(false);
    setShowVictory(false);
  };

  // 更换卡密
  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSavedCode('');
    setCode('');
    setGameStarted(false);
  };

  // 是否已保存卡密
  const hasSavedCode = savedCode.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#667eea] to-[#764ba2]">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">
              🎯 单词消消乐
            </h1>
            <button
              onClick={() => window.history.back()}
              className="text-white/70 hover:text-white transition-colors"
            >
              ← 返回
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {!gameStarted ? (
          /* 游戏开始界面 */
          <div className="bg-white/10 border border-white/20 rounded-2xl p-8" style={{ position: 'relative', zIndex: 1 }}>
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              选择年级
            </h2>

            {/* 卡密输入 */}
            {!hasSavedCode && (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-white">
                  卡密 <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="请输入卡密"
                  className="w-full bg-white/5 border border-white/20 rounded-md px-4 py-3 placeholder-white/40 text-white focus:outline-none focus:border-white/40 transition-colors"
                />
              </div>
            )}

            {/* 已保存卡密提示 */}
            {hasSavedCode && (
              <div className="bg-white/10 border border-white/20 rounded-md p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-white/80 mb-1">
                      ✓ 卡密已激活
                    </div>
                    <div className="text-lg font-semibold text-white">
                      {savedCode}
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    type="button"
                    className="text-sm text-white/70 hover:text-white transition-colors touch-manipulation"
                    style={{ minHeight: '44px', padding: '8px 16px' }}
                  >
                    更换卡密
                  </button>
                </div>
              </div>
            )}

            {/* 年级选择 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {GRADES.map(g => (
                <button
                  key={g}
                  data-grade-button={g}
                  onClick={() => setGrade(g)}
                  type="button"
                  className={`p-4 rounded-xl border-2 transition-all ${
                    grade === g
                      ? 'bg-white/30 border-white text-white'
                      : 'bg-white/5 border-white/20 text-white/70 hover:bg-white/10'
                  }`}
                  style={{ minHeight: '80px', cursor: 'pointer' }}
                >
                  <div className="text-4xl mb-2">
                    {g === '1-2年级' && '🌱'}
                    {g === '3-4年级' && '🌿'}
                    {g === '5-6年级' && '🌳'}
                    {g === '7-9年级' && '🎓'}
                  </div>
                  <div className="font-semibold">{g}</div>
                </button>
              ))}
            </div>

            <div className="bg-white/10 rounded-lg p-4 mb-6">
              <p className="text-white/80 text-sm mb-2">
                当前选择：{grade}
              </p>
              <p className="text-white/60 text-xs">
                该年级有 {grade === '1-2年级' ? '273' : grade === '3-4年级' ? '375' : grade === '5-6年级' ? '348' : '1050'} 个词汇
              </p>
            </div>

            {/* 错误提示 */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/40 text-red-200 px-4 py-3 rounded-md text-sm mb-6">
                {error}
              </div>
            )}

            <button
              data-start-game="true"
              disabled={isLoading}
              type="button"
              className="w-full bg-white hover:bg-white/90 text-purple-600 font-bold py-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
              style={{ minHeight: '48px', cursor: 'pointer', position: 'relative', zIndex: 10 }}
            >
              {isLoading ? '⏳ 加载词汇中...' : '🚀 开始游戏'}
            </button>
          </div>
        ) : (
          /* 游戏界面 */
          <>
            {/* 游戏状态栏 */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-6">
                  <div className="text-sm">
                    <span className="text-white/60">年级：</span>
                    <span className="font-semibold">{grade}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-white/60">步数：</span>
                    <span className="font-semibold">{steps}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-white/60">时间：</span>
                    <span className="font-semibold">{formatTime(time)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <button
                    onClick={handleRestart}
                    type="button"
                    className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm transition-colors active:scale-95 touch-manipulation"
                    style={{ minHeight: '44px', cursor: 'pointer' }}
                  >
                    🔄 重新开始
                  </button>
                  <button
                    onClick={handleBackToSelect}
                    type="button"
                    className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm transition-colors active:scale-95 touch-manipulation"
                    style={{ minHeight: '44px', cursor: 'pointer' }}
                  >
                    ← 返回
                  </button>
                </div>
              </div>
              {/* 进度条 */}
              <div className="mt-3 bg-white/10 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-green-400 to-green-600 h-full transition-all duration-300"
                  style={{ width: `${(matchedPairs / 10) * 100}%` }}
                />
              </div>
              <div className="text-center text-white/60 text-xs mt-1">
                已匹配 {matchedPairs}/10 对
              </div>
            </div>

            {/* 游戏棋盘 */}
            <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto mb-6">
              {cards.map((card, index) => (
                <button
                  key={card.id}
                  onClick={() => handleCardClick(index)}
                  type="button"
                  className={`
                    aspect-square rounded-xl font-medium text-base md:text-lg touch-manipulation
                    transition-all duration-300 transform hover:scale-105 active:scale-95
                    ${card.isMatched ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100'}
                    ${card.isSelected ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-lg scale-105 ring-4 ring-yellow-300' : 'bg-white text-purple-600 shadow-lg hover:shadow-xl'}
                    ${!card.isMatched ? 'cursor-pointer' : 'pointer-events-none'}
                  `}
                  disabled={card.isMatched || selectedCards.length >= 2}
                  style={{ cursor: card.isMatched ? 'default' : 'pointer' }}
                >
                  {card.text}
                </button>
              ))}
            </div>

            {/* 游戏说明 */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2">🎮 游戏说明</h3>
              <ul className="text-white/70 text-sm space-y-1">
                <li>• 所有卡片直接显示单词或中文</li>
                <li>• 点击两张卡片进行配对（英文+中文）</li>
                <li>• 配对成功的卡片会消失</li>
                <li>• 在最短时间内用最少步数完成挑战</li>
                <li>• 全部匹配完成后即可通关</li>
              </ul>
            </div>
          </>
        )}
      </div>

      {/* 胜利弹窗 */}
      {showVictory && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-purple-600 mb-4">
                恭喜通关！
              </h2>
              <div className="bg-purple-50 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-2 gap-4 text-left">
                  <div>
                    <div className="text-sm text-gray-500">年级</div>
                    <div className="font-semibold text-gray-800">{grade}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">步数</div>
                    <div className="font-semibold text-gray-800">{steps} 步</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">用时</div>
                    <div className="font-semibold text-gray-800">{formatTime(time)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">评价</div>
                    <div className="font-semibold text-gray-800">
                      {steps <= 12 ? '⭐⭐⭐ 完美！' : steps <= 18 ? '⭐⭐ 不错！' : '⭐ 继续加油！'}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={handleRestart}
                  type="button"
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors active:scale-95 touch-manipulation"
                  style={{ minHeight: '48px', cursor: 'pointer' }}
                >
                  🔄 再玩一局
                </button>
                <button
                  onClick={handleBackToSelect}
                  type="button"
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition-colors active:scale-95 touch-manipulation"
                  style={{ minHeight: '48px', cursor: 'pointer' }}
                >
                  ← 返回
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
