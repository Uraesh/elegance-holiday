
import React, { useState, useEffect, useCallback } from 'react';
import SnowBackground from './components/SnowBackground';
import GeometricTree from './components/GeometricTree';
import AnimatedName from './components/AnimatedName';
import Garland from './components/Garland';
import { audioService } from './services/audioService';

const App: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleAudio = useCallback(async () => {
    const nextState = !isAudioPlaying;
    await audioService.toggle(nextState);
    setIsAudioPlaying(nextState);
  }, [isAudioPlaying]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0a2a1b] text-[#f5f5dc] selection:bg-[#d4af37] selection:text-[#0a2a1b]">
      {/* Background with snow and lights */}
      <SnowBackground />

      {/* Decorative Garland at the top */}
      <Garland />

      {/* Foreground Trees - Layered for depth */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <GeometricTree scale={0.6} position={{ left: '5%', bottom: '5%' }} delay={0} opacity={0.3} />
        <GeometricTree scale={0.8} position={{ left: '85%', bottom: '10%' }} delay={1.5} opacity={0.4} />
        <GeometricTree scale={1.2} position={{ left: '20%', bottom: '-2%' }} delay={0.8} opacity={0.8} />
        <GeometricTree scale={1.4} position={{ left: '65%', bottom: '-4%' }} delay={2.2} opacity={0.9} />
        <GeometricTree scale={0.7} position={{ left: '40%', bottom: '15%' }} delay={3} opacity={0.2} />
      </div>

      {/* Main UI Overlay - Simplified for static elegance */}
      <main className={`relative z-20 flex flex-col items-center justify-center h-full px-6 transition-all duration-1500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-4xl w-full text-center">
          
          {/* Introductory phrase with elegant styling */}
          <div className={`transition-all duration-1000 delay-500 mb-2 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
             <h2 className="text-xl md:text-2xl font-light tracking-[0.3em] uppercase text-[#d4af37]/70 italic">
                Merry Christmas
             </h2>
          </div>

          {/* Charlotte Animated Name */}
          <AnimatedName name="Charlotte" />

          {/* Minimal decorative element below name */}
          <div className={`mt-8 transition-all duration-1000 delay-[1.2s] flex items-center justify-center space-x-6 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#d4af37]/40" />
            <div className="w-2 h-2 rounded-full border border-[#d4af37]/40" />
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#d4af37]/40" />
          </div>
        </div>
      </main>

      {/* Decorative Ground Overlay */}
      <div className="absolute bottom-0 w-full h-48 bg-gradient-to-t from-[#0a2a1b] via-[#0a2a1b]/80 to-transparent z-15 pointer-events-none" />

      {/* Audio Toggle */}
      <div className="fixed bottom-10 right-10 z-40 group">
        <button 
          onClick={toggleAudio}
          className={`
            w-14 h-14 rounded-full border flex items-center justify-center cursor-pointer 
            transition-all duration-500 ease-out shadow-lg outline-none
            active:scale-90 hover:shadow-[0_0_25px_rgba(212,175,55,0.3)]
            ${isAudioPlaying 
              ? 'bg-[#d4af37] text-[#0a2a1b] border-[#d4af37] scale-110 hover:scale-[1.15]' 
              : 'bg-[#0a2a1b]/60 text-[#f5f5dc] border-[#f5f5dc]/20 hover:bg-[#0e3a26] hover:border-[#d4af37]/40 hover:scale-105'
            }
          `}
          aria-label={isAudioPlaying ? "Couper la musique" : "Écouter la magie"}
        >
          {isAudioPlaying ? (
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.85 14,18.71V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16.03C15.5,15.29 16.5,13.77 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
            </svg>
          ) : (
            <svg className="w-7 h-7 opacity-70" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16.5,12L19.7,15.2C20.5,14.2 21,13.1 21,12C21,7.7 18,4.1 14,3.2V5.2C16.8,6.1 19,8.8 19,12C19,12.4 19,12.8 18.9,13.2L16.5,10.8V12M14,18.7V20.7C18,19.8 21,16.2 21,12C21,11.3 20.9,10.6 20.7,10L18.7,12C18.7,12 18.7,12 18.7,12C18.7,14.4 17.3,16.5 15.2,17.7L14,18.7M4.3,3L3,4.3L7.7,9H3V15H7L12,20V13.3L16.5,17.8C15.8,18.3 15,18.6 14,18.8V20.8C15.5,20.5 16.8,19.9 17.9,19.1L20.7,21.9L22,20.6L4.3,3M12,4L9.9,6.1L12,8.2V4Z" />
            </svg>
          )}
        </button>
        <span className={`
          absolute right-16 bottom-4 whitespace-nowrap text-[10px] uppercase tracking-[0.2em] font-bold 
          transition-all duration-500 pointer-events-none 
          group-hover:opacity-100 group-hover:translate-x-0 
          opacity-0 translate-x-3
          ${isAudioPlaying ? 'text-[#d4af37]' : 'text-[#f5f5dc]/60'}
        `}>
          {isAudioPlaying ? "Mélodie Activée" : "Écouter la Magie"}
        </span>
      </div>
    </div>
  );
};

export default App;
