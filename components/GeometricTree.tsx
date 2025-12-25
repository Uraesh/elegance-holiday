
import React from 'react';

interface TreeProps {
  scale?: number;
  position: { left: string; bottom: string };
  delay?: number;
  opacity?: number;
}

const GeometricTree: React.FC<TreeProps> = ({ scale = 1, position, delay = 0, opacity = 1 }) => {
  return (
    <div 
      className="absolute transition-all duration-1000 ease-out flex flex-col items-center"
      style={{ 
        left: position.left, 
        bottom: position.bottom, 
        transform: `scale(${scale})`,
        opacity: opacity,
        animation: `treeSway ${4 + Math.random() * 2}s ease-in-out infinite alternate`,
        animationDelay: `${delay}s`
      }}
    >
      <style>{`
        @keyframes treeSway {
          from { transform: scale(${scale}) rotate(-1.5deg); }
          to { transform: scale(${scale}) rotate(1.5deg); }
        }
        @keyframes starGlow {
          0%, 100% { filter: drop-shadow(0 0 4px rgba(212, 175, 55, 0.6)) brightness(1); }
          50% { filter: drop-shadow(0 0 15px rgba(212, 175, 55, 1)) brightness(1.3) scale(1.05); }
        }
        @keyframes layerShimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes ornamentPulse {
          0%, 100% { 
            transform: scale(1); 
            opacity: 0.7; 
            filter: brightness(1) drop-shadow(0 0 2px currentColor); 
          }
          50% { 
            transform: scale(1.3); 
            opacity: 1; 
            filter: brightness(1.6) drop-shadow(0 0 8px currentColor); 
          }
        }
        @keyframes bodyAura {
          0%, 100% { filter: drop-shadow(0 5px 15px rgba(0,0,0,0.4)); }
          50% { filter: drop-shadow(0 5px 25px rgba(212, 175, 55, 0.15)); }
        }
        .tree-layer {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
          background-size: 200% 100%;
          position: relative;
          overflow: hidden;
          transition: background-color 2s ease;
        }
        .tree-layer::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(
            115deg,
            transparent 30%,
            rgba(255, 255, 255, 0.03) 40%,
            rgba(212, 175, 55, 0.15) 50%,
            rgba(255, 255, 255, 0.03) 60%,
            transparent 70%
          );
          background-size: 200% 100%;
          animation: layerShimmer 5s infinite linear;
          pointer-events: none;
        }
        .tree-body-container {
          animation: bodyAura 4s ease-in-out infinite alternate;
        }
      `}</style>
      
      {/* The Star */}
      <svg width="40" height="40" viewBox="0 0 24 24" className="mb-[-12px] z-10" style={{ animation: 'starGlow 3.5s ease-in-out infinite' }}>
        <path fill="#d4af37" d="M12,2L15.09,8.26L22,9.27L17,14.14L18.18,21.02L12,17.77L5.82,21.02L7,14.14L2,9.27L8.91,8.26L12,2Z" />
      </svg>

      {/* Geometric Tree Body */}
      <div className="relative flex flex-col items-center tree-body-container">
        {/* Top layer */}
        <div 
          className="tree-layer w-[60px] h-[45px] mb-[-25px] z-[3]" 
          style={{ 
            backgroundColor: '#164d35',
            backgroundImage: 'linear-gradient(180deg, #1a5c40 0%, #123d2b 100%)',
            animationDelay: '0.2s'
          }}
        />
        {/* Middle layer */}
        <div 
          className="tree-layer w-[100px] h-[70px] mb-[-35px] z-[2]" 
          style={{ 
            backgroundColor: '#123d2b',
            backgroundImage: 'linear-gradient(180deg, #164d35 0%, #0e2e21 100%)',
            animationDelay: '0.4s'
          }}
        />
        {/* Bottom layer */}
        <div 
          className="tree-layer w-[140px] h-[95px] z-[1]" 
          style={{ 
            backgroundColor: '#0e2e21',
            backgroundImage: 'linear-gradient(180deg, #123d2b 0%, #081d15 100%)',
            animationDelay: '0.6s'
          }}
        />
        
        {/* Trunk with slight texture */}
        <div className="w-8 h-10 bg-[#2d1b0d] mt-[-2px] rounded-b-sm relative overflow-hidden shadow-inner">
            <div className="absolute inset-0 bg-black/30" style={{ clipPath: 'inset(0 50% 0 0)' }} />
            <div className="absolute inset-0 bg-white/5" style={{ clipPath: 'inset(0 0 0 90%)' }} />
        </div>

        {/* Ornament Accents with enhanced pulses and colors */}
        <div 
            className="absolute top-[35px] left-[20px] w-2.5 h-2.5 rounded-full z-10" 
            style={{ 
              backgroundColor: '#9b2226',
              color: '#9b2226',
              animation: 'ornamentPulse 4.2s ease-in-out infinite', 
              animationDelay: '1.2s' 
            }}
        />
        <div 
            className="absolute top-[70px] right-[25px] w-3.5 h-3.5 rounded-full z-10" 
            style={{ 
              backgroundColor: '#d4af37',
              color: '#d4af37',
              animation: 'ornamentPulse 5.5s ease-in-out infinite', 
              animationDelay: '2.8s' 
            }}
        />
        <div 
            className="absolute top-[95px] left-[30px] w-2.5 h-2.5 rounded-full z-10" 
            style={{ 
              backgroundColor: '#9b2226',
              color: '#9b2226',
              animation: 'ornamentPulse 4.8s ease-in-out infinite', 
              animationDelay: '0.7s' 
            }}
        />
        <div 
            className="absolute top-[60px] left-[45%] w-1.5 h-1.5 rounded-full z-10" 
            style={{ 
              backgroundColor: '#f5f5dc',
              color: '#f5f5dc',
              animation: 'ornamentPulse 3.5s ease-in-out infinite',
              animationDelay: '1.5s'
            }}
        />
      </div>
    </div>
  );
};

export default GeometricTree;
