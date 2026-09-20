import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '学习地图 · CC妈育见AI',
  description: '探索小学数学互动知识地图，未来逐步加入语文与英语。',
};

export default function LearningMapsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
