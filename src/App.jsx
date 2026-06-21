import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import SceneContainer from './components/3d/SceneContainer';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#05050f] text-white font-sans antialiased overflow-hidden relative">
        <Routes>
          {/* MAIN PAGE - RESTORED WITH STRONG IMPACT */}
          <Route path="/" element={
            <div className="relative w-full h-dvh z-10 pointer-events-auto premium-bg">
              {/* FIXED NAVIGATION HEADER */}
              <header className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 py-3 flex justify-between items-center gap-4">
                <div className="h-12 sm:h-16 w-28 sm:w-36 flex items-center justify-center bg-white rounded-xl overflow-hidden border border-white/10 shadow-lg shrink-0">
                  <img 
                    src="https://i.ibb.co/RpQhSsTv/IMG-5057.jpg" 
                    alt="Strong Impact Logo" 
                    className="h-full w-full object-cover object-center scale-105 select-none pointer-events-none"
                  />
                </div>

                <div className="flex items-center gap-2 sm:gap-4">
                  <a href="/admin" className="px-4 sm:px-5 py-2 sm:py-2.5 bg-white/10 hover:bg-white/20 rounded-2xl text-xs sm:text-sm font-medium border border-white/20 transition whitespace-nowrap">
                    Admin Panel
                  </a>
                </div>
              </header>

              <SceneContainer />
            </div>
          } />

          {/* Admin for Photos */}
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}