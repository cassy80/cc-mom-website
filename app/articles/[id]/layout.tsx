import { Metadata } from "next";
import articlesData from '@/content/articles.json';

interface ArticleLayoutProps {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}

// 动态生成 metadata
export async function generateMetadata({ params }: ArticleLayoutProps): Promise<Metadata> {
  const { id } = await params;
  const article = articlesData.articles.find(a => a.id === id);

  if (!article) {
    return {
      title: "文章未找到",
    };
  }

  // 为不同文章设置优化的社交分享标题
  const shareTitles: Record<string, string> = {
    "multimodal-ai-deep-learning": "别再只跟 AI 聊天了：多模态 AI 才是攻克数理化的'视觉外挂'",
  };

  const shareTitle = shareTitles[id] || article.title;

  return {
    title: `${article.title} - CC妈育见AI`,
    description: article.excerpt,
    keywords: article.tags,
    openGraph: {
      title: shareTitle,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
      authors: ["CC妈"],
      url: `https://ccma-ai.com/articles/${article.id}`,
    },
  };
}

export default async function ArticleLayout({ params, children }: ArticleLayoutProps) {
  const { id } = await params;
  const article = articlesData.articles.find(a => a.id === id);

  if (!article) {
    return <>{children}</>;
  }

  return (
    <>
      {/* 结构化数据 - Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.excerpt,
            image: article.coverImage ? `https://ccma-ai.com${article.coverImage}` : `https://ccma-ai.com/images/og-image.jpg`,
            datePublished: article.date,
            dateModified: article.date,
            author: {
              "@type": "Person",
              name: "CC妈",
              url: "https://ccma-ai.com"
            },
            publisher: {
              "@type": "Person",
              name: "CC妈",
              url: "https://ccma-ai.com"
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://ccma-ai.com/articles/${article.id}`
            },
            keywords: article.tags.join(", "),
            articleSection: article.category,
            wordCount: article.readTime === "8分钟" ? 2000 : article.readTime === "6分钟" ? 1500 : 1800,
            about: {
              "@type": "Thing",
              name: article.category,
              description: article.excerpt
            }
          })
        }}
      />
      {children}
    </>
  );
}
