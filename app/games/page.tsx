import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Link from 'next/link';

export default function GamesPage() {
  const games = [
    {
      id: '24-point',
      name: '24点扑克牌挑战',
      description: '经典数学思维游戏，用加减乘除让4张牌算出24，培养孩子的逻辑思维和心算能力',
      icon: '🎴',
      href: '/24game/play',
      tags: ['数学思维', '心算训练', '专属链接进入'],
      difficulty: '适合8岁+',
    },
    // 未来可以在这里添加更多游戏
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* 标题区域 */}
      <section className="py-16 px-4 bg-gradient-to-b from-brand-primary/5 to-background">
        <div className="container-content">
          <div className="text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              🎮 CC妈游戏空间
            </h1>
            <p className="text-foreground-muted text-lg max-w-2xl mx-auto">
              寓教于乐的益智游戏，让孩子在玩耍中锻炼思维、提升能力
            </p>
          </div>
        </div>
      </section>

      {/* 游戏列表 */}
      <section className="py-16 px-4">
        <div className="container-content">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {games.map((game) => (
              <Link
                key={game.id}
                href={game.href}
                className="group bg-white border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* 游戏图标 */}
                <div className="h-48 bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 flex items-center justify-center">
                  <span className="text-8xl group-hover:scale-110 transition-transform duration-300">
                    {game.icon}
                  </span>
                </div>

                {/* 游戏信息 */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-foreground">
                      {game.name}
                    </h3>
                    <span className="text-xs px-3 py-1 bg-brand-primary/10 text-brand-primary rounded-full">
                      {game.difficulty}
                    </span>
                  </div>

                  <p className="text-foreground-muted text-sm mb-4 leading-relaxed">
                    {game.description}
                  </p>

                  {/* 标签 */}
                  <div className="flex flex-wrap gap-2">
                    {game.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-gray-100 text-foreground-muted rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* 提示 */}
          <div className="mt-12 text-center">
            <p className="text-foreground-muted">
              🚀 更多精彩游戏，敬请期待...
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
