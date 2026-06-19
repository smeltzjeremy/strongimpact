import React from 'react';
import SceneContainer from './components/3d/SceneContainer';

function App() {
  return (
    <div style={{ position: 'relative', width: '100vw', minHeight: '100vh', overflow: 'hidden', background: '#030305' }}>
      
      {/* 1. Base Obsidian Void */}
      <div style={{ position: 'fixed', inset: 0, background: '#030305', zIndex: 0 }} />

      {/* 2. FIXED: High-Exposure Specular Chrome Core.
          Uses multi-stop nesting to jam a bright, sharp white highlight right in the center (36% to 38%),
          mimicking a physical, high-frequency fluorescent tube light source behind the cards. */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'radial-gradient(ellipse 140% 45% at 50% 38%, rgba(240,245,255,0.38) 0%, rgba(200,205,220,0.22) 15%, rgba(200,205,220,0.06) 45%, transparent 70%)',
        zIndex: 1,
        pointerEvents: 'none',
      }} />

      {/* 3. 3D Canvas Space (Housing your updated overlapping MenuRing meshes) */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 2 }}>
        <SceneContainer />
      </div>

      {/* 4. FIXED: Amplified Ground Bounce.
          Cranked from 0.08 to 0.14 and pulled up higher to fully illuminate the bottom 
          half of the screen, ensuring the glass panels never drop into a dead black void. */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'linear-gradient(to top, rgba(195,200,220,0.14) 0%, rgba(195,200,220,0.03) 30%, transparent 55%)',
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

      {/* 6. Recalibrated Vignette (Pushed wide to 62% to allow the high-exposure core to breathe on desktop monitors) */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'radial-gradient(circle at 50% 50%, transparent 62%, rgba(0,0,0,0.98) 100%)',
        zIndex: 6,
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