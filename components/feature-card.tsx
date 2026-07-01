import Link from 'next/link';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
  stats?: {
    label: string;
    value: string;
  };
}

export default function FeatureCard({
  title,
  description,
  icon,
  href,
  stats,
}: FeatureCardProps) {
  return (
    <Link
      href={href}
      className="group bg-white border border-border rounded-xl p-6 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1"
    >
      {/* 图标 */}
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
        <span className="text-2xl group-hover:text-white transition-colors">
          {icon}
        </span>
      </div>

      {/* 标题 */}
      <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>

      {/* 描述 */}
      <p className="text-foreground-muted text-sm leading-relaxed mb-4">
        {description}
      </p>

      {/* 统计数据（可选） */}
      {stats && (
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs text-foreground-muted">{stats.label}</span>
            <span className="text-sm font-semibold text-white">
              {stats.value}
            </span>
          </div>
        </div>
      )}

      {/* 箭头图标 */}
      <div className="flex items-center gap-2 text-primary text-sm font-medium mt-4 group-hover:gap-3 transition-all">
        了解更多
        <span>→</span>
      </div>
    </Link>
  );
}
