import React from 'react';
import SceneContainer from './components/3d/SceneContainer';

function App() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: '#05050f',
      color: '#ffffff',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      position: 'relative',
      overflowX: 'hidden',
      boxSizing: 'border-box'
    }}>
      
      {/* GLOBAL RESPONSIVE REFLOW OVERRIDES */}
      <style>{`
        /* Dynamic fluid font handling for the title heading */
        .title-heading {
          font-size: clamp(2.5rem, 7vw, 4.5rem) !important;
          font-weight: 900;
          letter-spacing: 0.08em;
          margin: 0;
          text-shadow: 0 0 40px rgba(0, 255, 200, 0.4);
        }
        
        /* Media query matching your strict layout parameters */
        @media (max-width: 768px) {
          .glass-desc-box {
            margin: 1.5rem 0.5rem !important;
            padding: 1.5rem !important;
            max-width: 90% !important;
          }
          .3d-canvas-wrapper {
            height: 42vh !important; /* Locks down 3D bounds to stop vertical stacking bugs */
            min-height: 320px !important;
          }
          .action-btn-row {
            margin-bottom: 4vh !important;
            gap: 1rem !important;
          }
        }
      `}</style>

      {/* 1. Header / Title Section */}
      <header style={{
        textAlign: 'center',
        marginTop: '6vh',
        zIndex: 20
      }}>
        <h1 className="title-heading">STRONG IMPACT</h1>
        <p style={{
          fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
          color: '#00ffcc',
          marginTop: '0.5rem',
          fontWeight: '700',
          letterSpacing: '0.05em',
          textShadow: '0 2px 10px rgba(0,0,0,0.8)'
        }}>
          Interactive 3D Engine Pipeline v1.0
        </p>
      </header>

      {/* 2. Glass Description Module */}
      <div 
        className="glass-desc-box"
        style={{
          maxWidth: '520px',
          margin: '2rem 1rem',
          padding: '1.8rem 2rem',
          background: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          textAlign: 'center',
          lineHeight: '1.55',
          fontSize: '14px',
          color: 'rgba(255, 255, 255, 0.85)',
          zIndex: 30,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255,255,255,0.15)'
        }}
      >
        A high-performance WebGL canvas environment built piece by piece. 
        Click and drag to rotate space, or select any orbiting panel module.
      </div>

      {/* 3. Responsive 3D Canvas wrapper */}
      <div 
        className="3d-canvas-wrapper"
        style={{
          flex: '1 1 auto',
          width: '100%',
          maxWidth: '1200px',
          margin: '1rem 0',
          position: 'relative',
          zIndex: 10,
          minHeight: '400px'
        }}
      >
        <SceneContainer />
      </div>

      {/* 4. Action Buttons Footer Row */}
      <div 
        className="action-btn-row"
        style={{
          display: 'flex',
          gap: '1.5rem',
          marginBottom: '6vh',
          zIndex: 30
        }}
      >
        <button 
          onClick={() => alert("Initializing Engine Project Core...")}
          style={{
            padding: '14px 32px',
            fontSize: '1.05rem',
            fontWeight: '700',
            borderRadius: '9999px',
            background: 'linear-gradient(90deg, #00ffcc, #00ccaa)',
            color: '#05050f',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(0, 255, 200, 0.35)',
            transition: 'all 0.2s ease'
          }}
        >
          Initialize Project
        </button>
        <button 
          onClick={() => window.open('https://github.com', '_blank')}
          style={{
            padding: '14px 32px',
            fontSize: '1.05rem',
            fontWeight: '700',
            borderRadius: '9999px',
            background: 'rgba(255,255,255,0.08)',
            color: '#ffffff',
            border: '1px solid rgba(255,255,255,0.25)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          View Source
        </button>
      </div>

    </div>
  );
}

export default App;