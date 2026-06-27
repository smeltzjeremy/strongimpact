import React, { useState, useRef } from 'react';

interface LinksPageProps {
  onClose: () => void;
}

export default function LinksPage({ onClose }: LinksPageProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const links = [
    {
      name: 'Instagram',
      handle: '@strongimpact_',
      url: 'https://www.instagram.com/strongimpact_/?utm_source=ig_web_button_share_sheet',
      brandColor: 'bg-gradient-to-tr from-purple-600 via-pink-500 to-yellow-500',
      glowColor: 'rgba(236, 72, 153, 0.4)',
      gridSpan: 'col-span-2 h-[125px]',
      isCopyable: false,
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
      glowColor: 'rgba(37, 99, 235, 0.4)',
      gridSpan: 'col-span-2 h-[105px]',
      isCopyable: false,
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
      glowColor: 'rgba(239, 68, 68, 0.4)',
      gridSpan: 'col-span-1 h-[115px]',
      isCopyable: true,
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
      glowColor: 'rgba(16, 185, 129, 0.4)',
      gridSpan: 'col-span-1 h-[115px]',
      isCopyable: true,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.72.73.73 0 00.58.48l1.58.28a1 1 0 01.77.93v2.53a1 1 0 01-.73.96l-1.58.38a1 1 0 00-.59.47l-1.01 1.01a14.96 14.96 0 006.18 6.18l1.01-1.01a1 1 0 00.47-.59l.38-1.58a1 1 0 01.96-.73h2.53a1 1 0 01.93.77l.28 1.58a1 1 0 00.48.58l.72.94a1 1 0 01-.2 1.3H19a16 16 0 01-16-16v0z"/>
        </svg>
      )
    }
  ];

  const handleCopyAction = (e: React.MouseEvent, text: string, idx: number) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 bg-[#040408] z-50 flex flex-col items-center justify-between p-4 sm:p-6 overflow-y-auto select-none perspective-[1200px]">
      
      {/* 1. HIGH-CONTRAST LIGHT ENGINE (Grid lines removed for clean presentation) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Deep Crimson Core Glow */}
        <div className="absolute top-[15%] left-[10%] w-[80vw] h-[80vw] max-w-[600px] bg-red-600/20 rounded-full blur-[110px] animate-[pulse_6s_infinite_alternate]" />
        {/* Deep Royal Blue Base Glow */}
        <div className="absolute bottom-[10%] right-[5%] w-[80vw] h-[80vw] max-w-[650px] bg-blue-600/15 rounded-full blur-[130px] animate-[pulse_8s_infinite_alternate_1s]" />
        
        {/* Smooth perimeter shadow vignette frame */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#040408_98%)]" />
      </div>

      {/* TOP NAVBAR BANNER */}
      <div className="w-full max-w-md flex justify-end items-center mt-2 z-10">
        <button 
          onClick={onClose} 
          className="text-[9px] uppercase font-black tracking-widest text-zinc-300 hover:text-white px-5 py-2.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 rounded-full backdrop-blur-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
        >
          ✕ Close Directory
        </button>
      </div>

      {/* 2. CORE ARCHITECTURAL INTERACTIVE SPACE */}
      <div className="w-full max-w-md flex flex-col justify-center items-center z-10 py-6">
        
        {/* CHROMATIC GRADIENT LOGO DISPLAY */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-400 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            STRONG <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-red-600 font-black">IMPACT</span>
          </h1>
          <p className="text-[8px] uppercase tracking-widest text-zinc-400 font-black mt-3 bg-white/[0.02] border border-white/10 px-4 py-2 rounded-full inline-block backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_16px_rgba(0,0,0,0.4)]">
            Direct Connection Directory
          </p>
        </div>

        {/* ASYMMETRIC BENTO GRID INTERACTIVE SHEETS */}
        <div className="w-full grid grid-cols-2 gap-4">
          {links.map((link, index) => {
            const cardRef = useRef<HTMLAnchorElement>(null);

            const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
              const card = cardRef.current;
              if (!card) return;
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              
              const xc = rect.width / 2;
              const yc = rect.height / 2;
              
              const angleX = (yc - y) / 5; 
              const angleY = (x - xc) / 5;

              card.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.04, 1.04, 1.04)`;
              card.style.setProperty('--mx', `${x}px`);
              card.style.setProperty('--my', `${y}px`);
            };

            const handleMouseLeave = () => {
              const card = cardRef.current;
              if (!card) return;
              card.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            };

            return (
              <a
                key={index}
                ref={cardRef}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={`group ${link.gridSpan} block p-4 bg-white/[0.02] hover:bg-white/[0.05] rounded-2xl backdrop-blur-2xl backdrop-saturate-[180%] transition-all duration-200 ease-out relative overflow-hidden flex flex-col justify-between transform-style-3d`}
                style={{
                  border: '1px solid transparent',
                  borderImage: 'linear-gradient(to bottom right, rgba(255,255,255,0.15), rgba(255,255,255,0.02) 40%, transparent) 1',
                  boxShadow: `0 35px 70px -15px rgba(0, 0, 0, 0.95), inset 0 1px 0px 0 rgba(255, 255, 255, 0.12), inset 0 -3px 12px 0 rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255,255,255,0.02)`
                }}
              >
                {/* RADIAL SPECULAR GLOW CONDUITS */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-overlay"
                  style={{
                    background: `radial-gradient(130px circle at var(--mx, 0px) var(--my, 0px), rgba(255, 255, 255, 0.08), transparent 100%)`
                  }}
                />
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-screen"
                  style={{
                    background: `radial-gradient(100px circle at var(--mx, 0px) var(--my, 0px), ${link.glowColor}, transparent 100%)`
                  }}
                />

                {/* CARD METADATA HEADERS */}
                <div className="flex items-center justify-between w-full relative z-10 pointer-events-none">
                  <div className={`p-3 rounded-xl ${link.brandColor} text-white shadow-[0_8px_24px_rgba(0,0,0,0.6)] group-hover:scale-105 group-hover:rotate-2 transition-all duration-300 shrink-0`}>
                    {link.icon}
                  </div>

                  {/* TELEMETRY FEEDBACK BADGE */}
                  {link.isCopyable ? (
                    <button
                      onClick={(e) => handleCopyAction(e, link.handle, index)}
                      className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[8px] uppercase font-black tracking-widest text-zinc-300 hover:text-white transition-all pointer-events-auto shadow-md shadow-black/20"
                    >
                      {copiedIndex === index ? '✓ Copied' : 'Copy'}
                    </button>
                  ) : (
                    <div className="text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300 text-xs shrink-0 opacity-40 group-hover:opacity-100 font-black">
                      ➔
                    </div>
                  )}
                </div>

                {/* TEXT FIELDS DISPLAY */}
                <div className="text-left w-full relative z-10 mt-2 pointer-events-none">
                  <span className="block text-[8px] uppercase tracking-widest text-zinc-400 font-extrabold opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                    {link.name}
                  </span>
                  <span className="block text-xs sm:text-sm font-bold text-white tracking-wide mt-1 truncate pr-1 group-hover:text-red-400 transition-colors duration-300">
                    {link.handle}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* FOOTER BOUNDARY */}
      <div className="w-full text-center pb-2 z-10">
        <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-black opacity-30">
          Building Stronger Foundations © 2026
        </span>
      </div>

    </div>
  );
}