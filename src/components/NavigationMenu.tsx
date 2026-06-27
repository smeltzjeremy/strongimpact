import React from 'react';
import { Link } from 'react-router-dom';

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

export default function NavigationMenu({ isOpen, onClose }: NavigationMenuProps) {
  const categories: MenuCategory[] = [
    {
      parent: 'About Us',
      parentPath: '/about', 
      subCategories: [
        { title: 'Our Story', path: '/about/details?section=story' },
        { title: 'Core Values', path: '/about/details?section=values' },
        { title: 'Meet Our Team', path: '/about/details?section=team' }
      ]
    },
    {
      parent: 'Programs',
      parentPath: '/programs', 
      subCategories: [
        { title: 'Youth Development', path: '/programs' },
        { title: 'Education & Mentorship', path: '/programs' },
        { title: 'Community Outreach', path: '/programs' }
      ]
    },
    {
      parent: 'Events',
      parentPath: '/events', 
      subCategories: [
        { title: 'Upcoming Calendar', path: '/events' },
        { title: 'Special Guests', path: '/events' },
        { title: 'Registration Hub', path: '/events' }
      ]
    },
    {
      parent: 'Gallery',
      parentPath: '/gallery', 
      subCategories: [
        { title: 'Photos Hub', path: '/photos' },
        { title: '3D Cinema Suite', path: '/theater' }
      ]
    },
    {
      parent: 'Get Involved',
      parentPath: '/get-involved', 
      subCategories: [
        { title: 'Volunteer Portal', path: '/get-involved' },
        { title: 'Sponsorship Tiers', path: '/get-involved' },
        { title: 'Donation Processor', path: '/get-involved' }
      ]
    },
    {
      parent: 'Channels',
      parentPath: '/links', 
      subCategories: [
        { title: '🔗 Connect Links Directory', path: '/links' },
        { title: 'Admin Dashboard', path: '/admin' }
      ]
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end animate-in fade-in duration-300 select-none">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div 
        className="w-full max-w-md h-full bg-zinc-950/75 border-l border-white/10 backdrop-blur-3xl backdrop-saturate-[180%] p-6 sm:p-10 flex flex-col justify-between shadow-[-10px_0_50px_rgba(0,0,0,0.9)] overflow-y-auto relative z-10 animate-in slide-in-from-right duration-300 ease-out"
        style={{
          boxShadow: 'inset 1px 0 0 0 rgba(255, 255, 255, 0.08), inset 0 3px 12px 0 rgba(0, 0, 0, 0.5)'
        }}
      >
        <div className="flex justify-between items-center border-b border-white/5 pb-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 opacity-70">
            Suite Directory Navigation
          </span>
          <button 
            onClick={onClose}
            className="text-[10px] uppercase font-black tracking-widest text-zinc-300 hover:text-white px-5 py-2.5 bg-white/5 border border-white/10 rounded-full shadow-inner hover:border-white/20 transition-all active:scale-95"
          >
            ✕ Close Menu
          </button>
        </div>

        <div className="my-auto py-6 space-y-6 sm:space-y-7">
          {categories.map((cat, idx) => (
            <div key={idx} className="text-left">
              
              <Link
                to={cat.parentPath}
                onClick={onClose}
                className="block font-black text-2xl sm:text-3xl text-zinc-100 hover:text-white uppercase tracking-tighter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] leading-none transition-all hover:translate-x-1 active:scale-98 inline-block"
              >
                {cat.parent}
              </Link>

              <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2.5 pl-0.5">
                {cat.subCategories.map((sub, sIdx) => (
                  <Link
                    key={sIdx}
                    to={sub.path}
                    onClick={onClose}
                    className="text-[11px] sm:text-xs font-bold text-zinc-400 hover:text-red-500 tracking-wide transition-colors duration-200 whitespace-nowrap relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[1px] after:bg-red-600 hover:after:w-full after:transition-all after:duration-300"
                  >
                    {sub.title}
                  </Link>
                ))}
              </div>

            </div>
          ))}
        </div>

        <div className="text-center pt-4 border-t border-white/5">
          <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-black opacity-40">
            Strong Impact Portfolio System © 2026
          </span>
        </div>
      </div>
    </div>
  );
}