import React from 'react';
import SceneContainer from './components/3d/SceneContainer';

function App() {
  return (
    <div style={{ position: 'relative', width: '100vw', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Enhanced Frosted Background */}
      <div className="premium-bg" />

      {/* 3D Canvas */}
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
        padding: '5vh 20px 7vh',
        pointerEvents: 'none',
        boxSizing: 'border-box',
      }}>
        {/* Top Section */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          textAlign: 'center',
          width: '100%'
        }}>
          <header style={{ pointerEvents: 'auto', marginBottom: '1.5rem' }}>
            <h1 style={{
              fontSize: 'clamp(2.8rem, 8.5vw, 5.4rem)',
              fontWeight: 900,
              letterSpacing: '0.04em',
              margin: 0,
              color: '#ffffff',
              textShadow: '0 0 40px rgba(0, 255, 204, 0.6)',
            }}>
              STRONG IMPACT
            </h1>
            <p style={{
              fontSize: 'clamp(1.1rem, 3.2vw, 1.45rem)',
              color: '#67ffcc',
              marginTop: '0.4rem',
              fontWeight: 700,
              letterSpacing: '0.1em'
            }}>
              Interactive 3D Engine Pipeline v1.0
            </p>
          </header>

          {/* Glass Description - Better mobile spacing */}
          <div 
            className="glass-card-premium"
            style={{
              width: 'min(540px, 92%)',
              padding: '1.8rem 2.2rem',
              borderRadius: '22px',
              lineHeight: 1.65,
              fontSize: '14.8px',
              color: '#e0f0ff',
              pointerEvents: 'auto',
              marginBottom: '1rem'
            }}
          >
            A high-performance WebGL canvas environment built piece by piece. 
            Click and drag to rotate space, or select any orbiting panel module.
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '1.6rem', pointerEvents: 'auto' }}>
          <button style={{
            padding: '16px 38px',
            fontSize: '1.1rem',
            fontWeight: 700,
            borderRadius: '9999px',
            background: 'linear-gradient(90deg, #00ffcc, #00d4aa)',
            color: '#0a0a1a',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(0, 255, 204, 0.4)',
          }}>
            Initialize Project
          </button>
          <button style={{
            padding: '16px 38px',
            fontSize: '1.1rem',
            fontWeight: 700,
            borderRadius: '9999px',
            background: 'rgba(255,255,255,0.08)',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.3)',
            backdropFilter: 'blur(14px)',
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