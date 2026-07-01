import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Link from 'next/link';

export const metadata = {
  title: '联系我 - CC妈AI教育',
  description: '有任何问题或合作意向？欢迎通过小红书、邮件等方式联系CC妈，一起探讨AI教育的无限可能。',
  keywords: ['联系CC妈', 'AI教育咨询', '合作联系', 'CC妈联系方式'],
};

export default function ContactPage() {
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
            <span className="text-foreground">联系我</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              联系我
            </h1>
            <p className="text-xl text-foreground-muted leading-relaxed">
              有任何问题或合作意向？欢迎通过以下方式联系CC妈，
              一起探讨AI教育的无限可能。
            </p>
          </div>
        </div>
      </section>

      {/* 联系方式 */}
      <section className="py-20 px-4">
        <div className="container-content">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* 小红书 */}
              <div className="bg-white rounded-xl p-8 border border-border hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                  <span className="text-3xl">📕</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  小红书
                </h3>
                <p className="text-foreground-muted mb-6 leading-relaxed">
                  关注我的小红书账号，获取最新的AI教育干货、工具推荐和实战案例
                </p>
                <a
                  href="https://www.xiaohongshu.com/user/profile/498481010"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors"
                >
                  <span>❤️</span>
                  <span>关注CC妈</span>
                </a>
              </div>

              {/* 邮箱 */}
              <div className="bg-white rounded-xl p-8 border border-border hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <span className="text-3xl">📧</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  电子邮件
                </h3>
                <p className="text-foreground-muted mb-6 leading-relaxed">
                  有合作意向或详细咨询？欢迎发送邮件，我会尽快回复
                </p>
                <a
                  href="mailto:contact@ccma-ai.com"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors"
                >
                  <span>✉️</span>
                  <span>发送邮件</span>
                </a>
              </div>
            </div>

            {/* 常见咨询类型 */}
            <div className="bg-white rounded-xl p-8 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                💡 合作与咨询领域 | Expertise & Collaboration
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      AI 场景化提效实战课
                    </h4>
                    <p className="text-sm text-foreground-muted leading-relaxed">
                      教家长和孩子驾驭主流 AI 工具，手搓益智游戏与学习神器。拒绝空谈逻辑，我们直接在"边做边玩"中实现真正的生产力飞跃。
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      1对1 学科提效深度诊断
                    </h4>
                    <p className="text-sm text-foreground-muted leading-relaxed">
                      针对英语、理科等具体科目痛点，为孩子定制"AI 协作方案"。把 AI 变成私教，实现从"机械刷题"到"逻辑拆解"的降维打击。
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      AI 软硬件测评与品牌联动
                    </h4>
                    <p className="text-sm text-foreground-muted leading-relaxed">
                      站在工程师视角，深度测评真正能解决教育/办公痛点的 AI 工具。欢迎注重实战价值、拒绝"智商税"的品牌商业共创。
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      职场女性 AI 转型与个人品牌
                    </h4>
                    <p className="text-sm text-foreground-muted leading-relaxed">
                      基于 20 年大厂商业逻辑，分享如何利用 AI 建立个人IP、优化工作流。助力同频女性在数字时代重塑职场竞争力。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 响应时间 */}
            <div className="mt-8 p-6 bg-primary/5 rounded-xl border border-primary/20">
              <div className="flex items-start gap-4">
                <div className="text-3xl">⏰</div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    响应时间（管理预期）
                  </h3>
                  <p className="text-foreground-muted text-sm leading-relaxed">
                    <strong className="text-foreground">咨询/商务：</strong>建议优先通过邮件发送详细需求。我通常会在 48 小时内亲自回复，并针对复杂需求提供初步思路。
                  </p>
                  <p className="text-foreground-muted text-sm leading-relaxed mt-2">
                    <strong className="text-foreground">日常互动：</strong>小红书由于粉丝互动较多，建议在我的笔记下评论，我会优先回复那些有深度的逻辑探讨。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/5 to-primary-light/5">
        <div className="container-content text-center max-w-2xl">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            还没看过我的文章？
          </h2>
          <p className="text-foreground-muted mb-8">
            从AI基础到实战应用，帮助家长和孩子掌握AI时代的核心竞争力
          </p>
          <Link
            href="/articles"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors shadow-lg hover:shadow-xl"
          >
            <span>📚</span>
            <span>浏览文章</span>
          </Link>
        </div>
      </section>

      {/* 页脚 */}
      <Footer />
    </div>
  );
}
