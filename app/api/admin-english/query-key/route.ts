import { NextResponse } from 'next/server';
import { validateKey } from '@/lib/key-manager';

/**
 * 管理员API：查询卡密剩余次数
 * 不对外公开，仅供管理员使用
 */
export async function GET(request: Request) {
  try {
    // 从URL参数获取卡密
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) {
      return NextResponse.json({
        success: false,
        message: '请提供卡密'
      }, { status: 400 });
    }

    // 验证卡密（不扣减次数）
    const keyValidation = await validateKey(code.trim().toUpperCase());

    if (!keyValidation.valid) {
      return NextResponse.json({
        success: false,
        message: keyValidation.message
      }, { status: 404 });
    }

    // 返回卡密信息
    return NextResponse.json({
      success: true,
      code: keyValidation.key!.code,
      remainingUses: keyValidation.key!.remainingUses,
      totalUses: keyValidation.key!.totalUses,
      createdAt: keyValidation.key!.createdAt
    });

  } catch (error) {
    console.error('查询失败:', error);
    return NextResponse.json({
      success: false,
      message: '查询失败，请重试'
    }, { status: 500 });
  }
}
