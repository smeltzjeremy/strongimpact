import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PremiumCrimsonBackdrop from '../components/premium/PremiumCrimsonBackdrop';
import GlassBasePlate from '../components/premium/GlassBasePlate';
import SmokyGlassSurface from '../components/premium/SmokyGlassSurface';

interface ProgramSegment {
  title: string;
  tag: string;
  description: string;
}

interface OutreachConfig {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
}

export default function ProgramDetails(): React.JSX.Element {
  const navigate = useNavigate();

  const [segments] = useState<ProgramSegment[]>([
    {
      title: 'Youth Development',
      tag: 'Athletic Foundation',
      description:
        'Engineering structural speed mechanics, explosive footwork drill cycles, and unshakeable physical athletic conditioning parameters required to compete at the highest level.',
    },
    {
      title: 'Education & Mentorship',
      tag: 'Academic Tracking',
      description:
        'Enforcing tactical classroom accountability protocols, mandatory report card progress checks, and proactive character mentoring modules to build elite leaders off the gridiron.',
    },
  ]);

  const [outreach] = useState<OutreachConfig>({
    title: 'Community Outreach',
    subtitle: 'Localized Pipelines',
    description:
      'Extending impactful resources directly to regional families via structured seasonal food distributions, holiday turkey drives, and back-to-school backpack networks.',
    imageUrl: '',
  });

  return (
    <div className="relative min-h-screen overflow-x-hidden overflow-y-auto bg-[#0a0406] font-sans text-white selection:bg-red-900/40">
      <PremiumCrimsonBackdrop />

      <div className="relative z-10 flex min-h-screen flex-col justify-between p-4 sm:p-6">
        <header className="mx-auto mt-2 flex w-full max-w-xl items-center justify-between md:max-w-2xl">
          <button
            onClick={() => navigate(-1)}
            className="rounded-full border border-white/[0.09] bg-zinc-950/50 px-5 py-2.5 text-[9px] font-black uppercase tracking-widest text-zinc-400 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:text-white active:scale-95"
          >
            ← Back
          </button>
          <span className="rounded-full border border-white/[0.07] bg-zinc-950/45 px-3.5 py-1.5 text-[9px] font-black uppercase tracking-[0.25em] text-zinc-500 backdrop-blur-md">
            Liquid Core Engine
          </span>
        </header>

        <main className="relative z-10 mx-auto my-auto w-full max-w-xl px-2 py-12 sm:px-10 sm:py-20 md:max-w-2xl md:px-14 md:py-24">
          <div className="relative flex flex-col items-center gap-10 sm:gap-12">
            <GlassBasePlate className="max-w-lg">
              <div className="mb-4 text-center">
                <span className="bg-gradient-to-r from-zinc-400 via-zinc-200 to-zinc-500 bg-clip-text text-[8px] font-black uppercase tracking-[0.4em] text-transparent opacity-72">
                  Core Framework Pillars
                </span>
              </div>

              <div className="mb-6 select-text text-center">
                <h1 className="bg-gradient-to-b from-white via-zinc-200 to-zinc-600 bg-clip-text text-4xl font-black uppercase leading-none tracking-tighter text-transparent drop-shadow-[0_4px_16px_rgba(0,0,0,0.75)]">
                  OUR ACTIVE
                </h1>
                <p
                  className="mt-2 bg-gradient-to-r from-red-800 via-red-700 to-red-900 bg-clip-text text-xs font-black uppercase tracking-[0.3em] text-transparent"
                  style={{ filter: 'drop-shadow(0 2px 6px rgba(127,29,29,0.35))' }}
                >
                  PROGRAMS
                </p>
              </div>

              <div className="my-6 space-y-4 text-left">
                {segments.map((item, index) => (
                  <div
                    key={index}
                    className="group w-full rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.04]"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-black uppercase tracking-tight text-white transition-colors group-hover:text-red-800">
                        {item.title}
                      </span>
                      <span className="rounded-md border border-white/[0.06] bg-zinc-950/60 px-2.5 py-0.5 text-[8px] font-black uppercase tracking-widest text-zinc-500 shadow-inner">
                        {item.tag}
                      </span>
                    </div>
                    <p className="text-[11px] font-medium leading-relaxed tracking-wide text-zinc-500">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </GlassBasePlate>

            {/* Outreach — stacked below main plate (no absolute overlap) */}
            <div className="relative z-20 w-full max-w-lg">
              <SmokyGlassSurface
                glowColor="rgba(90, 10, 18, 0.34)"
                edgeAccent="rgba(127, 29, 29, 0.42)"
                innerClassName="p-4 sm:p-5"
              >
                <div className="relative mb-3 flex h-28 w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-white/[0.06] bg-gradient-to-b from-zinc-900 to-zinc-950 shadow-inner">
                  {outreach.imageUrl ? (
                    <img src={outreach.imageUrl} alt={outreach.title} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center gap-1 opacity-25">
                      <span className="text-lg">🤝</span>
                      <span className="text-[7px] font-black uppercase tracking-widest text-zinc-500">
                        Outreach Media Frame
                      </span>
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.01] to-white/[0.05]" />
                </div>

                <div className="text-left">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <h3 className="text-sm font-black uppercase tracking-tight text-white">{outreach.title}</h3>
                    <span className="shrink-0 text-[7px] font-black uppercase tracking-widest text-red-800">
                      {outreach.subtitle}
                    </span>
                  </div>
                  <p className="text-[10px] font-medium leading-relaxed tracking-wide text-zinc-500">
                    {outreach.description}
                  </p>
                </div>
              </SmokyGlassSurface>
            </div>
          </div>
        </main>

        <footer className="relative z-10 mt-6 pb-2 text-center">
          <span className="text-[9px] font-black uppercase tracking-widest text-zinc-700 opacity-50">
            Strong Impact Platform © 2026
          </span>
        </footer>
      </div>
    </div>
  );
}