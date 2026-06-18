import React from 'react';
import SceneContainer from './components/3d/SceneContainer';

function App() {
  return (
    <div style={{ position: 'relative', width: '100vw', minHeight: '100vh', overflow: 'hidden' }}>
      
      {/* 1. Base Deep Polished Obsidian */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: '#030305',
        zIndex: 0,
      }} />

      {/* 2. Sharp Chrome Horizon Drop (Rapid transition for metallic edge) */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.22) 6%, rgba(255,255,255,0.04) 18%, rgba(255,255,255,0.01) 32%, transparent 50%)',
        zIndex: 1,
        pointerEvents: 'none',
      }} />

      {/* 3. Subtle Bottom-Up Ambient Reflection (Secondary sheen for depth) */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'linear-gradient(to top, rgba(255,255,255,0.04) 0%, transparent 45%)',
        zIndex: 2,
        pointerEvents: 'none',
      }} />

      {/* 4. 3D Canvas */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 3 }}>
        <SceneContainer />
      </div>

      {/* 5. Very Light Micro-Texture */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)',
        backgroundSize: '5px 5px',
        opacity: 0.035,
        zIndex: 4,
        pointerEvents: 'none',
      }} />

      {/* 6. Clean Vignette */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'radial-gradient(circle at 50% 50%, transparent 38%, rgba(0,0,0,0.96) 100%)',
        zIndex: 5,
        pointerEvents: 'none',
      }} />

      {/* UI Overlay */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '6vh 24px 8vh',
        pointerEvents: 'none',
        boxSizing: 'border-box',
      }}>
        {/* Title */}
        <div style={{ textAlign: 'center', pointerEvents: 'auto' }}>
          <h1 style={{
            fontSize: 'clamp(2.8rem, 8.5vw, 5.5rem)',
            fontWeight: 900,
            letterSpacing: '0.06em',
            margin: 0,
            color: '#ffffff',
            textShadow: '0 0 42px rgba(0, 255, 204, 0.55)',
          }}>
            STRONG IMPACT
          </h1>
          <p style={{
            fontSize: 'clamp(1.05rem, 3vw, 1.35rem)',
            color: '#67ffcc',
            marginTop: '0.6rem',
            fontWeight: 700,
            letterSpacing: '0.12em'
          }}>
            Interactive 3D Engine Pipeline v1.0
          </p>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '1.5rem', pointerEvents: 'auto' }}>
          <button style={{
            padding: '16px 42px',
            fontSize: '1.05rem',
            fontWeight: 700,
            borderRadius: '9999px',
            background: 'linear-gradient(90deg, #00ffcc, #00d4aa)',
            color: '#05050a',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 12px 35px rgba(0, 255, 204, 0.35)',
          }}>
            Initialize Project
          </button>
          <button style={{
            padding: '16px 42px',
            fontSize: '1.05rem',
            fontWeight: 700,
            borderRadius: '9999px',
            background: 'rgba(255,255,255,0.04)',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.25)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            cursor: 'pointer',
          }}>
            View Source
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;