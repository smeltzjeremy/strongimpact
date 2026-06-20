import React from 'react';
import { HashRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import SceneContainer from './components/3d/SceneContainer';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#05050f] text-white font-sans antialiased overflow-hidden relative">
        
        {/* Top Navigation */}
        <header className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex justify-end items-center">
          <Link to="/admin" className="px-5 py-2.5 bg-white/10 hover:bg-white/20 rounded-2xl text-sm font-medium border border-white/20 transition">Admin Panel</Link>
        </header>

        {/* Hero Text at Top */}
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-40 text-center pointer-events-none">
          <div className="inline-flex items-center gap-2 px-5 py-1.5 mb-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium tracking-widest">
            INTERACTIVE 3D ENGINE
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tighter leading-none">
            <span className="bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(255,255,255,0.3)]">STRONG </span>
            <span className="bg-gradient-to-b from-red-400 via-red-500 to-red-700 bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(239,68,68,0.6)]">IMPACT</span>
          </h1>
        </div>

        {/* Routes */}
        <Routes>
          <Route path="/" element={
            <div className="relative w-full h-screen z-10 pointer-events-auto premium-depth-bg">
              <SceneContainer />
            </div>
          } />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

      </div>
    </Router>
  );
}