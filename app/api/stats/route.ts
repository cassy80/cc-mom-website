import { NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const STATS_FILE = join(process.cwd(), 'data', 'stats.json');

// 读取统计数据
async function readStats() {
  try {
    const data = await readFile(STATS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // 如果文件不存在，返回默认值
    return {
      views: 0,
      aiCitations: 0,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
  }
}

// 写入统计数据
async function writeStats(stats: any) {
  await writeFile(STATS_FILE, JSON.stringify(stats, null, 2), 'utf-8');
}

// GET - 获取统计数据
export async function GET() {
  try {
    const stats = await readStats();
    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to read stats' },
      { status: 500 }
    );
  }
}

// POST - 增加访问量
export async function POST() {
  try {
    const stats = await readStats();
    stats.views += 1;
    stats.lastUpdated = new Date().toISOString().split('T')[0];
    await writeStats(stats);
    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update stats' },
      { status: 500 }
    );
  }
}
