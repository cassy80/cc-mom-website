interface Tool {
  name: string;
  description: string;
  category: 'beginner' | 'advanced';
  logo: string;
  href?: string;
}

const tools: Tool[] = [
  // 入门级工具
  {
    name: '豆包',
    description: '字节跳动出品的AI助手，易上手',
    category: 'beginner',
    logo: '/images/doubao.png',
    href: 'https://www.doubao.com'
  },
  {
    name: 'ChatGPT',
    description: 'OpenAI开发的强大AI模型',
    category: 'beginner',
    logo: '/images/chatgpt.png',
    href: 'https://chat.openai.com'
  },
  {
    name: 'Kimi',
    description: '月之暗面出品，中文处理能力强',
    category: 'beginner',
    logo: '/images/kimi.jfif',
    href: 'https://kimi.moonshot.cn'
  },
  {
    name: 'DeepSeek',
    description: '深度求索，国产开源AI',
    category: 'beginner',
    logo: '/images/deepseek-logo.webp',
    href: 'https://www.deepseek.com'
  },
  {
    name: 'Gemini',
    description: 'Google开发的多模态AI',
    category: 'beginner',
    logo: '/images/gemini.jpeg',
    href: 'https://gemini.google.com'
  },
  {
    name: '千问',
    description: '阿里云通义千问，中文大模型',
    category: 'beginner',
    logo: '/images/qianwen.webp',
    href: 'https://qianwen.aliyun.com'
  },
  // 进阶级工具
  {
    name: 'Trae',
    description: 'AI创作工具',
    category: 'advanced',
    logo: '/images/trae.jpeg',
    href: 'https://www.trae.ai'
  },
  {
    name: 'Qoder',
    description: 'AI编程辅助工具',
    category: 'advanced',
    logo: '/images/qoder-logo.png',
    href: 'https://qoder.ai'
  },
  {
    name: 'Manus',
    description: 'AI写作工具',
    category: 'advanced',
    logo: '/images/manus-logo.ico',
    href: 'https://manus.im'
  },
  {
    name: 'Cursor',
    description: 'AI编程工具',
    category: 'advanced',
    logo: '/images/cursor.png',
    href: 'https://cursor.sh'
  },
  {
    name: 'Claude Code',
    description: 'AI编程助手',
    category: 'advanced',
    logo: '/images/claude-logo.ico',
    href: 'https://claude.ai'
  },
  {
    name: 'Midjourney',
    description: 'AI绘画工具',
    category: 'advanced',
    logo: '/images/midjourney-logo.jfif',
    href: 'https://www.midjourney.com'
  }
];

export default function ToolsGrid() {
  const beginnerTools = tools.filter(t => t.category === 'beginner');
  const advancedTools = tools.filter(t => t.category === 'advanced');

  return (
    <section className="py-20 px-4 bg-background-alt">
      <div className="container-content">
        {/* 标题 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            常用工具
          </h2>
          <p className="text-foreground-muted max-w-2xl mx-auto">
            精选AI教育工具，从入门到进阶，满足不同需求
          </p>
        </div>

        {/* 入门级工具 */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-sm">
              🌱
            </span>
            入门级（易上手）
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {beginnerTools.map((tool) => (
              <a
                key={tool.name}
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-border group"
              >
                <div className="w-16 h-16 flex items-center justify-center mb-4 bg-gray-50 rounded-lg overflow-hidden group-hover:bg-gray-100 transition-colors">
                  <img
                    src={tool.logo}
                    alt={`${tool.name} logo`}
                    className="max-w-[60px] max-h-[60px] object-contain"
                  />
                </div>
                <h4 className="text-base font-semibold text-foreground mb-1 text-center">
                  {tool.name}
                </h4>
                <p className="text-xs text-foreground-muted text-center leading-relaxed">
                  {tool.description}
                </p>
              </a>
            ))}
          </div>
        </div>

        {/* 进阶级工具 */}
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-sm">
              🚀
            </span>
            进阶级（专业工具）
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {advancedTools.map((tool) => (
              <a
                key={tool.name}
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-border group"
              >
                <div className="w-16 h-16 flex items-center justify-center mb-4 bg-gray-50 rounded-lg overflow-hidden group-hover:bg-gray-100 transition-colors">
                  <img
                    src={tool.logo}
                    alt={`${tool.name} logo`}
                    className="max-w-[60px] max-h-[60px] object-contain"
                  />
                </div>
                <h4 className="text-base font-semibold text-foreground mb-1 text-center">
                  {tool.name}
                </h4>
                <p className="text-xs text-foreground-muted text-center leading-relaxed">
                  {tool.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
