import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import ToolsGrid from '@/components/tools-grid';
import Link from 'next/link';

export const metadata = {
  title: '资源推荐 - AI教育工具精选 - CC妈AI教育',
  description: '精选AI教育工具推荐，从入门到进阶，涵盖ChatGPT、Gemini、豆包等主流AI工具，帮助你快速上手AI+教育。',
  keywords: ['AI工具推荐', 'AI教育工具', 'ChatGPT', 'Gemini', '豆包', 'AI工具评测'],
};

export default function ResourcesPage() {
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
            <span className="text-foreground">资源推荐</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              AI 教育工具推荐
            </h1>
            <p className="text-xl text-foreground-muted leading-relaxed">
              精选国内外优质 AI 工具，从入门到进阶，满足不同场景需求。
              所有工具均经过 CC 妈实测，帮助你快速上手 AI+教育。
            </p>
          </div>

          {/* 统计信息 */}
          <div className="flex flex-wrap gap-8 text-sm mt-8">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔧</span>
              <span className="text-foreground-muted">工具总数</span>
              <span className="font-semibold text-primary">12款</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌱</span>
              <span className="text-foreground-muted">入门级</span>
              <span className="font-semibold text-green-500">6款</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🚀</span>
              <span className="text-foreground-muted">进阶级</span>
              <span className="font-semibold text-amber-500">6款</span>
            </div>
          </div>
        </div>
      </section>

      {/* 工具列表 */}
      <ToolsGrid />

      {/* 使用指南 */}
      <section className="py-20 px-4 bg-background-alt">
        <div className="container-content">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
            如何选择适合你的 AI 工具？
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* 入门级 */}
            <div className="bg-white rounded-xl p-8 border border-border">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                入门级工具
              </h3>
              <p className="text-foreground-muted mb-4 leading-relaxed">
                适合 AI 初学者，界面友好，上手简单
              </p>
              <ul className="space-y-2 text-sm text-foreground-muted">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>支持中文，语言无障碍</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>免费或价格亲民</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>响应速度快，稳定性好</span>
                </li>
              </ul>
            </div>

            {/* 进阶级 */}
            <div className="bg-white rounded-xl p-8 border border-border">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                进阶级工具
              </h3>
              <p className="text-foreground-muted mb-4 leading-relaxed">
                适合有一定基础的用户，功能强大
              </p>
              <ul className="space-y-2 text-sm text-foreground-muted">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  <span>专业级功能，效率提升</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  <span>高度可定制化</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  <span>适合深度学习和创作</span>
                </li>
              </ul>
            </div>

            {/* 选择建议 */}
            <div className="bg-white rounded-xl p-8 border border-border">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                选择建议
              </h3>
              <p className="text-foreground-muted mb-4 leading-relaxed">
                根据具体需求选择合适的工具
              </p>
              <ul className="space-y-2 text-sm text-foreground-muted">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>日常对话：豆包、Kimi</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>多模态推理：Gemini</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>编程开发：Claude Code</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>AI绘画：Midjourney</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 相关文章推荐 */}
      <section className="py-20 px-4">
        <div className="container-content">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
            相关文章推荐
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <a
              href="/articles/ai-questioning-power"
              className="bg-white rounded-xl p-6 border border-border hover:shadow-lg transition-shadow"
            >
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-3">
                AI教育实战
              </span>
              <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                AI时代，如何培养孩子的提问力？
              </h3>
              <p className="text-sm text-foreground-muted line-clamp-3">
                在AI时代，会提问比会回答更重要。这篇文章分享培养孩子AI提问力的5个实用方法。
              </p>
            </a>
            <a
              href="/articles/multimodal-ai-deep-learning"
              className="bg-white rounded-xl p-6 border border-border hover:shadow-lg transition-shadow"
            >
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-3">
                多模态AI
              </span>
              <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                别再只跟 AI 聊天了：多模态 AI 才是攻克数理化的"视觉外挂"
              </h3>
              <p className="text-sm text-foreground-muted line-clamp-3">
                基于Gemini 1.5/3 Pro的多模态推理能力，深度解析如何利用AI破解几何、物理等理科难题。
              </p>
            </a>
            <a
              href="/articles/working-mom-efficiency"
              className="bg-white rounded-xl p-6 border border-border hover:shadow-lg transition-shadow"
            >
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-3">
                女性成长
              </span>
              <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                职场妈妈提前2小时下班的秘诀
              </h3>
              <p className="text-sm text-foreground-muted line-clamp-3">
                基于AI工程师与前500强高管的双重视角，深度拆解一套职场提效组合拳。
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <Footer />
    </div>
  );
}
