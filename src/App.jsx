import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import GalleryLayoutPage from './pages/GalleryLayoutPage';   // ← New line

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#05050f] text-white font-sans antialiased overflow-hidden relative">
        <Routes>
          {/* Main Homepage (keep for now or replace later) */}
          <Route path="/" element={<div>Old homepage or redirect</div>} />

          {/* New Gallery with Satin Chrome */}
          <Route path="/gallery" element={<GalleryLayoutPage />} />

          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}