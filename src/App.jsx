import React from 'react';
import SceneContainer from './components/3d/SceneContainer';

function App() {
  return (
    <div style={{ position: 'relative', width: '100vw', minHeight: '100vh', overflow: 'hidden', background: '#030305' }}>
      
      {/* 1. Base Obsidian Void */}
      <div style={{ position: 'fixed', inset: 0, background: '#030305', zIndex: 0 }} />

      {/* 2. TUNED: Stronger Center Shine.
          Peak center opacity elevated to 0.32 and ellipse stretched wider (150% x 50%) 
          to cast an authoritative chrome horizon wash directly behind the ring path. */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'radial-gradient(ellipse 150% 50% at 50% 38%, rgba(215,225,245,0.32) 0%, rgba(200,205,220,0.18) 22%, rgba(200,205,220,0.05) 50%, transparent 75%)',
        zIndex: 1,
        pointerEvents: 'none',
      }} />

      {/* 3. 3D WebGL Canvas Space */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 2 }}>
        <SceneContainer />
      </div>

      {/* 4. TUNED: Subtle Reinforced Bottom Bounce.
          Stabilized at 0.10 opacity floor and extended higher up the screen viewport 
          to ensure panels rotating through the bottom half cleanly hold their glass profiles. */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'linear-gradient(to top, rgba(190,195,215,0.10) 0%, rgba(190,195,215,0.03) 35%, transparent 60%)',
        zIndex: 4,
        pointerEvents: 'none',
      }} />

      {/* 5. Micro-Texture */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
        backgroundSize: '6px 6px',
        opacity: 0.035,
        zIndex: 5,
        pointerEvents: 'none',
      }} />

      {/* 6. Peripheral Vignette */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'radial-gradient(circle at 50% 50%, transparent 60%, rgba(0,0,0,0.98) 100%)',
        zIndex: 6,
        pointerEvents: 'none',
      }} />

      {/* UI Overlay Layout */}
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
        <div style={{ textAlign: 'center', pointerEvents: 'auto' }}>
          <h1 style={{
            fontSize: 'clamp(2.8rem, 8.5vw, 5.5rem)',
            fontWeight: 900,
            letterSpacing: '0.06em',
            margin: 0,
            color: '#ffffff',
            textShadow: '0 0 42px rgba(0, 255, 204, 0.45)',
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