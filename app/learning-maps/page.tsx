import Link from 'next/link';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function LearningMapsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container-content px-4 pt-28 pb-20">
        <div className="max-w-3xl mb-12">
          <p className="text-sm font-semibold tracking-widest text-brand-primary mb-4">CC妈育见AI · 互动学习资源</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">学习地图</h1>
          <p className="text-lg leading-relaxed text-foreground-muted">
            把分散的知识连起来，看清孩子正在学习什么、哪些基础可以回头补。
            这里会逐步收录数学、语文和英语的互动地图，供家长陪孩子探索。
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Link href="/learning-maps/math/index.html" className="md:col-span-2 group rounded-2xl border border-brand-primary/20 bg-gradient-to-br from-[#111827] to-[#202a44] p-8 text-white shadow-lg transition-transform hover:-translate-y-1">
            <span className="inline-block rounded-full border border-white/25 px-3 py-1 text-xs font-semibold mb-8">已上线 · 持续完善</span>
            <div className="text-4xl mb-5" aria-hidden="true">🔵</div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">小学数学知识地图</h2>
            <p className="text-sm md:text-base leading-relaxed text-slate-200 max-w-xl mb-7">
              在一张互动地图里探索数与代数、图形与几何、统计与概率、综合与实践。
              现有 88 个可点开的学习步骤；部分主题仍在细化。
            </p>
            <span className="font-semibold group-hover:underline">进入数学地图 →</span>
          </Link>
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-border bg-white p-6 flex-1">
              <div className="text-2xl mb-3" aria-hidden="true">📖</div>
              <h2 className="text-xl font-bold text-foreground mb-2">语文地图</h2>
              <p className="text-sm text-foreground-muted">规划中，未来会逐步加入。</p>
            </div>
            <div className="rounded-2xl border border-border bg-white p-6 flex-1">
              <div className="text-2xl mb-3" aria-hidden="true">🔤</div>
              <h2 className="text-xl font-bold text-foreground mb-2">英语地图</h2>
              <p className="text-sm text-foreground-muted">规划中，未来会逐步加入。</p>
            </div>
          </div>
        </div>
        <p className="mt-8 text-sm leading-relaxed text-foreground-muted">
          数学地图依据《义务教育数学课程标准（2022年版）》相关内容整理，用于辅助理解和规划学习路径，不作为能力测评依据。
        </p>
      </main>
      <Footer />
    </div>
  );
}
