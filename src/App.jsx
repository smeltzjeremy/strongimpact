import React from 'react';
import SceneContainer from './components/3d/SceneContainer';

function App() {
  return (
    <div style={{ position: 'relative', width: '100vw', minHeight: '100vh', overflow: 'hidden', background: '#030305' }}>
      
      {/* 1. Base Obsidian */}
      <div style={{ position: 'fixed', inset: 0, background: '#030305', zIndex: 0 }} />

      {/* 2. TUNED: 160% horizontal scale with bumped 0.14 core for optimal ring wrapping */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'radial-gradient(ellipse 160% 115% at 50% 25%, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.03) 42%, transparent 72%)',
        zIndex: 1,
        pointerEvents: 'none',
      }} />

      {/* 3. 3D Canvas Space */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 2 }}>
        <SceneContainer />
      </div>

      {/* 4. Micro-Texture */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
        backgroundSize: '6px 6px',
        opacity: 0.04,
        zIndex: 3,
        pointerEvents: 'none',
      }} />

      {/* 5. Wide-Set Vignette */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'radial-gradient(circle at 50% 50%, transparent 45%, rgba(0,0,0,0.96) 100%)',
        zIndex: 4,
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