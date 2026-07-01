'use client';

import { useEffect, useState } from 'react';
import DynamicTimeline from '@/components/dynamic-timeline';

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

export default function AINewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState('');

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch('/api/ai-news/daily-data.json');
        if (!response.ok) {
          throw new Error('Failed to fetch news data');
        }
        const data = await response.json();
        setNews(data.news || []);
        setLastUpdate(data.lastUpdate || '');
      } catch (error) {
        console.error('Error fetching news:', error);
        // 使用示例数据作为fallback
        setNews([]);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();

    // 每5分钟刷新一次
    const interval = setInterval(fetchNews, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="pt-32 pb-12 px-4 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container-content">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              🤖 AI 科技动态
            </h1>
            <p className="text-xl text-foreground-muted mb-6">
              每天 10:00 更新最新的 AI 科技动态
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-foreground-muted">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                实时更新
              </span>
              <span>•</span>
              <span>
                数据范围：过去 168 小时（7天）
              </span>
              {lastUpdate && (
                <>
                  <span>•</span>
                  <span>最后更新：{new Date(lastUpdate).toLocaleString('zh-CN')}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 px-4 border-b border-gray-200 dark:border-gray-700">
        <div className="container-content">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                {news.length}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                本周动态
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm text-center">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-1">
                {news.filter((n) => n.priority === 'high').length}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                重要动态
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                {news.filter((n) => n.category === '产品发布').length}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                产品发布
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
                {news.filter((n) => n.category === '技术突破').length}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                技术突破
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-12 px-4">
        <div className="container-content">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8">
              🔥 最新动态 - 本周头条
            </h2>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
                <p className="mt-4 text-foreground-muted">加载中...</p>
              </div>
            ) : (
              <DynamicTimeline news={news.slice(0, 20)} />
            )}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container-content">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              📊 关于动态数据
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <span>📡</span>
                  <span>数据来源</span>
                </h3>
                <ul className="space-y-2 text-sm text-foreground-muted">
                  <li>• Twitter 热门推文</li>
                  <li>• YouTube 最新视频</li>
                  <li>• 科技媒体报道</li>
                  <li>• 官方博客更新</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <span>⏰</span>
                  <span>更新频率</span>
                </h3>
                <ul className="space-y-2 text-sm text-foreground-muted">
                  <li>• 每天 10:00 自动更新</li>
                  <li>• 数据范围：过去 168 小时</li>
                  <li>• 自动去重和排序</li>
                  <li>• 实时刷新功能</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 px-4">
        <div className="container-content">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              💡 想了解更多？
            </h2>
            <p className="text-foreground-muted mb-6">
              关注我们的小红书，获取 AI + 教育的深度内容
            </p>
            <a
              href="https://xhslink.com/m/3r4oe1rEzdJ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V9h-3.5v-2h3.5V5.59c0-3.31-2.03-5-4.72-5-3.31 0-1.66 1.11-2.59 2.66-2.59H11v2.5h3.5c.19 0 .31.03.31.22v1.38c0 .19-.12.31-.31.31H11v6.09c0 1.66-1.11 2.59-2.66 2.59zM8.59 9h-3.5v-2H8.59c-.19 0-.31.03-.31.22V5.59c0-.19.12-.31.31-.31H6.59v2.5H10c.19 0 .31.03.31.22v1.38c0 .19-.12.31-.31.31H8.59V9zm2.31 5.59c0 .19-.12.31-.31.31H9.5V9H6.59c-.19 0-.31.03-.31.22V5.59c0-.19.12-.31.31-.31H6.59v2.5H10c.19 0 .31.03.31.22v1.38c0 .19-.12.31-.31.31H10.89z"/>
              </svg>
              <span>关注小红书</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
