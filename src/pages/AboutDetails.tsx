import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PremiumCrimsonBackdrop from '../components/premium/PremiumCrimsonBackdrop';
import SmokyGlassSurface from '../components/premium/SmokyGlassSurface';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

export default function AboutDetails(): React.JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();

  const storyRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'Jazmond Strong',
      role: 'Founder & Executive Director',
      bio: 'Dedicated to engineering structural pathways for youth development, athletic excellence, and comprehensive mentorship programs.',
      imageUrl: '',
    },
    {
      id: 2,
      name: 'Team Member Two',
      role: 'Operations Coordinator',
      bio: 'Managing localized logistics, school distribution partnerships, and corporate sponsorship outreach execution networks.',
      imageUrl: '',
    },
  ];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const section = params.get('section');

    const handleScroll = (elementRef: React.RefObject<HTMLDivElement | null>) => {
      setTimeout(() => {
        elementRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    };

    if (section === 'story') handleScroll(storyRef);
    if (section === 'values') handleScroll(valuesRef);
    if (section === 'team') handleScroll(teamRef);
  }, [location]);

  return (
    <div className="relative min-h-screen overflow-x-hidden overflow-y-auto bg-[#0a0406] font-sans text-white selection:bg-red-900/40">
      <PremiumCrimsonBackdrop />

      <div className="relative z-10 flex min-h-screen flex-col">
        {/* STICKY UTILITY NAV BAR */}
        <div className="sticky top-0 z-50 flex justify-center border-b border-white/[0.06] bg-[#0a0406]/55 px-4 py-4 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.55)]">
          <div className="flex w-full max-w-xl items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="rounded-full border border-white/[0.09] bg-zinc-950/50 px-5 py-2.5 text-[9px] font-black uppercase tracking-widest text-zinc-400 backdrop-blur-xl transition-all hover:scale-105 hover:text-white active:scale-95"
            >
              ← Back
            </button>
            <div className="flex gap-1.5">
              <button
                onClick={() => storyRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-2 text-[8px] font-black uppercase tracking-widest text-zinc-500 backdrop-blur-md transition-all hover:text-white"
              >
                Story
              </button>
              <button
                onClick={() => valuesRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-2 text-[8px] font-black uppercase tracking-widest text-zinc-500 backdrop-blur-md transition-all hover:text-white"
              >
                Values
              </button>
              <button
                onClick={() => teamRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-2 text-[8px] font-black uppercase tracking-widest text-zinc-500 backdrop-blur-md transition-all hover:text-white"
              >
                Team
              </button>
            </div>
          </div>
        </div>

        <main className="relative z-10 mx-auto w-full max-w-xl px-4 py-10 sm:px-8 sm:py-14 md:max-w-2xl">
          <header className="mb-10 text-center">
            <span className="bg-gradient-to-r from-zinc-400 via-zinc-200 to-zinc-500 bg-clip-text text-[8px] font-black uppercase tracking-[0.4em] text-transparent opacity-72">
              Foundation Archive
            </span>
            <h1 className="mt-3 bg-gradient-to-b from-white via-zinc-200 to-zinc-600 bg-clip-text text-4xl font-black uppercase leading-none tracking-tighter text-transparent drop-shadow-[0_4px_16px_rgba(0,0,0,0.75)]">
              ABOUT US
            </h1>
            <p
              className="mt-3 bg-gradient-to-r from-red-800 via-red-700 to-red-900 bg-clip-text text-[10px] font-black uppercase tracking-[0.35em] text-transparent"
              style={{ filter: 'drop-shadow(0 2px 6px rgba(127,29,29,0.4))' }}
            >
              Vision & Foundation
            </p>
          </header>

          <div className="relative space-y-14 pb-16 sm:space-y-20">
            {/* SECTION 1: OUR STORY — offset right on desktop */}
            <div
              ref={storyRef}
              className="scroll-mt-28 sm:ml-auto sm:max-w-[94%] md:-mr-6 lg:-mr-10"
            >
              <SmokyGlassSurface
                glowColor="rgba(127, 29, 29, 0.3)"
                edgeAccent="rgba(153, 27, 27, 0.48)"
                innerClassName="p-6 sm:p-7"
              >
                <span className="mb-2 block text-[8px] font-black uppercase tracking-[0.35em] text-red-800">
                  Pillar One
                </span>
                <h2 className="mb-4 bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-3xl font-black uppercase tracking-tighter text-transparent">
                  Our Story
                </h2>
                <p className="text-left text-xs font-medium leading-relaxed tracking-wide text-zinc-400 sm:text-sm">
                  Founded and directed by Jazmond Strong, the Strong Impact Foundation was established to bridge
                  critical gaps within community development, youth alignment, and physical performance training. By
                  building an unshakeable athletic foundation combined with strict tactical educational tracking modules,
                  the program challenges regional youth to discover excellence both on the field gridiron and inside the
                  classroom theater.
                </p>
              </SmokyGlassSurface>
            </div>

            {/* SECTION 2: CORE VALUES — offset left on desktop */}
            <div
              ref={valuesRef}
              className="scroll-mt-28 sm:mr-auto sm:max-w-[94%] md:-ml-6 lg:-ml-10"
            >
              <SmokyGlassSurface
                glowColor="rgba(90, 10, 18, 0.3)"
                edgeAccent="rgba(127, 29, 29, 0.42)"
                innerClassName="p-6 sm:p-7"
              >
                <span className="mb-2 block text-[8px] font-black uppercase tracking-[0.35em] text-red-800">
                  Pillar Two
                </span>
                <h2 className="mb-4 bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-3xl font-black uppercase tracking-tighter text-transparent">
                  Core Values
                </h2>
                <div className="space-y-4 text-left text-xs font-medium leading-relaxed text-zinc-400 sm:text-sm">
                  <div className="flex items-start gap-3 rounded-2xl border border-white/[0.04] bg-white/[0.02] p-3.5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]">
                    <span className="shrink-0 text-base">🛡️</span>
                    <p>
                      <strong className="text-zinc-300">Leadership:</strong> Cultivating baseline accountability and
                      confidence required to direct positive local change.
                    </p>
                  </div>
                  <div className="flex items-start gap-3 rounded-2xl border border-white/[0.04] bg-white/[0.02] p-3.5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]">
                    <span className="shrink-0 text-base">📊</span>
                    <p>
                      <strong className="text-zinc-300">Accountability:</strong> Owning personal choices, academic
                      standard metrics, and athletic discipline requirements.
                    </p>
                  </div>
                  <div className="flex items-start gap-3 rounded-2xl border border-white/[0.04] bg-white/[0.02] p-3.5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]">
                    <span className="shrink-0 text-base">🤝</span>
                    <p>
                      <strong className="text-zinc-300">Service:</strong> Giving back via holiday food drives, school
                      supply distributions, and active youth volunteerism.
                    </p>
                  </div>
                  <div className="flex items-start gap-3 rounded-2xl border border-white/[0.04] bg-white/[0.02] p-3.5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]">
                    <span className="shrink-0 text-base">🏈</span>
                    <p>
                      <strong className="text-zinc-300">Discipline:</strong> Translating athletic rigor directly into
                      focused classroom performance and daily execution.
                    </p>
                  </div>
                </div>
              </SmokyGlassSurface>
            </div>

            {/* SECTION 3: MEET OUR TEAM — offset right on desktop */}
            <div
              ref={teamRef}
              className="scroll-mt-28 sm:ml-auto sm:max-w-[94%] md:-mr-6 lg:-mr-10"
            >
              <SmokyGlassSurface
                glowColor="rgba(127, 29, 29, 0.28)"
                edgeAccent="rgba(153, 27, 27, 0.45)"
                innerClassName="p-6 sm:p-7"
              >
                <span className="mb-2 block text-[8px] font-black uppercase tracking-[0.35em] text-red-800">
                  Pillar Three
                </span>
                <h2 className="mb-6 bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-3xl font-black uppercase tracking-tighter text-transparent">
                  Meet Our Team
                </h2>

                <div className="space-y-6">
                  {teamMembers.map((member) => (
                    <div
                      key={member.id}
                      className="group/member flex flex-col items-center gap-5 border-t border-white/10 pt-6 text-left first:border-0 first:pt-0 sm:flex-row sm:items-start"
                    >
                      <div
                        className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-800 via-zinc-950 to-zinc-900 shadow-2xl transition-colors duration-300 group-hover/member:border-white/20"
                        style={{ boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.8)' }}
                      >
                        {member.imageUrl ? (
                          <img
                            src={member.imageUrl}
                            alt={member.name}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover/member:scale-105"
                          />
                        ) : (
                          <div className="flex flex-col items-center gap-1 opacity-30 transition-opacity group-hover/member:opacity-60">
                            <span className="text-lg">👤</span>
                            <span className="text-[7px] font-black uppercase tracking-widest text-zinc-500">
                              Photo Slot
                            </span>
                          </div>
                        )}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.08]" />
                      </div>

                      <div className="min-w-0 flex-1 text-center sm:text-left">
                        <h3 className="text-sm font-black uppercase tracking-wide text-white transition-colors group-hover/member:text-red-800">
                          {member.name}
                        </h3>
                        <span className="mt-1 inline-block rounded-full border border-red-900/30 bg-red-900/15 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest text-red-800 sm:text-[10px]">
                          {member.role}
                        </span>
                        <p className="pt-2 text-xs font-semibold leading-relaxed tracking-wide text-zinc-500">
                          {member.bio}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
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