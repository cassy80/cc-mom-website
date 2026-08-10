'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

interface Stats {
  views: number;
  aiCitations: number;
  lastUpdated: string;
}

interface GameStats {
  games: {
    [key: string]: {
      playCount: number;
      lastPlayed: string;
    };
  };
  lastUpdated: string;
}

interface GameAccessLink {
  token: string;
  url: string;
  status: 'active' | 'disabled';
  createdAt: string;
  firstOpenedAt?: string;
  lastOpenedAt?: string;
  openCount: number;
  note?: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [error, setError] = useState('');
  const [stats, setStats] = useState<Stats>({ views: 0, aiCitations: 0, lastUpdated: '' });
  const [gameStats, setGameStats] = useState<GameStats>({ games: {}, lastUpdated: '' });
  const [loading, setLoading] = useState(false);
  const [updateValue, setUpdateValue] = useState('');
  const [gameLinks, setGameLinks] = useState<GameAccessLink[]>([]);
  const [gameLinkLimit, setGameLinkLimit] = useState(30);
  const [linkLoading, setLinkLoading] = useState(false);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats');
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const fetchGameStats = async () => {
    try {
      const res = await fetch('/api/game-stats');
      const data = await res.json();
      setGameStats(data);
    } catch (error) {
      console.error('Failed to fetch game stats:', error);
    }
  };

  const fetchGameLinks = async (secret = adminPassword) => {
    if (!secret) return;
    const res = await fetch('/api/admin-api/24game-links', {
      headers: { Authorization: `Bearer ${secret}` },
      cache: 'no-store',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || '获取专属链接失败');
    setGameLinks(data.links || []);
    setGameLinkLimit(data.limit || 30);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin-api/verify-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || '密码错误');

      setIsAuthenticated(true);
      setAdminPassword(password);
      fetchStats();
      fetchGameStats();
      await fetchGameLinks(password);
      setPassword('');
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : '登录失败');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminPassword('');
    setGameLinks([]);
    setStats({ views: 0, aiCitations: 0, lastUpdated: '' });
  };

  const generateLinks = async () => {
    const remaining = gameLinkLimit - gameLinks.length;
    if (remaining <= 0) return alert('专属链接已经达到30条上限');
    if (!confirm(`将生成 ${remaining} 条专属链接，生成后可导出给小红书自动发货。是否继续？`)) return;

    setLinkLoading(true);
    try {
      const res = await fetch('/api/admin-api/24game-links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminPassword}`,
        },
        body: JSON.stringify({ count: remaining }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || '生成失败');
      await fetchGameLinks();
      alert(data.message);
    } catch (generateError) {
      alert(generateError instanceof Error ? generateError.message : '生成失败');
    } finally {
      setLinkLoading(false);
    }
  };

  const toggleLinkStatus = async (link: GameAccessLink) => {
    const nextStatus = link.status === 'active' ? 'disabled' : 'active';
    setLinkLoading(true);
    try {
      const res = await fetch('/api/admin-api/24game-links', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminPassword}`,
        },
        body: JSON.stringify({ token: link.token, status: nextStatus }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || '更新失败');
      await fetchGameLinks();
    } catch (updateError) {
      alert(updateError instanceof Error ? updateError.message : '更新失败');
    } finally {
      setLinkLoading(false);
    }
  };

  const copyText = async (text: string, message = '已复制') => {
    await navigator.clipboard.writeText(text);
    alert(message);
  };

  const exportLinks = () => {
    const activeLinks = gameLinks.filter((link) => link.status === 'active');
    const blob = new Blob([activeLinks.map((link) => link.url).join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `24点游戏专属链接-${new Date().toISOString().slice(0, 10)}.txt`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const updateAiCitations = async (newValue: number) => {
    setLoading(true);
    try {
      const res = await fetch('/api/stats/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ aiCitations: newValue }),
      });

      if (res.ok) {
        const data = await res.json();
        setStats(data);
        setUpdateValue('');
        alert('AI引用次数已更新！');
      } else {
        alert('更新失败，请重试');
      }
    } catch (error) {
      console.error('Failed to update stats:', error);
      alert('更新失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleIncrement = () => {
    updateAiCitations(stats.aiCitations + 1);
  };

  const handleCustomUpdate = () => {
    const value = parseInt(updateValue);
    if (!isNaN(value) && value >= 0) {
      updateAiCitations(value);
    } else {
      alert('请输入有效的数字');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-brand-primary/20">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">🔐 管理员登录</h1>
              <p className="text-foreground-muted">请输入管理员密码以访问统计页面</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  管理员密码
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                  placeholder="请输入密码"
                  autoFocus
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !password}
                className="w-full bg-brand-primary text-white py-3 rounded-xl font-bold hover:bg-brand-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {loading ? '验证中...' : '登录'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link
                href="/"
                className="text-brand-primary hover:text-brand-primary-dark text-sm font-medium"
              >
                ← 返回首页
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container-content py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* 页面标题 */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              📊 网站管理后台
            </h1>
            <p className="text-foreground-muted text-lg">
              管理网站数据、游戏统计与付费专属链接
            </p>
          </div>

          {/* 统计卡片 */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* 访问量卡片 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-brand-primary/20 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="text-4xl">👁</div>
                <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                  实时统计
                </div>
              </div>
              <h3 className="text-foreground-muted text-sm font-medium mb-2">
                网页访问量
              </h3>
              <p className="text-5xl font-bold text-brand-primary mb-4">
                {stats.views.toLocaleString()}
              </p>
              <p className="text-xs text-foreground-muted">
                最后更新: {stats.lastUpdated || '未知'}
              </p>
            </div>

            {/* AI引用卡片 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-brand-accent/20 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="text-4xl">🤖</div>
                <div className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                  手动更新
                </div>
              </div>
              <h3 className="text-foreground-muted text-sm font-medium mb-2">
                AI 引用次数
              </h3>
              <p className="text-5xl font-bold text-brand-accent mb-4">
                {stats.aiCitations}
              </p>
              <p className="text-xs text-foreground-muted">
                当ChatGPT/Claude等AI引用时更新
              </p>
            </div>
          </div>

          {/* 游戏统计卡片 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-green-500/20 mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                🎮 游戏统计
              </h3>
              <button
                onClick={fetchGameStats}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
              >
                🔄 刷新
              </button>
            </div>

            {Object.keys(gameStats.games).length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(gameStats.games).map(([gameId, game]) => (
                  <div key={gameId} className="p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border border-green-200">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">{gameId === '24-point' ? '🎴' : '🎮'}</span>
                      <div>
                        <h4 className="font-bold text-foreground">
                          {gameId === '24-point' ? '24点扑克牌挑战' : gameId}
                        </h4>
                        <p className="text-xs text-foreground-muted">游戏ID: {gameId}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-foreground-muted">游玩次数</span>
                        <span className="text-2xl font-bold text-green-600">{game.playCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-foreground-muted">最后游玩</span>
                        <span className="text-xs text-foreground-muted">
                          {game.lastPlayed ? new Date(game.lastPlayed).toLocaleString('zh-CN') : '暂无记录'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-foreground-muted py-8">暂无游戏数据</p>
            )}

            <p className="text-xs text-foreground-muted mt-4 text-right">
              统计更新: {gameStats.lastUpdated ? new Date(gameStats.lastUpdated).toLocaleString('zh-CN') : '未知'}
            </p>
          </div>

          {/* 24点专属链接管理 */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border-2 border-amber-500/20 mb-12">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                  🔗 24点游戏专属链接
                </h3>
                <p className="text-sm text-foreground-muted mt-2">
                  最多生成 {gameLinkLimit} 条。将导出的完整链接作为小红书虚拟商品卡密库存。
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => fetchGameLinks().catch((fetchError) => alert(fetchError.message))}
                  disabled={linkLoading}
                  className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50"
                >
                  刷新状态
                </button>
                <button
                  onClick={generateLinks}
                  disabled={linkLoading || gameLinks.length >= gameLinkLimit}
                  className="px-4 py-2 text-sm bg-amber-500 text-white rounded-lg font-bold hover:bg-amber-600 disabled:opacity-50"
                >
                  {gameLinks.length ? '补足到30条' : '一键生成30条'}
                </button>
                <button
                  onClick={exportLinks}
                  disabled={!gameLinks.some((link) => link.status === 'active')}
                  className="px-4 py-2 text-sm bg-brand-primary text-white rounded-lg font-bold disabled:opacity-50"
                >
                  导出有效链接
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-foreground-muted">全部</p>
                <p className="text-2xl font-bold">{gameLinks.length}</p>
              </div>
              <div className="rounded-xl bg-blue-50 p-4">
                <p className="text-xs text-blue-700">未打开</p>
                <p className="text-2xl font-bold text-blue-700">
                  {gameLinks.filter((link) => link.status === 'active' && !link.firstOpenedAt).length}
                </p>
              </div>
              <div className="rounded-xl bg-green-50 p-4">
                <p className="text-xs text-green-700">已打开</p>
                <p className="text-2xl font-bold text-green-700">
                  {gameLinks.filter((link) => link.status === 'active' && link.firstOpenedAt).length}
                </p>
              </div>
              <div className="rounded-xl bg-red-50 p-4">
                <p className="text-xs text-red-700">已停用</p>
                <p className="text-2xl font-bold text-red-700">
                  {gameLinks.filter((link) => link.status === 'disabled').length}
                </p>
              </div>
            </div>

            {gameLinks.length ? (
              <div className="space-y-3 max-h-[560px] overflow-auto pr-1">
                {gameLinks.map((link, index) => (
                  <div key={link.token} className="rounded-xl border border-border p-4">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-3 justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-bold">第 {index + 1} 条</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            link.status === 'disabled'
                              ? 'bg-red-100 text-red-700'
                              : link.firstOpenedAt
                                ? 'bg-green-100 text-green-700'
                                : 'bg-blue-100 text-blue-700'
                          }`}>
                            {link.status === 'disabled' ? '已停用' : link.firstOpenedAt ? '已打开' : '未打开'}
                          </span>
                          {link.openCount > 0 && <span className="text-xs text-foreground-muted">打开 {link.openCount} 次</span>}
                        </div>
                        <p className="text-xs md:text-sm font-mono break-all text-foreground-muted">{link.url}</p>
                        {link.firstOpenedAt && (
                          <p className="text-xs text-foreground-muted mt-2">
                            首次打开：{new Date(link.firstOpenedAt).toLocaleString('zh-CN')}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => copyText(link.url, `第 ${index + 1} 条链接已复制`)}
                          className="px-3 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200"
                        >
                          复制
                        </button>
                        <button
                          onClick={() => toggleLinkStatus(link)}
                          disabled={linkLoading}
                          className={`px-3 py-2 text-sm rounded-lg font-medium disabled:opacity-50 ${
                            link.status === 'active' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
                          }`}
                        >
                          {link.status === 'active' ? '停用' : '恢复'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-amber-50 rounded-xl border border-dashed border-amber-300">
                <p className="text-3xl mb-3">🎴</p>
                <p className="font-bold text-foreground">尚未生成专属链接</p>
                <p className="text-sm text-foreground-muted mt-1">点击“一键生成30条”即可建立首批库存。</p>
              </div>
            )}
          </div>

          {/* 更新AI引用次数 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-border">
            <h3 className="text-xl font-bold text-foreground mb-6">
              ✏️ 更新 AI 引用次数
            </h3>

            <div className="space-y-6">
              {/* 快速+1 */}
              <div className="flex items-center justify-between p-4 bg-brand-accent/5 rounded-xl border border-brand-accent/20">
                <div>
                  <h4 className="font-medium text-foreground mb-1">发现新的AI引用？</h4>
                  <p className="text-sm text-foreground-muted">
                    点击按钮将引用次数 +1
                  </p>
                </div>
                <button
                  onClick={handleIncrement}
                  disabled={loading}
                  className="px-6 py-3 bg-brand-accent text-white rounded-xl font-bold hover:bg-brand-accent-hover transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                >
                  {loading ? '更新中...' : '+1 引用'}
                </button>
              </div>

              {/* 自定义更新 */}
              <div className="p-4 bg-gray-50 rounded-xl border border-border">
                <h4 className="font-medium text-foreground mb-3">手动设置具体数字</h4>
                <div className="flex gap-3">
                  <input
                    type="number"
                    min="0"
                    value={updateValue}
                    onChange={(e) => setUpdateValue(e.target.value)}
                    placeholder="输入新的引用次数"
                    className="flex-1 px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                  />
                  <button
                    onClick={handleCustomUpdate}
                    disabled={loading || !updateValue}
                    className="px-6 py-3 bg-brand-primary text-white rounded-xl font-bold hover:bg-brand-primary-dark transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                  >
                    {loading ? '更新中...' : '更新'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={handleLogout}
              className="px-8 py-3 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition-all duration-300"
            >
              退出登录
            </button>
            <Link
              href="/"
              className="px-8 py-3 bg-brand-primary text-white rounded-xl font-bold hover:bg-brand-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              返回首页
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
