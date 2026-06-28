import React, { useRef, useCallback, type ReactNode, type MouseEvent } from 'react';
import {
  type CSSCustomProperties,
  DEFAULT_LIGHT,
  computeMouseLight,
  applyMouseLight,
  CARD_SHELL_SHADOW,
} from './premiumShared';

interface SmokyGlassSurfaceProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly glowColor?: string;
  readonly edgeAccent?: string;
  readonly enableTilt?: boolean;
  readonly innerClassName?: string;
}

export default function SmokyGlassSurface({
  children,
  className = '',
  glowColor = 'rgba(127, 29, 29, 0.28)',
  edgeAccent = 'rgba(153, 27, 27, 0.45)',
  enableTilt = true,
  innerClassName = 'p-4 sm:p-[18px]',
}: SmokyGlassSurfaceProps): React.JSX.Element {
  const shellRef = useRef<HTMLDivElement>(null);

  const shellStyle: CSSCustomProperties = {
    '--mx': DEFAULT_LIGHT.mx,
    '--my': DEFAULT_LIGHT.my,
    '--rx': DEFAULT_LIGHT.rx,
    '--ry': DEFAULT_LIGHT.ry,
    boxShadow: CARD_SHELL_SHADOW,
    transform: enableTilt ? 'perspective(900px) rotateX(var(--rx)) rotateY(var(--ry))' : undefined,
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!enableTilt) return;
      const shell = shellRef.current;
      if (!shell) return;
      applyMouseLight(shell, computeMouseLight(e.clientX, e.clientY, shell.getBoundingClientRect(), 4));
    },
    [enableTilt],
  );

  const handleMouseLeave = useCallback(() => {
    const shell = shellRef.current;
    if (!shell) return;
    applyMouseLight(shell, DEFAULT_LIGHT);
  }, []);

  return (
    <div
      ref={shellRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group transition-[transform,box-shadow] duration-700 ease-out ${className}`}
      style={shellStyle}
    >
      <div
        className={`relative overflow-hidden rounded-3xl border border-white/[0.1] bg-white/[0.05] backdrop-blur-[28px] backdrop-saturate-[145%] transition-[border-color,box-shadow] duration-700 group-hover:border-red-900/40 group-hover:shadow-[0_0_40px_-8px_rgba(127,29,29,0.4)] ${innerClassName}`}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl"
          style={{
            background:
              'radial-gradient(ellipse 120% 90% at 30% 20%, rgba(40,8,12,0.48) 0%, transparent 55%), radial-gradient(ellipse 100% 80% at 75% 85%, rgba(20,4,6,0.55) 0%, transparent 60%), linear-gradient(160deg, rgba(30,6,10,0.38) 0%, rgba(8,2,4,0.2) 50%, rgba(15,4,8,0.42) 100%)',
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-70"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 45%, rgba(80,20,25,0.05) 70%, transparent 100%)',
          }}
        />
        <div
          className="pointer-events-none absolute inset-[6px] rounded-[20px] opacity-45"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(60,10,15,0.3) 0%, rgba(10,2,4,0.12) 55%, transparent 80%)',
            boxShadow: 'inset 0 8px 24px rgba(0,0,0,0.48), inset 0 -6px 18px rgba(0,0,0,0.35)',
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-20 mix-blend-screen transition-opacity duration-300 group-hover:opacity-45"
          style={{
            background: `radial-gradient(140px circle at var(--mx) var(--my), ${glowColor}, transparent 70%)`,
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-15 transition-opacity duration-300 group-hover:opacity-35"
          style={{
            background:
              'radial-gradient(70px circle at var(--mx) var(--my), rgba(180,185,195,0.12), transparent 65%)',
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent 8%, rgba(200,205,210,0.28) 35%, ${edgeAccent} 50%, rgba(200,205,210,0.28) 65%, transparent 92%)`,
          }}
        />
        <div
          className="pointer-events-none absolute inset-y-3 left-0 w-px opacity-60"
          style={{
            background: 'linear-gradient(180deg, rgba(210,215,220,0.18) 0%, transparent 60%)',
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-6 bottom-0 h-px opacity-40"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(127,29,29,0.32) 50%, transparent)',
          }}
        />
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
}