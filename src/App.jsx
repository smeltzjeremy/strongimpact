import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import SceneContainer from './components/3d/SceneContainer';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white font-sans antialiased overflow-hidden relative">
        
        {/* Top Navigation - No JSTRONG on left */}
        <header className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex justify-end items-center">
          <Link to="/admin" className="px-5 py-2.5 bg-white/10 hover:bg-white/20 rounded-2xl text-sm font-medium border border-white/20 transition">Admin Panel</Link>
        </header>

        {/* Hero Text at Top - Fixed and out of the way */}
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-40 text-center pointer-events-none">
          <div className="inline-flex items-center gap-2 px-5 py-1.5 mb-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium tracking-widest">
            INTERACTIVE 3D ENGINE
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter leading-none bg-gradient-to-b from-white to-zinc-300 bg-clip-text text-transparent">
            STRONG IMPACT
          </h1>
        </div>

        {/* Full 3D Ring - Maximum Interaction Space */}
        <div className="fixed inset-0 z-0 pointer-events-auto">
          <SceneContainer />
        </div>

      </div>
    </Router>
  );
}