import { promises as fs } from 'fs';
import path from 'path';

const KEYS_FILE = path.join(process.cwd(), 'data', 'card-keys.json');

export interface CardKey {
  code: string;
  totalUses: number;
  remainingUses: number;
  createdAt: string;
  note?: string;
}

export interface KeysDatabase {
  keys: CardKey[];
  lastUpdated: string;
}

/**
 * 读取卡密数据库
 */
export async function readKeys(): Promise<KeysDatabase> {
  try {
    const data = await fs.readFile(KEYS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // 如果文件不存在，返回空数据库
    return {
      keys: [],
      lastUpdated: new Date().toISOString()
    };
  }
}

/**
 * 保存卡密数据库
 */
export async function writeKeys(data: KeysDatabase): Promise<void> {
  data.lastUpdated = new Date().toISOString();
  await fs.writeFile(KEYS_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

/**
 * 验证卡密是否有效
 */
export async function validateKey(code: string): Promise<{
  valid: boolean;
  key?: CardKey;
  message: string;
}> {
  const db = await readKeys();
  const key = db.keys.find(k => k.code === code);

  if (!key) {
    return {
      valid: false,
      message: '卡密不存在，请检查后重试'
    };
  }

  if (key.remainingUses <= 0) {
    return {
      valid: false,
      message: '该卡密使用次数已用完，请联系客服'
    };
  }

  return {
    valid: true,
    key,
    message: '卡密验证成功'
  };
}

/**
 * 扣减卡密使用次数
 */
export async function decrementUsage(code: string): Promise<void> {
  const db = await readKeys();
  const keyIndex = db.keys.findIndex(k => k.code === code);

  if (keyIndex === -1) {
    throw new Error('卡密不存在');
  }

  if (db.keys[keyIndex].remainingUses > 0) {
    db.keys[keyIndex].remainingUses -= 1;
    await writeKeys(db);
  }
}

/**
 * 获取卡密剩余次数
 */
export async function getRemainingUses(code: string): Promise<number> {
  const result = await validateKey(code);
  return result.key?.remainingUses || 0;
}
