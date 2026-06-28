import type { CSSProperties } from 'react';

export interface CSSCustomProperties extends CSSProperties {
  '--mx': string;
  '--my': string;
  '--rx': string;
  '--ry': string;
}

export interface MouseLightCoords {
  mx: string;
  my: string;
  rx: string;
  ry: string;
}

export const DEFAULT_LIGHT: MouseLightCoords = {
  mx: '50%',
  my: '40%',
  rx: '0deg',
  ry: '0deg',
};

export function computeMouseLight(
  clientX: number,
  clientY: number,
  rect: DOMRect,
  tiltStrength = 6,
): MouseLightCoords {
  const x = clientX - rect.left;
  const y = clientY - rect.top;
  const xc = rect.width / 2;
  const yc = rect.height / 2;
  return {
    mx: `${x}px`,
    my: `${y}px`,
    rx: `${((yc - y) / yc) * tiltStrength}deg`,
    ry: `${((x - xc) / xc) * tiltStrength}deg`,
  };
}

export function applyMouseLight(el: HTMLElement, coords: MouseLightCoords): void {
  el.style.setProperty('--mx', coords.mx);
  el.style.setProperty('--my', coords.my);
  el.style.setProperty('--rx', coords.rx);
  el.style.setProperty('--ry', coords.ry);
}

export const BASE_PLATE_SHADOW =
  '0 50px 100px -20px rgba(0,0,0,0.92), 0 0 0 1px rgba(255,255,255,0.05), 0 12px 40px -12px rgba(60,5,10,0.32), inset 0 1px 1px 0 rgba(255,255,255,0.14), inset 0 -2px 14px 0 rgba(0,0,0,0.6)';

export const CARD_SHELL_SHADOW =
  '0 40px 80px -20px rgba(0,0,0,0.92), 0 0 0 1px rgba(255,255,255,0.08), 0 16px 48px -12px rgba(60,5,10,0.45), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -4px 16px rgba(0,0,0,0.6)';

export const NEUTRAL_CARD_SHELL_SHADOW =
  '0 40px 80px -20px rgba(0,0,0,0.92), 0 0 0 1px rgba(255,255,255,0.08), 0 16px 48px -12px rgba(18,20,28,0.5), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -4px 16px rgba(0,0,0,0.6)';

export type SmokyGlassTone = 'crimson' | 'neutral';

export interface SmokyGlassTonePreset {
  glowColor: string;
  edgeAccent: string;
  hoverBorderClass: string;
  hoverShadowClass: string;
  hazeBackground: string;
  sheenBackground: string;
  innerHazeBackground: string;
  bottomEdgeBackground: string;
}

export const SMOKY_GLASS_TONES: Record<SmokyGlassTone, SmokyGlassTonePreset> = {
  crimson: {
    glowColor: 'rgba(127, 29, 29, 0.28)',
    edgeAccent: 'rgba(153, 27, 27, 0.45)',
    hoverBorderClass: 'group-hover:border-red-900/40',
    hoverShadowClass: 'group-hover:shadow-[0_0_40px_-8px_rgba(127,29,29,0.4)]',
    hazeBackground:
      'radial-gradient(ellipse 120% 90% at 30% 20%, rgba(40,8,12,0.48) 0%, transparent 55%), radial-gradient(ellipse 100% 80% at 75% 85%, rgba(20,4,6,0.55) 0%, transparent 60%), linear-gradient(160deg, rgba(30,6,10,0.38) 0%, rgba(8,2,4,0.2) 50%, rgba(15,4,8,0.42) 100%)',
    sheenBackground:
      'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 45%, rgba(80,20,25,0.05) 70%, transparent 100%)',
    innerHazeBackground:
      'radial-gradient(ellipse at center, rgba(60,10,15,0.3) 0%, rgba(10,2,4,0.12) 55%, transparent 80%)',
    bottomEdgeBackground: 'linear-gradient(90deg, transparent, rgba(127,29,29,0.32) 50%, transparent)',
  },
  neutral: {
    glowColor: 'rgba(140, 155, 180, 0.22)',
    edgeAccent: 'rgba(190, 200, 220, 0.38)',
    hoverBorderClass: 'group-hover:border-white/20',
    hoverShadowClass: 'group-hover:shadow-[0_0_40px_-8px_rgba(80,90,110,0.35)]',
    hazeBackground:
      'radial-gradient(ellipse 120% 90% at 30% 20%, rgba(28,32,42,0.55) 0%, transparent 55%), radial-gradient(ellipse 100% 80% at 75% 85%, rgba(12,14,20,0.6) 0%, transparent 60%), linear-gradient(160deg, rgba(22,26,36,0.42) 0%, rgba(8,10,16,0.22) 50%, rgba(16,18,26,0.45) 100%)',
    sheenBackground:
      'linear-gradient(135deg, rgba(255,255,255,0.09) 0%, transparent 45%, rgba(120,130,150,0.04) 70%, transparent 100%)',
    innerHazeBackground:
      'radial-gradient(ellipse at center, rgba(40,45,58,0.32) 0%, rgba(8,10,16,0.14) 55%, transparent 80%)',
    bottomEdgeBackground: 'linear-gradient(90deg, transparent, rgba(120,130,150,0.28) 50%, transparent)',
  },
};