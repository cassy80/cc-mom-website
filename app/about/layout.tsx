import { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于CC妈育见AI - 个人介绍与官方账号",
  description: "CC妈育见AI的个人官网，分享AI学习工具实测、亲子AI实践，以及英语、数学等学科的互动学习资源。了解CC妈、阅读实战文章，查找官方小红书账号。",
  keywords: [
    "CC妈",
    "AI教育专家",
    "生成式AI工程师",
    "Gemini认证",
    "AI教育实战",
    "AI提问力",
    "零代码工具",
    "女性职业破局"
  ],
  openGraph: {
    title: "关于CC妈育见AI - 个人介绍与官方账号",
    description: "CC妈育见AI的个人官网，分享AI学习工具实测、亲子AI实践，以及英语、数学等学科的互动学习资源。了解CC妈、阅读实战文章，查找官方小红书账号。",
    url: "https://ccma-ai.com/about",
    type: "profile",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* 结构化数据 - Person (更详细的个人信息) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "CC妈",
            alternateName: "CC妈育见AI",
            description: "用20年商业逻辑，重塑孩子的AI提问力。生成式AI工程师、Gemini全球认证教育专家。",
            image: "https://ccma-ai.com/images/avatar.jpg",
            url: "https://ccma-ai.com/about",
            jobTitle: "生成式AI工程师、AI教育实战专家",
            worksFor: {
              "@type": "Organization",
              name: "CC妈育见AI",
              url: "https://ccma-ai.com"
            },
            sameAs: [
              "https://www.xiaohongshu.com/user/profile/5ac5cc5411be107deceab7f9"
            ],
            knowsAbout: [
              "AI教育实战",
              "生成式AI",
              "ChatGPT教学应用",
              "Claude AI教育",
              "Gemini AI教育",
              "AI提问力培养",
              "提示词工程",
              "零代码工具应用",
              "教育AI化",
              "个性化学习方案",
              "女性职业破局",
              "AI工具测评",
              "家庭教育AI化",
              "商业逻辑应用",
              "项目式学习",
              "批判性思维培养"
            ],
            alumniOf: {
              "@type": "EducationalOrganization",
              name: "澳大利亚大学",
              description: "信息系统专业硕士"
            },
            credential: [
              {
                "@type": "EducationalOccupationalCredential",
                name: "Gemini全球认证教育专家",
                credentialCategory: "Professional Certification"
              },
              {
                "@type": "EducationalOccupationalCredential",
                name: "生成式AI工程师",
                credentialCategory: "Professional Certification"
              },
              {
                "@type": "EducationalOccupationalCredential",
                name: "信息系统硕士",
                credentialCategory: "Academic Degree"
              }
            ],
            award: [
              {
                "@type": "Award",
                name: "小红书13.6万赞藏创作者",
                description: "AI教育内容在小红书获得13.6万点赞收藏"
              }
            ]
          })
        }}
      />
      {children}
    </>
  );
}
