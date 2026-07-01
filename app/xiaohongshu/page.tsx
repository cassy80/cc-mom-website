'use client';

import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import NoteCard from '@/components/note-card';
import Link from 'next/link';
import xiaohongshuNotes from '@/content/xiaohongshu-notes.json';
import { useState } from 'react';

export default function XiaohongshuPage() {
  const [selectedCategory, setSelectedCategory] = useState('全部');

  const categories = ['全部', '测评类', 'AI工具辅助学习提效类', '工具类推荐', '观点类'];

  const categoryEmoji: { [key: string]: string } = {
    '全部': '📱',
    '测评类': '📊',
    'AI工具辅助学习提效类': '🤖',
    '工具类推荐': '🛠️',
    '观点类': '💡'
  };

  // 筛选笔记
  const filteredNotes = selectedCategory === '全部'
    ? xiaohongshuNotes.notes
    : xiaohongshuNotes.notes.filter(note => note.category === selectedCategory);

  // 统计信息
  const totalLikes = xiaohongshuNotes.notes.reduce((sum, note) => sum + (note.likes || 0), 0);
  const totalCollects = xiaohongshuNotes.notes.reduce((sum, note) => sum + (note.collects || 0), 0);

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
            <span className="text-foreground">小红书精选</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 flex items-center gap-3 flex-wrap">
                小红书精选
                <span className="text-sm md:text-base text-foreground-muted font-normal">
                  （可能需要关闭VPN访问哦）
                </span>
              </h1>
              <p className="text-lg text-foreground-muted max-w-2xl">
                分享AI教育实战方法、零代码工具应用、女性破局经验
              </p>
            </div>
            <a
              href="https://www.xiaohongshu.com/user/profile/498481010"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors shadow-lg hover:shadow-xl"
            >
              <span>❤️</span>
              <span>关注我</span>
              <span className="text-xs opacity-80">(13.6万赞藏)</span>
            </a>
          </div>

          {/* 统计信息 */}
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📝</span>
              <span className="text-foreground-muted">精选笔记</span>
              <span className="font-semibold text-primary">{xiaohongshuNotes.notes.length}篇</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">❤️</span>
              <span className="text-foreground-muted">总点赞</span>
              <span className="font-semibold text-red-500">{(totalLikes / 10000).toFixed(1)}万</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">⭐</span>
              <span className="text-foreground-muted">总收藏</span>
              <span className="font-semibold text-amber-500">{(totalCollects / 10000).toFixed(1)}万</span>
            </div>
          </div>
        </div>
      </section>

      {/* 分类筛选 */}
      <section className="py-8 px-4 border-b border-border sticky top-0 bg-white/95 backdrop-blur-sm z-10 shadow-sm">
        <div className="container-content">
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => {
              const count = xiaohongshuNotes.notes.filter(n => n.category === category).length;
              const isSelected = selectedCategory === category;

              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`
                    relative px-6 py-3 rounded-2xl font-semibold text-sm
                    transition-all duration-300 ease-out
                    transform hover:scale-105 active:scale-95
                    ${isSelected
                      ? 'bg-gradient-to-r from-primary via-primary to-primary-light text-white shadow-lg shadow-primary/30'
                      : 'bg-gradient-to-br from-white to-gray-50 text-foreground border-2 border-gray-200 hover:border-primary/40 hover:shadow-md'
                    }
                    before:content-[''] before:absolute before:inset-0 before:rounded-2xl
                    before:transition-opacity before:duration-300
                    ${isSelected ? 'before:opacity-100' : 'before:opacity-0'}
                    ${isSelected
                      ? 'before:bg-gradient-to-r before:from-white/20 before:to-transparent'
                      : 'hover:before:bg-gradient-to-r hover:before:from-primary/5 hover:before:to-transparent'
                    }
                  `}
                  style={{
                    animation: isSelected ? 'pulse-glow 2s ease-in-out infinite' : 'none'
                  }}
                >
                  <span className="relative flex items-center gap-2">
                    <span className={`text-lg transition-transform duration-300 ${isSelected ? 'scale-110' : ''}`}>
                      {categoryEmoji[category]}
                    </span>
                    <span>{category}</span>
                    {category !== '全部' && (
                      <span className={`
                        ml-2 px-2 py-0.5 rounded-full text-xs font-bold
                        transition-all duration-300
                        ${isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-primary/10 text-primary'
                        }
                      `}>
                        {count}
                      </span>
                    )}
                    {isSelected && (
                      <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white/40 rounded-full" />
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          {/* 添加动画样式 */}
          <style jsx>{`
            @keyframes pulse-glow {
              0%, 100% {
                box-shadow: 0 10px 25px -5px rgba(37, 99, 235, 0.3);
              }
              50% {
                box-shadow: 0 15px 35px -5px rgba(37, 99, 235, 0.5);
              }
            }
          `}</style>
        </div>
      </section>

      {/* 笔记列表 */}
      <section className="py-12 px-4">
        <div className="container-content">
          {/* 当前分类统计 */}
          <div className="mb-6 text-sm text-foreground-muted">
            显示 <span className="font-semibold text-primary">{filteredNotes.length}</span> 篇笔记
            {selectedCategory !== '全部' && <span> · {selectedCategory}</span>}
          </div>

          {/* 笔记网格 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                title={note.title}
                description={note.description}
                category={note.category}
                link={note.link}
                cover={note.cover}
                likes={note.likes}
                collects={note.collects}
                views={note.views}
                date={note.date}
              />
            ))}
          </div>

          {/* 加载更多 */}
          <div className="text-center mt-12">
            <a
              href="https://www.xiaohongshu.com/user/profile/498481010"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors shadow-lg hover:shadow-xl"
            >
              <span>📱</span>
              <span>在小红书查看更多笔记</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* CTA区域 */}
      <section className="py-16 px-4">
        <div className="container-content">
          <div className="bg-gradient-to-r from-primary to-primary-light rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              想获取更多AI教育干货？
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              关注我的小红书，第一时间获取最新AI教育方法、工具推荐、实战案例
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="https://www.xiaohongshu.com/user/profile/498481010"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-background transition-colors"
              >
                <span>❤️</span>
                <span>关注小红书</span>
              </a>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white/10 text-white border-2 border-white/30 rounded-lg font-medium hover:bg-white/20 transition-colors"
              >
                <span>🏠</span>
                <span>返回首页</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <Footer />
    </div>
  );
}
