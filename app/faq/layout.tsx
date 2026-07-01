import { Metadata } from "next";

export const metadata: Metadata = {
  title: "常见问题 - CC妈育见AI",
  description: "CC妈AI教育常见问题解答：AI教育是什么、如何开始学习AI、ChatGPT在教育中的应用、AI工具推荐、零代码工具应用等。",
  keywords: [
    "AI教育常见问题",
    "ChatGPT教育应用",
    "AI学习路径",
    "AI工具推荐",
    "零代码工具",
    "AI教育入门"
  ],
  openGraph: {
    title: "常见问题 - CC妈育见AI",
    description: "AI教育常见问题解答，帮助你快速了解AI教育、ChatGPT应用、AI工具等",
    url: "https://ccma-ai.com/faq",
    type: "website",
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* 结构化数据 - FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            name: "CC妈AI教育常见问题",
            description: "关于AI教育、ChatGPT应用、AI工具等的常见问题解答",
            url: "https://ccma-ai.com/faq",
            author: {
              "@type": "Person",
              name: "CC妈",
              url: "https://ccma-ai.com"
            },
            mainEntity: [
              {
                "@type": "Question",
                name: "CC妈是谁？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "CC妈是生成式AI工程师、Gemini全球认证教育专家，拥有澳洲信息系统硕士学位。专注AI教育实战、零代码工具应用、女性破局经验分享。用20年商业逻辑，重塑孩子的AI提问力。在小红书拥有13.6万赞藏。"
                }
              },
              {
                "@type": "Question",
                name: "什么是AI教育？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "AI教育是将人工智能技术应用于教育领域，包括：1) 使用AI工具（如ChatGPT、Claude、Gemini）辅助教学和学习；2) 培养学生的AI素养和提问能力；3) 利用AI实现个性化学习；4) 教育场景的智能化改造。AI不是替代教师，而是增强教学效果和学习体验。"
                }
              },
              {
                "@type": "Question",
                name: "家长如何开始学习AI？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "家长学习AI的建议路径：1) 从ChatGPT或Claude等AI对话工具开始，熟悉基本操作；2) 学习提示词工程（Prompt Engineering），掌握如何与AI有效沟通；3) 关注AI在教育领域的应用案例；4) 参加在线课程或工作坊；5) 加入AI教育社区，与同行交流。CC妈的小红书和网站提供了大量实践案例和教程。"
                }
              },
              {
                "@type": "Question",
                name: "ChatGPT在教育中有哪些应用场景？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "ChatGPT在教育中的应用非常广泛：1) 辅助备课和教案设计；2) 生成练习题和测试题；3) 个性化辅导答疑；4) 作文批改和反馈；5) 语言学习和翻译；6) 创意写作启发；7) 项目式学习支持；8) 家长教育指导。但需要注意AI输出的准确性验证和适当使用。"
                }
              },
              {
                "@type": "Question",
                name: "孩子多大可以开始学习使用AI工具？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "建议根据孩子年龄分阶段：1) 6-8岁：家长辅助使用，主要是展示和体验；2) 9-12岁：在家长监督下使用，学习基本操作和安全意识；3) 13-15岁：独立使用，但需要培养批判性思维和验证能力；4) 16岁以上：可以较独立地探索AI工具。重点是培养AI素养，包括提问能力、信息验证能力和伦理意识。"
                }
              },
              {
                "@type": "Question",
                name: "有哪些适合教育场景的AI工具？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "常用AI教育工具包括：对话类：ChatGPT、Claude、Gemini、文心一言；图像生成：Midjourney、DALL-E、Stable Diffusion；演示制作：Gamma、Beautiful.ai；思维导图：XMind+AI、MindMeister；翻译工具：DeepL、ChatGPT；文档处理：Notion AI、Craft；视频制作：Runway、Pictory。CC妈网站提供详细的工具测评和使用教程。"
                }
              },
              {
                "@type": "Question",
                name: "零代码工具是什么？如何帮助非技术人员？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "零代码工具是指不需要编程就能创建应用、网站或自动化流程的工具。适合非技术人员的工具包括：网站搭建：Notion、Framer、Webflow；自动化：Zapier、Make；表单收集：Typeform、金数据；设计工具：Canva、稿定设计；AI应用搭建：Dify、FastGPT。这些工具让教育工作者和家长能够快速创建教学资源和管理工具。"
                }
              },
              {
                "@type": "Question",
                name: "使用AI教育工具有哪些注意事项？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "使用AI教育工具需要注意：1) 数据隐私：不要输入敏感个人信息；2) 内容验证：AI可能产生错误信息，需要验证准确性；3) 适度依赖：AI是辅助工具，不能完全替代人的判断；4) 伦理教育：培养孩子的AI伦理意识；5) 年龄适宜：根据孩子年龄选择合适的使用方式；6) 平衡使用：避免过度依赖AI，保持传统学习能力。"
                }
              },
              {
                "@type": "Question",
                name: "如何培养孩子的AI提问能力？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "培养AI提问能力的方法：1) 从具体问题开始，教孩子清晰表达需求；2) 学习提示词技巧：明确目标、提供背景、指定格式；3) 鼓励多轮对话，通过追问深入探索；4) 比较不同提问方式的效果；5) 分析AI的回答，培养批判性思维；6) 在实际应用中练习，如作业辅导、创意写作等。CC妈提供专门的AI提问力训练课程和案例。"
                }
              },
              {
                "@type": "Question",
                name: "CC妈提供哪些服务和课程？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "CC妈提供的服务包括：1) AI教育实战课程和 workshops；2) 一对一咨询，针对家庭教育AI化；3) 企业培训，帮助教育机构实现AI转型；4) 内容创作咨询，从0到1搭建个人IP；5) AI工具测评和推荐；6) 免费内容分享在小红书和网站。具体可以关注小红书@CC妈育见AI或访问网站了解最新动态。"
                }
              }
            ]
          })
        }}
      />
      {children}
    </>
  );
}
