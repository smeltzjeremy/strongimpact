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
              
              {/* Top Navigation */}
              <header className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex justify-end items-center gap-4">
                <Link to="/gallery" className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-xs font-medium border border-red-500/20 transition">
                  Launch Gallery
                </Link>
                <Link to="/admin" className="px-5 py-2.5 bg-white/10 hover:bg-white/20 rounded-2xl text-sm font-medium border border-white/20 transition">
                  Admin Panel
                </Link>
              </header>

              {/* Hero Logo Placement Center Top */}
              <div className="fixed top-20 left-1/2 -translate-x-1/2 z-40 text-center pointer-events-none flex flex-col items-center max-w-[90vw]">
                <div className="inline-flex items-center gap-2 px-5 py-1.5 mb-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium tracking-widest">
                  INTERACTIVE 3D ENGINE
                </div>
                
                {/* 🌟 SLIM BRAND LOGO DISPLAY EMBED (Optimized dimensions & multiply layer filter) */}
                <div className="w-[180px] sm:w-[220px] md:w-[260px] h-auto flex items-center justify-center mix-blend-multiply overflow-hidden drop-shadow-[0_2px_12px_rgba(255,255,255,0.05)]">
                  <img 
                    src="https://i.ibb.co/RpQhSsTv/IMG-5057.jpg" 
                    alt="Strong Impact Logo" 
                    className="w-full h-auto object-contain select-none pointer-events-none"
                  />
                </div>
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