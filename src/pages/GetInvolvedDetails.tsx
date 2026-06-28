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
      '0 40px 80px -20px rgba(0,0,0,0.95), 0 0 0 1px rgba(255,255,255,0.06), 0 16px 48px -12px rgba(60,5,10,0.55), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -4px 16px rgba(0,0,0,0.7)',
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
      <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.04] p-4 backdrop-blur-[28px] backdrop-saturate-[140%] transition-[border-color,box-shadow] duration-700 group-hover:border-red-900/40 group-hover:shadow-[0_0_40px_-8px_rgba(127,29,29,0.45)] sm:p-[18px]">
        {/* Deep smoke / haze body */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl"
          style={{
            background:
              'radial-gradient(ellipse 120% 90% at 30% 20%, rgba(40,8,12,0.55) 0%, transparent 55%), radial-gradient(ellipse 100% 80% at 75% 85%, rgba(20,4,6,0.65) 0%, transparent 60%), linear-gradient(160deg, rgba(30,6,10,0.45) 0%, rgba(8,2,4,0.25) 50%, rgba(15,4,8,0.5) 100%)',
          }}
        />

        {/* Frosted glass veil */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-70"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 45%, rgba(80,20,25,0.06) 70%, transparent 100%)',
          }}
        />

        {/* Internal smoky depth layer */}
        <div
          className="pointer-events-none absolute inset-[6px] rounded-[20px] opacity-50"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(60,10,15,0.35) 0%, rgba(10,2,4,0.15) 55%, transparent 80%)',
            boxShadow: 'inset 0 8px 24px rgba(0,0,0,0.55), inset 0 -6px 18px rgba(0,0,0,0.4)',
          }}
        />

        {/* Mouse-responsive blood-red glow (subtle) */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-20 mix-blend-screen transition-opacity duration-300 group-hover:opacity-45"
          style={{
            background: `radial-gradient(140px circle at var(--mx) var(--my), ${glowColor}, transparent 70%)`,
          }}
        />

        {/* Mouse-responsive dark silver glint */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-15 transition-opacity duration-300 group-hover:opacity-35"
          style={{
            background:
              'radial-gradient(70px circle at var(--mx) var(--my), rgba(180,185,195,0.12), transparent 65%)',
          }}
        />

        {/* Soft metallic top edge */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent 8%, rgba(200,205,210,0.25) 35%, ${edgeAccent} 50%, rgba(200,205,210,0.25) 65%, transparent 92%)`,
          }}
        />

        {/* Soft left edge highlight */}
        <div
          className="pointer-events-none absolute inset-y-3 left-0 w-px opacity-60"
          style={{
            background:
              'linear-gradient(180deg, rgba(210,215,220,0.15) 0%, transparent 60%)',
          }}
        />

        {/* Bottom blood reflection (faint) */}
        <div
          className="pointer-events-none absolute inset-x-6 bottom-0 h-px opacity-40"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(127,29,29,0.35) 50%, transparent)',
          }}
        />

        <div className="relative z-10">
          <div className="mb-2 flex items-center justify-between gap-2">{label}</div>
          <h3 className="text-left text-sm font-black uppercase tracking-tight text-white/95">{title}</h3>
          <p className="mt-1.5 text-left text-[10px] font-medium leading-snug text-zinc-500 transition-colors duration-500 group-hover:text-zinc-400">
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
      '0 50px 100px -20px rgba(0,0,0,0.95), 0 0 0 1px rgba(255,255,255,0.04), 0 12px 40px -12px rgba(60,5,10,0.4), inset 0 1px 1px 0 rgba(255,255,255,0.12), inset 0 -2px 14px 0 rgba(0,0,0,0.65)',
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
    <div className="relative min-h-screen overflow-x-hidden overflow-y-auto bg-[#060103] font-sans text-white selection:bg-red-900/40">
      {/* PROCEDURAL LIQUID CHROME BACKGROUND */}
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 5], fov: 60 }}
          gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
          style={{ width: '100%', height: '100%', background: '#060103' }}
        >
          <ProceduralChromeBackground variant="crimson-iridescent" intensity={1.1} />
        </Canvas>
      </div>

      {/* ATMOSPHERE + VIGNETTE */}
      <div className="pointer-events-none fixed inset-0 z-[1]" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 90% 70% at 50% 42%, transparent 15%, rgba(6,1,3,0.6) 58%, rgba(3,0,1,0.96) 100%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-40 mix-blend-screen"
          style={{
            background:
              'radial-gradient(ellipse 50% 35% at 82% 14%, rgba(127,29,29,0.18) 0%, transparent 68%), radial-gradient(ellipse 45% 30% at 10% 88%, rgba(90,10,18,0.16) 0%, transparent 62%)',
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] mix-blend-overlay opacity-30" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex min-h-screen flex-col justify-between p-4 sm:p-6">
        {/* HEADER */}
        <header className="mx-auto mt-2 flex w-full max-w-xl items-center justify-between">
          <span
            className="rounded-full border border-white/[0.08] bg-zinc-950/55 px-3.5 py-1.5 text-[9px] font-black uppercase tracking-[0.25em] text-zinc-500 backdrop-blur-md"
            style={{
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 20px rgba(0,0,0,0.6)',
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
              className="relative z-20 mx-auto w-full max-w-lg overflow-hidden rounded-[40px] border border-white/[0.07] bg-zinc-950/35 p-6 backdrop-blur-2xl backdrop-saturate-[160%] sm:p-7"
              style={basePlateStyle}
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-[40px] opacity-65"
                style={{
                  background:
                    'linear-gradient(148deg, rgba(255,255,255,0.08) 0%, transparent 36%, rgba(127,29,29,0.07) 54%, transparent 70%, rgba(100,105,115,0.05) 100%)',
                }}
              />
              <div
                className="pointer-events-none absolute inset-0 rounded-[40px] opacity-30"
                style={{
                  background:
                    'radial-gradient(280px circle at var(--mx) var(--my), rgba(180,185,195,0.07), transparent 62%)',
                }}
              />
              <div
                className="pointer-events-none absolute inset-x-5 top-0 h-px"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(190,195,200,0.3) 25%, rgba(127,29,29,0.4) 50%, rgba(190,195,200,0.3) 75%, transparent)',
                }}
              />
              <div
                className="pointer-events-none absolute inset-x-8 bottom-0 h-px opacity-40"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(127,29,29,0.28) 50%, transparent)',
                }}
              />

              <div className="relative z-10">
                <div className="mb-6 text-center">
                  <span className="bg-gradient-to-r from-zinc-400 via-zinc-200 to-zinc-500 bg-clip-text text-[8px] font-black uppercase tracking-[0.4em] text-transparent opacity-70">
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
                  className="flex w-full items-center justify-between rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3 text-[9px] font-black uppercase tracking-widest text-zinc-500"
                  style={{
                    boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
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
                      boxShadow: '0 8px 28px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)',
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
                  <span className="shrink-0 rounded border border-white/[0.06] bg-black/60 px-1.5 py-0.5 font-mono text-[8px] text-zinc-600">
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