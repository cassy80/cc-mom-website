import { randomBytes } from 'crypto';
import { promises as fs } from 'fs';
import path from 'path';

const LINKS_FILE = path.join(process.cwd(), 'data', '24game-links.json');
const MAX_LINKS = 30;

export type GameLinkStatus = 'active' | 'disabled';

export interface GameAccessLink {
  token: string;
  status: GameLinkStatus;
  createdAt: string;
  firstOpenedAt?: string;
  lastOpenedAt?: string;
  openCount: number;
  note?: string;
}

export interface GameLinksDatabase {
  links: GameAccessLink[];
  lastUpdated: string;
}

function emptyDatabase(): GameLinksDatabase {
  return { links: [], lastUpdated: new Date().toISOString() };
}

export async function readGameLinks(): Promise<GameLinksDatabase> {
  try {
    return JSON.parse(await fs.readFile(LINKS_FILE, 'utf8')) as GameLinksDatabase;
  } catch {
    return emptyDatabase();
  }
}

async function writeGameLinks(database: GameLinksDatabase): Promise<void> {
  database.lastUpdated = new Date().toISOString();
  const temporaryFile = `${LINKS_FILE}.tmp`;
  await fs.mkdir(path.dirname(LINKS_FILE), { recursive: true });
  await fs.writeFile(temporaryFile, JSON.stringify(database, null, 2), 'utf8');
  await fs.rename(temporaryFile, LINKS_FILE);
}

function createToken(): string {
  return randomBytes(18).toString('base64url');
}

export async function generateGameLinks(count: number): Promise<GameAccessLink[]> {
  const database = await readGameLinks();
  const remainingCapacity = MAX_LINKS - database.links.length;

  if (remainingCapacity <= 0) {
    throw new Error('专属链接数量已达到30条上限');
  }

  const safeCount = Math.min(Math.max(1, Math.floor(count)), remainingCapacity);
  const existingTokens = new Set(database.links.map((link) => link.token));
  const generated: GameAccessLink[] = [];

  while (generated.length < safeCount) {
    const token = createToken();
    if (existingTokens.has(token)) continue;
    existingTokens.add(token);
    generated.push({
      token,
      status: 'active',
      createdAt: new Date().toISOString(),
      openCount: 0,
      note: `第 ${database.links.length + generated.length + 1} 条专属链接`,
    });
  }

  database.links.push(...generated);
  await writeGameLinks(database);
  return generated;
}

export async function updateGameLinkStatus(token: string, status: GameLinkStatus): Promise<GameAccessLink> {
  const database = await readGameLinks();
  const link = database.links.find((item) => item.token === token);
  if (!link) throw new Error('专属链接不存在');
  link.status = status;
  await writeGameLinks(database);
  return link;
}

export async function recordGameLinkOpen(token: string): Promise<GameAccessLink | null> {
  const database = await readGameLinks();
  const link = database.links.find((item) => item.token === token);
  if (!link || link.status !== 'active') return null;

  const now = new Date().toISOString();
  link.firstOpenedAt ||= now;
  link.lastOpenedAt = now;
  link.openCount += 1;
  await writeGameLinks(database);
  return link;
}

export const GAME_LINK_LIMIT = MAX_LINKS;
