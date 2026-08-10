import { promises as fs } from 'fs';
import path from 'path';
import { recordGameLinkOpen } from '@/lib/24game-links';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const GAME_DIRECTORY = path.join(process.cwd(), 'public', 'games', '24-point');

function messagePage(title: string, message: string, status: number) {
  const html = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex,nofollow" />
  <title>${title}</title>
  <style>
    *{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;padding:24px;background:#0f3a30;font-family:Inter,"PingFang SC","Microsoft YaHei",sans-serif;color:#18332c}.box{width:min(520px,100%);padding:38px 28px;border-radius:22px;background:#fffdf8;text-align:center;box-shadow:0 24px 60px rgba(0,0,0,.28)}.mark{font:900 44px/1 Georgia,serif;color:#c94a43}.box h1{margin:20px 0 10px;font-size:25px}.box p{margin:0;color:#71817c;line-height:1.8}.box a{display:inline-block;margin-top:24px;padding:12px 20px;border-radius:10px;background:#174e40;color:white;text-decoration:none;font-weight:800}
  </style>
</head>
<body><main class="box"><div class="mark">24</div><h1>${title}</h1><p>${message}</p><a href="/">返回网站首页</a></main></body>
</html>`;

  return new Response(html, {
    status,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get('k')?.trim();
  if (!token) {
    return messagePage('需要专属游戏链接', '请使用购买后收到的完整链接进入游戏。', 403);
  }

  const link = await recordGameLinkOpen(token);
  if (!link) {
    return messagePage('链接无效或已停用', '请检查链接是否完整；如仍无法打开，请联系店铺客服。', 403);
  }

  try {
    const [sourceHtml, styles, script] = await Promise.all([
      fs.readFile(path.join(GAME_DIRECTORY, 'index.html'), 'utf8'),
      fs.readFile(path.join(GAME_DIRECTORY, 'styles.css'), 'utf8'),
      fs.readFile(path.join(GAME_DIRECTORY, 'game.js'), 'utf8'),
    ]);

    const protectedHtml = sourceHtml
      .replace(/<link\s+rel="stylesheet"[^>]*>/i, `<style>${styles}</style>`)
      .replace(/<script\s+src="game\.js[^>]*><\/script>/i, `<script>${script}</script>`)
      .replace('</head>', '<meta name="robots" content="noindex,nofollow" /></head>');

    return new Response(protectedHtml, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'private, no-store, max-age=0',
        'X-Robots-Tag': 'noindex, nofollow',
        'Referrer-Policy': 'no-referrer',
      },
    });
  } catch (error) {
    console.error('读取24点游戏文件失败:', error);
    return messagePage('游戏暂时无法加载', '请稍后刷新页面重试。', 500);
  }
}
