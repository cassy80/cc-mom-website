import Link from 'next/link';

interface ArticleCardProps {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  href: string;
}

export default function ArticleCard({
  title,
  excerpt,
  date,
  readTime,
  category,
  href,
}: ArticleCardProps) {
  return (
    <article className="bg-white border border-border rounded-xl p-6 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 group">
      {/* 分类标签 */}
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
        <span className="text-primary text-xs font-medium">
          {category}
        </span>
      </div>

      {/* 标题 */}
      <Link href={href}>
        <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors leading-snug">
          {title}
        </h3>
      </Link>

      {/* 摘要 */}
      <p className="text-foreground-muted text-sm leading-relaxed mb-4 line-clamp-2">
        {excerpt}
      </p>

      {/* 元信息 */}
      <div className="flex items-center gap-4 text-xs text-foreground-muted">
        <div className="flex items-center gap-1.5">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{readTime}</span>
        </div>
      </div>
    </article>
  );
}
