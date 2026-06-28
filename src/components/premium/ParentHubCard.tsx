import React, { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import SmokyGlassSurface from './SmokyGlassSurface';

export const SMOKY_RED_GLOW = 'rgba(127, 29, 29, 0.32)';
export const SMOKY_RED_EDGE = 'rgba(153, 27, 27, 0.5)';

export interface ParentHubItem {
  readonly name: string;
  readonly description: string;
  readonly path: string;
  readonly gridSpan: string;
  readonly icon: ReactNode;
  readonly pillarLabel?: string;
}

interface ParentHubCardProps {
  readonly hub: ParentHubItem;
}

export default function ParentHubCard({ hub }: ParentHubCardProps): React.JSX.Element {
  return (
    <Link
      to={hub.path}
      className={`${hub.gridSpan} group block transition-[transform,box-shadow] duration-700 ease-out hover:-translate-y-1.5 hover:scale-[1.02] active:scale-[0.99]`}
    >
      <SmokyGlassSurface
        tone="crimson"
        glowColor={SMOKY_RED_GLOW}
        edgeAccent={SMOKY_RED_EDGE}
        innerClassName="flex h-full min-h-full flex-col justify-between p-5"
      >
        <div className="flex w-full items-center justify-between gap-2">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-900/40 bg-black/35 text-base text-zinc-200 shadow-[0_8px_24px_rgba(0,0,0,0.45)] transition-transform duration-500 group-hover:scale-105 group-hover:border-red-800/55">
            {hub.icon}
          </div>
          <span className="text-xs font-black text-zinc-600 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-red-400">
            ➔
          </span>
        </div>

        <div className="mt-3 w-full text-left">
          {hub.pillarLabel ? (
            <span className="mb-1 block text-[8px] font-black uppercase tracking-[0.3em] text-red-800">
              {hub.pillarLabel}
            </span>
          ) : null}
          <span className="block text-[8px] font-extrabold uppercase tracking-widest text-zinc-500 transition-colors duration-300 group-hover:text-zinc-400">
            {hub.description}
          </span>
          <span className="mt-1 block text-sm font-black uppercase tracking-tight text-white/95 transition-colors duration-300 group-hover:text-white">
            {hub.name}
          </span>
        </div>
      </SmokyGlassSurface>
    </Link>
  );
}