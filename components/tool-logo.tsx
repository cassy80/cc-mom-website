'use client';

interface ToolLogoProps {
  src: string;
  alt: string;
  emoji: string;
}

export default function ToolLogo({ src, alt, emoji }: ToolLogoProps) {
  return (
    <>
      <img
        src={src}
        alt={alt}
        className="w-12 h-12 mx-auto mb-2 rounded"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const emojiElement = target.nextElementSibling as HTMLElement;
          if (emojiElement) {
            emojiElement.classList.remove('hidden');
          }
        }}
      />
      <div className="text-3xl mb-2 hidden">{emoji}</div>
    </>
  );
}
