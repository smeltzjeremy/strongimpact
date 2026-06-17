import React from 'react';

export default function UIOverlay() {
  return (
    <>
      <style>{`
        /* Force the studio gradient across absolutely the entire viewport */
        body, html {
          margin: 0;
          padding: 0;
          width: 100vw !important;
          height: 100vh !important;
          overflow: hidden;
          background: radial-gradient(circle at center, #1a2230 0%, #080b11 100%) !important;
        }

        /* Fully transparent UI layer sitting squarely on top */
        .ui-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 10;          
          pointer-events: none; 
          font-family: system-ui, -apple-system, sans-serif;
          color: #ffffff;
          box-sizing: border-box;
          padding: 40px;
          background: transparent !important;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
        }

        .header-section {
          text-align: center;
          margin-top: 20px;
        }

        .main-title {
          font-size: 2.5rem;
          font-weight: 900;
          letter-spacing: -0.05em;
          text-transform: uppercase;
          margin: 0;
          text-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }

        .subtitle {
          font-size: 1rem;
          color: #00ffcc;
          font-weight: 600;
          margin: 8px 0 0 0;
          letter-spacing: 0.05em;
        }

        .description-box {
          max-width: 480px;
          text-align: center;
          background: rgba(6, 8, 12, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 20px;
          border-radius: 12px;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          margin-bottom: auto;
          margin-top: 30px;
        }

        .description-text {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #a0aec0;
          margin: 0;
        }

        .footer-controls {
          display: flex;
          gap: 15px;
          margin-bottom: 20px;
        }

        .action-btn {
          pointer-events: auto;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: #ffffff;
          padding: 14px 28px;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          backdrop-filter: blur(5px);
        }

        .action-btn:hover {
          background: #ffffff;
          color: #06080c;
          transform: translateY(-1px);
        }

        .action-btn.primary {
          background: #00ffcc;
          border-color: #00ffcc;
          color: #06080c;
          box-shadow: 0 4px 14px rgba(0, 255, 204, 0.3);
        }

        .action-btn.primary:hover {
          background: #00ccaa;
          border-color: #00ccaa;
          box-shadow: 0 6px 20px rgba(0, 255, 204, 0.4);
        }

        /* 3D Glass DOM Labels Style Injection */
        .glass-panel-label {
          color: #ffffff;
          font-family: system-ui, sans-serif;
          font-weight: 800;
          font-size: 14px;
          letter-spacing: 0.1em;
          text-shadow: 0 2px 5px rgba(0,0,0,0.8);
          white-space: nowrap;
          user-select: none;
          pointer-events: none;
        }
      `}</style>

      <div className="ui-container">
        <header className="header-section">
          <h1 className="main-title">Strong Impact</h1>
          <p className="subtitle">Interactive 3D Engine Pipeline v1.0</p>
        </header>

        <section className="description-box">
          <p className="description-text">
            A high-performance WebGL canvas environment built piece by piece. 
            Click and drag to rotate space, or select any orbiting panel module.
          </p>
        </section>

        <footer className="footer-controls">
          <button className="action-btn primary">Initialize Project</button>
          <button className="action-btn" onClick={() => window.open('https://github.com', '_blank')}>View Source</button>
        </footer>
      </div>
    </>
  );
}