import React from 'react';
import { HashRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import SceneContainer from './components/3d/SceneContainer';

function TemporaryGallery() {
  return (
    <div className="py-20 text-center text-gray-400">
      <p className="text-xl">Media Gallery Hub</p>
      <p className="text-sm mt-2">Connect to Supabase to stream your live 3D models and renders.</p>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white font-sans antialiased selection:bg-emerald-500/30 selection:text-emerald-400 overflow-hidden">
       
        {/* Navigation Header */}
        <header className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-md border-b border-white/10 px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            JSTRONG
          </Link>
          <nav className="flex items-center gap-6">
            <Link to="/" className="text-sm text-gray-400 hover:text-white transition">Home</Link>
            <Link to="/admin" className="text-sm px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white font-medium transition border border-white/10">
              Admin Panel
            </Link>
          </nav>
        </header>

        <main className="pt-20">
          <div className="relative min-h-screen">
            {/* 3D Ring - Base Layer */}
            <div className="fixed inset-0 z-0 pointer-events-auto">
              <SceneContainer />
            </div>

            {/* Content Overlay - Higher z-index but transparent to mouse for 3D interaction */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 space-y-24 pointer-events-none">
              <div className="pointer-events-auto">
                {/* Hero Section */}
                <section className="relative pt-12 pb-6 flex flex-col justify-center items-start space-y-6 max-w-3xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium tracking-wide uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Interactive Engine Portfolio
                  </div>
                  <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.1] bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
                    Engineering Depth <br />In Real-Time 3D.
                  </h1>
                  <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-2xl">
                    High-fidelity visualization pipelines, web-optimized asset delivery, and immersive interfaces engineered for flawless client deployment.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-4 pointer-events-auto">
                    <Link to="/admin" className="px-6 py-3 rounded-lg bg-white text-black font-semibold shadow-lg hover:bg-zinc-200 transition">
                      Launch Admin Terminal
                    </Link>
                    <a href="#gallery" className="px-6 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 font-medium hover:bg-zinc-800 transition">
                      View Systems Blueprint
                    </a>
                  </div>
                </section>
              </div>

              {/* Gallery Section */}
              <hr className="border-zinc-800" />
              <section id="gallery" className="space-y-6 pointer-events-auto">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-white">Project Matrix</h2>
                  <p className="text-sm text-zinc-400 mt-1">Direct pipeline telemetry pulled straight from Supabase storage.</p>
                </div>
                <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 min-h-[300px]">
                  <TemporaryGallery />
                </div>
              </section>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-zinc-900 bg-black/40 py-8 px-6 mt-32 relative z-10">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-600">
            <p>© 2026 JStrong Development. All rights reserved.</p>
            <p className="font-mono tracking-widest text-zinc-700">PIPELINE SECURE // LIVE STATUS OK</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}