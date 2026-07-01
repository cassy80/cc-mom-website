import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CC妈育见AI - 用20年商业逻辑，培养AI时代的首席指挥官",
  description: "CC妈育见AI，生成式AI工程师、Gemini全球认证教育专家、20年+商业管理经验、15岁与8岁双宝妈。专注AI教育实战、提示词工程、零代码工具应用，分享如何培养孩子的AI提问力和逻辑思维。提供AI教学工具实战、ChatGPT应用指南和个性化教育方案。",
  keywords: ["AI教育", "AI提问力培养", "ChatGPT教育应用", "AI教学工具", "提示词工程", "Gemini教育", "Claude AI教育", "零代码工具", "家庭教育AI化", "CC妈育见AI", "AI指挥官培养"],
  authors: [{ name: "CC妈育见AI" }],
  creator: "CC妈育见AI",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://ccma-ai.com",
    title: "CC妈育见AI - 用20年商业逻辑，培养AI时代的首席指挥官",
    description: "生成式AI工程师、Gemini全球认证教育专家、20年+商业管理经验。专注AI教育实战、提示词工程、零代码工具应用。",
    siteName: "CC妈育见AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "CC妈育见AI - 用20年商业逻辑，培养AI时代的首席指挥官",
    description: "生成式AI工程师、Gemini全球认证教育专家、20年+商业管理经验、15岁与8岁双宝妈。",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // 这里后续可以添加搜索引擎验证代码
    google: "",
    yandex: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        {/* Google Fonts - Linear风格 (Inter) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+SC:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        {/* 结构化数据 - Person (CC妈) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "CC妈",
              alternateName: "CC妈育见AI",
              jobTitle: "生成式AI工程师、AI教育实战专家",
              description: "用20年商业逻辑，重塑孩子的AI提问力。澳洲信息系统硕士、Gemini全球认证教育专家、15岁与8岁双宝妈。专注AI教育实战、零代码工具应用、女性破局经验分享。",
              url: "https://ccma-ai.com",
              sameAs: [
                "https://www.xiaohongshu.com/user/profile/498481010"
              ],
              knowsAbout: [
                "AI教育实战",
                "生成式AI",
                "ChatGPT教学应用",
                "Gemini AI教育",
                "Claude AI教育",
                "AI提问力培养",
                "零代码工具应用",
                "教育AI化",
                "个性化学习方案",
                "女性职业破局",
                "AI工具测评",
                "家庭教育AI化"
              ],
              alumniOf: {
                "@type": "EducationalOrganization",
                name: "澳大利亚大学",
                description: "信息系统专业硕士"
              },
              credential: [
                {
                  "@type": "EducationalOccupationalCredential",
                  credentialCategory: "Professional Certification",
                  name: "Gemini全球认证教育专家"
                },
                {
                  "@type": "EducationalOccupationalCredential",
                  credentialCategory: "Academic Degree",
                  name: "信息系统硕士"
                }
              ],
              worksFor: {
                "@type": "Organization",
                name: "CC妈育见AI",
                url: "https://ccma-ai.com"
              }
            })
          }}
        />

        {/* 结构化数据 - WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "CC妈育见AI",
              alternateName: "CC妈AI教育",
              url: "https://ccma-ai.com",
              description: "用20年商业逻辑，重塑孩子的AI提问力。专注AI教育实战、零代码工具应用、女性破局经验分享。",
              inLanguage: "zh-CN",
              about: {
                "@type": "Thing",
                name: "AI教育",
                description: "将人工智能技术应用于教育领域，提升教学效果和学习体验"
              },
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://ccma-ai.com/search?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              },
              publisher: {
                "@type": "Person",
                name: "CC妈",
                url: "https://ccma-ai.com"
              }
            })
          }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
