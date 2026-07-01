import { NextResponse } from 'next/server';
import { readKeys } from '@/lib/key-manager';

/**
 * 管理员API：获取所有卡密列表
 * 用于管理后台界面
 * 需要通过前端 sessionStorage 验证（已登录用户才能访问）
 */
export async function GET(request: Request) {
  try {
    // 从请求头获取认证信息
    const authHeader = request.headers.get('authorization');
    const password = authHeader?.replace('Bearer ', '');

    // 验证密码（英语管理后台专用）
    const correctPassword = 'admin888';

    if (password !== correctPassword) {
      return NextResponse.json({
        success: false,
        message: '需要管理员权限'
      }, { status: 401 });
    }

    const database = await readKeys();

    return NextResponse.json({
      success: true,
      keys: database.keys,
      lastUpdated: database.lastUpdated
    });

  } catch (error) {
    console.error('获取卡密列表失败:', error);
    return NextResponse.json({
      success: false,
      message: '获取失败，请重试'
    }, { status: 500 });
  }
}
