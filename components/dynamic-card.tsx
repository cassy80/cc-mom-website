interface DynamicCardProps {
  title: string;
  description: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  time: string;
  source: string;
  link: string;
}

export default function DynamicCard({
  title,
  description,
  category,
  priority,
  time,
  source,
  link,
}: DynamicCardProps) {
  const priorityColors = {
    high: 'border-l-4 border-orange-500',
    medium: 'border-l-4 border-blue-500',
    low: 'border-l-4 border-gray-500',
  };

  const priorityLabels = {
    high: '🔥',
    medium: '📊',
    low: '📝',
  };

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`block bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 ${priorityColors[priority]} hover:scale-[1.02]`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 block">
            {time}
          </span>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-tight">
            {priorityLabels[priority]} {title}
          </h3>
        </div>
        <span className="ml-3 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-semibold rounded-full whitespace-nowrap">
          {category}
        </span>
      </div>
      <p className="text-gray-700 dark:text-gray-300 text-sm mb-3 line-clamp-2">
        {description}
      </p>
      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>来源：{source}</span>
        <span className="text-blue-600 dark:text-blue-400 font-medium">
          查看详情 →
        </span>
      </div>
    </a>
  );
}
