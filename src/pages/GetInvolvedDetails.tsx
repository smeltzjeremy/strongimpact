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
  glowColor = 'rgba(239, 68, 68, 0.32)',
  edgeAccent = 'rgba(251, 113, 133, 0.55)',
}: FloatingGlassCardProps): React.JSX.Element {
  const cardRef = useRef<HTMLAnchorElement>(null);

  const cardStyle: CSSCustomProperties = {
    '--mx': DEFAULT_LIGHT.mx,
    '--my': DEFAULT_LIGHT.my,
    '--rx': DEFAULT_LIGHT.rx,
    '--ry': DEFAULT_LIGHT.ry,
    boxShadow:
      '0 32px 64px -16px rgba(0,0,0,0.92), 0 0 0 1px rgba(255,255,255,0.1), 0 8px 32px -8px rgba(185,28,28,0.25), inset 0 1px 1px 0 rgba(255,255,255,0.22), inset 0 -2px 10px 0 rgba(0,0,0,0.6)',
    transform: 'perspective(900px) rotateX(var(--rx)) rotateY(var(--ry))',
  };

  const handleMouseMove = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
    const card = cardRef.current;
    if (!card) return;
    applyMouseLight(card, computeMouseLight(e.clientX, e.clientY, card.getBoundingClientRect(), 5));
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
      className={`group block text-white transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-2 hover:scale-[1.03] active:scale-[0.99] ${className}`}
      style={cardStyle}
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-zinc-900/50 via-zinc-950/80 to-[#0a0406]/90 p-4 backdrop-blur-xl backdrop-saturate-[200%] transition-[border-color,box-shadow] duration-500 group-hover:border-red-400/45 group-hover:shadow-[0_0_28px_-4px_rgba(239,68,68,0.35)]">
        {/* Always-on subtle ambient sheen */}
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 40%, rgba(239,68,68,0.04) 60%, transparent 100%)',
          }}
        />

        {/* Mouse-responsive crimson specular */}
        <div
          className="pointer-events-none absolute inset-0 opacity-35 mix-blend-screen transition-opacity duration-200 group-hover:opacity-70"
          style={{
            background: `radial-gradient(160px circle at var(--mx) var(--my), ${glowColor}, transparent 68%)`,
          }}
        />

        {/* Mouse-responsive silver highlight core */}
        <div
          className="pointer-events-none absolute inset-0 opacity-25 transition-opacity duration-200 group-hover:opacity-55"
          style={{
            background:
              'radial-gradient(90px circle at var(--mx) var(--my), rgba(255,255,255,0.18), transparent 62%)',
          }}
        />

        {/* Metallic top edge */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
          style={{
            background: `linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.55) 30%, ${edgeAccent} 50%, rgba(255,255,255,0.55) 70%, transparent 95%)`,
          }}
        />

        {/* Metallic left edge */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-[1px]"
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.08) 50%, transparent 100%)',
          }}
        />

        {/* Bottom crimson reflection line */}
        <div
          className="pointer-events-none absolute inset-x-4 bottom-0 h-px opacity-60"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(239,68,68,0.35) 50%, transparent)',
          }}
        />

        <div className="relative z-10">
          <div className="mb-2 flex items-center justify-between gap-2">{label}</div>
          <h3 className="text-left text-sm font-black uppercase tracking-tight text-white">{title}</h3>
          <p className="mt-1.5 text-left text-[10px] font-medium leading-snug text-zinc-400 transition-colors duration-300 group-hover:text-zinc-200">
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
      '0 50px 100px -20px rgba(0,0,0,0.95), 0 0 0 1px rgba(255,255,255,0.05), 0 12px 40px -12px rgba(127,29,29,0.3), inset 0 1px 1px 0 rgba(255,255,255,0.16), inset 0 -2px 14px 0 rgba(0,0,0,0.65)',
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
    <div className="relative min-h-screen overflow-x-hidden overflow-y-auto bg-[#0a0204] font-sans text-white selection:bg-red-500/30">
      {/* PROCEDURAL LIQUID CHROME BACKGROUND */}
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 5], fov: 60 }}
          gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
          style={{ width: '100%', height: '100%', background: '#0a0204' }}
        >
          <ProceduralChromeBackground variant="crimson-iridescent" intensity={1.35} />
        </Canvas>
      </div>

      {/* ATMOSPHERE + VIGNETTE */}
      <div className="pointer-events-none fixed inset-0 z-[1]" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 85% 65% at 50% 42%, transparent 20%, rgba(10,2,4,0.5) 60%, rgba(6,1,3,0.94) 100%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-55 mix-blend-screen"
          style={{
            background:
              'radial-gradient(ellipse 55% 38% at 80% 18%, rgba(220,38,38,0.28) 0%, transparent 68%), radial-gradient(ellipse 48% 32% at 12% 82%, rgba(190,18,60,0.22) 0%, transparent 62%), radial-gradient(ellipse 40% 30% at 50% 55%, rgba(244,114,182,0.08) 0%, transparent 70%)',
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:40px_40px] mix-blend-overlay opacity-40" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex min-h-screen flex-col justify-between p-4 sm:p-6">
        {/* HEADER */}
        <header className="mx-auto mt-2 flex w-full max-w-lg items-center justify-between">
          <span
            className="rounded-full border border-white/10 bg-zinc-950/50 px-3.5 py-1.5 text-[9px] font-black uppercase tracking-[0.25em] text-zinc-400 backdrop-blur-md"
            style={{
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 20px rgba(0,0,0,0.55)',
            }}
          >
            Portal Gateway Active
          </span>
        </header>

        {/* STAGE: base plate + separated floating cards */}
        <main className="relative z-10 mx-auto my-auto w-full max-w-lg px-2 py-10 sm:px-6 sm:py-14 md:max-w-xl">
          {/* Floating cards live outside the plate to prevent clipping */}
          <div className="relative">
            {/* BASE GLASS PLATE */}
            <div
              ref={basePlateRef}
              onMouseMove={handleBasePlateMove}
              onMouseLeave={handleBasePlateLeave}
              className="relative z-20 w-full overflow-hidden rounded-[40px] border border-white/[0.09] bg-zinc-950/30 p-6 backdrop-blur-2xl backdrop-saturate-[200%] sm:p-7"
              style={basePlateStyle}
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-[40px] opacity-75"
                style={{
                  background:
                    'linear-gradient(148deg, rgba(255,255,255,0.11) 0%, transparent 34%, rgba(239,68,68,0.09) 52%, transparent 68%, rgba(161,161,170,0.06) 100%)',
                }}
              />
              <div
                className="pointer-events-none absolute inset-0 rounded-[40px] opacity-40"
                style={{
                  background:
                    'radial-gradient(300px circle at var(--mx) var(--my), rgba(255,255,255,0.09), transparent 62%)',
                }}
              />
              <div
                className="pointer-events-none absolute inset-x-5 top-0 h-[2px]"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(255,255,255,0.4) 22%, rgba(251,113,133,0.55) 50%, rgba(255,255,255,0.4) 78%, transparent)',
                }}
              />
              <div
                className="pointer-events-none absolute inset-x-8 bottom-0 h-px opacity-50"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(239,68,68,0.3) 50%, transparent)',
                }}
              />

              <div className="relative z-10">
                <div className="mb-6 text-center">
                  <span className="bg-gradient-to-r from-zinc-300 via-rose-100 to-zinc-400 bg-clip-text text-[8px] font-black uppercase tracking-[0.4em] text-transparent opacity-75">
                    {donation.subLabel}
                  </span>
                </div>

                <div className="mb-16 select-text text-center sm:mb-20">
                  <h1 className="bg-gradient-to-b from-white via-zinc-100 to-zinc-500 bg-clip-text text-4xl font-black uppercase leading-none tracking-tighter text-transparent drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
                    {donation.tagline}
                  </h1>
                  <p
                    className="mt-3 bg-gradient-to-r from-red-400 via-rose-400 to-red-600 bg-clip-text text-[10px] font-black uppercase tracking-[0.35em] text-transparent"
                    style={{ filter: 'drop-shadow(0 2px 8px rgba(239,68,68,0.4))' }}
                  >
                    SUPPORT SYSTEM
                  </p>
                </div>

                <div
                  className="flex w-full items-center justify-between rounded-2xl border border-white/[0.07] bg-white/[0.025] p-3 text-[9px] font-black uppercase tracking-widest text-zinc-500"
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
                    className="group/donate relative block w-full overflow-hidden rounded-2xl border border-white/12 py-3 text-center text-[9px] font-black uppercase tracking-widest text-zinc-400 transition-all duration-300 hover:border-red-400/45 hover:text-white"
                    style={{
                      boxShadow: '0 8px 28px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08)',
                    }}
                  >
                    <span
                      className="pointer-events-none absolute inset-0 opacity-30 transition-opacity duration-300 group-hover/donate:opacity-100"
                      style={{
                        background:
                          'linear-gradient(90deg, transparent, rgba(239,68,68,0.16) 50%, transparent)',
                      }}
                    />
                    <span className="relative z-10">{donation.actionText}</span>
                  </a>
                </div>
              </div>
            </div>

            <FloatingGlassCard
              href={volunteer.formUrl}
              glowColor="rgba(239, 68, 68, 0.38)"
              edgeAccent="rgba(252, 165, 165, 0.65)"
              className="relative z-30 mt-8 w-full sm:absolute sm:-right-5 sm:-top-10 sm:mt-0 sm:w-[172px] md:-right-8 md:-top-12 md:w-[178px]"
              label={
                <>
                  <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500 transition-colors duration-300 group-hover:text-red-400">
                    {volunteer.label}
                  </span>
                  <div className="h-2 w-2 shrink-0 rounded-full bg-red-500 [filter:drop-shadow(0_0_8px_#ef4444)]" />
                </>
              }
              title={volunteer.title}
              description={volunteer.description}
            />

            <FloatingGlassCard
              href={sponsor.portalUrl}
              glowColor="rgba(244, 114, 182, 0.34)"
              edgeAccent="rgba(251, 113, 133, 0.6)"
              className="relative z-30 mt-6 w-full sm:absolute sm:-bottom-10 sm:-left-6 sm:mt-0 sm:w-[180px] md:-bottom-12 md:-left-10 md:w-[186px]"
              label={
                <>
                  <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500 transition-colors duration-300 group-hover:text-red-400">
                    {sponsor.label}
                  </span>
                  <span className="shrink-0 rounded border border-white/10 bg-black/50 px-1.5 py-0.5 font-mono text-[8px] text-zinc-500">
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
          <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600 opacity-40">
            Strong Impact Platform © 2026
          </span>
        </footer>
      </div>
    </div>
  );
}