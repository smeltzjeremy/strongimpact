import React from 'react';

export default function UIOverlay() {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 10,
      pointerEvents: 'none',
      fontFamily: 'system-ui, sans-serif',
      color: '#ffffff',
      boxSizing: 'border-box'
    }}>
      {/* Top Left Corner: Header Block */}
      <header style={{ 
        position: 'absolute', 
        top: '40px', 
        left: '40px', 
        pointerEvents: 'auto' 
      }}>
        <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-0.05em' }}>
          STRONG IMPACT
        </h1>
        <p style={{ margin: '5px 0 0 0', color: '#00ffcc', fontWeight: '500' }}>
          Interactive 3D Engine Pipeline v1.0
        </p>
      </header>

      {/* Middle Left: Main Content Area */}
      <div style={{ 
        position: 'absolute', 
        top: '180px', 
        left: '40px', 
        maxWidth: '400px', 
        pointerEvents: 'auto' 
      }}>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#a0a0a0', margin: 0 }}>
          A high-performance WebGL canvas environment built piece by piece. Click and drag the metallic torus knot to interact with the studio lighting rig.
        </p>
      </div>

      {/* Bottom Left Corner: Interactive Buttons */}
      <footer style={{ 
        position: 'absolute', 
        bottom: '40px', 
        left: '40px', 
        display: 'flex', 
        gap: '15px', 
        pointerEvents: 'auto' 
      }}>
        <button 
          onClick={() => alert('System Initialized!')}
          style={{
            background: '#00ffcc',
            color: '#0a0a0a',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '6px',
            fontWeight: '600',
            cursor: 'pointer'
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