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