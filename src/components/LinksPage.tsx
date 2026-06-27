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
      brandColor: 'bg-gradient-to-tr from-purple-600 via-pink-500 to-yellow-500',
      gridSpan: 'col-span-2 h-[120px]',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      )
    },
    {
      name: 'Facebook',
      handle: 'Strong Impact Foundation',
      url: 'https://www.facebook.com/share/1SDegFrWc9/?mibextid=wwXIfr',
      brandColor: 'bg-blue-600',
      gridSpan: 'col-span-2 h-[100px]',
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
      brandColor: 'bg-red-600',
      gridSpan: 'col-span-1 h-[110px]',
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
      brandColor: 'bg-emerald-500',
      gridSpan: 'col-span-1 h-[110px]',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.72.73.73 0 00.58.48l1.58.28a1 1 0 01.77.93v2.53a1 1 0 01-.73.96l-1.58.38a1 1 0 00-.59.47l-1.01 1.01a14.96 14.96 0 006.18 6.18l1.01-1.01a1 1 0 00.47-.59l.38-1.58a1 1 0 01.96-.73h2.53a1 1 0 01.93.77l.28 1.58a1 1 0 00.48.58l.72.94a1 1 0 01-.2 1.3H19a16 16 0 01-16-16v0z"/>
        </svg>
      )
    }
  ];

  return (
    <div className="fixed inset-0 bg-[#030306] z-50 flex flex-col items-center justify-between p-4 sm:p-6 overflow-y-auto select-none">
      
      {/* 1. LIQUID LIGHT BACKGROUND (Fluid dynamic aura + mesh grid) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-20%] left-[-20%] w-[100vw] h-[100vw] bg-zinc-900/10 rounded-full blur-[130px]" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[100vw] h-[100vw] bg-zinc-900/10 rounded-full blur-[150px]" />
        
        {/* Micro-mesh luxury overlay grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px]" />
        {/* Subtle vignette layer */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#030306_95%)]" />
      </div>

      {/* TOP HEADER MENU BAR */}
      <div className="w-full max-w-md flex justify-end items-center mt-2 z-10">
        <button 
          onClick={onClose} 
          className="text-[9px] uppercase font-black tracking-widest text-zinc-400 hover:text-white px-5 py-2.5 bg-zinc-900/30 border border-white/5 rounded-full backdrop-blur-2xl transition-all duration-300 hover:border-white/20 hover:scale-105 active:scale-95 shadow-inner"
        >
          ✕ Close Directory
        </button>
      </div>

      {/* 2. BENTO GRID ARCHITECTURAL CORE CONTAINER */}
      <div className="w-full max-w-md flex flex-col justify-center items-center z-10 py-10">
        
        {/* HIGH-END METAL CHROMATIC TYPOGRAPHY TEXT DISPLAY */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] select-text">
            STRONG <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-red-600 font-black">IMPACT</span>
          </h1>
          <p className="text-[9px] uppercase tracking-widest text-zinc-400 font-black mt-2.5 bg-zinc-950/80 border border-white/5 px-4 py-1.5 rounded-full inline-block backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)]">
            Direct Connection Directory
          </p>
        </div>

        {/* THE THREE-STYLE COMBINED INTERACTIVE BENTO SPACE */}
        <div className="w-full grid grid-cols-2 gap-3.5">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className={`group ${link.gridSpan} block p-4 bg-gradient-to-b from-zinc-900/40 via-zinc-950/60 to-zinc-950/90 border border-white/5 rounded-2xl backdrop-blur-3xl transition-all duration-500 hover:-translate-y-1.5 relative overflow-hidden flex flex-col justify-between`}
              style={{
                boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.7), inset 0 1px 1px 0 rgba(255, 255, 255, 0.05), inset 0 -2px 8px 0 rgba(0, 0, 0, 0.4)'
              }}
            >
              {/* Sliding glass specular highlight flare */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-1000 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent -translate-x-full group-hover:translate-x-full pointer-events-none" />

              {/* CARD ELEMENT ARCHITECTURE */}
              <div className="flex items-center justify-between w-full relative z-10">
                {/* Official Color Brand Logo Asset Icon Container */}
                <div className={`p-3 rounded-xl ${link.brandColor} text-white shadow-xl shadow-black/60 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shrink-0`}>
                  {link.icon}
                </div>

                {/* Minimal Indicator Asset Arrow */}
                <div className="text-zinc-600 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300 text-xs shrink-0 opacity-60 group-hover:opacity-100">
                  ➔
                </div>
              </div>

              {/* TEXT BASES */}
              <div className="text-left w-full relative z-10 mt-2">
                <span className="block text-[8px] uppercase tracking-widest text-zinc-500 font-black transition-colors duration-300 group-hover:text-zinc-300">
                  {link.name}
                </span>
                <span className="block text-xs sm:text-sm font-bold text-zinc-200 tracking-wide mt-0.5 truncate pr-1 group-hover:text-white transition-colors duration-300">
                  {link.handle}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* FOOTER AREA PANEL */}
      <div className="w-full text-center pb-2 z-10">
        <span className="text-[9px] uppercase tracking-widest text-zinc-600 font-black opacity-50">
          Building Stronger Foundations © 2026
        </span>
      </div>

    </div>
  );
}