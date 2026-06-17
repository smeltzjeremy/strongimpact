import React from 'react';

export default function UIOverlay() {
  return (
    <>
      <style>{`
        /* 1. Send the luxury studio backdrop to the absolute bottom layer */
        body, html {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: radial-gradient(circle at center, #141923 0%, #06080c 100%) !important;
        }

        /* 2. Strip the background color off the UI layer so it's transparent */
        .ui-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 10;          /* Keeps text and buttons clickable on top */
          pointer-events: none; /* Allows mouse/touch events to pass through to the 3D canvas */
          font-family: system-ui, sans-serif;
          color: #ffffff;
          box-sizing: border-box;
          padding: 40px;
          background: transparent !important; 
        }

        .header-section {
          text-align: center;
          margin-bottom: 20px;
        }

        .main-title {
          font-size: 2.5rem;
          font-weight: 800;
          letter-spacing: -0.05em;
          text-transform: uppercase;
          margin: 0;
        }

        .subtitle {
          font-size: 1rem;
          color: #00ffcc;
          font-weight: 500;
          margin: 5px 0 0 0;
        }

        .description-box {
          max-width: 480px;
          margin: 40px auto;
          text-align: center;
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 20px;
          border-radius: 8px;
          backdrop-filter: blur(10px);
        }

        .description-text {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #a0aec0;
          margin: 0;
        }

        .footer-controls {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 15px;
        }

        /* Ensure buttons regain clickability on the top layer */
        .action-btn {
          pointer-events: auto;
          background: transparent;
          border: 2px solid #ffffff;
          color: #ffffff;
          padding: 12px 24px;
          font-weight: 600;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .action-btn:hover {
          background: #ffffff;
          color: #06080c;
        }

        .action-btn.primary {
          background: #00ffcc;
          border-color: #00ffcc;
          color: #06080c;
        }

        .action-btn.primary:hover {
          background: #00ccaa;
          border-color: #00ccaa;
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
            Interact directly with the rotating menu system layout below.
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