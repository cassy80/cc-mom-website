import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * 加载词汇表数据（服务器端专用）
 */
export function loadVocabulary(): Record<string, string[]> {
  try {
    const vocabularyPath = join(process.cwd(), 'data', 'vocabulary-by-grade.json');
    const data = readFileSync(vocabularyPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('无法加载词汇表：', error);
    return {};
  }
}
