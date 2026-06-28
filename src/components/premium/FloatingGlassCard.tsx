import React, { type ReactNode } from 'react';
import SmokyGlassSurface from './SmokyGlassSurface';

interface FloatingGlassCardProps {
  readonly href: string;
  readonly className?: string;
  readonly label: ReactNode;
  readonly title: string;
  readonly description: string;
  readonly glowColor?: string;
  readonly edgeAccent?: string;
}

export default function FloatingGlassCard({
  href,
  className = '',
  label,
  title,
  description,
  glowColor,
  edgeAccent,
}: FloatingGlassCardProps): React.JSX.Element {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`group block text-white transition-[transform,box-shadow] duration-700 ease-out hover:-translate-y-1.5 hover:scale-[1.02] active:scale-[0.99] ${className}`}
    >
      <SmokyGlassSurface glowColor={glowColor} edgeAccent={edgeAccent}>
        <div className="mb-2 flex items-center justify-between gap-2">{label}</div>
        <h3 className="text-left text-sm font-black uppercase tracking-tight text-white/95">{title}</h3>
        <p className="mt-1.5 text-left text-[10px] font-medium leading-snug text-zinc-500 transition-colors duration-500 group-hover:text-zinc-400">
          {description}
        </p>
      </SmokyGlassSurface>
    </a>
  );
}