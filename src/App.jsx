import React from 'react';
import SceneContainer from './components/3d/SceneContainer';

function App() {
  return (
    <div style={{ position: 'relative', width: '100vw', minHeight: '100vh', overflow: 'hidden' }}>
      {/* 1. Hardware Accelerated Background Layer */}
      <div className="premium-bg" />

      {/* 2. Full-Screen Backdrop Canvas Viewport */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 1 }}>
        <SceneContainer />
      </div>

      {/* 3. High-End Interface Overlay HUD */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '6vh 24px 6vh',
        pointerEvents: 'none',
        boxSizing: 'border-box'
      }}>
        
        {/* Dynamic Top Block Cluster (Prevents Center Smash) */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          textAlign: 'center',
          width: '100%'
        }}>
          <header style={{ pointerEvents: 'auto', marginBottom: '2rem' }}>
            <h1 className="glow-title" style={{
              fontSize: 'clamp(2.6rem, 8vw, 5.2rem)',
              fontWeight: 900,
              letterSpacing: '0.06em',
              margin: 0
            }}>
              STRONG IMPACT
            </h1>
            <p style={{
              fontSize: 'clamp(1.1rem, 3.2vw, 1.4rem)',
              color: '#00ffcc',
              marginTop: '0.5rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textShadow: '0 2px 8px rgba(0,0,0,0.8)'
            }}>
              Interactive 3D Engine Pipeline v1.0
            </p>
          </header>

          <div 
            className="glass-card-premium"
            style={{
              width: 'min(540px, 100%)',
              padding: '2rem 2.5rem',
              borderRadius: '24px',
              lineHeight: 1.6,
              fontSize: '14.5px',
              color: '#e2e8f0',
              pointerEvents: 'auto'
            }}
          >
            A high-performance WebGL canvas environment built piece by piece. 
            Click and drag to rotate space, or select any orbiting panel module.
          </div>
        </div>

        {/* Floating Action Button Footer HUD */}
        <div style={{ display: 'flex', gap: '1.5rem', pointerEvents: 'auto', marginTop: '2rem' }}>
          <button style={{
            padding: '16px 38px',
            fontSize: '1.05rem',
            fontWeight: 700,
            borderRadius: '9999px',
            background: 'linear-gradient(90deg, #00ffcc, #00ccaa)',
            color: '#05050f',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 8px 25px rgba(0, 255, 204, 0.35)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05) translateY(-2px)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1) translateY(0)'}
          >
            Initialize Project
          </button>
          <button style={{
            padding: '16px 38px',
            fontSize: '1.05rem',
            fontWeight: 700,
            borderRadius: '9999px',
            background: 'rgba(255,255,255,0.06)',
            color: '#ffffff',
            border: '1px solid rgba(255,255,255,0.25)',
            backdropFilter: 'blur(12px)',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(255,255,255,0.12)';
            e.target.style.transform = 'scale(1.05) translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(255,255,255,0.06)';
            e.target.style.transform = 'scale(1) translateY(0)';
          }}
          >
            View Source
          </button>
        </div>

      </div>
    </div>
  );
}

export default App;