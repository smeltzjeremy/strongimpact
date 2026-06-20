import React from 'react';
import { Link } from 'react-router-dom';

export default function Gallery() {
  return (
    <div className="min-h-screen bg-[#05050f] text-white flex flex-col items-center justify-center relative p-6">
      {/* Background Glow to match theme */}
      <div className="absolute inset-0 bg-radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.1) 0%, transparent 70%) pointer-events-none" />
      
      <div className="z-10 text-center">
        <div className="inline-flex items-center gap-2 px-5 py-1.5 mb-6 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium tracking-widest animate-pulse">
          STAGE 1: ROUTING NODE CONNECTED
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-zinc-200">
          3D PHOTO GALLERY
        </h1>
        <p className="text-zinc-400 max-w-sm mb-8 text-sm">
          Connection successful. The liquid-chrome engine and glass refraction matrices will mount here.
        </p>
        
        <div className="flex gap-4 justify-center">
          <Link to="/" className="px-5 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-medium border border-white/10 transition">
            ← Back Home
          </Link>
          <Link to="/admin" className="px-5 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-medium border border-white/10 transition">
            Go to Admin →
          </Link>
        </div>
      </div>
    </div>
  );
}