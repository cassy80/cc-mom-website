'use client';

import { useState } from 'react';

export default function EnglishLearningPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const modules = [
    {
      id: 1,
      title: '📷 英语错题分析',
      description: '拍照上传错题，AI智能分析错因并生成同类题',
      features: [
        '支持1-3张图片上传',
        'AI精准分析错误原因',
        '自动生成3道练习题',
        '详细解析和建议'
      ],
      path: '/english/analysis',
      color: 'from-purple-500 to-indigo-600',
      bgLight: 'bg-purple-500/10',
      icon: '📷'
    },
    {
      id: 2,
      title: '🎮 单词游戏',
      description: '趣味游戏练习，轻松掌握小学英语词汇',
      features: [
        '多种游戏模式',
        '根据年级选择词汇',
        '互动学习体验',
        '实时反馈进度'
      ],
      path: '/english/game',
      color: 'from-green-500 to-emerald-600',
      bgLight: 'bg-green-500/10',
      icon: '🎮'
    },
    {
      id: 3,
      title: '📚 单词恢复',
      description: '科学复习遗忘单词，巩固学习效果',
      features: [
        '艾宾浩斯遗忘曲线',
        '智能复习提醒',
        '个性化学习计划',
        '学习进度追踪'
      ],
      path: '/english/recovery',
      color: 'from-blue-500 to-cyan-600',
      bgLight: 'bg-blue-500/10',
      icon: '📚'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                英语学习中心
              </h1>
              <p className="text-gray-600 mt-2">选择你想要的学习方式</p>
            </div>
            <button
              onClick={() => window.history.back()}
              className="text-gray-600 hover:text-gray-900 transition-colors px-4 py-2 rounded-lg hover:bg-gray-100"
              style={{ cursor: 'pointer' }}
            >
              ← 返回
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Introduction */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            三大学习模块，全面提升英语能力
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            无论你想分析错题、通过游戏学习，还是科学复习，都能找到适合的学习方式
          </p>
        </div>

        {/* Module Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {modules.map((module) => (
            <div
              key={module.id}
              onMouseEnter={() => setHoveredCard(module.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => window.location.href = module.path}
              className="bg-white border-2 border-gray-200 rounded-xl p-8 hover:shadow-xl transition-all duration-300 cursor-pointer group"
              style={{
                transform: hoveredCard === module.id ? 'scale-105)' : 'scale(1)',
                borderColor: hoveredCard === module.id ? module.color.split(' ')[1] : '#e5e7eb'
              }}
            >
              {/* Icon */}
              <div className={`text-6xl mb-4 ${module.bgLight} inline-block p-4 rounded-full`}>
                {module.icon}
              </div>

              {/* Title */}
              <h3 className={`text-xl font-bold mb-3 bg-gradient-to-r ${module.color} bg-clip-text text-transparent`}>
                {module.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 mb-4">
                {module.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {module.features.map((feature, index) => (
                  <li key={index} className="flex items-start text-sm text-gray-600">
                    <span className="text-green-500 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className={`w-full bg-gradient-to-r ${module.color} text-white font-semibold py-3 rounded-lg transition-all duration-300 opacity-90 group-hover:opacity-100`}
              >
                开始学习 →
              </button>
            </div>
          ))}
        </div>

        {/* Tips Section */}
        <div className="mt-16 bg-blue-50 border border-blue-200 rounded-xl p-8 max-w-4xl mx-auto">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            💡 使用建议
          </h3>
          <div className="space-y-3 text-gray-700">
            <p>• <strong>错题分析</strong>：适合有试卷或作业需要分析的学生</p>
            <p>• <strong>单词游戏</strong>：适合日常词汇练习，增加学习趣味性</p>
            <p>• <strong>单词恢复</strong>：适合定期复习已学单词，防止遗忘</p>
            <p className="text-sm text-gray-600 mt-4">
              💭 建议先用错题分析找出薄弱环节，然后用游戏巩固词汇，最后用复习功能长期保持学习效果
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600 text-sm">
          <p>© 2026 CC妈AI教育 · 英语学习中心</p>
        </div>
      </footer>
    </div>
  );
}
