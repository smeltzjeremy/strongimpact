import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import SceneContainer from './components/3d/SceneContainer';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white font-sans antialiased overflow-hidden relative">
        
        {/* Navigation Header - Glassmorphic */}
        <header className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">JSTRONG</Link>
          <Link to="/admin" className="px-5 py-2.5 bg-white/10 hover:bg-white/20 rounded-2xl text-sm font-medium border border-white/20 transition">Admin Panel</Link>
        </header>

        {/* Full 3D Ring Layer */}
        <div className="fixed inset-0 z-0 pointer-events-auto">
          <SceneContainer />
        </div>

        {/* Minimal Overlay Content - Better Glassmorphism & Coloring */}
        <div className="relative z-10 min-h-screen flex flex-col justify-center items-center pointer-events-none px-6 text-center">
          <div className="pointer-events-auto max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium tracking-widest">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              INTERACTIVE 3D ENGINE
            </div>
            
            <h1 className="text-6xl md:text-7xl font-extrabold tracking-tighter leading-none bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent mb-6">
              STRONG IMPACT
            </h1>
            
            <p className="text-xl text-zinc-400 max-w-md mx-auto">
              Real-time 3D pipelines with premium glassmorphic interfaces
            </p>
          </div>
        </div>

      </div>
    </Router>
  );
}