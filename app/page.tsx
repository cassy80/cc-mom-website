import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Hero from '@/components/hero';
import FeatureCard from '@/components/feature-card';
import ArticleCard from '@/components/article-card';
import ToolsGrid from '@/components/tools-grid';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* 导航栏 */}
      <Navbar />

      {/* Hero区域 */}
      <Hero />

      {/* 核心内容区块 */}
      <section className="py-24 px-4 bg-background-alt">
        <div className="container-content">
          {/* 标题 - 优化设计 */}
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              探索AI+教育的无限可能
            </h2>
            <p className="text-foreground-muted max-w-2xl mx-auto text-lg leading-relaxed">
              从理论到实践，从工具到方法，全方位助力教育创新
            </p>
          </div>

          {/* 核心内容卡片 - 使用新配色 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              title="关于我"
              description="了解CC妈的教育背景、专业认证和AI教育实践历程"
              icon="👩‍🏫"
              href="/about"
              stats={{
                label: "专业认证",
                value: "2个"
              }}
            />
            <FeatureCard
              title="小红书精选"
              description="精选高点赞笔记，涵盖AI教学工具、ChatGPT应用等"
              icon="📱"
              href="/xiaohongshu"
              stats={{
                label: "精选内容",
                value: "50+篇"
              }}
            />
            <FeatureCard
              title="原创文章"
              description="深度分析AI+教育趋势，分享实践经验和方法论"
              icon="✍️"
              href="/articles"
              stats={{
                label: "原创文章",
                value: "8篇"
              }}
            />
            <FeatureCard
              title="英语学习"
              description="AI错题分析、趣味单词游戏、科学复习系统"
              icon="📚"
              href="/english"
              stats={{
                label: "学习工具",
                value: "3个"
              }}
            />
          </div>
        </div>
      </section>

      {/* AI+教育优势 */}
      <section className="py-24 px-4 bg-background">
        <div className="container-content">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              AI 赋能教育的四大维度
            </h2>
            <p className="text-foreground-muted max-w-2xl mx-auto text-lg leading-relaxed">
              从理论到实践，从工具到方法，全方位助力教育创新
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* 维度1 */}
            <div className="bg-white border border-border rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-primary-light flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-3xl">⚡</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    效能跨越：从"体力消耗"到"逻辑管理"
                  </h3>
                  <div className="space-y-2 text-sm text-foreground-muted">
                    <p><strong className="text-foreground">现状：</strong>摆脱辅导作业时的"鸡飞狗跳"与机械重复。</p>
                    <p><strong className="text-foreground">AI价值：</strong>每天系统性节省 2-3 小时低效时间，让家长和孩子把精力从"刷题"转向"策略与复盘"。</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 维度2 */}
            <div className="bg-white border border-border rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-secondary to-brand-secondary-light flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-3xl">🎯</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    认知破局：每个孩子都有专属的"私教级"外挂
                  </h3>
                  <div className="space-y-2 text-sm text-foreground-muted">
                    <p><strong className="text-foreground">现状：</strong>拒绝"一刀切"的进度焦虑，打破普娃与牛娃的信息差。</p>
                    <p><strong className="text-foreground">AI价值：</strong>实时动态调整学习坡度。不再是冷冰冰的答案，而是 24 小时在线、能根据孩子理解力不断进化的"第二大脑"。</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 维度3 */}
            <div className="bg-white border border-border rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-accent to-brand-accent-hover flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-3xl">💡</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    角色重塑：从"被动接收者"变为"未来创造者"
                  </h3>
                  <div className="space-y-2 text-sm text-foreground-muted">
                    <p><strong className="text-foreground">现状：</strong>害怕孩子被 AI 取代？最好的办法是学会调度它。</p>
                    <p><strong className="text-foreground">AI价值：</strong>降低技术门槛，让 8 岁孩子也能"手搓"属于自己的程序。培养的是跨界整合力，而非单一的记忆技能。</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 维度4 */}
            <div className="bg-white border border-border rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-primary-dark to-brand-primary flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-3xl">🌍</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    资源平权：用"指挥官思维"抹平教育鸿沟
                  </h3>
                  <div className="space-y-2 text-sm text-foreground-muted">
                    <p><strong className="text-foreground">现状：</strong>顶级逻辑教育不再是少数人的特权。</p>
                    <p><strong className="text-foreground">AI价值：</strong>将 20 年大厂商业逻辑与全球最先进的教育模型缝合。只要会正确提问，任何孩子都能站在"巨人的肩膀"上思考。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 常用工具 */}
      <ToolsGrid />

      {/* 最新推荐 */}
      <section className="py-24 px-4 bg-background-alt">
        <div className="container-content">
          {/* 标题 - 优化设计 */}
          <div className="flex items-center justify-between mb-16">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-3">
                最新文章
              </h2>
              <p className="text-foreground-muted text-lg">
                持续输出AI+教育领域的深度内容
              </p>
            </div>
            <a
              href="/articles"
              className="hidden md:flex items-center gap-2 px-6 py-3 bg-brand-primary !text-white rounded-xl font-bold hover:bg-brand-primary-dark transition-all duration-300 group shadow-lg hover:shadow-xl"
            >
              查看全部
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>

          {/* 文章列表 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ArticleCard
              title="AI能帮老师做什么？5个实用场景分享"
              excerpt="AI可以帮助老师完成备课辅助、个性化辅导、作业批改、学情分析和智能答疑，每天能节省2-3小时。"
              date="2026-02-27"
              readTime="5分钟"
              category="AI教学"
              href="/articles/ai-teaching-benefits"
            />
            <ArticleCard
              title="如何用ChatGPT备课？完整指南"
              excerpt="详细介绍使用ChatGPT备课的完整流程，包括提示词模板、最佳实践和注意事项。"
              date="2026-02-25"
              readTime="8分钟"
              category="ChatGPT应用"
              href="/articles/chatgpt-lesson-planning"
            />
            <ArticleCard
              title="5个AI教学工具推荐"
              excerpt="精选5个最适合教育场景的AI工具，详细介绍功能、价格和使用方法。"
              date="2026-02-20"
              readTime="6分钟"
              category="工具测评"
              href="/articles/ai-teaching-tools"
            />
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <Footer />
    </div>
  );
}
