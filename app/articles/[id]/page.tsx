'use client';

import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import articlesData from '@/content/articles.json';
import { useEffect, useState } from 'react';

export default function ArticleDetailPage() {
  const params = useParams();
  const [articleContent, setArticleContent] = useState('');
  const [loading, setLoading] = useState(true);

  const article = articlesData.articles.find(a => a.id === params.id);

  useEffect(() => {
    async function loadArticle() {
      if (!article) {
        setLoading(false);
        return;
      }

      try {
        // 动态导入文章内容
        const response = await fetch(`/content/articles/${article.id}.md`);
        if (response.ok) {
          const text = await response.text();
          // 简单的 Markdown 转 HTML（实际项目应使用 marked 或 react-markdown）
          const html = markdownToHtml(text);
          setArticleContent(html);
        }
      } catch (error) {
        console.error('Failed to load article:', error);
      } finally {
        setLoading(false);
      }
    }

    loadArticle();
  }, [article]);

  if (!article) {
    notFound();
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-foreground-muted">加载中...</p>
          </div>
        </div>
      </div>
    );
  }

  // 简单的 Markdown 转 HTML 函数
  function markdownToHtml(markdown: string): string {
    return markdown
      // 标题
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-foreground mt-6 mb-3">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-foreground mt-8 mb-4 flex items-center gap-2"><span class="w-1 h-8 bg-primary rounded-full"></span>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-4xl font-bold text-foreground mb-4">$1</h1>')
      // 引用块
      .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-primary pl-4 py-2 my-3 bg-primary/5 rounded-r-lg text-foreground-muted">$1</blockquote>')
      // 粗体
      .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-semibold text-foreground">$1</strong>')
      // 代码块
      .replace(/```(\w+)?\n([\s\S]*?)```/gim, '<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg my-3 overflow-x-auto"><code>$2</code></pre>')
      // 行内代码
      .replace(/`([^`]+)`/gim, '<code class="bg-gray-100 text-primary px-2 py-1 rounded text-sm font-mono">$1</code>')
      // 图片（必须在链接之前处理，因为图片包含链接语法）
      .replace(/!\[([^\]]*)\]\(([^\)]+)\)/gim, '<img src="$2" alt="$1" class="w-1/4 rounded-lg my-6 shadow-lg mx-auto block" loading="lazy" />')
      // 表格处理（必须在链接之前处理）
      .replace(/^\|(.+)\|\n\|[-:\s|]+\|\n((?:\|.*\|\n?)+)/gim, (match: string, headers: string, rows: string) => {
        const headerCells = headers.split('|').filter((cell: string) => cell.trim() !== '').map((cell: string) => `<th class="px-4 py-2 text-left bg-primary/10 font-semibold text-foreground">${cell.trim()}</th>`).join('');
        const dataRows = rows.trim().split('\n').map((row: string) => {
          const cells = row.split('|').filter((cell: string) => cell.trim() !== '').map((cell: string) => `<td class="px-4 py-2 text-foreground-muted border-b border-border">${cell.trim()}</td>`).join('');
          return `<tr>${cells}</tr>`;
        }).join('');

        return `<table class="w-full my-6 border-collapse border border-border rounded-lg overflow-hidden">
          <thead><tr>${headerCells}</tr></thead>
          <tbody>${dataRows}</tbody>
        </table>`;
      })
      // 链接
      .replace(/\[([^\]]+)\]\(([^\)]+)\)/gim, '<a href="$2" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
      // 有序列表（必须在无序列表之前处理）
      .replace(/^\d+\. (.*$)/gim, '<li class="ml-6 mb-1 text-foreground-muted list-decimal">$1</li>')
      .replace(/(<li class="ml-6 mb-1 text-foreground-muted list-decimal">.*<\/li>\n?)+/gim, '<ol class="my-2 space-y-1 ml-6">$&</ol>')
      // 无序列表
      .replace(/^\- (.*$)/gim, '<li class="ml-6 mb-1 text-foreground-muted list-disc">$1</li>')
      .replace(/(<li class="ml-6 mb-1 text-foreground-muted list-disc">.*<\/li>\n?)+/gim, '<ul class="my-2 space-y-1 ml-6">$&</ul>')
      // 分割线
      .replace(/^---$/gim, '<hr class="my-4 border-border border-t-2">')
      // 段落
      .replace(/\n\n/g, '</p><p class="my-2 text-foreground-muted leading-tight">')
      // 换行
      .replace(/\n/g, '<br />');
  }

  // 获取相关文章（同分类的其他文章）
  const relatedArticles = articlesData.articles
    .filter(a => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* 文章头部 */}
      <article className="pt-32 pb-12 px-4">
        <div className="container-content max-w-4xl">
          {/* 面包屑 */}
          <nav className="flex items-center gap-2 text-sm text-foreground-muted mb-6">
            <Link href="/" className="hover:text-primary transition-colors">
              首页
            </Link>
            <span>/</span>
            <Link href="/articles" className="hover:text-primary transition-colors">
              文章
            </Link>
            <span>/</span>
            <span className="text-foreground">{article.title}</span>
          </nav>

          {/* 标题区域 */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                {article.category}
              </span>
              {article.featured && (
                <span className="px-3 py-1 bg-amber-500 text-white text-sm font-medium rounded-full">
                  ⭐ 精选
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {article.title}
            </h1>

            <p className="text-xl text-foreground-muted mb-6 leading-relaxed">
              {article.excerpt}
            </p>

            {/* 元信息 */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-foreground-muted py-6 border-y border-border">
              <div className="flex items-center gap-2">
                <span className="text-lg">📅</span>
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">⏱️</span>
                <span>{article.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">👁️</span>
                <span>{(article.views / 1000).toFixed(1)}k 阅读</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">👍</span>
                <span>{article.likes} 点赞</span>
              </div>
            </div>

            {/* 标签 */}
            <div className="flex flex-wrap gap-2 mt-6">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm text-foreground-muted bg-background-alt px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </header>

          {/* 文章内容 */}
          <div className="prose prose-lg max-w-none">
            <div
              className="text-foreground-muted leading-tight space-y-0"
              dangerouslySetInnerHTML={{ __html: articleContent }}
            />
          </div>

          {/* 文章底部 */}
          <footer className="mt-16 pt-8 border-t border-border">
            <div className="bg-gradient-to-r from-primary/5 to-primary-light/5 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-3">
                觉得这篇文章有用？
              </h3>
              <p className="text-foreground-muted mb-6">
                关注小红书或分享给更多需要的人，让更多家长和孩子受益
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
                  href="/articles"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary font-medium rounded-lg hover:bg-primary-dark transition-colors shadow-lg hover:shadow-xl"
                >
                  <span>📝</span>
                  <span className="text-white">更多文章</span>
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </article>

      {/* 专题文章推荐 */}
      {article.series && (
        <section className="py-12 px-4 bg-gradient-to-b from-primary/5 to-background">
          <div className="container-content max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-2xl">📚</span>
              <h2 className="text-2xl font-bold text-foreground">
                {article.series}系列
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {articlesData.articles
                .filter(a => a.series === article.series && a.id !== article.id)
                .slice(0, 3)
                .map((seriesArticle) => (
                  <Link
                    key={seriesArticle.id}
                    href={`/articles/${seriesArticle.id}`}
                    className="bg-white border border-border rounded-xl p-6 hover:shadow-xl transition-all duration-300 group"
                  >
                    {seriesArticle.featured && (
                      <span className="inline-block px-3 py-1 bg-amber-500 text-white text-xs font-medium rounded-full mb-3">
                        ⭐ 精选
                      </span>
                    )}
                    <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {seriesArticle.title}
                    </h3>
                    <p className="text-sm text-foreground-muted line-clamp-3 mb-4">
                      {seriesArticle.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-foreground-muted pt-4 border-t border-border">
                      <span>{seriesArticle.readTime}</span>
                      <span>{(seriesArticle.views / 1000).toFixed(1)}k 阅读</span>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* 相关文章 */}
      {relatedArticles.length > 0 && (
        <section className="py-12 px-4 bg-background-alt">
          <div className="container-content max-w-4xl">
            <h2 className="text-2xl font-bold text-foreground mb-8">
              相关文章推荐
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <Link
                  key={related.id}
                  href={`/articles/${related.id}`}
                  className="bg-white border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-3">
                      {related.category}
                    </span>
                    <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {related.title}
                    </h3>
                    <p className="text-sm text-foreground-muted line-clamp-3 mb-4">
                      {related.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-foreground-muted pt-4 border-t border-border">
                      <span>{related.readTime}</span>
                      <span>{(related.views / 1000).toFixed(1)}k 阅读</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
