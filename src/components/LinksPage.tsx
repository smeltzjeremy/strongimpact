import React from 'react';

interface LinksPageProps {
  onClose: () => void;
}

export default function LinksPage({ onClose }: LinksPageProps) {
  const links = [
    {
      name: 'Instagram',
      handle: '@strongimpact_',
      url: 'https://www.instagram.com/strongimpact_/?utm_source=ig_web_button_share_sheet',
      glowColor: 'rgba(219, 39, 119, 0.3)', // Pink glow
      brandColor: 'bg-gradient-to-tr from-purple-600 via-pink-500 to-yellow-500',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      )
    },
    {
      name: 'Facebook',
      handle: 'Strong Impact Foundation',
      url: 'https://www.facebook.com/share/1SDegFrWc9/?mibextid=wwXIfr',
      glowColor: 'rgba(29, 78, 216, 0.3)', // Blue glow
      brandColor: 'bg-blue-600',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
        </svg>
      )
    },
    {
      name: 'Gmail',
      handle: 'Strongimpact33@gmail.com',
      url: 'mailto:Strongimpact33@gmail.com',
      glowColor: 'rgba(220, 38, 38, 0.3)', // Red glow
      brandColor: 'bg-red-600',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
      )
    },
    {
      name: 'Phone Line',
      handle: '+1 (803) 899-2753',
      url: 'tel:+18038992753',
      glowColor: 'rgba(16, 185, 129, 0.3)', // Emerald glow
      brandColor: 'bg-emerald-500',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.72.73.73 0 00.58.48l1.58.28a1 1 0 01.77.93v2.53a1 1 0 01-.73.96l-1.58.38a1 1 0 00-.59.47l-1.01 1.01a14.96 14.96 0 006.18 6.18l1.01-1.01a1 1 0 00.47-.59l.38-1.58a1 1 0 01.96-.73h2.53a1 1 0 01.93.77l.28 1.58a1 1 0 00.48.58l.72.94a1 1 0 01-.2 1.3H19a16 16 0 01-16-16v0z"/>
        </svg>
      )
    }
  ];

  return (
    <div className="fixed inset-0 bg-zinc-950 z-50 flex flex-col justify-between p-6 overflow-y-auto relative mix-blend-normal">
      
      {/* HIGH-GLOSS BACKGROUND REFLECTION LIQUID SHINE (Hidden depth ambient sources) */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none animate-pulse duration-[6000ms]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none animate-pulse duration-[8000ms]" />

      {/* TOP HEADER CONTROLS (Removed the broken red line glitch completely) */}
      <div className="w-full max-w-sm mx-auto flex justify-end items-center mt-2 z-10">
        <button 
          onClick={onClose} 
          className="text-[10px] uppercase font-black tracking-widest text-zinc-400 hover:text-white px-5 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md transition-all hover:scale-105 active:scale-95 shadow-lg"
        >
          ✕ Close Directory
        </button>
      </div>

      {/* MAIN CARDS CONTAINER CONTAINER */}
      <div className="w-full max-w-sm mx-auto my-auto space-y-4 z-10 pt-6">
        
        {/* Brand Display Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black uppercase tracking-tighter text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.1)]">
            STRONG <span className="text-red-500">IMPACT</span>
          </h1>
          <p className="text-[9px] uppercase tracking-widest text-zinc-400 font-extrabold mt-1.5 opacity-60">
            Direct Connection Directory
          </p>
        </div>

        {/* TRUE SMOKEY GLASS CARDS */}
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            style={{ '--hover-glow': link.glowColor } as React.CSSProperties}
            className="block w-full p-4 bg-zinc-950/40 border border-white/5 rounded-2xl backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:border-white/20 transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden text-zinc-200"
          >
            {/* Soft inner ambient glow that matches official brand colors on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-white/5 to-transparent pointer-events-none" />

            <div className="flex items-center space-x-4 relative z-10">
              
              {/* Sleek Minimal Branding Circle */}
              <div className={`p-3 rounded-xl ${link.brandColor} text-white shadow-lg shadow-black/40 group-hover:scale-110 transition-transform duration-300 shrink-0`}>
                {link.icon}
              </div>

              {/* Text Fields */}
              <div className="flex-1 text-left min-w-0">
                <span className="block text-[9px] uppercase tracking-widest text-zinc-400 font-bold opacity-70 group-hover:opacity-100 transition-opacity">
                  {link.name}
                </span>
                <span className="block text-sm font-bold text-white tracking-wide mt-0.5 truncate pr-2">
                  {link.handle}
                </span>
              </div>

              {/* Subtle Indicator Arrow */}
              <div className="text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-all text-sm font-medium shrink-0">
                ➔
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* FOOTER BOUNDARY */}
      <div className="w-full text-center mt-6 z-10">
        <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold opacity-40">
          Building Stronger Foundations © 2026
        </span>
      </div>

    </div>
  );
}