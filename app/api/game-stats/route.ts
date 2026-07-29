import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const STATS_FILE = path.join(process.cwd(), 'data', 'game-stats.json');

// 读取统计数据
function readStats() {
  try {
    const data = fs.readFileSync(STATS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return { games: {}, lastUpdated: new Date().toISOString() };
  }
}

// 写入统计数据
function writeStats(stats: any) {
  stats.lastUpdated = new Date().toISOString();
  fs.writeFileSync(STATS_FILE, JSON.stringify(stats, null, 2));
}

// GET: 获取游戏统计
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const gameId = searchParams.get('gameId');

  const stats = readStats();

  if (gameId) {
    // 返回单个游戏的统计
    const gameStats = stats.games[gameId] || { playCount: 0, lastPlayed: '' };
    return NextResponse.json(gameStats);
  }

  // 返回所有游戏统计
  return NextResponse.json(stats);
}

// POST: 记录游戏次数
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { gameId, action } = body;

    if (!gameId) {
      return NextResponse.json({ error: '缺少gameId' }, { status: 400 });
    }

    const stats = readStats();

    // 确保游戏存在
    if (!stats.games[gameId]) {
      stats.games[gameId] = { playCount: 0, lastPlayed: '' };
    }

    // 增加游戏次数
    if (action === 'play') {
      stats.games[gameId].playCount += 1;
      stats.games[gameId].lastPlayed = new Date().toISOString();
    }

    writeStats(stats);

    return NextResponse.json({
      success: true,
      gameStats: stats.games[gameId]
    });
  } catch (error) {
    return NextResponse.json({ error: '更新失败' }, { status: 500 });
  }
}