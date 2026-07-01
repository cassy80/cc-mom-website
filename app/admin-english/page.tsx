'use client';

import { useState, useEffect } from 'react';

interface KeyInfo {
  code: string;
  totalUses: number;
  remainingUses: number;
  createdAt: string;
  note?: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [keys, setKeys] = useState<KeyInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // 检查是否已经登录
  useEffect(() => {
    const auth = sessionStorage.getItem('admin_authenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
      fetchKeys();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    try {
      const response = await fetch('/api/admin-english/verify-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const data = await response.json();

      if (data.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem('admin_authenticated', 'true');
        sessionStorage.setItem('admin_password', password);
        fetchKeys();
      } else {
        setLoginError('密码错误，请重试');
      }
    } catch (error) {
      setLoginError('登录失败，请重试');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    sessionStorage.removeItem('admin_authenticated');
    sessionStorage.removeItem('admin_password');
  };

  const fetchKeys = async () => {
    try {
      setLoading(true);

      const storedPassword = sessionStorage.getItem('admin_password');

      const response = await fetch('/api/admin-english/list-keys', {
        headers: {
          'Authorization': `Bearer ${storedPassword}`
        }
      });

      const data = await response.json();
      if (data.success) {
        setKeys(data.keys);
      } else if (data.message === '需要管理员权限') {
        handleLogout();
      }
    } catch (error) {
      console.error('加载失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredKeys = keys.filter(key =>
    key.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (key: KeyInfo) => {
    if (key.remainingUses === 0) return 'bg-red-500/10 border-red-500/30 text-red-400';
    if (key.remainingUses < 10) return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400';
    if (key.remainingUses < 30) return 'bg-orange-500/10 border-orange-500/30 text-orange-400';
    return 'bg-green-500/10 border-green-500/30 text-green-400';
  };

  const getStatusText = (key: KeyInfo) => {
    if (key.remainingUses === 0) return '已用完';
    if (key.remainingUses < 10) return '即将用完';
    if (key.remainingUses < 30) return '使用中';
    return '正常';
  };

  const getUsagePercent = (key: KeyInfo) => {
    return Math.round(((key.totalUses - key.remainingUses) / key.totalUses) * 100);
  };

  const exportToCSV = () => {
    const csv = [
      ['卡密', '总次数', '剩余次数', '使用率', '创建时间', '状态'],
      ...filteredKeys.map(key => [
        key.code,
        key.totalUses,
        key.remainingUses,
        `${getUsagePercent(key)}%`,
        key.createdAt,
        getStatusText(key)
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `卡密数据_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  // 显示登录界面
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#010102] text-[#f7f8f8] flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="bg-[#0f1011] border border-[#23252a] rounded-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold mb-2">🔐 管理员登录</h1>
              <p className="text-[#8a8f98]">请输入密码访问卡密管理后台</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-[#d0d6e0]">
                  管理员密码
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#1a1c23] border border-[#23252a] rounded-md px-4 py-3 text-[#f7f8f8] placeholder-[#4a4f5a] focus:outline-none focus:border-[#5e6ad2] transition-colors"
                  placeholder="请输入密码"
                  autoFocus
                />
              </div>

              {loginError && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-md text-sm">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#5e6ad2] hover:bg-[#4a56c2] text-[#f7f8f8] font-semibold py-3 rounded-md transition-colors"
              >
                登录
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#010102] text-[#f7f8f8] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#5e6ad2] border-t-transparent mb-4"></div>
          <p className="text-[#d0d6e0]">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#010102] text-[#f7f8f8]">
      {/* Header */}
      <header className="border-b border-[#23252a]">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">
                🔑 英语学习 - 卡密管理后台
              </h1>
              <p className="text-[#8a8f98] mt-2">监控所有卡密使用情况</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-[#1a1c23] hover:bg-[#23252a] border border-[#23252a] rounded-md text-sm transition-colors"
            >
              退出登录
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#0f1011] border border-[#23252a] rounded-lg p-6">
            <div className="text-sm text-[#8a8f98] mb-2">总卡密数</div>
            <div className="text-3xl font-bold text-[#f7f8f8]">{keys.length}</div>
          </div>
          <div className="bg-[#0f1011] border border-[#23252a] rounded-lg p-6">
            <div className="text-sm text-[#8a8f98] mb-2">可用</div>
            <div className="text-3xl font-bold text-green-400">
              {keys.filter(k => k.remainingUses > 0).length}
            </div>
          </div>
          <div className="bg-[#0f1011] border border-[#23252a] rounded-lg p-6">
            <div className="text-sm text-[#8a8f98] mb-2">已用完</div>
            <div className="text-3xl font-bold text-red-400">
              {keys.filter(k => k.remainingUses === 0).length}
            </div>
          </div>
          <div className="bg-[#0f1011] border border-[#23252a] rounded-lg p-6">
            <div className="text-sm text-[#8a8f98] mb-2">总剩余次数</div>
            <div className="text-3xl font-bold text-[#5e6ad2]">
              {keys.reduce((sum, k) => sum + k.remainingUses, 0)}
            </div>
          </div>
        </div>

        {/* 工具栏 */}
        <div className="bg-[#0f1011] border border-[#23252a] rounded-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full md:w-auto">
              <input
                type="text"
                placeholder="🔍 搜索卡密..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#010102] border border-[#23252a] rounded-md px-4 py-2 text-[#f7f8f8] placeholder-[#62666d] focus:outline-none focus:border-[#5e6ad2]"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={fetchKeys}
                className="bg-[#5e6ad2] hover:bg-[#828fff] text-white px-4 py-2 rounded-md transition-colors"
              >
                🔄 刷新
              </button>
              <button
                onClick={exportToCSV}
                className="bg-[#5058E3] hover:bg-[#6a72f3] text-white px-4 py-2 rounded-md transition-colors"
              >
                📊 导出CSV
              </button>
            </div>
          </div>
        </div>

        {/* 卡密列表 */}
        <div className="bg-[#0f1011] border border-[#23252a] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#010102]">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-[#d0d6e0]">卡密</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-[#d0d6e0]">状态</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-[#d0d6e0]">剩余/总次数</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-[#d0d6e0]">使用率</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-[#d0d6e0]">创建时间</th>
                </tr>
              </thead>
              <tbody>
                {filteredKeys.map((key) => (
                  <tr key={key.code} className="border-t border-[#23252a] hover:bg-[#1a1b1e]">
                    <td className="px-6 py-4">
                      <div className="font-mono text-[#f7f8f8]">{key.code}</div>
                      {key.note && (
                        <div className="text-xs text-[#8a8f98] mt-1">{key.note}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(key)}`}>
                        {getStatusText(key)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-[#f7f8f8]">
                        {key.remainingUses} / {key.totalUses}
                      </div>
                      <div className="w-32 h-2 bg-[#23252a] rounded-full mt-2 overflow-hidden">
                        <div
                          className="h-full bg-[#5e6ad2] transition-all duration-300"
                          style={{
                            width: `${(key.remainingUses / key.totalUses) * 100}%`
                          }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-[#d0d6e0]">{getUsagePercent(key)}%</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#8a8f98]">
                      {new Date(key.createdAt).toLocaleDateString('zh-CN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredKeys.length === 0 && (
            <div className="text-center py-12 text-[#8a8f98]">
              没有找到匹配的卡密
            </div>
          )}
        </div>

        {/* 提示信息 */}
        <div className="mt-8 bg-[#5e6ad2]/10 border border-[#5e6ad2]/30 rounded-lg p-4">
          <div className="text-sm text-[#d0d6e0] space-y-2">
            <div className="font-semibold text-[#f7f8f8]">💡 使用提示：</div>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>在服务器上生成新卡密：<code className="bg-[#010102] px-2 py-1 rounded">node scripts/generate-keys.js --count 10</code></li>
              <li>直接编辑数据文件：<code className="bg-[#010102] px-2 py-1 rounded">data/card-keys.json</code></li>
              <li>主网站统计：<code className="bg-[#010102] px-2 py-1 rounded">/admin</code></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
