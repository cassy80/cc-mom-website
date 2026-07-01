'use client';

import { useState } from 'react';

interface Level {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  skills: string[];
}

const levels: Level[] = [
  {
    id: 1,
    title: '效率解放',
    description: 'AI辅助完成重复性工作',
    icon: '⚡',
    color: 'bg-brand-primary',
    skills: ['作业批改', '备课助手', '题库生成']
  },
  {
    id: 2,
    title: '逻辑对齐',
    description: '建立AI思维框架',
    icon: '🎯',
    color: 'bg-brand-secondary',
    skills: ['提问技巧', '逻辑训练', '批判思维']
  },
  {
    id: 3,
    title: '学科深耕',
    description: 'AI+学科深度融合',
    icon: '📚',
    color: 'bg-brand-accent',
    skills: ['数学建模', '理科解题', '英语辅导']
  },
  {
    id: 4,
    title: '创意爆发',
    description: '用AI实现零代码创造',
    icon: '💡',
    color: 'bg-gradient-to-br from-brand-primary to-brand-secondary',
    skills: ['项目设计', '工具开发', '作品产出']
  }
];

export default function LearningPathCard() {
  const [activeLevel, setActiveLevel] = useState(1);

  return (
    <div className="absolute -left-6 top-12 bg-white rounded-2xl shadow-xl p-5 border border-border w-64">
      {/* 标题 */}
      <div className="mb-4">
        <div className="text-xs font-semibold text-foreground-muted uppercase tracking-wide mb-1">
          AI学习进阶路径
        </div>
        <div className="text-sm text-foreground-muted">
          点击卡片查看详情
        </div>
      </div>

      {/* 级别指示器 */}
      <div className="flex gap-2 mb-4">
        {levels.map((level) => (
          <button
            key={level.id}
            onClick={() => setActiveLevel(level.id)}
            className={`flex-1 h-2 rounded-full transition-all duration-300 ${
              activeLevel === level.id
                ? level.color
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
            aria-label={`Level ${level.title}`}
          />
        ))}
      </div>

      {/* 内容区域 */}
      <div className="space-y-3">
        {/* 图标和标题 */}
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl ${levels[activeLevel - 1].color} flex items-center justify-center shadow-lg`}>
            <span className="text-2xl">{levels[activeLevel - 1].icon}</span>
          </div>
          <div>
            <div className="text-xs text-foreground-muted font-medium">
              Level {activeLevel}
            </div>
            <div className="text-base font-bold text-foreground">
              {levels[activeLevel - 1].title}
            </div>
          </div>
        </div>

        {/* 描述 */}
        <div className="text-sm text-foreground-muted leading-relaxed">
          {levels[activeLevel - 1].description}
        </div>

        {/* 技能标签 */}
        <div className="flex flex-wrap gap-2 pt-2">
          {levels[activeLevel - 1].skills.map((skill, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 bg-background-alt text-foreground rounded-lg font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* 底部提示 */}
      <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs text-foreground-muted">
        <span>← 点击切换级别</span>
        <span>{activeLevel}/4</span>
      </div>
    </div>
  );
}
