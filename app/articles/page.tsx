'use client';

import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Link from 'next/link';
import articlesData from '@/content/articles.json';
import { useState } from 'react';

export default function ArticlesPage() {
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = articlesData.categories;

  // 筛选文章
  const filteredArticles = articlesData.articles.filter(article => {
    const matchesCategory = selectedCategory === '全部' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // 统计信息
  const totalViews = articlesData.articles.reduce((sum, article) => sum + (article.views || 0), 0);
  const totalLikes = articlesData.articles.reduce((sum, article) => sum + (article.likes || 0), 0);
  const featuredCount = articlesData.articles.filter(article => article.featured).length;

  return (
    <div className="min-h-screen bg-background">
      {/* 导航栏 */}
      <Navbar />

      {/* 页面标题 */}
      <section className="pt-32 pb-12 px-4 bg-gradient-to-r from-primary/5 to-primary-light/5">
        <div className="container-content">
          <nav className="flex items-center gap-2 text-sm text-foreground-muted mb-6">
            <Link href="/" className="hover:text-primary transition-colors">
              首页
            </Link>
            <span>/</span>
            <span className="text-foreground">原创文章</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                原创文章
              </h1>
              <p className="text-lg text-foreground-muted max-w-2xl">
                深度AI教育文章，实战经验分享，帮助家长和孩子掌握AI时代的核心竞争力
              </p>
            </div>
            <a
              href="https://www.xiaohongshu.com/user/profile/498481010"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors shadow-lg hover:shadow-xl"
            >
              <span>❤️</span>
              <span>关注小红书</span>
            </a>
          </div>

          {/* 统计信息 */}
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📝</span>
              <span className="text-foreground-muted">原创文章</span>
              <span className="font-semibold text-primary">{articlesData.articles.length}篇</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">👁️</span>
              <span className="text-foreground-muted">总阅读</span>
              <span className="font-semibold text-blue-500">{(totalViews / 1000).toFixed(1)}k</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">👍</span>
              <span className="text-foreground-muted">总点赞</span>
              <span className="font-semibold text-red-500">{(totalLikes / 1000).toFixed(1)}k</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">⭐</span>
              <span className="text-foreground-muted">精选推荐</span>
              <span className="font-semibold text-amber-500">{featuredCount}篇</span>
            </div>
          </div>
        </div>
      </section>

      {/* 搜索和筛选 */}
      <section className="py-6 px-4 border-b border-border bg-white/95 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="container-content">
          {/* 搜索框 */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="🔍 搜索文章标题、内容或标签..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* 分类筛选 */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const count = category === '全部'
                ? articlesData.articles.length
                : articlesData.articles.filter(a => a.category === category).length;
              const isSelected = selectedCategory === category;

              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    isSelected
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-background-alt text-foreground-muted hover:bg-gray-200'
                  }`}
                >
                  {category}
                  <span className={`ml-2 text-xs ${isSelected ? 'text-white/70' : 'text-foreground-muted/60'}`}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 文章列表 */}
      <section className="py-12 px-4">
        <div className="container-content">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                没有找到相关文章
              </h3>
              <p className="text-foreground-muted">
                试试其他关键词或分类
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/articles/${article.id}`}
                  className="block bg-white border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  {/* 文章封面 */}
                  <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary-light/20 relative overflow-hidden p-4">
                    {article.coverImage ? (
                      <img
                        src={article.coverImage}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-lg"
                        style={{
                          objectPosition: (article.id === 'ai-learning-system-2026' || article.id === 'doubao-english-tutor')
                            ? 'center 20%'
                            : 'center'
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-6xl">
                        📝
                      </div>
                    )}
                    {article.featured && (
                      <div className="absolute top-3 left-3 px-3 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full shadow-md">
                        ⭐ 精选
                      </div>
                    )}
                    <div className="absolute top-3 right-3 px-3 py-1 bg-white/90 backdrop-blur-sm text-foreground text-xs font-medium rounded-full shadow-md">
                      {article.readTime}
                    </div>
                  </div>

                  {/* 文章内容 */}
                  <div className="p-6">
                    {/* 分类标签 */}
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                        {article.category}
                      </span>
                    </div>

                    {/* 标题 */}
                    <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>

                    {/* 摘要 */}
                    <p className="text-sm text-foreground-muted mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>

                    {/* 标签 */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs text-foreground-muted bg-background-alt px-2 py-1 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* 元信息 */}
                    <div className="flex items-center justify-between text-xs text-foreground-muted pt-4 border-t border-border">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          📅 {article.date}
                        </span>
                        <span className="flex items-center gap-1">
                          👁️ {(article.views / 1000).toFixed(1)}k
                        </span>
                        <span className="flex items-center gap-1">
                          👍 {article.likes}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/5 to-primary-light/5">
        <div className="container-content text-center max-w-2xl">
          <h2 className="text-3xl font-bold text-white mb-4">
            想持续学习AI教育实战经验？
          </h2>
          <p className="text-foreground-muted mb-8">
            关注小红书或订阅邮件，获取最新文章和AI工具推荐
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.xiaohongshu.com/user/profile/498481010"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors shadow-lg hover:shadow-xl"
            >
              <span>❤️</span>
              <span>关注小红书</span>
            </a>
            <Link
              href="/faq"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary font-medium rounded-lg hover:bg-primary-dark transition-colors shadow-lg hover:shadow-xl"
            >
              <span>💡</span>
              <span className="text-white">查看常见问题</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
