import Link from 'next/link';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-32 pb-12 px-4">
        <div className="container-content text-center max-w-2xl">
          <h1 className="text-6xl font-bold text-primary mb-6">404</h1>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            文章未找到
          </h2>
          <p className="text-foreground-muted mb-8">
            抱歉，您访问的文章不存在或已被删除。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/articles"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors"
            >
              <span>📝</span>
              <span>浏览所有文章</span>
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white border border-border text-foreground font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span>🏠</span>
              <span>返回首页</span>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
