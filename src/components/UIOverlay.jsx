import React from 'react';

export default function UIOverlay() {
  return (
    <>
      {/* Dynamic Responsive Styles injected into the page header */}
      <style>{`
        .ui-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 10;
          pointer-events: none;
          font-family: system-ui, sans-serif;
          color: #ffffff;
          box-sizing: border-box;
          padding: 40px;
        }
        .header-block {
          position: absolute;
          top: 40px;
          left: 40px;
          text-align: left;
          pointer-events: auto;
        }
        .text-block {
          position: absolute;
          top: 180px;
          left: 40px;
          max-width: 400px;
          text-align: left;
          pointer-events: auto;
        }
        .button-block {
          position: absolute;
          bottom: 40px;
          left: 40px;
          display: flex;
          gap: 15px;
          pointer-events: auto;
        }

        /* Mobile Viewport Optimizations (Screens smaller than 768px wide) */
        @media (max-width: 768px) {
          .ui-container {
            padding: 20px;
          }
          .header-block {
            top: 20px;
            left: 20px;
            right: 20px;
            text-align: center;
          }
          .header-block h1 {
            font-size: 1.8rem !important;
          }
          .text-block {
            top: 110px;
            left: 20px;
            right: 20px;
            max-width: 100%;
            text-align: center;
            background: rgba(10, 10, 10, 0.6); /* Semi-transparent dark backing for legibility */
            padding: 12px;
            border-radius: 8px;
            backdrop-filter: blur(4px); /* Soft blur background */
          }
          .text-block p {
            font-size: 0.95rem !important;
          }
          .button-block {
            bottom: 20px;
            left: 20px;
            right: 20px;
            justify-content: center;
            gap: 10px;
          }
          .button-block button {
            padding: 10px 16px !important;
            font-size: 0.85rem !important;
          }
        }
      `}</style>

      <div className="ui-container">
        {/* Top Branding Section */}
        <div className="header-block">
          <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-0.05em', color: '#ffffff' }}>
            STRONG IMPACT
          </h1>
          <p style={{ margin: '5px 0 0 0', color: '#00ffcc', fontWeight: '500' }}>
            Interactive 3D Engine Pipeline v1.0
          </p>
        </div>

        {/* Informational Context Description */}
        <div className="text-block">
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#a0a0a0', margin: 0 }}>
            A high-performance WebGL canvas environment built piece by piece. Click and drag the metallic torus knot to interact with the studio lighting rig.
          </p>
        </div>

        {/* Global Control Layout Action Buttons */}
        <div className="button-block">
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
              transition: 'all 0.2s'
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
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            View Source
          </button>
        </div>
      </div>
    </>
  );
}