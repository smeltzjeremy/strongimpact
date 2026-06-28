import React, { useRef, useCallback, type ReactNode, type MouseEvent } from 'react';
import {
  type CSSCustomProperties,
  type SmokyGlassTone,
  DEFAULT_LIGHT,
  computeMouseLight,
  applyMouseLight,
  CARD_SHELL_SHADOW,
  NEUTRAL_CARD_SHELL_SHADOW,
  SMOKY_GLASS_TONES,
} from './premiumShared';

interface SmokyGlassSurfaceProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly tone?: SmokyGlassTone;
  readonly glowColor?: string;
  readonly edgeAccent?: string;
  readonly enableTilt?: boolean;
  readonly innerClassName?: string;
}

export default function SmokyGlassSurface({
  children,
  className = '',
  tone = 'crimson',
  glowColor,
  edgeAccent,
  enableTilt = true,
  innerClassName = 'p-4 sm:p-[18px]',
}: SmokyGlassSurfaceProps): React.JSX.Element {
  const preset = SMOKY_GLASS_TONES[tone];
  const resolvedGlow = glowColor ?? preset.glowColor;
  const resolvedEdge = edgeAccent ?? preset.edgeAccent;
  const shellShadow = tone === 'neutral' ? NEUTRAL_CARD_SHELL_SHADOW : CARD_SHELL_SHADOW;

  const shellRef = useRef<HTMLDivElement>(null);

  const shellStyle: CSSCustomProperties = {
    '--mx': DEFAULT_LIGHT.mx,
    '--my': DEFAULT_LIGHT.my,
    '--rx': DEFAULT_LIGHT.rx,
    '--ry': DEFAULT_LIGHT.ry,
    boxShadow: shellShadow,
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
        className={`relative overflow-hidden rounded-3xl border border-white/[0.1] bg-white/[0.05] backdrop-blur-[28px] backdrop-saturate-[145%] transition-[border-color,box-shadow] duration-700 ${preset.hoverBorderClass} ${preset.hoverShadowClass} ${innerClassName}`}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl"
          style={{ background: preset.hazeBackground }}
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-70"
          style={{ background: preset.sheenBackground }}
        />
        <div
          className="pointer-events-none absolute inset-[6px] rounded-[20px] opacity-45"
          style={{
            background: preset.innerHazeBackground,
            boxShadow: 'inset 0 8px 24px rgba(0,0,0,0.48), inset 0 -6px 18px rgba(0,0,0,0.35)',
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-20 mix-blend-screen transition-opacity duration-300 group-hover:opacity-45"
          style={{
            background: `radial-gradient(140px circle at var(--mx) var(--my), ${resolvedGlow}, transparent 70%)`,
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
            background: `linear-gradient(90deg, transparent 8%, rgba(200,205,210,0.28) 35%, ${resolvedEdge} 50%, rgba(200,205,210,0.28) 65%, transparent 92%)`,
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
          style={{ background: preset.bottomEdgeBackground }}
        />
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
}