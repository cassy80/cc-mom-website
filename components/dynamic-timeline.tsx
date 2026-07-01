'use client';

import { useState } from 'react';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  time: string;
  source: string;
  link: string;
}

interface DynamicTimelineProps {
  news: NewsItem[];
}

export default function DynamicTimeline({ news }: DynamicTimelineProps) {
  const [filter, setFilter] = useState<'all' | 'high' | 'product' | 'funding' | 'tech' | 'industry'>('all');

  const filteredNews = news.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'high') return item.priority === 'high';
    if (filter === 'product') return item.category === '产品发布';
    if (filter === 'funding') return item.category === '融资动态';
    if (filter === 'tech') return item.category === '技术突破';
    if (filter === 'industry') return item.category === '行业新闻';
    return true;
  });

  // 按时间排序
  const sortedNews = [...filteredNews].sort((a, b) =>
    new Date(b.time).getTime() - new Date(a.time).getTime()
  );

  // 按日期分组
  const groupedNews = sortedNews.reduce((acc, item) => {
    const date = new Date(item.time).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    if (!acc[date]) {
      acc[date] = [];
    }

    acc[date].push(item);
    return acc;
  }, {} as Record<string, NewsItem[]>);

  return (
    <div>
      {/* 过滤器 */}
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          全部
        </button>
        <button
          onClick={() => setFilter('high')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'high'
              ? 'bg-orange-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          重要
        </button>
        <button
          onClick={() => setFilter('product')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'product'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          产品发布
        </button>
        <button
          onClick={() => setFilter('funding')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'funding'
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          融资动态
        </button>
        <button
          onClick={() => setFilter('tech')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'tech'
              ? 'bg-red-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          技术突破
        </button>
        <button
          onClick={() => setFilter('industry')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'industry'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          行业新闻
        </button>
      </div>

      {/* 时间线 */}
      <div className="space-y-8">
        {Object.entries(groupedNews).map(([date, items]) => (
          <div key={date}>
            {/* 日期分隔 */}
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white inline-block relative">
                {date}
                <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></span>
              </h3>
            </div>

            {/* 新闻列表 */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <a
                  key={item.id}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-5 border-l-4 hover:scale-[1.02] ${
                    item.priority === 'high'
                      ? 'border-orange-500'
                      : item.priority === 'medium'
                      ? 'border-blue-500'
                      : 'border-gray-500'
                  }"
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(item.time).toLocaleTimeString('zh-CN', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                    <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-semibold rounded">
                      {item.category}
                    </span>
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-sm leading-tight">
                    {item.priority === 'high' ? '🔥' : '📊'} {item.title}
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 text-xs line-clamp-2">
                    {item.description}
                  </p>
                  <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    来源：{item.source}
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 无数据提示 */}
      {sortedNews.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <p className="text-lg mb-2">暂无动态</p>
          <p className="text-sm">请稍后刷新页面</p>
        </div>
      )}
    </div>
  );
}
