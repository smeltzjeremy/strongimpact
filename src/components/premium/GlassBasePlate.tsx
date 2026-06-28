import React, { useRef, useCallback, type ReactNode, type MouseEvent } from 'react';
import { type CSSCustomProperties, computeMouseLight, BASE_PLATE_SHADOW } from './premiumShared';

interface GlassBasePlateProps {
  readonly children: ReactNode;
  readonly className?: string;
}

export default function GlassBasePlate({ children, className = '' }: GlassBasePlateProps): React.JSX.Element {
  const basePlateRef = useRef<HTMLDivElement>(null);

  const basePlateStyle: CSSCustomProperties = {
    '--mx': '50%',
    '--my': '50%',
    '--rx': '0deg',
    '--ry': '0deg',
    boxShadow: BASE_PLATE_SHADOW,
  };

  const handleBasePlateMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const plate = basePlateRef.current;
    if (!plate) return;
    const coords = computeMouseLight(e.clientX, e.clientY, plate.getBoundingClientRect(), 0);
    plate.style.setProperty('--mx', coords.mx);
    plate.style.setProperty('--my', coords.my);
  }, []);

  const handleBasePlateLeave = useCallback(() => {
    const plate = basePlateRef.current;
    if (!plate) return;
    plate.style.setProperty('--mx', '50%');
    plate.style.setProperty('--my', '50%');
  }, []);

  return (
    <div
      ref={basePlateRef}
      onMouseMove={handleBasePlateMove}
      onMouseLeave={handleBasePlateLeave}
      className={`relative z-20 mx-auto w-full overflow-hidden rounded-[40px] border border-white/[0.08] bg-zinc-950/30 p-6 backdrop-blur-2xl backdrop-saturate-[155%] sm:p-7 ${className}`}
      style={basePlateStyle}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[40px] opacity-65"
        style={{
          background:
            'linear-gradient(148deg, rgba(255,255,255,0.09) 0%, transparent 36%, rgba(127,29,29,0.06) 54%, transparent 70%, rgba(100,105,115,0.05) 100%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-[40px] opacity-30"
        style={{
          background: 'radial-gradient(280px circle at var(--mx) var(--my), rgba(180,185,195,0.08), transparent 62%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-5 top-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(190,195,200,0.32) 25%, rgba(127,29,29,0.38) 50%, rgba(190,195,200,0.32) 75%, transparent)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-8 bottom-0 h-px opacity-40"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(127,29,29,0.26) 50%, transparent)',
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}