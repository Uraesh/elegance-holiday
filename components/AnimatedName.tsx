
import React from 'react';

interface AnimatedNameProps {
  name: string;
}

const AnimatedName: React.FC<AnimatedNameProps> = ({ name }) => {
  return (
    <div className="flex justify-center items-center flex-wrap gap-x-1 md:gap-x-2 mb-6 pointer-events-none select-none">
      {name.split('').map((char, index) => (
        <span
          key={index}
          className="text-6xl md:text-8xl font-bold tracking-tight inline-block drop-shadow-[0_5px_15px_rgba(0,0,0,0.3)]"
          style={{
            fontFamily: "'Playfair Display', serif",
            opacity: 0,
            animation: `
              letterEntry 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards,
              shimmer 6s linear infinite alternate,
              rhythmicBounce 3.6s ease-in-out infinite
            `,
            animationDelay: `${index * 0.12}s, ${index * 0.15}s, ${index * 0.1 + 2}s`,
            background: 'linear-gradient(45deg, #d4af37 20%, #f5f5dc 40%, #d4af37 60%, #bf953f 80%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
      <style>{`
        @keyframes letterEntry {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.7) rotate(-5deg);
            filter: blur(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1) rotate(0deg);
            filter: blur(0);
          }
        }
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        @keyframes rhythmicBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
};

export default AnimatedName;
