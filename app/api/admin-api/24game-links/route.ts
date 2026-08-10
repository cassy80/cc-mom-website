import { NextRequest, NextResponse } from 'next/server';
import {
  GAME_LINK_LIMIT,
  generateGameLinks,
  readGameLinks,
  updateGameLinkStatus,
  type GameLinkStatus,
} from '@/lib/24game-links';

export const dynamic = 'force-dynamic';

function isAuthorized(request: NextRequest): boolean {
  const password = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  return Boolean(process.env.ADMIN_PASSWORD && password === process.env.ADMIN_PASSWORD);
}

function unauthorized() {
  return NextResponse.json({ success: false, message: '需要管理员权限' }, { status: 401 });
}

function withUrls<T extends { token: string }>(items: T[], origin: string) {
  return items.map((item) => ({
    ...item,
    url: `${origin}/24game/play?k=${encodeURIComponent(item.token)}`,
  }));
}

// Behind the Aliyun Nginx reverse proxy, Next.js may see the internal
// localhost:3000 origin. Always use the public site URL for links sent to
// customers; keep the request origin only as a local-development fallback.
function publicOrigin(request: NextRequest) {
  return (process.env.PUBLIC_SITE_URL || 'https://ccma-ai.com').replace(/\/$/, '') || request.nextUrl.origin;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) return unauthorized();
  const database = await readGameLinks();
  return NextResponse.json({
    success: true,
    limit: GAME_LINK_LIMIT,
    links: withUrls(database.links, publicOrigin(request)),
    lastUpdated: database.lastUpdated,
  });
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) return unauthorized();

  try {
    const body = await request.json();
    const count = Number(body.count ?? 30);
    if (!Number.isFinite(count) || count < 1) {
      return NextResponse.json({ success: false, message: '生成数量必须大于0' }, { status: 400 });
    }

    const generated = await generateGameLinks(count);
    return NextResponse.json({
      success: true,
      generated: withUrls(generated, publicOrigin(request)),
      message: `已生成 ${generated.length} 条专属链接`,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : '生成失败';
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}

export async function PATCH(request: NextRequest) {
  if (!isAuthorized(request)) return unauthorized();

  try {
    const body = await request.json();
    const token = String(body.token || '');
    const status = String(body.status || '') as GameLinkStatus;
    if (!token || !['active', 'disabled'].includes(status)) {
      return NextResponse.json({ success: false, message: '参数不正确' }, { status: 400 });
    }

    const link = await updateGameLinkStatus(token, status);
    return NextResponse.json({
      success: true,
      link: withUrls([link], publicOrigin(request))[0],
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : '更新失败';
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}
