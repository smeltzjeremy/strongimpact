import React from 'react';
import SceneContainer from './components/3d/SceneContainer';

function App() {
  return (
    <div style={{
      position: 'relative',
      width: '100vw',
      minHeight: '100vh',
      background: '#05050f',
      color: '#ffffff',
      fontFamily: "'Inter', system-ui, sans-serif",
      overflow: 'hidden',
      margin: 0,
      padding: 0,
    }}>
      {/* 3D Layer - Full Screen */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
      }}>
        <SceneContainer />
      </div>

      {/* UI Overlay Layer */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '6vh 20px 8vh',
        pointerEvents: 'none',
        boxSizing: 'border-box',
      }}>
        {/* Header */}
        <header style={{ textAlign: 'center', pointerEvents: 'auto' }}>
          <h1 style={{
            fontSize: 'clamp(2.8rem, 8vw, 5rem)',
            fontWeight: 900,
            letterSpacing: '0.06em',
            margin: 0,
            textShadow: '0 0 40px rgba(0, 255, 200, 0.5)',
            color: '#ffffff'
          }}>
            STRONG IMPACT
          </h1>
          <p style={{
            fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
            color: '#00ffcc',
            marginTop: '0.5rem',
            fontWeight: 700,
            letterSpacing: '0.08em'
          }}>
            Interactive 3D Engine Pipeline v1.0
          </p>
        </header>

        {/* Glass Description */}
        <div style={{
          width: 'min(520px, 92%)',
          padding: '2rem 2.4rem',
          background: 'rgba(15, 23, 42, 0.68)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          borderRadius: '20px',
          border: '1px solid rgba(255,255,255,0.2)',
          textAlign: 'center',
          lineHeight: 1.6,
          fontSize: '15px',
          boxShadow: '0 25px 60px -15px rgba(0,0,0,0.7)',
          pointerEvents: 'auto',
          margin: '1rem 0'
        }}>
          A high-performance WebGL canvas environment built piece by piece. 
          Click and drag to rotate space, or select any orbiting panel module.
        </div>

        {/* Buttons */}
        <div style={{
          display: 'flex',
          gap: '1.5rem',
          pointerEvents: 'auto'
        }}>
          <button 
            onClick={() => alert("Initializing Engine Project Core...")}
            style={{
              padding: '16px 36px',
              fontSize: '1.1rem',
              fontWeight: 700,
              borderRadius: '9999px',
              background: 'linear-gradient(90deg, #00ffcc, #00ccaa)',
              color: '#05050f',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(0, 255, 200, 0.4)',
            }}
          >
            Initialize Project
          </button>
          <button 
            onClick={() => window.open('https://github.com/smeltzjeremy/strongimpact', '_blank')}
            style={{
              padding: '16px 36px',
              fontSize: '1.1rem',
              fontWeight: 700,
              borderRadius: '9999px',
              background: 'rgba(255,255,255,0.1)',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.3)',
              backdropFilter: 'blur(12px)',
              cursor: 'pointer',
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