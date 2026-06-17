import React from 'react';
import SceneContainer from './components/3d/SceneContainer';

function App() {
  return (
    <div style={{ position: 'relative', width: '100vw', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Frosted Background Layer */}
      <div className="background-frost" />

      {/* 3D Canvas Layer */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 1 }}>
        <SceneContainer />
      </div>

      {/* UI Overlay */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '5vh 20px 6vh',
        pointerEvents: 'none',
        boxSizing: 'border-box'
      }}>
        
        {/* Top Content Layout Block (Title + Description Grouped Together) */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          textAlign: 'center', 
          pointerEvents: 'auto',
          width: '100%'
        }}>
          <h1 style={{
            fontSize: 'clamp(2.8rem, 8.5vw, 5.5rem)',
            fontWeight: 900,
            letterSpacing: '0.05em',
            margin: 0,
            background: 'linear-gradient(90deg, #ffffff, #a0f0ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            STRONG IMPACT
          </h1>
          <p style={{
            fontSize: 'clamp(1.1rem, 3.2vw, 1.45rem)',
            color: '#67ffcc',
            marginTop: '0.4rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
            marginBottom: '1.5rem'
          }}>
            Interactive 3D Engine Pipeline v1.0
          </p>

          {/* Premium Glass Description Layer */}
          <div style={{
            width: 'min(560px, 92%)',
            padding: '1.8rem 2.4rem',
            background: 'rgba(15, 23, 42, 0.55)',
            backdropFilter: 'blur(32px)',
            WebkitBackdropFilter: 'blur(32px)',
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.25)',
            boxShadow: '0 30px 70px -20px rgba(0,0,0,0.75), inset 0 2px 0 rgba(255,255,255,0.3)',
            lineHeight: 1.65,
            fontSize: '14.5px',
            color: '#e0f0ff',
          }}>
            A high-performance WebGL canvas environment built piece by piece. 
            Click and drag to rotate space, or select any orbiting panel module.
          </div>
        </div>

        {/* Action Control Buttons Layout Footer */}
        <div style={{ display: 'flex', gap: '1.8rem', pointerEvents: 'auto', marginTop: '2rem' }}>
          <button style={{
            padding: '16px 40px',
            fontSize: '1.1rem',
            fontWeight: 700,
            borderRadius: '9999px',
            background: 'linear-gradient(90deg, #00ffcc, #00d4aa)',
            color: '#0a0a1a',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 12px 35px rgba(0, 255, 200, 0.45)',
          }}>
            Initialize Project
          </button>
          <button style={{
            padding: '16px 40px',
            fontSize: '1.1rem',
            fontWeight: 700,
            borderRadius: '9999px',
            background: 'rgba(255,255,255,0.08)',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.35)',
            backdropFilter: 'blur(16px)',
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