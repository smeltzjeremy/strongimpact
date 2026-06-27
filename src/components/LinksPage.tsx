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
      color: 'from-purple-600 via-pink-500 to-yellow-500',
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
      color: 'from-blue-600 to-blue-700',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
        </svg>
      )
    },
    {
      name: 'Gmail',
      handle: 'Strongimpact33@gmail.com',
      url: 'mailto:Strongimpact33@gmail.com',
      color: 'from-red-600 to-red-700',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
      )
    },
    {
      name: 'Phone Line',
      handle: '+1 (803) 899-2753',
      url: 'tel:+18038992753',
      color: 'from-emerald-500 to-teal-600',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.72.73.73 0 00.58.48l1.58.28a1 1 0 01.77.93v2.53a1 1 0 01-.73.96l-1.58.38a1 1 0 00-.59.47l-1.01 1.01a14.96 14.96 0 006.18 6.18l1.01-1.01a1 1 0 00.47-.59l.38-1.58a1 1 0 01.96-.73h2.53a1 1 0 01.93.77l.28 1.58a1 1 0 00.48.58l.72.94a1 1 0 01-.2 1.3H19a16 16 0 01-16-16v0z"/>
        </svg>
      )
    }
  ];

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-black z-50 flex flex-col justify-between p-6 overflow-y-auto">
      
      {/* 1. HIGH GLOSS SHINY REFLECTION CELLING HEADER */}
      <div className="w-full max-w-md mx-auto flex justify-between items-center mt-4">
        <div className="h-1 w-12 bg-gradient-to-r from-red-600 to-transparent rounded-full" />
        <button 
          onClick={onClose} 
          className="text-xs uppercase font-black tracking-widest text-zinc-500 hover:text-white px-4 py-2 bg-zinc-900/30 border border-zinc-800/60 rounded-full transition-all hover:scale-105"
        >
          ✕ Close
        </button>
      </div>

      {/* 2. MAIN CENTER MATRIX HUBS */}
      <div className="w-full max-w-sm mx-auto my-auto space-y-4">
        
        {/* Brand Display Anchor */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black uppercase tracking-tighter text-white">
            STRONG <span className="text-red-600 bg-clip-text">IMPACT</span>
          </h1>
          <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mt-1">Direct Connection Directory</p>
        </div>

        {/* SMOKEY GLASS CARDS ARRAY */}
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className="block w-full p-4 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl backdrop-blur-xl shadow-xl hover:shadow-2xl hover:border-zinc-700/60 transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden"
          >
            {/* The Back-reflection glow point */}
            <div className={`absolute -right-4 -bottom-4 w-24 h-24 bg-gradient-to-br ${link.color} opacity-5 group-hover:opacity-20 transition-opacity blur-2xl rounded-full`} />

            <div className="flex items-center space-x-4">
              {/* Official Brand Tint Logo Container */}
              <div className={`p-3 rounded-xl bg-gradient-to-br ${link.color} text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                {link.icon}
              </div>

              {/* Text Meta Data Details */}
              <div className="flex-1 text-left">
                <span className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold group-hover:text-zinc-400 transition-colors">
                  {link.name}
                </span>
                <span className="block text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors truncate max-w-[220px]">
                  {link.handle}
                </span>
              </div>

              {/* Action Indicator Chevron */}
              <div className="text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-all text-xs font-mono">
                ➔
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* 3. SHINY FLOATING REFLECTIVE REAR ANCHOR BASE */}
      <div className="w-full text-center mb-4">
        <span className="text-[9px] uppercase tracking-widest text-zinc-600 font-medium">
          Building Stronger Foundations © 2026
        </span>
      </div>

    </div>
  );
}