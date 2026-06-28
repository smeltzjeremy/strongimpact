import React, { type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import PremiumChromeBackdrop from './PremiumChromeBackdrop';

interface ParentHubLayoutProps {
  readonly stepLabel: string;
  readonly eyebrow: string;
  readonly titleLine1: string;
  readonly titleAccent: string;
  readonly subtitle: string;
  readonly footerText?: string;
  readonly children: ReactNode;
}

export default function ParentHubLayout({
  stepLabel,
  eyebrow,
  titleLine1,
  titleAccent,
  subtitle,
  footerText = 'Building Stronger Foundations © 2026',
  children,
}: ParentHubLayoutProps): React.JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-x-hidden overflow-y-auto bg-[#050508] font-sans text-white selection:bg-zinc-800/60">
      <PremiumChromeBackdrop />

      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 flex justify-center border-b border-white/[0.06] bg-[#050508]/60 px-4 py-4 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.55)]">
          <div className="flex w-full max-w-md items-center justify-between sm:max-w-xl">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="rounded-full border border-white/[0.09] bg-zinc-950/50 px-5 py-2.5 text-[9px] font-black uppercase tracking-widest text-zinc-400 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:text-white active:scale-95"
            >
              ← Home
            </button>
            <span className="rounded-full border border-white/[0.07] bg-zinc-950/45 px-3.5 py-1.5 text-[9px] font-black uppercase tracking-[0.25em] text-zinc-500 backdrop-blur-md">
              {stepLabel}
            </span>
          </div>
        </header>

        <main className="relative z-10 mx-auto w-full max-w-md flex-1 px-4 py-10 sm:px-6 sm:py-14">
          <div className="mb-8 text-center sm:mb-10">
            <span className="bg-gradient-to-r from-zinc-400 via-zinc-200 to-zinc-500 bg-clip-text text-[8px] font-black uppercase tracking-[0.4em] text-transparent opacity-72">
              {eyebrow}
            </span>
            <h1 className="mt-3 bg-gradient-to-b from-white via-zinc-200 to-zinc-600 bg-clip-text text-4xl font-black uppercase leading-none tracking-tighter text-transparent drop-shadow-[0_4px_16px_rgba(0,0,0,0.75)]">
              {titleLine1}{' '}
              <span
                className="bg-gradient-to-r from-red-800 via-red-700 to-red-900 bg-clip-text text-transparent"
                style={{ filter: 'drop-shadow(0 2px 6px rgba(127,29,29,0.35))' }}
              >
                {titleAccent}
              </span>
            </h1>
            <p
              className="mt-3 inline-block rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-[8px] font-black uppercase tracking-[0.35em] text-zinc-400 backdrop-blur-2xl"
              style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.08)' }}
            >
              {subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">{children}</div>
        </main>

        <footer className="relative z-10 pb-6 text-center">
          <span className="text-[9px] font-black uppercase tracking-[0.25em] text-zinc-600 opacity-50">
            {footerText}
          </span>
        </footer>
      </div>
    </div>
  );
}