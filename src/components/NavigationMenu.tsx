import React from 'react';
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end select-none">
      <div
        className="absolute inset-0 bg-[#050508]/75 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden
      />

      <div className="relative z-10 flex h-full w-full max-w-md flex-col p-3 sm:p-4">
        <SmokyGlassSurface
          tone="neutral"
          enableTilt={false}
          className="h-full"
          innerClassName="flex h-full min-h-0 flex-col overflow-hidden rounded-[28px] p-0"
        >
          {/* Header */}
          <div className="shrink-0 border-b border-white/[0.06] px-5 py-4 sm:px-6 sm:py-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <Link
                to="/"
                onClick={onClose}
                className="group/home inline-flex items-center gap-2.5 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-300 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07] hover:text-white active:scale-95"
                style={{ boxShadow: NEUTRAL_CARD_SHELL_SHADOW }}
              >
                <span className="text-sm leading-none opacity-80 transition-transform duration-300 group-hover/home:-translate-x-0.5">
                  ⌂
                </span>
                Home
              </Link>

              <button
                onClick={onClose}
                className="rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-zinc-400 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07] hover:text-white active:scale-95"
                style={{ boxShadow: NEUTRAL_CARD_SHELL_SHADOW }}
              >
                ✕ Close
              </button>
            </div>

            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.35em] text-zinc-500">Navigation</p>
                <h2 className="mt-1 text-lg font-black uppercase tracking-tight text-white/95 sm:text-xl">
                  Suite Directory
                </h2>
              </div>
              <span className="rounded-full border border-white/[0.06] bg-black/20 px-2.5 py-1 text-[8px] font-bold uppercase tracking-widest text-zinc-600">
                2026
              </span>
            </div>
          </div>

          {/* Scrollable categories */}
          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-5">
            <div className="space-y-4">
              {categories.map((cat) => (
                <SmokyGlassSurface
                  key={cat.parent}
                  tone="neutral"
                  enableTilt
                  innerClassName="p-4 sm:p-5"
                >
                  <Link
                    to={cat.parentPath}
                    onClick={onClose}
                    className="group/parent block transition-transform duration-300 hover:translate-x-0.5 active:scale-[0.99]"
                  >
                    <span className="mb-1 block text-[8px] font-black uppercase tracking-[0.3em] text-zinc-500 transition-colors group-hover/parent:text-zinc-400">
                      Parent Section
                    </span>
                    <span className="block font-black text-xl uppercase tracking-tight text-white/95 transition-colors group-hover/parent:text-white sm:text-2xl">
                      {cat.parent}
                    </span>
                  </Link>

                  <div className="mt-3 flex flex-col gap-1.5 border-t border-white/[0.06] pt-3">
                    {cat.subCategories.map((sub) => (
                      <Link
                        key={`${cat.parent}-${sub.title}`}
                        to={sub.path}
                        onClick={onClose}
                        className="group/sub flex items-center gap-2 rounded-xl px-2 py-1.5 text-left transition-all duration-200 hover:bg-white/[0.04] active:scale-[0.99]"
                      >
                        <span className="h-px w-3 bg-zinc-600 transition-all duration-200 group-hover/sub:w-5 group-hover/sub:bg-zinc-400" />
                        <span className="text-[11px] font-bold tracking-wide text-zinc-500 transition-colors duration-200 group-hover/sub:text-zinc-200 sm:text-xs">
                          {sub.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                </SmokyGlassSurface>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="shrink-0 border-t border-white/[0.06] px-5 py-4 text-center sm:px-6">
            <span className="text-[9px] font-black uppercase tracking-[0.25em] text-zinc-600">
              Strong Impact Portfolio System © 2026
            </span>
          </div>
        </SmokyGlassSurface>
      </div>
    </div>
  );
}