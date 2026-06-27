import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import SceneContainer from './components/3d/SceneContainer';
import GalleryPage from './pages/GalleryPage';
import PhotosPage from './pages/PhotosPage';
import TheaterPage from './pages/TheaterPage'; 
import LinksPage from './components/LinksPage';
import NavigationMenu from './components/NavigationMenu';

import AboutPage from './pages/AboutPage';
import AboutDetails from './pages/AboutDetails'; // ← Fully Imported
import ProgramsPage from './pages/ProgramsPage';
import EventsPage from './pages/EventsPage';
import GetInvolvedPage from './pages/GetInvolvedPage';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-[#05050f] text-white font-sans antialiased overflow-hidden relative">
        
        {/* GLOBAL NAVIGATION HAMBURGER BUTTON */}
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => setMenuOpen(true)}
            className="px-5 py-3 bg-zinc-900/60 backdrop-blur-md border border-white/5 hover:border-red-600/40 text-white font-black text-[10px] uppercase tracking-widest rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.7), inset 0 1px 1px 0 rgba(255, 255, 255, 0.05)'
            }}
          >
            ☰ Menu
          </button>
        </div>

        {/* Global Slide Drawer Overlay */}
        <NavigationMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

        <Routes>
          {/* MAIN 3D PORTAL ENGINE VIEW */}
          <Route path="/" element={
            <div className="relative w-full h-dvh z-10 pointer-events-auto">
              <header className="fixed top-0 left-0 w-full z-40 bg-black/40 backdrop-blur-md border-b border-white/5 px-4 sm:px-6 py-3 flex justify-between items-center gap-4">
                <div className="h-12 sm:h-14 w-28 sm:w-32 flex items-center justify-center bg-white rounded-xl overflow-hidden border border-white/10 shadow-lg shrink-0">
                  <span className="text-zinc-900 font-black text-xs uppercase tracking-tight px-2">Strong Impact</span>
                </div>
              </header>

              {/* HERO TITLE */}
              <div className="fixed top-28 sm:top-36 left-1/2 -translate-x-1/2 z-35 text-center pointer-events-none w-full max-w-[90vw]">
                <div className="inline-flex items-center gap-2 px-5 py-1.5 mb-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium tracking-widest uppercase">
                  INTERACTIVE 3D ENGINE
                </div>
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter leading-none select-none">
                  <span className="bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(255,255,255,0.3)]">STRONG </span>
                  <span className="bg-gradient-to-b from-red-400 via-red-500 to-red-700 bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(239,68,68,0.6)]">IMPACT</span>
                </h1>
              </div>

              {/* 3D SCENE ROOT CANVAS LAYER */}
              <SceneContainer />

              {/* DOCK BAR CAPSULES NAVIGATION SLAT */}
              <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-45 flex items-center gap-3 w-full max-w-sm sm:max-w-md px-4">
                <Link
                  to="/links"
                  className="flex-1 px-4 py-3 sm:px-6 bg-zinc-900/60 backdrop-blur-md border border-zinc-800/80 text-white font-black text-[11px] sm:text-xs uppercase tracking-widest rounded-full shadow-2xl transition-all duration-300 hover:border-red-600 hover:scale-105 hover:bg-zinc-900/80 active:scale-95 text-center"
                >
                  🔗 Connect Links
                </Link>
                <a
                  href="https://strongimpact.pages.dev" 
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 px-4 py-3 sm:px-6 bg-zinc-950/40 backdrop-blur-md border border-zinc-900/80 text-zinc-400 font-bold text-[11px] sm:text-xs uppercase tracking-widest rounded-full shadow-xl transition-all duration-300 hover:border-zinc-700 hover:text-white hover:scale-105 active:scale-95 text-center truncate"
                >
                  Old Style Site
                </a>
              </div>
            </div>
          } />

          {/* REGISTERED PORTAL LINK PATHWAYS */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/about/details" element={<AboutDetails />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/get-involved" element={<GetInvolvedPage />} />
          
          <Route path="/links" element={<LinksPage onClose={() => window.location.hash = '#/'} />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/photos" element={<PhotosPage />} />
          <Route path="/theater" element={<TheaterPage />} />
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}