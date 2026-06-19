import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import SceneContainer from './components/3d/SceneContainer';
import AdminDashboard from './pages/AdminDashboard';

// ─── 1. YOUR ORIGINAL HOME PAGE ENGINE VIEW ───
function HomeHero() {
  return (
    <div style={{ position: 'relative', width: '100vw', minHeight: '100vh', overflow: 'hidden', background: '#030305' }}>
      {/* Base Obsidian Void */}
      <div style={{ position: 'fixed', inset: 0, background: '#030305', zIndex: 0 }} />

      {/* Liquid Anamorphic Backdrop Core */}
      <div style={{
        position: 'fixed', inset: 0,
        background: 'radial-gradient(ellipse 160% 52% at 50% 38%, rgba(215,225,245,0.35) 0%, rgba(200,205,220,0.20) 20%, rgba(200,205,220,0.05) 52%, transparent 75%)',
        zIndex: 1, pointerEvents: 'none',
      }} />

      {/* 3D WebGL Canvas Space */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 2 }}>
        <SceneContainer />
      </div>

      {/* Precise Double-Layered Bottom Bounce */}
      <div style={{
        position: 'fixed', inset: 0,
        background: 'linear-gradient(to top, rgba(190,195,215,0.10) 0%, rgba(190,195,215,0.03) 35%, transparent 60%)',
        zIndex: 4, pointerEvents: 'none',
      }} />

      {/* Micro-Texture */}
      <div style={{
        position: 'fixed', inset: 0,
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
        backgroundSize: '6px 6px', opacity: 0.035, zIndex: 5, pointerEvents: 'none',
      }} />

      {/* Peripheral Vignette */}
      <div style={{
        position: 'fixed', inset: 0,
        background: 'radial-gradient(circle at 50% 50%, transparent 60%, rgba(0,0,0,0.98) 100%)',
        zIndex: 6, pointerEvents: 'none',
      }} />

      {/* UI Overlay */}
      <div style={{
        position: 'relative', zIndex: 10, minHeight: '100vh', display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', alignItems: 'center', padding: '6vh 24px 4vh', pointerEvents: 'none', boxSizing: 'border-box',
      }}>
        <div style={{ textAlign: 'center', pointerEvents: 'auto' }}>
          <h1 style={{ fontSize: 'clamp(2.8rem, 8.5vw, 5.5rem)', fontWeight: 900, letterSpacing: '0.06em', margin: 0, color: '#ffffff', textShadow: '0 0 42px rgba(0, 255, 204, 0.45)' }}>
            STRONG IMPACT
          </h1>
          <p style={{ fontSize: 'clamp(1.05rem, 3vw, 1.35rem)', color: '#67ffcc', marginTop: '0.6rem', fontWeight: 700, letterSpacing: '0.12em' }}>
            Interactive 3D Engine Pipeline v1.0
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', pointerEvents: 'auto' }}>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link to="/gallery" style={{
              padding: '16px 42px', fontSize: '1.05rem', fontWeight: 700, borderRadius: '9999px', textDecoration: 'none',
              background: 'linear-gradient(90deg, #00ffcc, #00d4aa)', color: '#05050a', cursor: 'pointer',
              boxShadow: '0 12px 35px rgba(0, 255, 204, 0.35)'
            }}>
              Initialize Project
            </Link>
            <button style={{ padding: '16px 42px', fontSize: '1.05rem', fontWeight: 700, borderRadius: '9999px', background: 'rgba(255,255,255,0.04)', color: '#fff', border: '1px solid rgba(255,255,255,0.25)', backdropFilter: 'blur(16px)', cursor: 'pointer' }}>
              View Source
            </button>
          </div>

          {/* Secure System Access Entry Point */}
          <Link to="/admin" style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.8rem', textDecoration: 'underline' }}>
            Secure Terminal System Authentication
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── 2. TEMPORARY GALLERY ROUTING SPLIT HUB ───
function GalleryHub() {
  return (
    <div style={{ minHeight: '100vh', background: '#030305', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '30px', fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#fff', letterSpacing: '0.1em' }}>SELECT MEDIA MATRIX</h2>
      <div style={{ display: 'flex', gap: '40px' }}>
        <button style={{ padding: '24px 60px', background: 'rgba(255,255,255,0.02)', color: '#ff3366', fontWeight: 'bold', fontSize: '1.2rem', border: '1px solid #ff3366', borderRadius: '16px', backdropFilter: 'blur(16px)' }}>
          📷 PHOTO CLOCK DIAL (NEXT UP)
        </button>
        <button style={{ padding: '24px 60px', background: 'rgba(255,255,255,0.01)', color: 'rgba(255,255,255,0.3)', fontWeight: 'bold', fontSize: '1.2rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', cursor: 'not-allowed' }}>
          🎥 VIDEO PIPELINE
        </button>
      </div>
    </div>
  );
}

// ─── 3. CORE GLOBAL ROUTER TREE ───
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeHero />} />
        <Route path="/gallery" element={<GalleryHub />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}