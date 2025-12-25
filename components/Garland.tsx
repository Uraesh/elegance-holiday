
import React from 'react';

const Garland: React.FC = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-48 z-30 pointer-events-none select-none overflow-hidden">
      <svg width="100%" height="100%" viewBox="0 0 1200 160" preserveAspectRatio="none" className="drop-shadow-2xl">
        <style>{`
          .garland-rope {
            stroke: #d4af37;
            stroke-width: 1.2;
            fill: none;
            opacity: 0.8;
            filter: drop-shadow(0 0 3px rgba(212, 175, 55, 0.5));
          }
          .pine-needles {
            stroke: #0a2a1b;
            stroke-width: 0.5;
            opacity: 0.4;
          }
          .garland-ornament {
            filter: drop-shadow(0 0 8px currentColor);
            animation: ornamentSparkle var(--duration) ease-in-out infinite;
            animation-delay: var(--delay);
            transform-origin: center;
          }
          .glitter-particle {
            fill: #f5f5dc;
            animation: glitterFade var(--duration) ease-in-out infinite;
            animation-delay: var(--delay);
          }
          @keyframes ornamentSparkle {
            0%, 100% { opacity: 0.5; transform: scale(0.9) rotate(-5deg); filter: brightness(1) blur(0px); }
            50% { opacity: 1; transform: scale(1.15) rotate(5deg); filter: brightness(1.8) blur(1px); }
          }
          @keyframes glitterFade {
            0%, 100% { opacity: 0.2; transform: translateY(0); }
            50% { opacity: 0.8; transform: translateY(5px); }
          }
          .garland-sway {
            animation: deepSway 10s ease-in-out infinite alternate;
          }
          @keyframes deepSway {
            from { transform: translateY(0) rotate(-0.5deg); }
            to { transform: translateY(8px) rotate(0.5deg); }
          }
        `}</style>
        
        <g className="garland-sway">
          {/* Background Shadow Thread */}
          <path d="M-50,5 Q200,130 400,5 T800,5 T1250,5" fill="none" stroke="#000" strokeWidth="3" opacity="0.1" />

          {/* Pine Needle Texture / "Fir" layer */}
          {[...Array(60)].map((_, i) => {
            const x = (i / 59) * 1300 - 50;
            const yOffset = Math.sin((i / 59) * Math.PI * 3) * 60 + 20;
            return (
              <g key={`fir-${i}`} transform={`translate(${x}, ${yOffset}) rotate(${Math.sin(i) * 45})`}>
                <line x1="0" y1="0" x2="0" y2="12" className="pine-needles" stroke="#164d35" />
                <line x1="0" y1="0" x2="4" y2="8" className="pine-needles" stroke="#0e2e21" />
                <line x1="0" y1="0" x2="-4" y2="8" className="pine-needles" stroke="#1a5c40" />
              </g>
            );
          })}

          {/* The Main Golden Rope */}
          <path d="M-50,0 Q200,125 400,0 T800,0 T1250,0" className="garland-rope" />
          <path d="M-40,5 Q210,120 410,5 T810,5 T1240,5" className="garland-rope" style={{ opacity: 0.4, strokeWidth: 0.6 }} />
          
          {/* Hanging Glitter Dust */}
          {[...Array(40)].map((_, i) => {
            const x = (i / 39) * 1200;
            const y = Math.sin((i / 39) * Math.PI * 3) * 62 + 15;
            const duration = `${2 + Math.random() * 3}s`;
            const delay = `${Math.random() * 5}s`;
            return (
              <circle
                key={`glitter-${i}`}
                cx={x + (Math.random() - 0.5) * 10}
                cy={y + 10 + Math.random() * 20}
                r={Math.random() * 1.2 + 0.3}
                className="glitter-particle"
                style={{ '--duration': duration, '--delay': delay } as React.CSSProperties}
              />
            );
          })}

          {/* Ornaments - Diverse Shapes */}
          {[...Array(30)].map((_, i) => {
            const progress = i / 29;
            const x = progress * 1200;
            const y = Math.sin(progress * Math.PI * 3) * 60 + 35;
            const colors = ['#d4af37', '#9b2226', '#f5f5dc', '#d4af37', '#e2c275'];
            const color = colors[i % colors.length];
            const delay = `${Math.random() * 6}s`;
            const duration = `${3.5 + Math.random() * 2.5}s`;
            
            // Alternate between circle, star, and teardrop
            const type = i % 3;
            
            if (type === 0) { // Glowing Circle
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={i % 5 === 0 ? 4 : 2.5}
                  fill={color}
                  className="garland-ornament"
                  style={{ '--delay': delay, '--duration': duration, color: color } as React.CSSProperties}
                />
              );
            } else if (type === 1) { // Star Ornament
              return (
                <path
                  key={i}
                  d="M0,-5 L1.5,-1.5 L5,0 L1.5,1.5 L0,5 L-1.5,1.5 L-5,0 L-1.5,-1.5 Z"
                  transform={`translate(${x}, ${y}) scale(${0.8 + Math.random() * 0.5})`}
                  fill={color}
                  className="garland-ornament"
                  style={{ '--delay': delay, '--duration': duration, color: color } as React.CSSProperties}
                />
              );
            } else { // Teardrop / Bauble
              return (
                <path
                  key={i}
                  d="M0,0 C2,0 4,3 4,6 C4,9 2,11 0,11 C-2,11 -4,9 -4,6 C-4,3 -2,0 0,0 Z"
                  transform={`translate(${x}, ${y}) scale(${0.7 + Math.random() * 0.4})`}
                  fill={color}
                  className="garland-ornament"
                  style={{ '--delay': delay, '--duration': duration, color: color } as React.CSSProperties}
                />
              );
            }
          })}
        </g>
      </svg>
    </div>
  );
};

export default Garland;
