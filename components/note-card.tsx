'use client';

import { useState } from 'react';

interface NoteCardProps {
  title: string;
  description: string;
  category: string;
  link: string;
  cover?: string;
  likes?: number;
  collects?: number;
  views?: string;
  date?: string;
}

export default function NoteCard({
  title,
  description,
  category,
  link,
  cover,
  likes = 0,
  collects = 0,
  views = '0',
  date = ''
}: NoteCardProps) {
  const [copied, setCopied] = useState(false);

  // 格式化数字显示
  const formatNumber = (num: number) => {
    if (num >= 10000) {
      return `${(num / 10000).toFixed(1)}万`;
    }
    return num.toLocaleString();
  };

  // 复制链接到剪贴板
  const copyLink = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // 降级方案
      const textArea = document.createElement('textarea');
      textArea.value = link;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // 生成渐变色封面（如果没有封面图）
  const gradientColors = [
    'from-blue-400 to-blue-600',
    'from-purple-400 to-purple-600',
    'from-pink-400 to-pink-600',
    'from-indigo-400 to-indigo-600',
    'from-cyan-400 to-cyan-600',
    'from-rose-400 to-rose-600',
    'from-emerald-400 to-emerald-600',
    'from-amber-400 to-amber-600',
  ];

  // 根据标题生成固定的渐变色索引
  const gradientIndex = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % gradientColors.length;
  const gradientClass = gradientColors[gradientIndex];

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white border border-border rounded-xl overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300"
    >
      {/* 封面图 - 使用3:4比例 */}
      <div className={`relative w-full aspect-[3/4] bg-gradient-to-br ${gradientClass} overflow-hidden`}>
        {cover ? (
          <img
            src={cover}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              // 图片加载失败时显示渐变色
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl opacity-30">📱</span>
          </div>
        )}

        {/* 分类标签 */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primary text-xs font-medium rounded-full shadow-sm">
            {category}
          </span>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="p-5">
        {/* 标题 */}
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>

        {/* 描述 */}
        <p className="text-sm text-foreground-muted line-clamp-2">
          {description}
        </p>

        {/* 提示信息 */}
        <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start gap-2">
            <span className="text-lg">💡</span>
            <div className="flex-1">
              <p className="text-xs text-amber-800 leading-relaxed">
                手机端小红书APP查看更方便哦
              </p>
            </div>
          </div>
        </div>

        {/* 操作按钮区域 */}
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center gap-2">
            {/* 复制链接按钮 */}
            <button
              onClick={copyLink}
              className="flex-1 flex items-center justify-center gap-1 px-3 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 font-medium text-xs shadow-md hover:shadow-lg"
            >
              {copied ? (
                <>
                  <span>✓</span>
                  <span>已复制链接</span>
                </>
              ) : (
                <>
                  <span>📋</span>
                  <span>复制链接</span>
                </>
              )}
            </button>

            {/* 提示文字 */}
            <div className="flex-1 text-center px-2">
              <p className="text-xs text-foreground-muted">
                {copied ? '去APP粘贴打开' : '点击跳转或复制'}
              </p>
            </div>
          </div>
        </div>

        {/* 统计信息 */}
        {(likes > 0 || collects > 0 || views !== '0') && (
          <div className="mt-3 pt-3 border-t border-border/50 flex items-center justify-center gap-4 text-xs text-foreground-muted">
            {likes > 0 && (
              <div className="flex items-center gap-1">
                <span>❤️</span>
                <span>{formatNumber(likes)}</span>
              </div>
            )}
            {collects > 0 && (
              <div className="flex items-center gap-1">
                <span>⭐</span>
                <span>{formatNumber(collects)}</span>
              </div>
            )}
            {views !== '0' && (
              <div className="flex items-center gap-1">
                <span>👁️</span>
                <span>{views}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </a>
  );
}
