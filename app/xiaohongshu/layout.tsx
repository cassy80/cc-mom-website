import { Metadata } from "next";

export const metadata: Metadata = {
  title: "小红书精选 - CC妈育见AI",
  description: "CC妈小红书精选笔记，涵盖AI教育实战、ChatGPT教学应用、AI工具测评、零代码工具应用、女性破局经验分享。20篇精选内容，13.6万赞藏。",
  keywords: [
    "小红书",
    "AI教育实战",
    "ChatGPT教学",
    "AI工具测评",
    "零代码工具",
    "Gemini教育",
    "Claude AI",
    "教育AI化",
    "女性职业破局"
  ],
  openGraph: {
    title: "小红书精选 - CC妈育见AI",
    description: "20篇精选笔记，涵盖AI教育实战、AI工具测评、零代码应用等，累计13.6万赞藏",
    url: "https://ccma-ai.com/xiaohongshu",
    type: "website",
  },
};

export default function XiaohongshuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* 结构化数据 - CollectionPage (小红书精选集合) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "小红书精选",
            description: "CC妈小红书精选笔记，涵盖AI教育实战、ChatGPT教学应用、AI工具测评、零代码工具应用、女性破局经验分享",
            url: "https://ccma-ai.com/xiaohongshu",
            about: {
              "@type": "Thing",
              name: "AI教育内容",
              description: "关于人工智能在教育领域应用的实践经验和教程"
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
            numberOfItems: 20
          })
        }}
      />
      {children}
    </>
  );
}
