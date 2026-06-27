import React from 'react';
import { Link } from 'react-router-dom';

interface SubCategory {
  title: string;
  path: string;
}

interface MenuCategory {
  parent: string;
  subCategories: SubCategory[];
}

interface NavigationMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NavigationMenu({ isOpen, onClose }: NavigationMenuProps) {
  const categories: MenuCategory[] = [
    {
      parent: 'About Us',
      subCategories: [
        { title: 'Our Story', path: '/about' },
        { title: 'Core Values', path: '/about' },
        { title: 'Meet Our Team', path: '/about' }
      ]
    },
    {
      parent: 'Programs',
      subCategories: [
        { title: 'Youth Development', path: '/programs' },
        { title: 'Education & Mentorship', path: '/programs' },
        { title: 'Community Outreach', path: '/programs' }
      ]
    },
    {
      parent: 'Events',
      subCategories: [
        { title: 'Upcoming Calendar', path: '/events' },
        { title: 'Special Guests', path: '/events' },
        { title: 'Registration Hub', path: '/events' }
      ]
    },
    {
      parent: 'Gallery',
      subCategories: [
        { title: 'Photos Hub', path: '/photos' },
        { title: '3D Cinema Suite', path: '/theater' }
      ]
    },
    {
      parent: 'Get Involved',
      subCategories: [
        { title: 'Volunteer Portal', path: '/get-involved' },
        { title: 'Sponsorship Tiers', path: '/get-involved' },
        { title: 'Donation Processor', path: '/get-involved' }
      ]
    },
    {
      parent: 'Management',
      subCategories: [
        { title: 'Admin Dashboard', path: '/admin' }
      ]
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end animate-in fade-in duration-300 select-none">
      {/* Tap-outside backdrop dismiss layer */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* SMOKEY GLASS PORTAL DRAWER BODY */}
      <div 
        className="w-full max-w-md h-full bg-zinc-950/40 border-l border-white/10 backdrop-blur-3xl backdrop-saturate-[180%] p-6 sm:p-10 flex flex-col justify-between shadow-[-10px_0_50px_rgba(0,0,0,0.8)] overflow-y-auto relative z-10 animate-in slide-in-from-right duration-300 ease-out"
        style={{
          boxShadow: 'inset 1px 0 0 0 rgba(255, 255, 255, 0.05), inset 0 3px 12px 0 rgba(0, 0, 0, 0.4)'
        }}
      >
        {/* TOP INTERACTION LINE */}
        <div className="flex justify-between items-center border-b border-white/5 pb-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 opacity-60">
            Suite Directory Navigation
          </span>
          <button 
            onClick={onClose}
            className="text-[10px] uppercase font-black tracking-widest text-zinc-400 hover:text-white px-4 py-2 bg-white/5 border border-white/5 rounded-full shadow-inner hover:border-white/20 transition-all"
          >
            ✕ Close
          </button>
        </div>

        {/* HIGH-CONTRAST BOLD EDITORIAL PORTAL LIST */}
        <div className="my-auto py-8 space-y-6 sm:space-y-8">
          {categories.map((cat, idx) => (
            <div key={idx} className="group text-left">
              {/* Parent Category Heading: Bold Thick Black Editorial Font */}
              <h2 className="font-black text-3xl sm:text-4xl text-black uppercase tracking-tighter drop-shadow-[0_1px_1px_rgba(255,255,255,0.15)] leading-none select-text select-none">
                {cat.parent}
              </h2>

              {/* Sub-Category Stepping Stone Links: Small, Crisp, Clean Minimal Layout */}
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-2 pl-0.5">
                {cat.subCategories.map((sub, sIdx) => (
                  <Link
                    key={sIdx}
                    to={sub.path}
                    onClick={onClose}
                    className="text-[11px] sm:text-xs font-semibold text-zinc-400 hover:text-red-400 tracking-wide transition-colors whitespace-nowrap relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-red-500 hover:after:w-full after:transition-all duration-300"
                  >
                    {sub.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM UTILITY FOOTER */}
        <div className="text-center pt-4 border-t border-white/5">
          <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-black opacity-40">
            Strong Impact Portfolio System © 2026
          </span>
        </div>
      </div>
    </div>
  );
}