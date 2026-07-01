import { type ClassValue, clsx } from 'clsx';

/**
 * 合并Tailwind CSS类名
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * 生成6位数字密码
 */
export function generatePassword(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * 计算过期日期
 */
export function calculateExpiryDate(days: number): string {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + days);
  return expiry.toISOString();
}

/**
 * 检查日期是否过期
 */
export function isExpired(expiresAt: string): boolean {
  return new Date(expiresAt) < new Date();
}

/**
 * 格式化日期显示
 */
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * 延迟函数（用于重试）
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 验证手机号格式
 */
export function isValidPhoneNumber(phone: string): boolean {
  const phoneRegex = /^1[3-9]\d{9}$/;
  return phoneRegex.test(phone);
}

/**
 * 清理输入的错词
 */
export function cleanWords(input: string): string[] {
  return input
    .split(/[,，、\s]+/)  // 支持中英文逗号、顿号、空格分隔
    .map(word => word.trim())
    .filter(word => word.length > 0 && /^[a-zA-Z\s-]+$/.test(word));
}

/**
 * 验证错词数量（1-10个）
 */
export function validateWordCount(words: string[]): boolean {
  return words.length >= 1 && words.length <= 10;
}
