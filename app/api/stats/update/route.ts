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

// POST - 更新AI引用次数
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { aiCitations } = body;

    if (typeof aiCitations !== 'number' || aiCitations < 0) {
      return NextResponse.json(
        { error: 'Invalid aiCitations value' },
        { status: 400 }
      );
    }

    const stats = await readStats();
    stats.aiCitations = aiCitations;
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
