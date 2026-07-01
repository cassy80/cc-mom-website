import Link from 'next/link';
import AISearchCounter from './ai-search-counter';

export default function Footer() {
  return (
    <footer className="bg-background-alt border-t border-border mt-24">
      <div className="container-content py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* 品牌信息 - 优化设计 */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center shadow-lg">
                  <span className="text-white font-serif font-bold text-lg">CC</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-brand-accent rounded-full border-2 border-background-alt"></div>
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-xl text-foreground">
                  CC妈AI教育
                </span>
                <span className="text-xs text-foreground-muted font-medium tracking-wide">
                  AI EDUCATOR
                </span>
              </div>
            </div>
            <p className="text-foreground-muted text-sm leading-relaxed mb-6">
              用AI赋能更好的教育，专注AI+教育领域的实践与分享。
            </p>
            {/* 社交媒体链接 */}
            <div className="flex gap-3">
              <a
                href="https://www.xiaohongshu.com/user/profile/498481010"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </a>
              <a
                href="mailto:contact@ccma-ai.com"
                className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* 快速链接 - 优化设计 */}
          <div>
            <h3 className="font-serif font-bold text-foreground mb-6 text-lg">快速链接</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-foreground-muted hover:text-brand-primary transition-colors text-sm flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/30 group-hover:bg-brand-primary transition-colors"></span>
                  关于我
                </Link>
              </li>
              <li>
                <Link
                  href="/xiaohongshu"
                  className="text-foreground-muted hover:text-brand-primary transition-colors text-sm flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/30 group-hover:bg-brand-primary transition-colors"></span>
                  小红书精选
                </Link>
              </li>
              <li>
                <Link
                  href="/articles"
                  className="text-foreground-muted hover:text-brand-primary transition-colors text-sm flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/30 group-hover:bg-brand-primary transition-colors"></span>
                  原创文章
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-foreground-muted hover:text-brand-primary transition-colors text-sm flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/30 group-hover:bg-brand-primary transition-colors"></span>
                  资源推荐
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-foreground-muted hover:text-brand-primary transition-colors text-sm flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/30 group-hover:bg-brand-primary transition-colors"></span>
                  联系我
                </Link>
              </li>
            </ul>
          </div>

          {/* 分类 - 优化设计 */}
          <div>
            <h3 className="font-serif font-bold text-foreground mb-6 text-lg">内容分类</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/articles?category=ai-teaching"
                  className="text-foreground-muted hover:text-brand-primary transition-colors text-sm flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary/30 group-hover:bg-brand-secondary transition-colors"></span>
                  AI教学
                </Link>
              </li>
              <li>
                <Link
                  href="/articles?category=chatgpt"
                  className="text-foreground-muted hover:text-brand-primary transition-colors text-sm flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary/30 group-hover:bg-brand-secondary transition-colors"></span>
                  ChatGPT应用
                </Link>
              </li>
              <li>
                <Link
                  href="/articles?category=tools"
                  className="text-foreground-muted hover:text-brand-primary transition-colors text-sm flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary/30 group-hover:bg-brand-secondary transition-colors"></span>
                  工具测评
                </Link>
              </li>
              <li>
                <Link
                  href="/articles?category=cases"
                  className="text-foreground-muted hover:text-brand-primary transition-colors text-sm flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary/30 group-hover:bg-brand-secondary transition-colors"></span>
                  实践案例
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-foreground-muted hover:text-brand-primary transition-colors text-sm flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary/30 group-hover:bg-brand-secondary transition-colors"></span>
                  常见问题
                </Link>
              </li>
            </ul>
          </div>

          {/* 联系方式 - 优化设计 */}
          <div>
            <h3 className="font-serif font-bold text-foreground mb-6 text-lg">联系方式</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://www.xiaohongshu.com/user/profile/498481010"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground-muted hover:text-brand-primary transition-colors text-sm flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">小红书</div>
                    <div className="text-xs text-foreground-muted">@CC妈育见AI</div>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@ccma-ai.com"
                  className="text-foreground-muted hover:text-brand-primary transition-colors text-sm flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Email</div>
                    <div className="text-xs text-foreground-muted">contact@ccma-ai.com</div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 版权信息 - 优化设计 */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-foreground-muted text-sm">
              © 2026 CC妈AI教育. 保留所有权利.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a
                href="/privacy"
                className="text-foreground-muted hover:text-brand-primary transition-colors"
              >
                隐私政策
              </a>
              <a
                href="/terms"
                className="text-foreground-muted hover:text-brand-primary transition-colors"
              >
                使用条款
              </a>
              <span className="text-foreground-muted">
                Powered by{' '}
                <a
                  href="https://nextjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-primary hover:text-brand-primary-dark transition-colors font-semibold"
                >
                  Next.js
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* AI搜索计数器 - 隐秘位置 */}
      <AISearchCounter />
    </footer>
  );
}
