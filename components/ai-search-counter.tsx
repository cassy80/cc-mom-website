'use client';

import { useEffect, useState } from 'react';

export default function AISearchCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // 从localStorage读取计数
    const storedCount = localStorage.getItem('ai-search-count');
    const currentCount = storedCount ? parseInt(storedCount, 10) : 0;

    // 每次访问时增加计数（模拟AI搜索/推荐）
    const newCount = currentCount + 1;
    localStorage.setItem('ai-search-count', newCount.toString());

    setCount(newCount);
  }, []);

  return (
    <div className="fixed bottom-2 right-2 text-xs text-foreground/5 select-none z-50">
      AI:{count}
    </div>
  );
}
