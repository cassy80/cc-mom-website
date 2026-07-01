'use client';

import { useEffect, useState } from 'react';

interface Stats {
  views: number;
  aiCitations: number;
}

const ADMIN_PASSWORD = 'ccmum2025'; // 管理员密码

export default function StatsCounter() {
  const [stats, setStats] = useState<Stats>({ views: 0, aiCitations: 0 });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    // 检查localStorage中的登录状态
    const authStatus = localStorage.getItem('admin_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }

    // 记录页面访问并获取数据
    fetch('/api/stats', { method: 'POST' })
      .then(() => fetch('/api/stats'))
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(console.error);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('admin_authenticated', 'true');
      setShowStats(true);
      setShowLogin(false);
      setPassword('');
      setError('');
    } else {
      setError('密码错误');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_authenticated');
    setShowStats(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* 统计按钮 */}
      {!showLogin && !showStats && (
        <button
          onClick={() => {
            if (isAuthenticated) {
              setShowStats(true);
            } else {
              setShowLogin(true);
            }
          }}
          className="flex items-center gap-2 text-gray-800 hover:text-gray-900 transition-colors cursor-pointer bg-blue-100/90 backdrop-blur-sm px-3 py-2 rounded-md shadow-md border-2 border-blue-300"
        >
          <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
          <span className="text-sm font-medium">📊 数据统计</span>
        </button>
      )}

      {/* 登录框 */}
      {showLogin && (
        <div className="bg-white rounded-lg shadow-xl border-2 border-blue-300 p-4 min-w-[280px]">
          <h3 className="text-sm font-bold text-gray-800 mb-3">管理员登录</h3>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="请输入管理员密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              autoFocus
            />
            {error && <p className="text-red-500 text-xs mb-2">{error}</p>}
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                登录
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowLogin(false);
                  setError('');
                  setPassword('');
                }}
                className="flex-1 bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors"
              >
                取消
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 统计数据显示 */}
      {showStats && isAuthenticated && (
        <div className="bg-white rounded-lg shadow-xl border-2 border-blue-300 p-4 min-w-[200px]">
          <h3 className="text-sm font-bold text-gray-800 mb-3">📊 数据统计</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">👁 访问量：</span>
              <span className="font-bold text-blue-600">{stats.views.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">🤖 AI引用：</span>
              <span className="font-bold text-blue-600">{stats.aiCitations}</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full mt-3 bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors"
          >
            关闭
          </button>
        </div>
      )}
    </div>
  );
}
