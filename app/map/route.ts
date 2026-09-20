import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const runtime = 'nodejs';

const mapHtml = path.join(process.cwd(), 'public', 'learning-maps', 'math', 'index.html');

export async function GET() {
  const html = await readFile(mapHtml, 'utf8');
  const page = html
    .replace('<head>', '<head><base href="/learning-maps/math/"><link rel="canonical" href="https://ccma-ai.com/map">')
    .replace('class="brand" href="./"', 'class="brand" href="/map"');

  return new Response(page, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
    },
  });
}
