'use client';

import { useState, useEffect, useRef } from 'react';

export default function ShibaInteractive() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // 追踪鼠标位置
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // 计算鼠标相对于卡片中心的位置
        const x = (e.clientX - centerX) / (rect.width / 2);
        const y = (e.clientY - centerY) / (rect.height / 2);

        // 限制移动范围
        setMousePosition({
          x: Math.max(-1, Math.min(1, x)),
          y: Math.max(-1, Math.min(1, y))
        });
      }
    };

    if (isHovered) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [isHovered]);

  // 自动眨眼
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  // 计算眼睛移动偏移量（最大3px）
  const eyeOffset = 3;
  const leftEyeX = mousePosition.x * eyeOffset;
  const leftEyeY = mousePosition.y * eyeOffset;
  const rightEyeX = mousePosition.x * eyeOffset;
  const rightEyeY = mousePosition.y * eyeOffset;

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      className="absolute -left-6 top-12 bg-white rounded-2xl shadow-xl p-6 border border-border w-72 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
    >
      {/* 标题 */}
      <div className="text-center mb-4">
        <div className="text-sm font-bold text-foreground mb-1">
          AI学习小助手
        </div>
        <div className="text-xs text-foreground-muted">
          移动鼠标，我和你互动！
        </div>
      </div>

      {/* 小柴犬SVG */}
      <svg
        viewBox="0 0 200 200"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 身体 */}
        <ellipse cx="100" cy="150" rx="45" ry="35" fill="#D4A574" />

        {/* 尾巴 - 卷曲 */}
        <path
          d="M 145 150 Q 165 130 155 155 Q 150 165 145 155"
          fill="#D4A574"
          stroke="#C49A6C"
          strokeWidth="2"
        >
          <animate
            attributeName="d"
            dur="2s"
            repeatCount="indefinite"
            values="M 145 150 Q 165 130 155 155 Q 150 165 145 155;M 145 150 Q 170 135 160 155 Q 155 168 145 155;M 145 150 Q 165 130 155 155 Q 150 165 145 155"
          />
        </path>

        {/* 头 */}
        <circle cx="100" cy="100" r="50" fill="#D4A574" />

        {/* 脸部白色区域 */}
        <ellipse cx="100" cy="115" rx="35" ry="25" fill="#FFF8F0" />

        {/* 左耳 */}
        <path
          d="M 65 70 L 55 30 L 85 55 Z"
          fill="#C49A6C"
          stroke="#B8906A"
          strokeWidth="2"
        >
          {isHovered && (
            <animate
              attributeName="d"
              dur="0.5s"
              fill="freeze"
              values="M 65 70 L 55 30 L 85 55 Z;M 65 70 L 58 35 L 85 55 Z"
            />
          )}
        </path>

        {/* 右耳 */}
        <path
          d="M 135 70 L 145 30 L 115 55 Z"
          fill="#C49A6C"
          stroke="#B8906A"
          strokeWidth="2"
        >
          {isHovered && (
            <animate
              attributeName="d"
              dur="0.5s"
              fill="freeze"
              values="M 135 70 L 145 30 L 115 55 Z;M 135 70 L 142 35 L 115 55 Z"
            />
          )}
        </path>

        {/* 左眼 - 眼白 */}
        <ellipse cx="82" cy="95" rx="12" ry="14" fill="white" />

        {/* 右眼 - 眼白 */}
        <ellipse cx="118" cy="95" rx="12" ry="14" fill="white" />

        {/* 左眼 - 眼珠（跟随鼠标） */}
        <g
          style={{
            transition: isBlinking ? 'none' : 'transform 0.1s ease-out',
            transform: `translate(${leftEyeX}px, ${leftEyeY}px)`,
          }}
        >
          <ellipse
            cx="82"
            cy="97"
            rx={isBlinking ? 12 : 6}
            ry={isBlinking ? 0.5 : 7}
            fill="#3D3D3D"
          />
          {/* 眼睛高光 */}
          {!isBlinking && (
            <circle cx="85" cy="94" r="2.5" fill="white" opacity="0.8" />
          )}
        </g>

        {/* 右眼 - 眼珠（跟随鼠标） */}
        <g
          style={{
            transition: isBlinking ? 'none' : 'transform 0.1s ease-out',
            transform: `translate(${rightEyeX}px, ${rightEyeY}px)`,
          }}
        >
          <ellipse
            cx="118"
            cy="97"
            rx={isBlinking ? 12 : 6}
            ry={isBlinking ? 0.5 : 7}
            fill="#3D3D3D"
          />
          {/* 眼睛高光 */}
          {!isBlinking && (
            <circle cx="121" cy="94" r="2.5" fill="white" opacity="0.8" />
          )}
        </g>

        {/* 鼻子 */}
        <ellipse cx="100" cy="115" rx="8" ry="6" fill="#3D3D3D" />
        <ellipse cx="100" cy="114" rx="3" ry="2" fill="#5A5A5A" />

        {/* 嘴巴 - 微笑 */}
        <path
          d="M 90 125 Q 100 132 110 125"
          stroke="#3D3D3D"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* 腮红 */}
        <ellipse cx="70" cy="110" rx="8" ry="5" fill="#FFB6C1" opacity="0.4" />
        <ellipse cx="130" cy="110" rx="8" ry="5" fill="#FFB6C1" opacity="0.4" />
      </svg>

      {/* 底部提示 */}
      <div className="text-center mt-3">
        <div className="text-xs text-foreground-muted">
          {isHovered ? '🎉 你发现我了！' : '👆 把鼠标移过来'}
        </div>
      </div>

      {/* 装饰元素 - 学习相关图标 */}
      <div className="flex justify-center gap-2 mt-3">
        <span className="text-lg">📚</span>
        <span className="text-lg">💡</span>
        <span className="text-lg">🎯</span>
      </div>
    </div>
  );
}
