import React from 'react';

export default function UIOverlay() {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 10, // Higher than the canvas layer so it floats on top
      pointerEvents: 'none', // Allows mouse drag-to-rotate to pass through to the 3D canvas
      fontFamily: 'system-ui, sans-serif',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '40px',
      boxSizing: 'border-box'
    }}>
      {/* Header Block */}
      <header style={{ pointerEvents: 'auto' }}>
        <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-0.05em' }}>
          STRONG IMPACT
        </h1>
        <p style={{ margin: '5px 0 0 0', color: '#00ffcc', fontWeight: '500' }}>
          Interactive 3D Engine Pipeline v1.0
        </p>
      </header>

      {/* Main Content Area */}
      <div style={{ maxWidth: '400px', pointerEvents: 'auto', marginBottom: 'auto', marginTop: '40px' }}>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#a0a0a0' }}>
          A high-performance WebGL canvas environment built piece by piece. Click and drag the metallic torus knot to interact with the studio lighting rig.
        </p>
      </div>

      {/* Footer / Interactive Buttons */}
      <footer style={{ display: 'flex', gap: '15px', pointerEvents: 'auto' }}>
        <button 
          onClick={() => alert('System Initialized!')}
          style={{
            background: '#00ffcc',
            color: '#0a0a0a',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '6px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'transform 0.2s'
          }}
        >
          Initialize Project
        </button>
        <button 
          onClick={() => window.open('https://github.com/smeltzjeremy/strongimpact', '_blank')}
          style={{
            background: 'transparent',
            color: '#ffffff',
            border: '2px solid #ffffff',
            padding: '10px 22px',
            borderRadius: '6px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          View Source
        </button>
      </footer>
    </div>
  );
}