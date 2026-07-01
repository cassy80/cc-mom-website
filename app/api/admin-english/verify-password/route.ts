import { NextResponse } from 'next/server';

/**
 * 管理员API：验证管理员密码
 * 用于管理后台登录
 */
export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    // 直接硬编码密码（英语学习管理后台专用）
    const correctPassword = 'admin888';

    // 验证密码
    if (password === correctPassword) {
      return NextResponse.json({
        success: true,
        message: '密码验证成功'
      });
    } else {
      return NextResponse.json({
        success: false,
        message: '密码错误'
      }, { status: 401 });
    }

  } catch (error) {
    console.error('密码验证失败:', error);
    return NextResponse.json({
      success: false,
      message: '验证失败，请重试'
    }, { status: 500 });
  }
}
