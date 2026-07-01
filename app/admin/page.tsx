'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

interface Stats {
  views: number;
  aiCitations: number;
  lastUpdated: string;
}

const ADMIN_PASSWORD = 'ccmum2025';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [stats, setStats] = useState<Stats>({ views: 0, aiCitations: 0, lastUpdated: '' });
  const [loading, setLoading] = useState(false);
  const [updateValue, setUpdateValue] = useState('');

  useEffect(() => {
    // 检查localStorage中的登录状态
    const authStatus = localStorage.getItem('admin_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      fetchStats();
    }
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats');
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('admin_authenticated', 'true');
      setPassword('');
      setError('');
      fetchStats();
    } else {
      setError('密码错误');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_authenticated');
    setStats({ views: 0, aiCitations: 0, lastUpdated: '' });
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
                className="w-full bg-brand-primary text-white py-3 rounded-xl font-bold hover:bg-brand-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                登录
              </button>
            </form>

            <div className="mt-6 text-center">
              <a
                href="/"
                className="text-brand-primary hover:text-brand-primary-dark text-sm font-medium"
              >
                ← 返回首页
              </a>
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
              📊 网站统计数据
            </h1>
            <p className="text-foreground-muted text-lg">
              查看和管理网站访问数据
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
            <a
              href="/"
              className="px-8 py-3 bg-brand-primary text-white rounded-xl font-bold hover:bg-brand-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              返回首页
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
