import Link from 'next/link';
import Image from 'next/image';

const topics = [
  { title: '工具实测', detail: 'AI学习工具与使用方法' },
  { title: '亲子实践', detail: '和孩子一起探索AI' },
  { title: '英语学习', detail: '词汇练习与学习资源' },
  { title: '数学互动', detail: '益智游戏与思维练习' },
];

export default function Hero() {
  return (
    <section className="relative bg-background-alt px-4 pt-24 pb-12 md:pt-28 md:pb-16" aria-labelledby="home-title">
      <div className="container-content">
        <div className="grid items-center gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div>
            <h1 id="home-title" className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-xl font-bold text-foreground sm:text-2xl">
              CC妈育见AI
              <span className="rounded-full border border-border bg-white px-3 py-1 text-xs font-medium text-brand-primary">个人官网</span>
            </h1>
            <p className="text-4xl font-bold leading-[1.25] tracking-tight text-foreground sm:text-5xl lg:text-[54px]">
              和孩子一起，<br />
              <span className="text-brand-primary">把AI用进学习与生活</span>
            </p>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#51515a] sm:text-lg">
              我是CC妈，「CC妈育见AI」是我的自媒体名称。这里分享AI学习工具实测、亲子AI实践，以及英语、数学等学科的互动学习资源，帮助家长把工具真正用起来。
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="#learning-tools" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-brand-primary px-6 py-3 text-base font-semibold !text-white shadow-md transition-colors hover:bg-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary">
                探索学习工具 <span aria-hidden="true">→</span>
              </Link>
              <Link href="/about" className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-border bg-white px-6 py-3 text-base font-semibold shadow-sm transition-colors hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary">
                认识CC妈
              </Link>
            </div>
            <a href="https://www.xiaohongshu.com/user/profile/5ac5cc5411be107deceab7f9" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-medium underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary">
              官方小红书：CC妈育见AI <span aria-hidden="true">↗</span>
              <span className="sr-only">（在新标签页打开）</span>
            </a>
          </div>
          <div className="mx-auto w-full max-w-[300px] lg:max-w-[340px]">
            <div className="rounded-3xl bg-white p-2 shadow-xl">
              <Image src="/images/cc-mom-hero-avatar.jpg" alt="CC妈育见AI的亲子合影" width={340} height={340} sizes="(max-width: 1023px) 300px, 340px" className="aspect-square w-full rounded-2xl object-cover" priority quality={95} />
            </div>
            <p className="mt-4 text-center text-sm leading-6 text-[#51515a]">分享AI+教育的实践与思考</p>
          </div>
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-6 border-t border-border pt-7 lg:grid-cols-4">
          {topics.map((topic) => (
            <li key={topic.title}>
              <p className="text-lg font-semibold text-foreground">{topic.title}</p>
              <p className="mt-1 text-sm leading-6 text-[#51515a]">{topic.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
