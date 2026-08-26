'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

interface Stats { views: number; aiCitations: number; lastUpdated: string; }
interface GameStats { games: { [key: string]: { playCount: number; lastPlayed: string; }; }; lastUpdated: string; }
interface GameAccessLink { token: string; url: string; status: 'active' | 'disabled'; createdAt: string; firstOpenedAt?: string; lastOpenedAt?: string; openCount: number; note?: string; }
interface MaterialLink { id: string; sequence: string; label: string; active: boolean; url: string; openCount: number; firstOpenedAt?: string; lastOpenedAt?: string; }

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
  const [materialLinks, setMaterialLinks] = useState<MaterialLink[]>([]);
  const [materialLoading, setMaterialLoading] = useState(false);

  const fetchStats = async () => { try { const res = await fetch('/api/stats'); setStats(await res.json()); } catch {} };
  const fetchGameStats = async () => { try { const res = await fetch('/api/game-stats'); setGameStats(await res.json()); } catch {} };
  const fetchGameLinks = async (secret = adminPassword) => {
    if (!secret) return;
    const res = await fetch('/api/admin-api/24game-links', { headers: { Authorization: `Bearer ${secret}` }, cache: 'no-store' });
    const data = await res.json(); if (!res.ok) throw new Error(data.message || '获取专属链接失败');
    setGameLinks(data.links || []); setGameLinkLimit(data.limit || 30);
  };
  const fetchMaterialLinks = async (secret = adminPassword) => {
    if (!secret) return;
    setMaterialLoading(true);
    try {
      const res = await fetch('/api/admin-api/material-links', { headers: { Authorization: `Bearer ${secret}` }, cache: 'no-store' });
      const data = await res.json(); if (!res.ok) throw new Error(data.message || '获取词汇链接失败');
      setMaterialLinks(data.links || []);
    } finally { setMaterialLoading(false); }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError('');
    try {
      const res = await fetch('/api/admin-api/verify-password', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
      const data = await res.json(); if (!res.ok) throw new Error(data.message || '密码错误');
      setIsAuthenticated(true); setAdminPassword(password); fetchStats(); fetchGameStats();
      await Promise.all([fetchGameLinks(password), fetchMaterialLinks(password)]); setPassword('');
    } catch (loginError) { setError(loginError instanceof Error ? loginError.message : '登录失败'); }
    finally { setLoading(false); }
  };
  const handleLogout = () => { setIsAuthenticated(false); setAdminPassword(''); setGameLinks([]); setMaterialLinks([]); setStats({ views: 0, aiCitations: 0, lastUpdated: '' }); };
  const generateLinks = async () => {
    const remaining = gameLinkLimit - gameLinks.length; if (remaining <= 0) return alert(`专属链接已经达到${gameLinkLimit}条上限`);
    if (!confirm(`将生成 ${remaining} 条专属链接，生成后可导出给小红书自动发货。是否继续？`)) return;
    setLinkLoading(true); try {
      const res = await fetch('/api/admin-api/24game-links', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminPassword}` }, body: JSON.stringify({ count: remaining }) });
      const data = await res.json(); if (!res.ok) throw new Error(data.message || '生成失败'); await fetchGameLinks(); alert(data.message);
    } catch (e) { alert(e instanceof Error ? e.message : '生成失败'); } finally { setLinkLoading(false); }
  };
  const toggleGameLinkStatus = async (link: GameAccessLink) => {
    setLinkLoading(true); try {
      const res = await fetch('/api/admin-api/24game-links', { method: 'PATCH', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminPassword}` }, body: JSON.stringify({ token: link.token, status: link.status === 'active' ? 'disabled' : 'active' }) });
      const data = await res.json(); if (!res.ok) throw new Error(data.message || '更新失败'); await fetchGameLinks();
    } catch (e) { alert(e instanceof Error ? e.message : '更新失败'); } finally { setLinkLoading(false); }
  };
  const copyText = async (text: string, message = '已复制') => { await navigator.clipboard.writeText(text); alert(message); };
  const exportGameLinks = () => { const blob = new Blob([gameLinks.filter((link) => link.status === 'active').map((link) => link.url).join('\n')], { type: 'text/plain;charset=utf-8' }); const url = URL.createObjectURL(blob); const anchor = document.createElement('a'); anchor.href = url; anchor.download = `24点游戏专属链接-${new Date().toISOString().slice(0, 10)}.txt`; anchor.click(); URL.revokeObjectURL(url); };
  const exportMaterialLinks = () => { const blob = new Blob([materialLinks.filter((link) => link.active).map((link) => link.url).join('\n')], { type: 'text/plain;charset=utf-8' }); const url = URL.createObjectURL(blob); const anchor = document.createElement('a'); anchor.href = url; anchor.download = `2027上海考纲词汇专属链接-${new Date().toISOString().slice(0, 10)}.txt`; anchor.click(); URL.revokeObjectURL(url); };
  const updateAiCitations = async (newValue: number) => { setLoading(true); try { const res = await fetch('/api/stats/update', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ aiCitations: newValue }) }); if (res.ok) { setStats(await res.json()); setUpdateValue(''); alert('AI引用次数已更新！'); } else alert('更新失败，请重试'); } finally { setLoading(false); } };

  if (!isAuthenticated) return <div className="min-h-screen bg-background flex items-center justify-center px-4"><div className="max-w-md w-full"><div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-brand-primary/20"><div className="text-center mb-8"><h1 className="text-3xl font-bold text-foreground mb-2">🔐 管理员登录</h1><p className="text-foreground-muted">请输入管理员密码以访问统计页面</p></div><form onSubmit={handleLogin} className="space-y-4"><div><label className="block text-sm font-medium text-foreground mb-2">管理员密码</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary" placeholder="请输入密码" autoFocus /></div>{error && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">{error}</div>}<button type="submit" disabled={loading || !password} className="w-full bg-brand-primary text-white py-3 rounded-xl font-bold disabled:opacity-50">{loading ? '验证中...' : '登录'}</button></form><div className="mt-6 text-center"><Link href="/" className="text-brand-primary text-sm font-medium">← 返回首页</Link></div></div></div></div>;

  const openedMaterials = materialLinks.filter((link) => link.openCount > 0);
  return <div className="min-h-screen bg-background"><Navbar /><div className="container-content py-16 px-4"><div className="max-w-4xl mx-auto">
    <div className="text-center mb-12"><h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">📊 网站管理后台</h1><p className="text-foreground-muted text-lg">管理网站数据、游戏统计与付费专属链接</p></div>
    <div className="grid md:grid-cols-2 gap-8 mb-12"><div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-brand-primary/20"><div className="text-4xl mb-4">👁</div><h3 className="text-foreground-muted text-sm font-medium mb-2">网页访问量</h3><p className="text-5xl font-bold text-brand-primary mb-4">{stats.views.toLocaleString()}</p><p className="text-xs text-foreground-muted">最后更新: {stats.lastUpdated || '未知'}</p></div><div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-brand-accent/20"><div className="text-4xl mb-4">🤖</div><h3 className="text-foreground-muted text-sm font-medium mb-2">AI 引用次数</h3><p className="text-5xl font-bold text-brand-accent mb-4">{stats.aiCitations}</p><p className="text-xs text-foreground-muted">当ChatGPT/Claude等AI引用时更新</p></div></div>
    <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-green-500/20 mb-12"><div className="flex items-center justify-between mb-6"><h3 className="text-xl font-bold text-foreground">🎮 游戏统计</h3><button onClick={fetchGameStats} className="px-4 py-2 text-sm bg-gray-100 text-gray-600 rounded-lg">🔄 刷新</button></div>{Object.keys(gameStats.games).length ? <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{Object.entries(gameStats.games).map(([gameId, game]) => <div key={gameId} className="p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border border-green-200"><h4 className="font-bold text-foreground">{gameId === '24-point' ? '🎴 24点扑克牌挑战' : gameId}</h4><div className="flex justify-between mt-4"><span className="text-sm text-foreground-muted">游玩次数</span><span className="text-2xl font-bold text-green-600">{game.playCount}</span></div><p className="text-xs text-foreground-muted mt-2">最后游玩：{game.lastPlayed ? new Date(game.lastPlayed).toLocaleString('zh-CN') : '暂无记录'}</p></div>)}</div> : <p className="text-center text-foreground-muted py-8">暂无游戏数据</p>}</div>
    <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border-2 border-rose-500/20 mb-12"><div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6"><div><h3 className="text-xl font-bold text-foreground">📘 考纲词汇专属链接</h3><p className="text-sm text-foreground-muted mt-2">200 条买家一键直达链接。统计在买家打开资料页时增加，不因翻页或下载重复计数。</p></div><div className="flex flex-wrap gap-2"><button onClick={() => fetchMaterialLinks().catch((e) => alert(e.message))} disabled={materialLoading} className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg disabled:opacity-50">{materialLoading ? '刷新中...' : '刷新状态'}</button><button onClick={exportMaterialLinks} disabled={!materialLinks.some((link) => link.active)} className="px-4 py-2 text-sm bg-brand-primary text-white rounded-lg font-bold disabled:opacity-50">导出有效链接</button></div></div><div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6"><div className="rounded-xl bg-gray-50 p-4"><p className="text-xs text-foreground-muted">全部</p><p className="text-2xl font-bold">{materialLinks.length}</p></div><div className="rounded-xl bg-blue-50 p-4"><p className="text-xs text-blue-700">未打开</p><p className="text-2xl font-bold text-blue-700">{materialLinks.filter((link) => link.openCount === 0 && link.active).length}</p></div><div className="rounded-xl bg-green-50 p-4"><p className="text-xs text-green-700">已打开</p><p className="text-2xl font-bold text-green-700">{openedMaterials.filter((link) => link.active).length}</p></div><div className="rounded-xl bg-red-50 p-4"><p className="text-xs text-red-700">已停用</p><p className="text-2xl font-bold text-red-700">{materialLinks.filter((link) => !link.active).length}</p></div></div>{materialLinks.length ? <div className="space-y-3 max-h-[620px] overflow-auto pr-1">{materialLinks.map((link) => <div key={link.id} className="rounded-xl border border-border p-4"><div className="flex flex-col lg:flex-row lg:items-center gap-3 justify-between"><div className="min-w-0 flex-1"><div className="flex items-center gap-2 mb-2"><span className="font-bold">第 {link.sequence} 条</span><span className={`text-xs px-2 py-1 rounded-full ${!link.active ? 'bg-red-100 text-red-700' : link.openCount ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{!link.active ? '已停用' : link.openCount ? '已打开' : '未打开'}</span><span className="text-xs text-foreground-muted">打开 {link.openCount || 0} 次</span></div><p className="text-xs md:text-sm font-mono break-all text-foreground-muted">{link.url}</p>{link.firstOpenedAt && <p className="text-xs text-foreground-muted mt-2">首次：{new Date(link.firstOpenedAt).toLocaleString('zh-CN')}　最近：{link.lastOpenedAt ? new Date(link.lastOpenedAt).toLocaleString('zh-CN') : '—'}</p>}</div><button onClick={() => copyText(link.url, `第 ${link.sequence} 条链接已复制`)} className="px-3 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 shrink-0">复制</button></div></div>)}</div> : <div className="text-center py-10 bg-rose-50 rounded-xl"><p className="font-bold text-foreground">暂未读取到链接</p></div>}</section>
    <section className="bg-white rounded-2xl shadow-lg p-8 border border-border"><h3 className="text-xl font-bold text-foreground mb-6">✏️ 更新 AI 引用次数</h3><div className="flex gap-3"><input type="number" min="0" value={updateValue} onChange={(e) => setUpdateValue(e.target.value)} placeholder="输入新的引用次数" className="flex-1 px-4 py-3 border border-border rounded-xl"/><button onClick={() => { const value = parseInt(updateValue); if (!isNaN(value) && value >= 0) updateAiCitations(value); else alert('请输入有效的数字'); }} disabled={loading || !updateValue} className="px-6 py-3 bg-brand-primary text-white rounded-xl font-bold disabled:opacity-50">{loading ? '更新中...' : '更新'}</button></div></section>
    <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border-2 border-amber-500/20 mt-12"><div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6"><div><h3 className="text-xl font-bold text-foreground">🔗 24点游戏专属链接</h3><p className="text-sm text-foreground-muted mt-2">最多生成 {gameLinkLimit} 条，可查看打开情况并单独停用。</p></div><div className="flex flex-wrap gap-2"><button onClick={() => fetchGameLinks().catch((e) => alert(e.message))} disabled={linkLoading} className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg">刷新状态</button><button onClick={generateLinks} disabled={linkLoading || gameLinks.length >= gameLinkLimit} className="px-4 py-2 text-sm bg-amber-500 text-white rounded-lg font-bold disabled:opacity-50">{gameLinks.length ? `补足到${gameLinkLimit}条` : `一键生成${gameLinkLimit}条`}</button><button onClick={exportGameLinks} disabled={!gameLinks.some((link) => link.status === 'active')} className="px-4 py-2 text-sm bg-brand-primary text-white rounded-lg font-bold disabled:opacity-50">导出有效链接</button></div></div>{gameLinks.length ? <div className="space-y-3 max-h-[560px] overflow-auto pr-1">{gameLinks.map((link, index) => <div key={link.token} className="rounded-xl border border-border p-4"><div className="flex flex-col lg:flex-row lg:items-center gap-3 justify-between"><div className="min-w-0 flex-1"><div className="flex items-center gap-2 mb-2"><span className="font-bold">第 {index + 1} 条</span><span className="text-xs text-foreground-muted">{link.status === 'disabled' ? '已停用' : link.firstOpenedAt ? `已打开 · ${link.openCount} 次` : '未打开'}</span></div><p className="text-xs md:text-sm font-mono break-all text-foreground-muted">{link.url}</p></div><div className="flex gap-2 shrink-0"><button onClick={() => copyText(link.url)} className="px-3 py-2 text-sm bg-gray-100 rounded-lg">复制</button><button onClick={() => toggleGameLinkStatus(link)} disabled={linkLoading} className="px-3 py-2 text-sm rounded-lg font-medium bg-gray-100">{link.status === 'active' ? '停用' : '恢复'}</button></div></div></div>)}</div> : <p className="text-center text-foreground-muted py-8">暂无专属链接</p>}</section>
    <div className="mt-8 flex justify-center gap-4"><button onClick={handleLogout} className="px-8 py-3 bg-gray-200 text-gray-700 rounded-xl font-bold">退出登录</button><Link href="/" className="px-8 py-3 bg-brand-primary text-white rounded-xl font-bold">返回首页</Link></div>
  </div></div><Footer /></div>;
}
