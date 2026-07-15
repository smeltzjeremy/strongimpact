import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PremiumCrimsonBackdrop from '../components/premium/PremiumCrimsonBackdrop';
import SmokyGlassSurface from '../components/premium/SmokyGlassSurface';

interface ProgramSegment {
  title: string;
  tag: string;
  description: string;
  pillarLabel: string;
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
      pillarLabel: 'Pillar One',
      description:
        'Engineering structural speed mechanics, explosive footwork drill cycles, and unshakeable physical athletic conditioning parameters required to compete at the highest level.',
    },
    {
      title: 'Education & Mentorship',
      tag: 'Academic Tracking',
      pillarLabel: 'Pillar Two',
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

      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Sticky nav — same pattern as AboutDetails */}
        <div className="sticky top-0 z-50 flex justify-center border-b border-white/[0.06] bg-[#0a0406]/55 px-4 py-4 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.55)]">
          <div className="flex w-full max-w-xl items-center justify-between">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-full border border-white/[0.09] bg-zinc-950/50 px-5 py-2.5 text-[9px] font-black uppercase tracking-widest text-zinc-400 backdrop-blur-xl transition-all hover:scale-105 hover:text-white active:scale-95"
            >
              ← Back
            </button>
            <span className="rounded-full border border-white/[0.07] bg-zinc-950/45 px-3.5 py-1.5 text-[9px] font-black uppercase tracking-[0.25em] text-zinc-500 backdrop-blur-md">
              Liquid Core Engine
            </span>
          </div>
        </div>

        <main className="relative z-10 mx-auto w-full max-w-xl px-4 py-10 sm:px-8 sm:py-14 md:max-w-2xl">
          <header className="mb-10 text-center">
            <span className="bg-gradient-to-r from-zinc-400 via-zinc-200 to-zinc-500 bg-clip-text text-[8px] font-black uppercase tracking-[0.4em] text-transparent opacity-72">
              Core Framework Pillars
            </span>
            <h1 className="mt-3 bg-gradient-to-b from-white via-zinc-200 to-zinc-600 bg-clip-text text-4xl font-black uppercase leading-none tracking-tighter text-transparent drop-shadow-[0_4px_16px_rgba(0,0,0,0.75)]">
              OUR ACTIVE
            </h1>
            <p
              className="mt-3 bg-gradient-to-r from-red-800 via-red-700 to-red-900 bg-clip-text text-[10px] font-black uppercase tracking-[0.35em] text-transparent"
              style={{ filter: 'drop-shadow(0 2px 6px rgba(127,29,29,0.4))' }}
            >
              PROGRAMS
            </p>
          </header>

          {/* Same vertical spread as AboutDetails: space-y-14 / sm:space-y-20 + alternating offsets */}
          <div className="relative space-y-28 pb-16 sm:space-y-36">
            {/* Pillar One — offset right on desktop */}
            <div className="sm:ml-auto sm:max-w-[94%] md:-mr-6 lg:-mr-10">
              <SmokyGlassSurface
                glowColor="rgba(127, 29, 29, 0.3)"
                edgeAccent="rgba(153, 27, 27, 0.48)"
                innerClassName="p-6 sm:p-7"
              >
                <span className="mb-2 block text-[8px] font-black uppercase tracking-[0.35em] text-red-800">
                  {segments[0].pillarLabel}
                </span>
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <h2 className="bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-3xl font-black uppercase tracking-tighter text-transparent">
                    {segments[0].title}
                  </h2>
                  <span className="rounded-md border border-white/[0.06] bg-zinc-950/60 px-2.5 py-0.5 text-[8px] font-black uppercase tracking-widest text-zinc-500 shadow-inner">
                    {segments[0].tag}
                  </span>
                </div>
                <p className="text-left text-xs font-medium leading-relaxed tracking-wide text-zinc-400 sm:text-sm">
                  {segments[0].description}
                </p>
              </SmokyGlassSurface>
            </div>

            {/* Pillar Two — offset left on desktop */}
            <div className="sm:mr-auto sm:max-w-[94%] md:-ml-6 lg:-ml-10">
              <SmokyGlassSurface
                glowColor="rgba(90, 10, 18, 0.3)"
                edgeAccent="rgba(127, 29, 29, 0.42)"
                innerClassName="p-6 sm:p-7"
              >
                <span className="mb-2 block text-[8px] font-black uppercase tracking-[0.35em] text-red-800">
                  {segments[1].pillarLabel}
                </span>
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <h2 className="bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-3xl font-black uppercase tracking-tighter text-transparent">
                    {segments[1].title}
                  </h2>
                  <span className="rounded-md border border-white/[0.06] bg-zinc-950/60 px-2.5 py-0.5 text-[8px] font-black uppercase tracking-widest text-zinc-500 shadow-inner">
                    {segments[1].tag}
                  </span>
                </div>
                <p className="text-left text-xs font-medium leading-relaxed tracking-wide text-zinc-400 sm:text-sm">
                  {segments[1].description}
                </p>
              </SmokyGlassSurface>
            </div>

            {/* Pillar Three — Community Outreach, offset right on desktop */}
            <div className="sm:ml-auto sm:max-w-[94%] md:-mr-6 lg:-mr-10">
              <SmokyGlassSurface
                glowColor="rgba(127, 29, 29, 0.28)"
                edgeAccent="rgba(153, 27, 27, 0.45)"
                innerClassName="p-6 sm:p-7"
              >
                <span className="mb-2 block text-[8px] font-black uppercase tracking-[0.35em] text-red-800">
                  Pillar Three
                </span>
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <h2 className="bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-3xl font-black uppercase tracking-tighter text-transparent">
                    {outreach.title}
                  </h2>
                  <span className="rounded-md border border-white/[0.06] bg-zinc-950/60 px-2.5 py-0.5 text-[8px] font-black uppercase tracking-widest text-red-800 shadow-inner">
                    {outreach.subtitle}
                  </span>
                </div>

                <div className="relative mb-4 flex h-28 w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-white/[0.06] bg-gradient-to-b from-zinc-900 to-zinc-950 shadow-inner">
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

                <p className="text-left text-xs font-medium leading-relaxed tracking-wide text-zinc-400 sm:text-sm">
                  {outreach.description}
                </p>
              </SmokyGlassSurface>
            </div>
          </div>
        </main>

        <footer className="relative z-10 pb-6 text-center">
          <span className="text-[9px] font-black uppercase tracking-widest text-zinc-700 opacity-50">
            Building Stronger Foundations © 2026
          </span>
        </footer>
      </div>
    </div>
  );
}
