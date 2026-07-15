import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PremiumCrimsonBackdrop from '../components/premium/PremiumCrimsonBackdrop';
import SmokyGlassSurface from '../components/premium/SmokyGlassSurface';

interface VolunteerModule {
  readonly label: string;
  readonly title: string;
  readonly description: string;
  readonly formUrl: string;
}

interface SponsorModule {
  readonly label: string;
  readonly title: string;
  readonly description: string;
  readonly portalUrl: string;
}

interface DonationConfig {
  readonly tagline: string;
  readonly subLabel: string;
  readonly processorUrl: string;
  readonly actionText: string;
  readonly description: string;
}

export default function GetInvolvedDetails(): React.JSX.Element {
  const navigate = useNavigate();

  const [volunteer] = useState<VolunteerModule>({
    label: 'Join Roster',
    title: 'Volunteer Portal',
    description:
      'Sign up to assist with on-field logistics, player check-ins, or local community holiday food distributions.',
    formUrl: 'https://forms.google.com',
  });

  const [sponsor] = useState<SponsorModule>({
    label: 'Partners',
    title: 'Sponsorship Tiers',
    description:
      'Review structural backing tiers and corporate resource packages designed to maximize community impact.',
    portalUrl: 'https://forms.google.com',
  });

  const [donation] = useState<DonationConfig>({
    tagline: 'Foundation Donations',
    subLabel: 'Direct Community Support Pipeline',
    processorUrl: 'https://www.paypal.com',
    actionText: 'Initialize Processing Terminal',
    description:
      'Secure digital portal to fuel foundation resource networks, youth camps, and seasonal outreach drives directly.',
  });

  return (
    <div className="relative min-h-screen overflow-x-hidden overflow-y-auto bg-[#0a0406] font-sans text-white selection:bg-red-900/40">
      <PremiumCrimsonBackdrop />

      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Sticky nav — same pattern as AboutDetails / ProgramDetails / EventDetails */}
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
              Portal Gateway Active
            </span>
          </div>
        </div>

        <main className="relative z-10 mx-auto w-full max-w-xl px-4 py-10 sm:px-8 sm:py-14 md:max-w-2xl">
          <header className="mb-10 text-center">
            <span className="bg-gradient-to-r from-zinc-400 via-zinc-200 to-zinc-500 bg-clip-text text-[8px] font-black uppercase tracking-[0.4em] text-transparent opacity-72">
              Support Infrastructure
            </span>
            <h1 className="mt-3 bg-gradient-to-b from-white via-zinc-200 to-zinc-600 bg-clip-text text-4xl font-black uppercase leading-none tracking-tighter text-transparent drop-shadow-[0_4px_16px_rgba(0,0,0,0.75)]">
              GET
            </h1>
            <p
              className="mt-3 bg-gradient-to-r from-red-800 via-red-700 to-red-900 bg-clip-text text-[10px] font-black uppercase tracking-[0.35em] text-transparent"
              style={{ filter: 'drop-shadow(0 2px 6px rgba(127,29,29,0.4))' }}
            >
              INVOLVED
            </p>
          </header>

          {/* Flex gap is more reliable than space-y on mobile; larger base gap for touch layouts */}
          <div className="relative flex flex-col gap-24 pb-20 sm:gap-32 md:gap-36">
            {/* Card 1: Volunteer Portal — offset right */}
            <div className="relative z-0 shrink-0 sm:ml-auto sm:max-w-[94%] md:-mr-6 lg:-mr-10">
              <SmokyGlassSurface
                glowColor="rgba(127, 29, 29, 0.3)"
                edgeAccent="rgba(153, 27, 27, 0.48)"
                enableTilt={false}
                innerClassName="p-6 sm:p-7"
              >
                <span className="mb-2 block text-[8px] font-black uppercase tracking-[0.35em] text-red-800">
                  {volunteer.label}
                </span>
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <h2 className="bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-3xl font-black uppercase tracking-tighter text-transparent">
                    {volunteer.title}
                  </h2>
                  <div className="h-2 w-2 shrink-0 rounded-full bg-red-900 [filter:drop-shadow(0_0_6px_#7f1d1d)]" />
                </div>
                <p className="mb-5 text-left text-xs font-medium leading-relaxed tracking-wide text-zinc-400 sm:text-sm">
                  {volunteer.description}
                </p>
                <a
                  href={volunteer.formUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full rounded-xl bg-white py-3 text-center text-[9px] font-black uppercase tracking-widest text-black shadow-xl shadow-black/40 transition-all duration-300 hover:bg-zinc-200 active:scale-[0.98]"
                >
                  Open Volunteer Form
                </a>
              </SmokyGlassSurface>
            </div>

            {/* Card 2: Sponsorship Tiers — offset left */}
            <div className="relative z-0 shrink-0 sm:mr-auto sm:max-w-[94%] md:-ml-6 lg:-ml-10">
              <SmokyGlassSurface
                glowColor="rgba(90, 10, 18, 0.3)"
                edgeAccent="rgba(127, 29, 29, 0.42)"
                enableTilt={false}
                innerClassName="p-6 sm:p-7"
              >
                <span className="mb-2 block text-[8px] font-black uppercase tracking-[0.35em] text-red-800">
                  {sponsor.label}
                </span>
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <h2 className="bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-3xl font-black uppercase tracking-tighter text-transparent">
                    {sponsor.title}
                  </h2>
                  <span className="rounded border border-white/[0.07] bg-black/55 px-1.5 py-0.5 font-mono text-[8px] text-zinc-600">
                    TIERS
                  </span>
                </div>
                <p className="mb-5 text-left text-xs font-medium leading-relaxed tracking-wide text-zinc-400 sm:text-sm">
                  {sponsor.description}
                </p>
                <a
                  href={sponsor.portalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full rounded-xl bg-white py-3 text-center text-[9px] font-black uppercase tracking-widest text-black shadow-xl shadow-black/40 transition-all duration-300 hover:bg-zinc-200 active:scale-[0.98]"
                >
                  View Sponsorship Portal
                </a>
              </SmokyGlassSurface>
            </div>

            {/* Card 3: Donation Processor — offset right */}
            <div className="relative z-0 shrink-0 sm:ml-auto sm:max-w-[94%] md:-mr-6 lg:-mr-10">
              <SmokyGlassSurface
                glowColor="rgba(127, 29, 29, 0.28)"
                edgeAccent="rgba(153, 27, 27, 0.45)"
                enableTilt={false}
                innerClassName="p-6 sm:p-7"
              >
                <span className="mb-2 block text-[8px] font-black uppercase tracking-[0.35em] text-red-800">
                  {donation.subLabel}
                </span>
                <h2 className="mb-4 bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-3xl font-black uppercase tracking-tighter text-transparent">
                  {donation.tagline}
                </h2>
                <p className="mb-5 text-left text-xs font-medium leading-relaxed tracking-wide text-zinc-400 sm:text-sm">
                  {donation.description}
                </p>

                <div
                  className="mb-4 flex w-full items-center justify-between rounded-2xl border border-white/[0.07] bg-white/[0.03] p-3 text-[9px] font-black uppercase tracking-widest text-zinc-500"
                  style={{
                    boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)',
                  }}
                >
                  <span>Secure Terminal</span>
                  <span className="font-mono text-emerald-400">Verified / Encrypted</span>
                </div>

                <a
                  href={donation.processorUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full rounded-xl bg-white py-3 text-center text-[9px] font-black uppercase tracking-widest text-black shadow-xl shadow-black/40 transition-all duration-300 hover:bg-zinc-200 active:scale-[0.98]"
                >
                  {donation.actionText}
                </a>
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
