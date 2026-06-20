import React from 'react';
import { HashRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import Gallery from './pages/Gallery';
import SceneContainer from './components/3d/SceneContainer';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#05050f] text-white font-sans antialiased overflow-hidden relative">
        
        <Routes>
          {/* Main Public 3D Homepage */}
          <Route path="/" element={
            <div className="relative w-full h-dvh z-10 pointer-events-auto premium-bg">
              
              {/* 🛠️ GLOBAL FIXED NAVIGATION HEADER */}
              <header className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 py-3 flex justify-between items-center">
                
                {/* 🔗 BRAND LOGO IN TOP LEFT CORNER */}
                <div className="h-9 sm:h-11 flex items-center justify-center mix-blend-screen bg-black rounded-lg overflow-hidden border border-white/5 shadow-inner">
                  <img 
                    src="https://i.ibb.co/RpQhSsTv/IMG-5057.jpg" 
                    alt="Strong Impact Logo" 
                    className="h-full w-auto object-contain select-none pointer-events-none"
                  />
                </div>

                {/* NAVIGATION ROUTE ACTIVATION LINKS */}
                <div className="flex items-center gap-2 sm:gap-4">
                  <Link to="/gallery" className="px-3 sm:px-4 py-1.5 sm:py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-[11px] sm:text-xs font-medium border border-red-500/20 transition whitespace-nowrap">
                    Launch Gallery
                  </Link>
                  <Link to="/admin" className="px-4 sm:px-5 py-2 sm:py-2.5 bg-white/10 hover:bg-white/20 rounded-2xl text-xs sm:text-sm font-medium border border-white/20 transition whitespace-nowrap">
                    Admin Panel
                  </Link>
                </div>
              </header>

              {/* ⚡ RESTORED CLEAN HERO TYPOGRAPHY */}
              <div className="fixed top-24 sm:top-28 left-1/2 -translate-x-1/2 z-40 text-center pointer-events-none w-full max-w-[90vw]">
                <div className="inline-flex items-center gap-2 px-5 py-1.5 mb-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] sm:text-xs font-medium tracking-widest uppercase">
                  INTERACTIVE 3D ENGINE
                </div>
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter leading-none select-none">
                  <span className="bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(255,255,255,0.3)]">STRONG </span>
                  <span className="bg-gradient-to-b from-red-400 via-red-500 to-red-700 bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(239,68,68,0.6)]">IMPACT</span>
                </h1>
              </div>

              <SceneContainer />
            </div>
          } />

          {/* Dedicated Gallery Route */}
          <Route path="/gallery" element={<Gallery />} />

          {/* Dedicated Admin Route */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

      </div>
    </Router>
  );
}