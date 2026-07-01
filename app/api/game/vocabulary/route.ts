import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    // 读取词汇数据文件
    const vocabPath = path.join(process.cwd(), 'data', 'vocabulary-complete.json');
    const fileContents = fs.readFileSync(vocabPath, 'utf-8');
    const vocabularyData = JSON.parse(fileContents);

    return NextResponse.json({
      success: true,
      data: vocabularyData,
    });
  } catch (error) {
    console.error('Error loading vocabulary:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to load vocabulary data',
      data: null,
    }, { status: 500 });
  }
}
