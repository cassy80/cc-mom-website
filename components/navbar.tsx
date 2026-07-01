import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-b border-border z-50 glass-effect">
      <div className="container-content">
        <div className="flex items-center justify-between h-14">
          {/* Logo - Apple风格 */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-primary to-brand-primary-light flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
              <span className="text-white font-bold text-sm">CC</span>
            </div>
            <span className="font-semibold text-base text-foreground group-hover:text-brand-primary transition-colors duration-300">
              CC妈AI教育
            </span>
          </Link>

          {/* 导航链接 - Apple风格 */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/about"
              className="text-foreground hover:text-brand-primary transition-colors duration-300 font-medium text-sm"
            >
              关于我
            </Link>
            <Link
              href="/xiaohongshu"
              className="text-foreground hover:text-brand-primary transition-colors duration-300 font-medium text-sm"
            >
              小红书精选
            </Link>
            <Link
              href="/articles"
              className="text-foreground hover:text-brand-primary transition-colors duration-300 font-medium text-sm"
            >
              原创文章
            </Link>
            <Link
              href="/resources"
              className="text-foreground hover:text-brand-primary transition-colors duration-300 font-medium text-sm"
            >
              资源推荐
            </Link>
            <Link
              href="/contact"
              className="text-foreground hover:text-brand-primary transition-colors duration-300 font-medium text-sm"
            >
              联系我
            </Link>
          </div>

          {/* CTA按钮 - Apple风格 */}
          <Link
            href="/articles"
            className="hidden md:block px-5 py-2 bg-brand-primary !text-white rounded-lg font-medium hover:bg-brand-primary-dark transition-all duration-200 text-sm btn-apple"
          >
            开始阅读
          </Link>
        </div>
      </div>
    </nav>
  );
}
