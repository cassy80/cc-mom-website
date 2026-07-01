import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Link from 'next/link';

const faqs = [
  {
    category: "关于CC妈",
    questions: [
      {
        q: "CC妈是谁？",
        a: "CC妈是生成式AI工程师、Gemini全球认证教育专家，拥有澳洲信息系统硕士学位。专注AI教育实战、零代码工具应用、女性破局经验分享。用20年商业逻辑，重塑孩子的AI提问力。在小红书拥有13.6万赞藏，是AI教育领域的实践者和推广者。"
      },
      {
        q: "CC妈的背景和资质？",
        a: "• 澳洲信息系统硕士\n• Gemini全球认证教育专家\n• 15年+商业经验\n• 15岁与8岁双宝妈\n• 生成式AI工程师\n• 小红书13.6万赞藏创作者"
      }
    ]
  },
  {
    category: "AI教育基础",
    questions: [
      {
        q: "什么是AI教育？",
        a: "AI教育是将人工智能技术应用于教育领域，包括：\n\n1️⃣ **工具应用**：使用ChatGPT、Claude、Gemini等AI工具辅助教学\n\n2️⃣ **能力培养**：培养学生的AI素养和提问能力\n\n3️⃣ **个性化学习**：利用AI实现因材施教\n\n4️⃣ **场景改造**：教育流程的智能化升级\n\n💡 AI不是替代教师，而是增强教学效果和学生学习体验的强大工具。"
      },
      {
        q: "为什么现在要重视AI教育？",
        a: "🚀 **时代必然**：AI已成为各行各业的基础能力\n\n💼 **职业需求**：未来工作需要AI协作能力\n\n📚 **学习革命**：AI改变知识获取和学习方式\n\n🎯 **竞争优势**：早期掌握AI能力的孩子更具竞争力\n\n⏰ **关键窗口**：现在是布局AI教育的最佳时机"
      }
    ]
  },
  {
    category: "入门指南",
    questions: [
      {
        q: "家长如何开始学习AI？",
        a: "🎯 **推荐学习路径**：\n\n**第1步**：体验AI对话工具\n• 从ChatGPT或Claude开始\n• 尝试日常对话和问题\n• 熟悉基本操作\n\n**第2步**：学习提示词工程\n• 学习如何清晰表达需求\n• 掌握有效的提问技巧\n• 理解上下文的重要性\n\n**第3步**：探索教育应用\n• 关注AI教育案例\n• 尝试辅助教学场景\n• 加入AI教育社区\n\n**第4步**：深入实践\n• 参加课程或工作坊\n• 实际应用到教学场景\n• 持续学习和迭代\n\n💡 CC妈的小红书和网站提供大量实战案例和教程。"
      },
      {
        q: "孩子多大可以开始学习使用AI工具？",
        a: "📊 **分阶段建议**：\n\n**6-8岁**：家长辅助体验\n• 展示AI的基本功能\n• 在家长监督下尝试\n• 培养科技兴趣\n\n**9-12岁**：监督下使用\n• 学习基本操作\n• 培养安全意识\n• 家长全程陪同\n\n**13-15岁**：独立使用\n• 学习验证信息准确性\n• 培养批判性思维\n• 注意使用时间管理\n\n**16岁以上**：自主探索\n• 可以独立使用各种AI工具\n• 理解AI的局限和伦理\n• 负责任地使用AI\n\n⚠️ 重点是培养AI素养，包括提问能力、验证能力和伦理意识。"
      }
    ]
  },
  {
    category: "工具与应用",
    questions: [
      {
        q: "ChatGPT在教育中有哪些应用场景？",
        a: "🎓 **教学辅助**：\n• 备课和教案设计\n• 生成练习题和测试\n• 个性化辅导答疑\n\n✍️ **学习支持**：\n• 作文批改和反馈\n• 语言学习和翻译\n• 创意写作启发\n\n🎯 **项目管理**：\n• 项目式学习支持\n• 研究课题指导\n• 学习计划制定\n\n👨‍👩‍👧‍👦 **家庭教育**：\n• 家长教育指导\n• 亲子活动设计\n• 学习问题诊断\n\n⚠️ 注意：需要验证AI输出的准确性，并保持适当的辅助使用。"
      },
      {
        q: "有哪些适合教育场景的AI工具？",
        a: "💬 **对话类**：\n• ChatGPT、Claude、Gemini（通用对话）\n• 文心一言、通义千问（中文优化）\n\n🎨 **图像生成**：\n• Midjourney、DALL-E、Stable Diffusion\n\n📊 **演示制作**：\n• Gamma、Beautiful.ai\n\n🧠 **思维导图**：\n• XMind+AI、MindMeister\n\n🌐 **翻译工具**：\n• DeepL、ChatGPT\n\n📝 **文档处理**：\n• Notion AI、Craft\n\n🎬 **视频制作**：\n• Runway、Pictory\n\n💡 更多详细测评和使用教程，请访问CC妈网站。"
      }
    ]
  },
  {
    category: "AI提问力",
    questions: [
      {
        q: "如何培养孩子的AI提问能力？",
        a: `🎯 **核心方法**：

**1️⃣ 从具体问题开始**
• 教孩子清晰表达需求
• 避免"帮我做XX"这样的模糊指令
• 示例："写一个关于秋天的小学生作文"vs"帮我写作文"

**2️⃣ 学习提示词技巧**
• **明确目标**：想要什么结果
• **提供背景**：为什么需要、给谁用
• **指定格式**：文章、列表、表格

**3️⃣ 多轮对话探索**
• 鼓励追问和深入
• "为什么这样？""能更详细吗？""还有其他方法吗？"

**4️⃣ 比较和优化**
• 尝试不同的提问方式
• 比较哪个效果更好
• 总结优秀提问的规律

**5️⃣ 批判性思维**
• 验证AI的回答
• 思考是否有更好的答案
• 结合自己的判断

💡 实践场景：作业辅导、创意写作、知识探索、问题解决等`
      },
      {
        q: "好的提示词应该包含哪些要素？",
        a: `📋 **优秀提示词的5个要素**：

**1️⃣ 角色定位**
"你是一位有10年经验的小学语文老师"

**2️⃣ 任务描述**
"帮我批改这篇三年级作文"

**3️⃣ 背景信息**
"学生正在学习描写秋天，这是她的第二篇作文"

**4️⃣ 具体要求**
"重点关注：比喻句的运用、段落结构、错别字"

**5️⃣ 输出格式**
"用表格列出：优点、改进建议、修改后的段落"

✨ **完整示例**：
"你是一位有10年经验的小学语文老师，帮我批改这篇三年级的秋天描写作文。这是学生的第二篇作文，她正在学习运用比喻句。请重点关注：比喻句的运用、段落结构、错别字。输出格式：用表格列出优点、改进建议、修改后的段落，最后给出鼓励性评语。"

💡 越具体，效果越好！`
      }
    ]
  },
  {
    category: "安全与伦理",
    questions: [
      {
        q: "使用AI教育工具有哪些注意事项？",
        a: "⚠️ **重要注意事项**：\n\n**🔒 数据隐私**\n• 不要输入敏感个人信息\n• 使用匿名化数据\n• 了解工具的隐私政策\n\n**✅ 内容验证**\n• AI可能产生错误信息\n• 必须验证重要内容\n• 培养批判性思维\n\n**⚖️ 适度依赖**\n• AI是辅助工具\n• 不能完全替代人的判断\n• 保持独立思考能力\n\n**📚 伦理教育**\n• 培养AI伦理意识\n• 理解AI的局限\n• 学会负责任地使用\n\n👶 **年龄适宜**\n• 根据年龄选择使用方式\n• 低龄儿童需要监督\n• 逐步增加自主权\n\n⏰ **平衡使用**\n• 避免过度依赖AI\n• 保持传统学习能力\n• 注意使用时间管理"
      },
      {
        q: "如何应对AI可能产生的错误信息？",
        a: `🛡️ **防御策略**：

**1️⃣ 验证重要信息**
• 使用多个来源交叉验证
• 查阅权威资料确认
• 特别是事实性信息

**2️⃣ 培养批判思维**
• 思考："这个答案合理吗？"
• 询问："你确定吗？为什么？"
• 比较：不同AI工具的回答

**3️⃣ 明确AI的局限**
• AI也会"幻觉"（编造信息）
• 知识截止日期的限制
• 可能存在偏见

**4️⃣ 建立验证习惯**
• 教孩子"相信但要验证"
• 事实核查是必备技能
• 使用可靠的信息源

**5️⃣ 逐步放手**
• 初期严格验证
• 逐渐培养判断力
• 最终形成独立验证能力`
      }
    ]
  },
  {
    category: "零代码工具",
    questions: [
      {
        q: "零代码工具是什么？如何帮助非技术人员？",
        a: "🎨 **零代码工具**是指不需要编程就能创建应用、网站或自动化流程的工具。\n\n🌟 **适合教育工作者的工具**：\n\n**网站搭建**：\n• Notion - 知识管理和协作\n• Framer/Webflow - 专业网站\n\n**自动化流程**：\n• Zapier/Make - 连接不同应用\n• IFTTT - 简单自动化\n\n**表单收集**：\n• Typeform - 美观的表单\n• 金数据/Wjx - 国内工具\n\n**设计工具**：\n• Canva - 平面设计\n• 稿定设计 - 中文模板\n\n**AI应用搭建**：\n• Dify - 构建AI应用\n• FastGPT - 知识库问答\n\n💡 这些工具让教育工作者和家长能够快速创建教学资源和管理工具，无需编程背景。"
      }
    ]
  },
  {
    category: "服务与联系",
    questions: [
      {
        q: "CC妈提供哪些服务和课程？",
        a: "📚 **CC妈的服务**：\n\n**🎓 教育培训**\n• AI教育实战课程\n• 亲子AI workshops\n• 提示词工程训练\n\n**👨‍💼 一对一咨询**\n• 家庭教育AI化方案\n• 个人学习路径规划\n• 技术实施指导\n\n**🏢 企业培训**\n• 教育机构AI转型\n• 企业AI素养提升\n• 定制化培训方案\n\n**✍️ 内容创作**\n• 个人IP打造咨询\n• 内容策略规划\n• 0到1搭建指南\n\n**🔧 工具服务**\n• AI工具测评和推荐\n• 零代码应用开发\n• 技术选型咨询\n\n**📖 免费资源**\n• 小红书：@CC妈育见AI\n• 网站：ccma-ai.com\n• 定期分享实战案例\n\n💬 具体服务内容和合作方式，请通过网站或小红书联系。"
      },
      {
        q: "如何联系CC妈？",
        a: "📱 **联系方式**：\n\n**🔴 小红书**\n• 用户名：@CC妈育见AI\n• ID：498481010\n• 13.6万赞藏\n• 私信回复率较高\n\n**🌐 网站**\n• 地址：https://ccma-ai.com\n• 包含完整文章和资源\n• 可通过表单联系\n\n**💬 咨询建议**：\n1. 先浏览网站和常见问题\n2. 查看小红书是否有类似内容\n3. 联系时说明具体需求\n4. 工作日回复较快\n\n⏰ 响应时间：通常1-3个工作日"
      }
    ]
  }
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* 页面标题 */}
      <section className="pt-32 pb-12 px-4 bg-gradient-to-r from-primary/5 to-primary-light/5">
        <div className="container-content">
          <nav className="flex items-center gap-2 text-sm text-foreground-muted mb-6">
            <Link href="/" className="hover:text-primary transition-colors">
              首页
            </Link>
            <span>/</span>
            <span className="text-foreground">常见问题</span>
          </nav>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            常见问题
          </h1>
          <p className="text-lg text-foreground-muted max-w-2xl">
            关于AI教育、ChatGPT应用、AI工具等的常见问题解答
            <br />
            找不到答案？<Link href="/" className="text-primary hover:underline">联系CC妈</Link>
          </p>
        </div>
      </section>

      {/* FAQ 内容 */}
      <section className="py-16 px-4">
        <div className="container-content max-w-4xl">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-16">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-primary rounded-full"></span>
                {category.category}
              </h2>

              <div className="space-y-6">
                {category.questions.map((faq, faqIndex) => (
                  <div
                    key={faqIndex}
                    className="bg-white border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <h3 className="text-lg font-semibold text-foreground mb-3 flex items-start gap-2">
                      <span className="text-primary mt-1">Q:</span>
                      <span>{faq.q}</span>
                    </h3>
                    <div className="text-foreground-muted leading-relaxed whitespace-pre-line">
                      <span className="font-medium text-foreground/70">A:</span> {faq.a}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/5 to-primary-light/5">
        <div className="container-content text-center max-w-2xl">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            还有其他问题？
          </h2>
          <p className="text-foreground-muted mb-8">
            欢迎在小红书或通过网站联系CC妈，获取更多AI教育实战经验分享
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
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors shadow-lg hover:shadow-xl"
            >
              <span>📧</span>
              <span>联系CC妈</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
