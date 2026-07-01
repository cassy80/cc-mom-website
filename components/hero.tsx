import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative pt-28 pb-20 px-4 overflow-hidden bg-background-alt">
      <div className="container-content relative">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* 左侧：文字内容 */}
          <div className="space-y-8 animate-fade-in">
            {/* 标签 - Apple风格 */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-border">
              <span className="w-2 h-2 rounded-full bg-brand-primary"></span>
              <span className="text-foreground text-sm font-semibold">
                AI+教育领域的先行者
              </span>
            </div>

            {/* 大标题 - Apple风格 */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight tracking-tight">
              用AI赋能<br />
              <span className="text-brand-primary">更好的教育</span>
            </h1>

            {/* 副标题 */}
            <p className="text-lg text-foreground-muted leading-relaxed max-w-xl">
              我是CC妈育见AI，AI教育博主，生成式AI工程师和Gemini教育认证专家。
              在这里分享AI+教育的实践与思考。
            </p>

            {/* CTA按钮 - Apple风格 */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/articles"
                className="px-8 py-4 bg-brand-primary !text-white rounded-2xl font-semibold hover:bg-brand-primary-dark transition-all duration-300 text-base btn-apple inline-flex items-center gap-2 shadow-lg"
              >
                阅读文章
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/about"
                className="px-8 py-4 bg-white text-foreground border border-border rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-300 text-base shadow-sm"
              >
                了解更多
              </Link>
            </div>

            {/* 信任指标 - Apple风格 */}
            <div className="grid grid-cols-4 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground mb-1">20+年</div>
                <div className="text-sm text-foreground-muted">商业实战经验</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground mb-1">30,000+</div>
                <div className="text-sm text-foreground-muted">活跃关注粉丝</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground mb-1">120+</div>
                <div className="text-sm text-foreground-muted">篇AI实战笔记</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground mb-1">双重</div>
                <div className="text-sm text-foreground-muted">AI专家认证</div>
              </div>
            </div>
          </div>

          {/* 右侧：图片/视觉内容 - Apple风格 */}
          <div className="flex justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative">
              {/* 主要图片容器 - Apple风格 */}
              <div className="relative bg-white rounded-3xl p-2 shadow-2xl">
                <div className="bg-gray-100 rounded-2xl aspect-square flex items-center justify-center overflow-hidden">
                  <Image
                    src="/images/cc-mom-hero-avatar.jpg"
                    alt="CC妈 - 小红书"
                    width={167}
                    height={167}
                    className="w-full h-full object-cover"
                    priority
                    quality={95}
                  />
                </div>
              </div>

              {/* 浮动认证徽章 - Apple风格 */}
              <div className="absolute -right-6 bottom-8 bg-white rounded-2xl shadow-xl p-2 border border-border animate-float-card">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-xl bg-brand-primary/10 flex items-center justify-center">
                    <svg className="w-3 h-3 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-foreground">
                      Gemini认证
                    </div>
                    <div className="text-[10px] text-foreground-muted">
                      教育专家
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
