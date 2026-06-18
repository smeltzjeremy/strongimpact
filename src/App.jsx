import React from 'react';
import SceneContainer from './components/3d/SceneContainer';

function App() {
  return (
    <div style={{ position: 'relative', width: '100vw', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Background */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'radial-gradient(circle at 50% 30%, rgba(100, 180, 255, 0.16) 0%, #05050f 70%)',
        zIndex: 0,
      }} />
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
        backgroundSize: '55px 55px',
        zIndex: 0,
        pointerEvents: 'none',
      }} />

      {/* 3D Canvas */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 1 }}>
        <SceneContainer />
      </div>

      {/* UI Overlay - Header Pushed Higher */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        padding: '4vh 20px 6vh',   // Reduced top padding
        pointerEvents: 'none',
        boxSizing: 'border-box',
      }}>
        {/* Title + Description - Higher on screen */}
        <div style={{ 
          textAlign: 'center', 
          pointerEvents: 'auto', 
          marginBottom: 'auto' 
        }}>
          <h1 style={{
            fontSize: 'clamp(2.8rem, 8.5vw, 5.5rem)',
            fontWeight: 900,
            letterSpacing: '0.04em',
            margin: '0 0 0.4rem 0',
            color: '#ffffff',
            textShadow: '0 0 45px rgba(0, 255, 204, 0.75)',
          }}>
            STRONG IMPACT
          </h1>
          <p style={{
            fontSize: 'clamp(1.1rem, 3.2vw, 1.45rem)',
            color: '#67ffcc',
            fontWeight: 700,
            letterSpacing: '0.1em'
          }}>
            Interactive 3D Engine Pipeline v1.0
          </p>

          <div style={{
            width: 'min(540px, 92%)',
            padding: '1.6rem 2rem',
            margin: '1.8rem auto 0',
            background: 'rgba(12, 18, 35, 0.7)',
            backdropFilter: 'blur(32px)',
            WebkitBackdropFilter: 'blur(32px)',
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.25)',
            boxShadow: '0 30px 70px -20px rgba(0,0,0,0.8)',
            lineHeight: 1.65,
            fontSize: '14.8px',
            color: '#e0f0ff',
            pointerEvents: 'auto',
          }}>
            A high-performance WebGL canvas environment built piece by piece. 
            Click and drag to rotate space, or select any orbiting panel module.
          </div>
        </div>

        {/* Buttons at Bottom */}
        <div style={{ display: 'flex', gap: '1.6rem', pointerEvents: 'auto', marginTop: 'auto' }}>
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