import React from 'react';
import { Link } from 'react-router-dom';

export default function Gallery() {
  return (
    <div className="min-h-screen bg-[#05050f] text-white flex flex-col items-center justify-center relative p-6">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.08)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="z-10 text-center max-w-xl w-full">
        <div className="inline-flex items-center gap-2 px-5 py-1.5 mb-8 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold tracking-widest uppercase">
          Media Storage Hub
        </div>
        
        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-3 text-zinc-100">
          SELECT MATRIX
        </h2>
        <p className="text-zinc-400 text-sm mb-12 max-w-sm mx-auto">
          Choose a rendering pipeline to explore the tactical media modules.
        </p>

        {/* Dual Selection Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {/* Photos Pipeline Button */}
          <Link 
            to="/gallery/photos" 
            className="group relative p-8 bg-zinc-900/40 hover:bg-zinc-900/70 border border-white/10 hover:border-red-500/40 rounded-3xl transition-all duration-300 text-left overflow-hidden backdrop-blur-xl shadow-2xl"
          >
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="text-2xl mb-3">📸</div>
            <h3 className="text-xl font-bold text-zinc-200 group-hover:text-white transition-colors">Photo Engine</h3>
            <p className="text-zinc-400 text-xs mt-1 leading-relaxed">Launch the 3D rotating glass lens installation with fluid chrome backdrops.</p>
          </Link>

          {/* Videos Pipeline Button */}
          <Link 
            to="/gallery/videos" 
            className="group relative p-8 bg-zinc-900/40 hover:bg-zinc-900/70 border border-white/10 hover:border-emerald-500/40 rounded-3xl transition-all duration-300 text-left overflow-hidden backdrop-blur-xl shadow-2xl"
          >
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="text-2xl mb-3">🎬</div>
            <h3 className="text-xl font-bold text-zinc-200 group-hover:text-white transition-colors">Video Node</h3>
            <p className="text-zinc-400 text-xs mt-1 leading-relaxed">Access isolated streams and video asset delivery configurations.</p>
          </Link>
        </div>

        {/* Navigation Return */}
        <Link to="/" className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-medium border border-white/10 transition-all text-zinc-400 hover:text-white">
          ← Return to Command Center
        </Link>
      </div>
    </div>
  );
}