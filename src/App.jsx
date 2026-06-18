import React from 'react';
import SceneContainer from './components/3d/SceneContainer';

function App() {
  return (
    <div style={{ position: 'relative', width: '100vw', minHeight: '100vh', overflow: 'hidden', background: '#020208' }}>
      
      {/* 1. Subtle Curved Depth (Base void gradient) */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'radial-gradient(circle at 50% 50%, #0c0c1a 0%, #020206 80%)',
        zIndex: 0,
      }} />

      {/* 2. Main Frosted Glass Layer (Optimized blur behind the 3D Canvas) */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 22, 45, 0.07)', 
        backdropFilter: 'blur(24px)',          // Tuned to 24px for pristine 3D panel clarity
        WebkitBackdropFilter: 'blur(24px)',
        zIndex: 1,
        pointerEvents: 'none',
      }} />

      {/* 3. Edge Reflections + Vignette */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: `
          linear-gradient(to bottom, rgba(255,255,255,0.09) 0%, transparent 4%),
          linear-gradient(to right, rgba(255,255,255,0.04) 0%, transparent 3%),
          linear-gradient(to left, rgba(255,255,255,0.04) 0%, transparent 3%),
          radial-gradient(circle at 50% 50%, transparent 40%, rgba(1,1,4,0.85) 100%)
        `, 
        zIndex: 2,
        pointerEvents: 'none',
      }} />

      {/* 4. 3D Canvas Layer */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 3 }}>
        <SceneContainer />
      </div>

      {/* 5. Front Viewport Micro-Texture (Tuned to 0.05 for distinct mobile visibility) */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)',
        backgroundSize: '4px 4px',
        opacity: 0.05, // Upgraded to your target value to make the viewport tactile
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
        padding: '5vh 20px 7vh',
        pointerEvents: 'none',
        boxSizing: 'border-box',
      }}>
        {/* Title */}
        <div style={{ textAlign: 'center', pointerEvents: 'auto' }}>
          <h1 style={{
            fontSize: 'clamp(2.8rem, 8.5vw, 5.5rem)',
            fontWeight: 900,
            letterSpacing: '0.04em',
            margin: 0,
            color: '#ffffff',
            textShadow: '0 0 45px rgba(0, 255, 204, 0.75)',
          }}>
            STRONG IMPACT
          </h1>
          <p style={{
            fontSize: 'clamp(1.1rem, 3.2vw, 1.45rem)',
            color: '#67ffcc',
            marginTop: '0.5rem',
            fontWeight: 700,
            letterSpacing: '0.1em'
          }}>
            Interactive 3D Engine Pipeline v1.0
          </p>
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