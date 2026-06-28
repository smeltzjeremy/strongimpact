import React, { useState, useRef, useCallback, type CSSProperties, type ReactNode, type MouseEvent } from 'react';
import { Canvas } from '@react-three/fiber';
import ProceduralChromeBackground from '../components/ProceduralChromeBackground';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

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
}

interface CSSCustomProperties extends CSSProperties {
  '--mx': string;
  '--my': string;
  '--rx': string;
  '--ry': string;
}

interface FloatingGlassCardProps {
  readonly href: string;
  readonly className?: string;
  readonly label: ReactNode;
  readonly title: string;
  readonly description: string;
  readonly glowColor?: string;
  readonly edgeAccent?: string;
}

interface MouseLightCoords {
  mx: string;
  my: string;
  rx: string;
  ry: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const DEFAULT_LIGHT: MouseLightCoords = {
  mx: '50%',
  my: '40%',
  rx: '0deg',
  ry: '0deg',
};

function computeMouseLight(
  clientX: number,
  clientY: number,
  rect: DOMRect,
  tiltStrength = 6,
): MouseLightCoords {
  const x = clientX - rect.left;
  const y = clientY - rect.top;
  const xc = rect.width / 2;
  const yc = rect.height / 2;
  return {
    mx: `${x}px`,
    my: `${y}px`,
    rx: `${((yc - y) / yc) * tiltStrength}deg`,
    ry: `${((x - xc) / xc) * tiltStrength}deg`,
  };
}

function applyMouseLight(el: HTMLElement, coords: MouseLightCoords): void {
  el.style.setProperty('--mx', coords.mx);
  el.style.setProperty('--my', coords.my);
  el.style.setProperty('--rx', coords.rx);
  el.style.setProperty('--ry', coords.ry);
}

// ---------------------------------------------------------------------------
// FloatingGlassCard
// ---------------------------------------------------------------------------

function FloatingGlassCard({
  href,
  className = '',
  label,
  title,
  description,
  glowColor = 'rgba(127, 29, 29, 0.28)',
  edgeAccent = 'rgba(153, 27, 27, 0.45)',
}: FloatingGlassCardProps): React.JSX.Element {
  const cardRef = useRef<HTMLAnchorElement>(null);

  const cardStyle: CSSCustomProperties = {
    '--mx': DEFAULT_LIGHT.mx,
    '--my': DEFAULT_LIGHT.my,
    '--rx': DEFAULT_LIGHT.rx,
    '--ry': DEFAULT_LIGHT.ry,
    boxShadow:
      '0 48px 96px -24px rgba(0,0,0,0.98), 0 0 0 1px rgba(255,255,255,0.1), 0 0 48px -8px rgba(255,255,255,0.04), 0 20px 56px -14px rgba(40,4,8,0.65), inset 0 1px 0 rgba(255,255,255,0.14), inset 0 -6px 20px rgba(0,0,0,0.75)',
    transform: 'perspective(900px) rotateX(var(--rx)) rotateY(var(--ry))',
  };

  const handleMouseMove = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
    const card = cardRef.current;
    if (!card) return;
    applyMouseLight(card, computeMouseLight(e.clientX, e.clientY, card.getBoundingClientRect(), 4));
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    applyMouseLight(card, DEFAULT_LIGHT);
  }, []);

  return (
    <a
      ref={cardRef}
      href={href}
      target="_blank"
      rel="noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group block text-white transition-[transform,box-shadow] duration-700 ease-out hover:-translate-y-1.5 hover:scale-[1.02] active:scale-[0.99] ${className}`}
      style={cardStyle}
    >
      <div className="relative overflow-hidden rounded-3xl border border-white/[0.11] bg-white/[0.06] p-4 backdrop-blur-[36px] backdrop-saturate-[150%] transition-[border-color,box-shadow] duration-700 group-hover:border-red-900/50 group-hover:shadow-[0_0_52px_-6px_rgba(127,29,29,0.5),0_0_24px_-4px_rgba(255,255,255,0.06)] sm:p-[18px]">
        {/* Deep smoke / haze body */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl"
          style={{
            background:
              'radial-gradient(ellipse 130% 95% at 25% 15%, rgba(50,8,14,0.62) 0%, transparent 52%), radial-gradient(ellipse 110% 85% at 80% 90%, rgba(18,3,6,0.72) 0%, transparent 58%), radial-gradient(ellipse 80% 60% at 50% 50%, rgba(12,2,4,0.4) 0%, transparent 70%), linear-gradient(155deg, rgba(35,6,10,0.5) 0%, rgba(6,1,3,0.3) 48%, rgba(20,4,8,0.55) 100%)',
          }}
        />

        {/* Frosted glass veil */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-80"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.09) 0%, transparent 42%, rgba(70,15,20,0.07) 68%, transparent 100%)',
          }}
        />

        {/* Internal cavity — deep smoky depth */}
        <div
          className="pointer-events-none absolute inset-[5px] rounded-[22px]"
          style={{
            background:
              'radial-gradient(ellipse 90% 70% at 50% 55%, rgba(8,1,3,0.55) 0%, rgba(45,8,14,0.28) 45%, rgba(12,2,4,0.18) 72%, transparent 100%)',
            boxShadow:
              'inset 0 12px 32px rgba(0,0,0,0.65), inset 0 -10px 28px rgba(0,0,0,0.5), inset 0 0 20px rgba(30,5,8,0.35)',
          }}
        />

        {/* Subtle internal reflection band */}
        <div
          className="pointer-events-none absolute inset-[8px] rounded-[20px] opacity-30"
          style={{
            background:
              'linear-gradient(168deg, transparent 30%, rgba(200,205,212,0.06) 46%, rgba(255,255,255,0.04) 50%, rgba(200,205,212,0.05) 54%, transparent 70%)',
          }}
        />

        {/* Lower internal reflection (glass floor bounce) */}
        <div
          className="pointer-events-none absolute inset-x-4 bottom-[10px] h-[28%] rounded-b-[18px] opacity-25"
          style={{
            background:
              'linear-gradient(0deg, rgba(160,165,175,0.07) 0%, rgba(127,29,29,0.04) 40%, transparent 100%)',
          }}
        />

        {/* Mouse-responsive blood-red glow */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-22 mix-blend-screen transition-opacity duration-300 group-hover:opacity-50"
          style={{
            background: `radial-gradient(150px circle at var(--mx) var(--my), ${glowColor}, transparent 68%)`,
          }}
        />

        {/* Mouse-responsive dark silver glint */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-18 transition-opacity duration-300 group-hover:opacity-42"
          style={{
            background:
              'radial-gradient(80px circle at var(--mx) var(--my), rgba(195,200,210,0.14), transparent 60%)',
          }}
        />

        {/* Soft metallic top edge */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent 6%, rgba(215,220,225,0.32) 32%, ${edgeAccent} 50%, rgba(215,220,225,0.32) 68%, transparent 94%)`,
          }}
        />

        {/* Soft left edge highlight */}
        <div
          className="pointer-events-none absolute inset-y-3 left-0 w-px opacity-70"
          style={{
            background:
              'linear-gradient(180deg, rgba(220,225,230,0.2) 0%, rgba(220,225,230,0.05) 45%, transparent 80%)',
          }}
        />

        {/* Right edge shadow (depth cue) */}
        <div
          className="pointer-events-none absolute inset-y-2 right-0 w-px opacity-40"
          style={{
            background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.35) 50%, transparent)',
          }}
        />

        {/* Bottom blood reflection */}
        <div
          className="pointer-events-none absolute inset-x-5 bottom-0 h-px opacity-45"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(127,29,29,0.4) 50%, transparent)',
          }}
        />

        <div className="relative z-10">
          <div className="mb-2 flex items-center justify-between gap-2">{label}</div>
          <h3 className="text-left text-sm font-black uppercase tracking-tight text-white">{title}</h3>
          <p className="mt-1.5 text-left text-[10px] font-medium leading-snug text-zinc-500 transition-colors duration-500 group-hover:text-zinc-300">
            {description}
          </p>
        </div>
      </div>
    </a>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function GetInvolvedDetails(): React.JSX.Element {
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

  const basePlateStyle: CSSCustomProperties = {
    '--mx': '50%',
    '--my': '50%',
    '--rx': '0deg',
    '--ry': '0deg',
    boxShadow:
      '0 56px 112px -24px rgba(0,0,0,0.98), 0 0 0 1px rgba(255,255,255,0.07), 0 0 40px -6px rgba(255,255,255,0.03), 0 16px 48px -12px rgba(40,4,8,0.45), inset 0 1px 1px 0 rgba(255,255,255,0.14), inset 0 -2px 16px 0 rgba(0,0,0,0.7)',
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
    <div className="relative min-h-screen overflow-x-hidden overflow-y-auto bg-[#040001] font-sans text-white selection:bg-red-900/40">
      {/* PROCEDURAL LIQUID CHROME BACKGROUND */}
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 5], fov: 60 }}
          gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
          style={{ width: '100%', height: '100%', background: '#040001' }}
        >
          <ProceduralChromeBackground variant="crimson-iridescent" intensity={1.2} />
        </Canvas>
      </div>

      {/* ATMOSPHERE + VIGNETTE — darker edges for card contrast */}
      <div className="pointer-events-none fixed inset-0 z-[1]" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 62% at 50% 42%, transparent 10%, rgba(4,0,1,0.72) 52%, rgba(2,0,0,0.98) 100%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-35 mix-blend-screen"
          style={{
            background:
              'radial-gradient(ellipse 50% 35% at 82% 14%, rgba(127,29,29,0.16) 0%, transparent 68%), radial-gradient(ellipse 45% 30% at 10% 88%, rgba(90,10,18,0.14) 0%, transparent 62%)',
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] mix-blend-overlay opacity-25" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex min-h-screen flex-col justify-between p-4 sm:p-6">
        {/* HEADER */}
        <header className="mx-auto mt-2 flex w-full max-w-xl items-center justify-between">
          <span
            className="rounded-full border border-white/[0.1] bg-zinc-950/60 px-3.5 py-1.5 text-[9px] font-black uppercase tracking-[0.25em] text-zinc-400 backdrop-blur-md"
            style={{
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 24px rgba(0,0,0,0.65)',
            }}
          >
            Portal Gateway Active
          </span>
        </header>

        {/* STAGE: generous padding for wide card separation */}
        <main className="relative z-10 mx-auto my-auto w-full max-w-xl px-2 py-12 sm:px-10 sm:py-20 md:max-w-2xl md:px-14 md:py-24">
          <div className="relative min-h-[520px] sm:min-h-[480px] md:min-h-[440px]">
            {/* BASE GLASS PLATE */}
            <div
              ref={basePlateRef}
              onMouseMove={handleBasePlateMove}
              onMouseLeave={handleBasePlateLeave}
              className="relative z-20 mx-auto w-full max-w-lg overflow-hidden rounded-[40px] border border-white/[0.09] bg-zinc-950/45 p-6 backdrop-blur-2xl backdrop-saturate-[170%] sm:p-7"
              style={basePlateStyle}
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-[40px] opacity-70"
                style={{
                  background:
                    'linear-gradient(148deg, rgba(255,255,255,0.1) 0%, transparent 36%, rgba(127,29,29,0.08) 54%, transparent 70%, rgba(100,105,115,0.06) 100%)',
                }}
              />
              <div
                className="pointer-events-none absolute inset-0 rounded-[40px] opacity-35"
                style={{
                  background:
                    'radial-gradient(280px circle at var(--mx) var(--my), rgba(190,195,200,0.09), transparent 62%)',
                }}
              />
              <div
                className="pointer-events-none absolute inset-x-5 top-0 h-px"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(200,205,210,0.35) 25%, rgba(127,29,29,0.45) 50%, rgba(200,205,210,0.35) 75%, transparent)',
                }}
              />
              <div
                className="pointer-events-none absolute inset-x-8 bottom-0 h-px opacity-45"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(127,29,29,0.32) 50%, transparent)',
                }}
              />

              <div className="relative z-10">
                <div className="mb-6 text-center">
                  <span className="bg-gradient-to-r from-zinc-400 via-zinc-200 to-zinc-500 bg-clip-text text-[8px] font-black uppercase tracking-[0.4em] text-transparent opacity-75">
                    {donation.subLabel}
                  </span>
                </div>

                <div className="mb-16 select-text text-center sm:mb-20">
                  <h1 className="bg-gradient-to-b from-white via-zinc-200 to-zinc-600 bg-clip-text text-4xl font-black uppercase leading-none tracking-tighter text-transparent drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
                    {donation.tagline}
                  </h1>
                  <p
                    className="mt-3 bg-gradient-to-r from-red-800 via-red-700 to-red-900 bg-clip-text text-[10px] font-black uppercase tracking-[0.35em] text-transparent"
                    style={{ filter: 'drop-shadow(0 2px 6px rgba(127,29,29,0.45))' }}
                  >
                    SUPPORT SYSTEM
                  </p>
                </div>

                <div
                  className="flex w-full items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3 text-[9px] font-black uppercase tracking-widest text-zinc-500"
                  style={{
                    boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
                  }}
                >
                  <span>Secure Terminal</span>
                  <span className="font-mono text-emerald-400">Verified / Encrypted</span>
                </div>

                <div className="mt-4">
                  <a
                    href={donation.processorUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group/donate relative block w-full overflow-hidden rounded-2xl border border-white/10 py-3 text-center text-[9px] font-black uppercase tracking-widest text-zinc-500 transition-all duration-300 hover:border-red-900/50 hover:text-zinc-200"
                    style={{
                      boxShadow: '0 8px 28px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07)',
                    }}
                  >
                    <span
                      className="pointer-events-none absolute inset-0 opacity-25 transition-opacity duration-300 group-hover/donate:opacity-80"
                      style={{
                        background:
                          'linear-gradient(90deg, transparent, rgba(127,29,29,0.14) 50%, transparent)',
                      }}
                    />
                    <span className="relative z-10">{donation.actionText}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Volunteer — far top-right */}
            <FloatingGlassCard
              href={volunteer.formUrl}
              glowColor="rgba(127, 29, 29, 0.32)"
              edgeAccent="rgba(153, 27, 27, 0.5)"
              className="relative z-30 mt-10 w-full sm:absolute sm:-right-8 sm:-top-20 sm:mt-0 sm:w-[172px] md:-right-14 md:-top-24 md:w-[178px] lg:-right-20 lg:-top-28"
              label={
                <>
                  <span className="text-[8px] font-black uppercase tracking-widest text-zinc-600 transition-colors duration-500 group-hover:text-red-800">
                    {volunteer.label}
                  </span>
                  <div className="h-2 w-2 shrink-0 rounded-full bg-red-900 [filter:drop-shadow(0_0_6px_#7f1d1d)]" />
                </>
              }
              title={volunteer.title}
              description={volunteer.description}
            />

            {/* Sponsor — far bottom-left */}
            <FloatingGlassCard
              href={sponsor.portalUrl}
              glowColor="rgba(90, 10, 18, 0.34)"
              edgeAccent="rgba(127, 29, 29, 0.42)"
              className="relative z-30 mt-8 w-full sm:absolute sm:-bottom-20 sm:-left-10 sm:mt-0 sm:w-[180px] md:-bottom-24 md:-left-16 md:w-[186px] lg:-bottom-28 lg:-left-24"
              label={
                <>
                  <span className="text-[8px] font-black uppercase tracking-widest text-zinc-600 transition-colors duration-500 group-hover:text-red-800">
                    {sponsor.label}
                  </span>
                  <span className="shrink-0 rounded border border-white/[0.08] bg-black/60 px-1.5 py-0.5 font-mono text-[8px] text-zinc-600">
                    TIERS
                  </span>
                </>
              }
              title={sponsor.title}
              description={sponsor.description}
            />
          </div>
        </main>

        {/* FOOTER */}
        <footer className="relative z-10 mt-6 w-full pb-2 text-center">
          <span className="text-[9px] font-black uppercase tracking-widest text-zinc-700 opacity-50">
            Strong Impact Platform © 2026
          </span>
        </footer>
      </div>
    </div>
  );
}