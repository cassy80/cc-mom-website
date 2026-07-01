'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-2xl font-bold text-foreground mb-4">
          出错了！
        </h2>
        <p className="text-foreground-muted mb-6">
          {error.message || '页面加载失败，请稍后重试。'}
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-brand-primary text-white rounded-lg hover:bg-brand-primary-dark transition-colors"
        >
          重试
        </button>
      </div>
    </div>
  );
}
