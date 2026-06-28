import React, { useState, useRef, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import ProceduralChromeBackground from '../components/ProceduralChromeBackground';

interface VolunteerModule {
  label: string;
  title: string;
  description: string;
  formUrl: string;
}

interface SponsorModule {
  label: string;
  title: string;
  description: string;
  portalUrl: string;
}

interface DonationConfig {
  tagline: string;
  subLabel: string;
  processorUrl: string;
  actionText: string;
}

interface FloatingGlassCardProps {
  href: string;
  className?: string;
  label: React.ReactNode;
  title: string;
  description: string;
  glowColor?: string;
}

function FloatingGlassCard({
  href,
  className = '',
  label,
  title,
  description,
  glowColor = 'rgba(239, 68, 68, 0.22)',
}: FloatingGlassCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mx', `${x}px`);
    card.style.setProperty('--my', `${y}px`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--mx', '50%');
    card.style.setProperty('--my', '50%');
  }, []);

  return (
    <a
      ref={cardRef}
      href={href}
      target="_blank"
      rel="noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group block text-white transition-all duration-500 hover:-translate-y-1.5 hover:scale-[1.02] active:scale-[0.99] ${className}`}
      style={{
        ['--mx' as string]: '50%',
        ['--my' as string]: '50%',
        boxShadow:
          '0 28px 56px -14px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 1px 0 rgba(255,255,255,0.18), inset 0 -2px 8px 0 rgba(0,0,0,0.55)',
      }}
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-zinc-900/55 via-zinc-950/75 to-black/85 p-4 backdrop-blur-xl backdrop-saturate-[200%] transition-colors duration-500 group-hover:border-red-400/35">
        <div
          className="pointer-events-none absolute inset-0 opacity-60 mix-blend-overlay"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.14) 0%, transparent 42%, rgba(255,255,255,0.04) 100%)',
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-0 mix-blend-screen transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(140px circle at var(--mx) var(--my), ${glowColor}, transparent 72%)`,
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(100px circle at var(--mx) var(--my), rgba(255,255,255,0.12), transparent 70%)',
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(255,255,255,0.45) 30%, rgba(244,114,182,0.35) 50%, rgba(255,255,255,0.45) 70%, transparent)',
          }}
        />

        <div className="relative z-10">
          <div className="mb-2 flex items-center justify-between">{label}</div>
          <h3 className="text-left text-sm font-black uppercase tracking-tight text-white">{title}</h3>
          <p className="mt-1 text-left text-[10px] font-medium leading-tight text-zinc-400 transition-colors group-hover:text-zinc-300">
            {description}
          </p>
        </div>
      </div>
    </a>
  );
}

export default function GetInvolvedDetails() {
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
    tagline: 'FOUNDATION DONATIONS',
    subLabel: 'Direct Community Support Pipeline',
    processorUrl: 'https://www.paypal.com',
    actionText: 'Initialize Processing Terminal',
  });

  const basePlateRef = useRef<HTMLDivElement>(null);

  const handleBasePlateMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const plate = basePlateRef.current;
    if (!plate) return;
    const rect = plate.getBoundingClientRect();
    plate.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    plate.style.setProperty('--my', `${e.clientY - rect.top}px`);
  }, []);

  return (
    <div className="relative min-h-screen overflow-y-auto bg-[#020204] font-sans text-white selection:bg-red-500/30">
      {/* PROCEDURAL LIQUID CHROME BACKGROUND */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 5], fov: 60 }}
          gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
          style={{ width: '100%', height: '100%', background: '#020204' }}
        >
          <ProceduralChromeBackground variant="crimson-iridescent" />
        </Canvas>
      </div>

      {/* DEPTH VIGNETTE + IRIDESCENT ATMOSPHERE (no CSS blobs) */}
      <div className="pointer-events-none fixed inset-0 z-[1]">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 90% 70% at 50% 45%, transparent 25%, rgba(2,2,4,0.55) 65%, rgba(2,2,4,0.92) 100%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-40 mix-blend-screen"
          style={{
            background:
              'radial-gradient(ellipse 60% 40% at 75% 20%, rgba(239,68,68,0.18) 0%, transparent 70%), radial-gradient(ellipse 50% 35% at 15% 75%, rgba(244,114,182,0.12) 0%, transparent 65%)',
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] mix-blend-overlay opacity-50" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col justify-between p-4 sm:p-6">
        {/* TOP HEADER CONTROLS */}
        <div className="mx-auto mt-2 flex w-full max-w-sm items-center justify-between sm:max-w-md">
          <span
            className="rounded-full border border-white/10 bg-zinc-950/40 px-3.5 py-1.5 text-[9px] font-black uppercase tracking-[0.25em] text-zinc-400 backdrop-blur-md"
            style={{
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 20px rgba(0,0,0,0.5)',
            }}
          >
            Portal Gateway Active
          </span>
        </div>

        {/* MIDDLE LAYER: FROSTED BASE GLASS PLATE */}
        <div className="relative z-10 mx-auto my-auto w-full max-w-sm pb-6 pt-8 sm:max-w-md sm:pt-12 md:max-w-lg">
          <div
            ref={basePlateRef}
            onMouseMove={handleBasePlateMove}
            className="relative w-full rounded-[40px] border border-white/[0.08] bg-zinc-950/25 p-6 backdrop-blur-2xl backdrop-saturate-[200%] sm:p-7"
            style={{
              ['--mx' as string]: '50%',
              ['--my' as string]: '50%',
              boxShadow:
                '0 50px 100px -20px rgba(0,0,0,0.95), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 1px 0 rgba(255,255,255,0.14), inset 0 -2px 12px 0 rgba(0,0,0,0.6)',
            }}
          >
            {/* Iridescent specular sweep on base plate */}
            <div
              className="pointer-events-none absolute inset-0 rounded-[40px] opacity-70"
              style={{
                background:
                  'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, transparent 38%, rgba(239,68,68,0.06) 55%, transparent 72%, rgba(167,139,250,0.05) 100%)',
              }}
            />
            <div
              className="pointer-events-none absolute inset-0 rounded-[40px] opacity-0 transition-opacity duration-500 hover:opacity-100"
              style={{
                background:
                  'radial-gradient(280px circle at var(--mx) var(--my), rgba(255,255,255,0.07), transparent 65%)',
              }}
            />
            <div
              className="pointer-events-none absolute inset-x-6 top-0 h-px"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(255,255,255,0.35) 25%, rgba(251,113,133,0.4) 50%, rgba(255,255,255,0.35) 75%, transparent)',
              }}
            />

            {/* Chromatic Brand Label */}
            <div className="relative mb-6 text-center">
              <span className="bg-gradient-to-r from-zinc-300 via-white to-zinc-400 bg-clip-text text-[8px] font-black uppercase tracking-[0.4em] text-transparent opacity-70">
                {donation.subLabel}
              </span>
            </div>

            {/* Luxury Headings */}
            <div className="relative mb-16 select-text text-center sm:mb-20">
              <h2 className="bg-gradient-to-b from-white via-zinc-100 to-zinc-500 bg-clip-text text-4xl font-black uppercase leading-none tracking-tighter text-transparent drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
                {donation.tagline}
              </h2>
              <p
                className="mt-3 bg-gradient-to-r from-red-400 via-rose-400 to-red-600 bg-clip-text text-[10px] font-black uppercase tracking-[0.35em] text-transparent"
                style={{ filter: 'drop-shadow(0 2px 8px rgba(239,68,68,0.35))' }}
              >
                SUPPORT SYSTEM
              </p>
            </div>

            {/* Mini Base Information Row */}
            <div
              className="relative flex w-full items-center justify-between rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3 text-[9px] font-black uppercase tracking-widest text-zinc-500 shadow-inner"
              style={{ boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)' }}
            >
              <span>Secure Terminal</span>
              <span className="font-mono text-emerald-400">Verified / Encrypted</span>
            </div>

            {/* Donation CTA */}
            <div className="relative mt-4 flex w-full justify-center">
              <a
                href={donation.processorUrl}
                target="_blank"
                rel="noreferrer"
                className="group/donate relative block w-full overflow-hidden rounded-2xl border border-white/10 py-3 text-center text-[9px] font-black uppercase tracking-widest text-zinc-400 transition-all duration-300 hover:border-red-400/40 hover:text-white"
                style={{
                  boxShadow: '0 8px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
                }}
              >
                <span
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/donate:opacity-100"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, rgba(239,68,68,0.12) 50%, transparent)',
                  }}
                />
                <span className="relative z-10">{donation.actionText}</span>
              </a>
            </div>

            {/* FLOATING OVERLAY GLASS CARDS */}
            <FloatingGlassCard
              href={volunteer.formUrl}
              glowColor="rgba(239, 68, 68, 0.28)"
              className="relative z-20 mt-5 w-full sm:absolute sm:-right-4 sm:-top-6 sm:mt-0 sm:w-[160px]"
              label={
                <>
                  <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500 transition-colors group-hover:text-red-400">
                    {volunteer.label}
                  </span>
                  <div className="h-2 w-2 rounded-full bg-red-500 [filter:drop-shadow(0_0_6px_#ef4444)]" />
                </>
              }
              title={volunteer.title}
              description={volunteer.description}
            />

            <FloatingGlassCard
              href={sponsor.portalUrl}
              glowColor="rgba(244, 114, 182, 0.22)"
              className="relative z-20 mt-4 w-full sm:absolute sm:-left-6 sm:top-[38%] sm:mt-0 sm:w-[170px]"
              label={
                <>
                  <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500 transition-colors group-hover:text-red-400">
                    {sponsor.label}
                  </span>
                  <span className="rounded border border-white/10 bg-black/40 px-1.5 py-0.5 font-mono text-[8px] text-zinc-500">
                    TIERS
                  </span>
                </>
              }
              title={sponsor.title}
              description={sponsor.description}
            />
          </div>
        </div>

        {/* FOOTER BOUNDARY */}
        <div className="relative z-10 mt-4 w-full pb-2 text-center">
          <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600 opacity-40">
            Strong Impact Platform © 2026
          </span>
        </div>
      </div>
    </div>
  );
}