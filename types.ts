
export interface Particle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  opacity: number;
}

export interface Light {
  x: number;
  y: number;
  baseRadius: number;
  radius: number;
  opacity: number;
  vx: number;
  vy: number;
  phase: number;
  pulseSpeed: number;
}

export interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  active: boolean;
  angle: number;
  timer: number;
}

export interface TwinkleStar {
  x: number;
  y: number;
  size: number;
  phase: number;
  speed: number;
  opacity: number;
}

export interface Sparkle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  fadeSpeed: number;
  increasing: boolean;
  active: boolean;
}

export interface GoldDust {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  opacity: number;
  phase: number;
}

export interface GreetingState {
  text: string;
  loading: boolean;
  error: string | null;
}
