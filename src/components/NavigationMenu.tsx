import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SmokyGlassSurface from './premium/SmokyGlassSurface';
import { NEUTRAL_CARD_SHELL_SHADOW } from './premium/premiumShared';

interface SubCategory {
  title: string;
  path: string;
}

interface MenuCategory {
  parent: string;
  parentPath: string;
  subCategories: SubCategory[];
}

interface NavigationMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NavigationMenu({ isOpen, onClose }: NavigationMenuProps): React.JSX.Element | null {
  const categories: MenuCategory[] = [
    {
      parent: 'About Us',
      parentPath: '/about',
      subCategories: [
        { title: 'Our Story', path: '/about/details?section=story' },
        { title: 'Core Values', path: '/about/details?section=values' },
        { title: 'Meet Our Team', path: '/about/details?section=team' },
      ],
    },
    {
      parent: 'Programs',
      parentPath: '/programs',
      subCategories: [
        { title: 'Youth Development', path: '/programs/details' },
        { title: 'Education & Mentorship', path: '/programs/details' },
        { title: 'Community Outreach', path: '/programs/details' },
      ],
    },
    {
      parent: 'Events',
      parentPath: '/events',
      subCategories: [
        { title: 'Upcoming Calendar', path: '/events/details' },
        { title: 'Special Guests', path: '/events/details' },
        { title: 'Registration Hub', path: '/events/details' },
      ],
    },
    {
      parent: 'Gallery',
      parentPath: '/gallery',
      subCategories: [
        { title: 'Photos Hub', path: '/photos' },
        { title: '3D Cinema Suite', path: '/theater' },
      ],
    },
    {
      parent: 'Get Involved',
      parentPath: '/get-involved',
      subCategories: [
        { title: 'Volunteer Portal', path: '/get-involved/details' },
        { title: 'Sponsorship Tiers', path: '/get-involved/details' },
        { title: 'Donation Processor', path: '/get-involved/details' },
      ],
    },
    {
      parent: 'Channels',
      parentPath: '/links',
      subCategories: [
        { title: 'Connect Links Directory', path: '/links' },
        { title: 'Admin Dashboard', path: '/admin' },
      ],
    },
  ];

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div
        className="absolute inset-0 bg-[#050508]/75 backdrop-blur-md"
        onClick={onClose}
        aria-hidden
      />

      <aside className="relative z-10 flex h-[100dvh] max-h-[100dvh] w-full max-w-md shrink-0 flex-col p-2 sm:p-3">
        <SmokyGlassSurface
          tone="neutral"
          enableTilt={false}
          className="flex h-full min-h-0 w-full flex-col"
          innerClassName="flex h-full min-h-0 w-full flex-col overflow-hidden rounded-[24px] p-0"
        >
          {/* Fixed header — never scrolls away */}
          <header className="shrink-0 border-b border-white/[0.06] px-4 py-3 sm:px-5">
            <div className="mb-3 flex items-center justify-between gap-2">
              <Link
                to="/"
                onClick={onClose}
                className="group/home inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-zinc-300 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07] hover:text-white active:scale-95"
                style={{ boxShadow: NEUTRAL_CARD_SHELL_SHADOW }}
              >
                <span className="text-sm leading-none opacity-80 transition-transform duration-300 group-hover/home:-translate-x-0.5">
                  ⌂
                </span>
                Home
              </Link>

              <button
                onClick={onClose}
                className="rounded-full border border-white/[0.1] bg-white/[0.04] px-3.5 py-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07] hover:text-white active:scale-95"
                style={{ boxShadow: NEUTRAL_CARD_SHELL_SHADOW }}
              >
                ✕ Close
              </button>
            </div>

            <div className="flex items-end justify-between gap-2">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500">Navigation</p>
                <h2 className="mt-0.5 text-base font-black uppercase tracking-tight text-white/95 sm:text-lg">
                  Suite Directory
                </h2>
              </div>
              <span className="rounded-full border border-white/[0.06] bg-black/20 px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest text-zinc-600">
                2026
              </span>
            </div>
          </header>

          {/* Scroll region — h-0 + flex-1 is the reliable flex scroll pattern */}
          <div
            className="h-0 min-h-0 flex-1 overflow-y-auto overscroll-y-contain [-webkit-overflow-scrolling:touch] [scrollbar-gutter:stable]"
            style={{ touchAction: 'pan-y' }}
          >
            <div className="space-y-3 px-3 py-3 pb-6 sm:px-4 sm:py-4 sm:pb-8">
              {categories.map((cat) => (
                <SmokyGlassSurface
                  key={cat.parent}
                  tone="neutral"
                  enableTilt={false}
                  innerClassName="p-3 sm:p-4"
                >
                  <Link
                    to={cat.parentPath}
                    onClick={onClose}
                    className="group/parent block transition-transform duration-300 hover:translate-x-0.5 active:scale-[0.99]"
                  >
                    <span className="mb-0.5 block text-[8px] font-black uppercase tracking-[0.28em] text-zinc-500 transition-colors group-hover/parent:text-zinc-400">
                      Parent Section
                    </span>
                    <span className="block font-black text-lg uppercase tracking-tight text-white/95 transition-colors group-hover/parent:text-white sm:text-xl">
                      {cat.parent}
                    </span>
                  </Link>

                  <div className="mt-2.5 flex flex-col gap-1 border-t border-white/[0.06] pt-2.5">
                    {cat.subCategories.map((sub) => (
                      <Link
                        key={`${cat.parent}-${sub.title}`}
                        to={sub.path}
                        onClick={onClose}
                        className="group/sub flex items-center gap-2 rounded-lg px-1.5 py-1 text-left transition-all duration-200 hover:bg-white/[0.04] active:scale-[0.99]"
                      >
                        <span className="h-px w-3 bg-zinc-600 transition-all duration-200 group-hover/sub:w-4 group-hover/sub:bg-zinc-400" />
                        <span className="text-[11px] font-bold tracking-wide text-zinc-500 transition-colors duration-200 group-hover/sub:text-zinc-200">
                          {sub.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                </SmokyGlassSurface>
              ))}

              <div className="border-t border-white/[0.06] pt-4 text-center">
                <span className="text-[9px] font-black uppercase tracking-[0.22em] text-zinc-600">
                  Strong Impact Portfolio System © 2026
                </span>
              </div>
            </div>
          </div>
        </SmokyGlassSurface>
      </aside>
    </div>
  );
}