
import React, { useEffect, useRef } from 'react';
import { Particle, Light, ShootingStar, TwinkleStar, Sparkle, GoldDust } from '../types';

const SnowBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const lights = useRef<Light[]>([]);
  const shootingStars = useRef<ShootingStar[]>([]);
  const twinkleStars = useRef<TwinkleStar[]>([]);
  const sparkles = useRef<Sparkle[]>([]);
  const goldDust = useRef<GoldDust[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const init = () => {
      // Initialize Snow Particles
      particles.current = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 10000);
      for (let i = 0; i < particleCount; i++) {
        const isLarge = Math.random() > 0.96;
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: isLarge ? Math.random() * 2.5 + 1 : Math.random() * 1.5 + 0.5,
          vx: (Math.random() - 0.5) * 0.4,
          vy: Math.random() * 0.7 + 0.2,
          opacity: isLarge ? Math.random() * 0.6 + 0.2 : Math.random() * 0.4 + 0.1,
        });
      }

      // Initialize Gold Dust
      goldDust.current = [];
      const dustCount = Math.floor((canvas.width * canvas.height) / 8000);
      for (let i = 0; i < dustCount; i++) {
        goldDust.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 0.8 + 0.2,
          vx: (Math.random() * 0.2 + 0.1),
          vy: (Math.random() * 0.1 + 0.05),
          opacity: Math.random() * 0.5 + 0.2,
          phase: Math.random() * Math.PI * 2,
        });
      }

      // Initialize Ambient Glows
      lights.current = [];
      for (let i = 0; i < 6; i++) {
        const baseRadius = Math.random() * 350 + 200;
        lights.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          baseRadius: baseRadius,
          radius: baseRadius,
          opacity: 0.02 + Math.random() * 0.03,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          phase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.002 + Math.random() * 0.004,
        });
      }

      // Initialize Twinkle Stars
      twinkleStars.current = [];
      for (let i = 0; i < 45; i++) {
        twinkleStars.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.8,
          size: Math.random() * 1.2 + 0.4,
          phase: Math.random() * Math.PI * 2,
          speed: 0.01 + Math.random() * 0.03,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }

      shootingStars.current = [];
      sparkles.current = [];
    };

    const spawnShootingStar = () => {
      if (Math.random() > 0.998) {
        shootingStars.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * (canvas.height * 0.35),
          length: Math.random() * 120 + 60,
          speed: Math.random() * 12 + 15,
          opacity: 1,
          active: true,
          angle: Math.PI / 6 + (Math.random() * 0.25),
          timer: 0
        });
      }
    };

    const spawnSparkle = () => {
      if (Math.random() > 0.985) {
        sparkles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          opacity: 0,
          fadeSpeed: 0.008 + Math.random() * 0.015,
          increasing: true,
          active: true
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw Ambient Lights
      lights.current.forEach(light => {
        light.x += light.vx;
        light.y += light.vy;
        light.phase += light.pulseSpeed;

        const pulseFactor = (Math.sin(light.phase) * 0.6 + Math.sin(light.phase * 2.2) * 0.4);
        light.radius = light.baseRadius + pulseFactor * (light.baseRadius * 0.22);

        if (light.x < -light.radius) light.x = canvas.width + light.radius;
        if (light.x > canvas.width + light.radius) light.x = -light.radius;
        if (light.y < -light.radius) light.y = canvas.height + light.radius;
        if (light.y > canvas.height + light.radius) light.y = -light.radius;

        const gradient = ctx.createRadialGradient(light.x, light.y, 0, light.x, light.y, light.radius);
        const jitter = Math.sin(Date.now() * 0.007 + light.phase) * 0.006;
        const currentOpacity = Math.max(0, light.opacity + jitter);
        
        gradient.addColorStop(0, `rgba(212, 175, 55, ${currentOpacity})`);
        gradient.addColorStop(0.4, `rgba(212, 175, 55, ${currentOpacity * 0.4})`);
        gradient.addColorStop(1, 'rgba(10, 42, 27, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      // 2. Draw Twinkle Stars
      twinkleStars.current.forEach(star => {
        star.phase += star.speed;
        const twinkleOpacity = Math.max(0.1, star.opacity + Math.sin(star.phase) * 0.4);
        ctx.beginPath();
        ctx.fillStyle = `rgba(245, 245, 220, ${twinkleOpacity})`;
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Draw Gold Dust (New subtle element)
      goldDust.current.forEach(dust => {
        dust.phase += 0.01;
        dust.x += dust.vx + Math.cos(dust.phase) * 0.2;
        dust.y += dust.vy + Math.sin(dust.phase) * 0.1;

        if (dust.x > canvas.width) dust.x = 0;
        if (dust.y > canvas.height) dust.y = 0;

        const currentOpacity = dust.opacity * (0.5 + Math.sin(dust.phase * 0.5) * 0.5);
        ctx.beginPath();
        ctx.fillStyle = `rgba(212, 175, 55, ${currentOpacity})`;
        ctx.arc(dust.x, dust.y, dust.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 4. Draw Sparkles
      spawnSparkle();
      sparkles.current = sparkles.current.filter(s => s.active);
      sparkles.current.forEach(s => {
        if (s.increasing) {
          s.opacity += s.fadeSpeed;
          if (s.opacity >= 0.7) s.increasing = false;
        } else {
          s.opacity -= s.fadeSpeed;
          if (s.opacity <= 0) s.active = false;
        }
        ctx.fillStyle = `rgba(245, 245, 220, ${s.opacity})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 5. Draw Shooting Stars
      spawnShootingStar();
      shootingStars.current = shootingStars.current.filter(s => s.active);
      shootingStars.current.forEach(s => {
        const dx = Math.cos(s.angle) * s.speed;
        const dy = Math.sin(s.angle) * s.speed;
        const gradient = ctx.createLinearGradient(s.x, s.y, s.x - dx * 6, s.y - dy * 6);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${s.opacity})`);
        gradient.addColorStop(0.1, `rgba(212, 175, 55, ${s.opacity})`);
        gradient.addColorStop(1, 'rgba(212, 175, 55, 0)');
        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.2;
        ctx.lineCap = 'round';
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - Math.cos(s.angle) * s.length, s.y - Math.sin(s.angle) * s.length);
        ctx.stroke();
        s.x += dx;
        s.y += dy;
        s.opacity -= 0.01;
        if (s.opacity <= 0) s.active = false;
      });

      // 6. Draw Snow
      ctx.fillStyle = '#f5f5dc';
      particles.current.forEach(p => {
        p.y += p.vy;
        p.x += p.vx + Math.sin(Date.now() * 0.001 + p.y * 0.01) * 0.2;
        if (p.y > canvas.height) {
          p.y = -10;
          p.x = Math.random() * canvas.width;
        }
        ctx.beginPath();
        ctx.globalAlpha = p.opacity;
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => window.removeEventListener('resize', resize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
};

export default SnowBackground;
