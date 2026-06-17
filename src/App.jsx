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
      fontFamily: 'system-ui, -apple-system, sans-serif',
      overflowX: 'hidden'
    }}>
      
      {/* 1. FIXED BACKDROP LAYER: The 3D WebGL Canvas handles the environment smoothly */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1,
        pointerEvents: 'auto' /* Ensures OrbitControls clicking still works perfectly */
      }}>
        <SceneContainer />
      </div>

      {/* 2. FOREGROUND LAYOUT OVERLAY: Holds all interactive branding and UI layers securely */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '40px 20px',
        pointerEvents: 'none', /* Pass click events straight through to the 3D cards beneath */
        boxSizing: 'border-box'
      }}>
        
        {/* Dynamic Header Frame */}
        <header style={{ textAlign: 'center', maxWidth: '600px', marginTop: '20px' }}>
          <h1 style={{ 
            fontSize: 'clamp(28px, 5vw, 42px)', 
            fontWeight: '900', 
            letterSpacing: '0.1em',
            margin: '0 0 10px 0',
            color: '#ffffff',
            textTransform: 'uppercase',
            textShadow: '0 2px 15px rgba(255,255,255,0.15)'
          }}>
            STRONG IMPACT
          </h1>
          <p style={{ 
            color: '#00ffcc', 
            fontSize: 'clamp(12px, 2.5vw, 15px)', 
            fontWeight: '700', 
            letterSpacing: '0.05em',
            margin: 0
          }}>
            Interactive 3D Engine Pipeline v1.0
          </p>
        </header>

        {/* Center Info Module Block */}
        <div style={{ 
          background: 'rgba(5, 5, 15, 0.65)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: '30px',
          maxWidth: '540px',
          textAlign: 'center',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
          margin: '40px 20px'
        }}>
          <p style={{ 
            color: 'rgba(255,255,255,0.75)', 
            fontSize: '14px', 
            lineHeight: '1.6', 
            margin: 0,
            letterSpacing: '0.02em'
          }}>
            A high-performance WebGL canvas environment built piece by piece. 
            Click and drag to rotate space, or select any orbiting panel module.
          </p>
        </div>

        {/* Bottom Call-To-Action Button Row */}
        <footer style={{ 
          display: 'flex', 
          gap: '16px', 
          marginBottom: '20px',
          pointerEvents: 'auto' /* Restores click tracking for button clicks */
        }}>
          <button 
            onClick={() => alert("Initializing Engine Project Core...")}
            style={{
              background: '#00ffcc',
              color: '#05050f',
              border: 'none',
              borderRadius: '8px',
              padding: '14px 28px',
              fontSize: '13px',
              fontWeight: '800',
              letterSpacing: '0.05em',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(0, 255, 204, 0.4)',
              transition: 'transform 0.2s ease'
            }}
          >
            Initialize Project
          </button>
          <button 
            onClick={() => window.open('https://github.com', '_blank')}
            style={{
              background: 'transparent',
              color: '#ffffff',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              padding: '14px 28px',
              fontSize: '13px',
              fontWeight: '700',
              letterSpacing: '0.05em',
              cursor: 'pointer',
              transition: 'background 0.2s ease'
            }}
          >
            View Source
          </button>
        </footer>

      </div>
    </div>
  );
}

export default App;