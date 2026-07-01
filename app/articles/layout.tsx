import { Metadata } from "next";

export const metadata: Metadata = {
  title: "原创文章 - CC妈育见AI",
  description: "CC妈原创AI教育文章，涵盖AI教育实战、ChatGPT应用、AI工具测评、零代码工具、女性成长等。8篇精选文章，累计2万+阅读。",
  keywords: [
    "AI教育文章",
    "ChatGPT教程",
    "AI工具测评",
    "提示词工程",
    "AI提问力",
    "零代码工具",
    "女性职业成长",
    "家庭教育AI化"
  ],
  openGraph: {
    title: "原创文章 - CC妈育见AI",
    description: "深度AI教育文章，实战经验分享，帮助家长和孩子掌握AI时代的核心竞争力",
    url: "https://ccma-ai.com/articles",
    type: "website",
  },
};

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* 结构化数据 - CollectionPage (文章集合) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "CC妈原创文章",
            description: "关于AI教育、ChatGPT应用、AI工具、女性成长的深度文章",
            url: "https://ccma-ai.com/articles",
            about: {
              "@type": "Thing",
              name: "AI教育内容",
              description: "AI教育实践、工具应用、经验分享"
            },
            author: {
              "@type": "Person",
              name: "CC妈",
              url: "https://ccma-ai.com",
              sameAs: ["https://www.xiaohongshu.com/user/profile/498481010"]
            },
            publisher: {
              "@type": "Person",
              name: "CC妈",
              url: "https://ccma-ai.com"
            },
            numberOfItems: 8
          })
        }}
      />
      {children}
    </>
  );
}
