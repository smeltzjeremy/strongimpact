import React from 'react';
import BackgroundViewport from '../components/3d/BackgroundViewport';

export default function GalleryLayoutPage() {
  return (
    <div style={{ position: 'relative', width: '100vw', background: '#000', overflowX: 'hidden' }}>
      
      {/* 🔮 LAYER 1: FIXED CANVAS BACKGROUND BACKDROP */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}>
        <BackgroundViewport />
      </div>

      {/* 📜 LAYER 2: INTERACTIVE SCROLLING CONTENT LAYER */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        width: '100%',
        minHeight: '100vh',
        boxSizing: 'border-box'
      }}>
        
        {/* HERO HEADER REGION */}
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 20px',
          boxSizing: 'border-box'
        }}>
          <div style={{
            background: 'rgba(10, 11, 20, 0.35)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '24px',
            padding: '56px 40px',
            maxWidth: '460px',
            width: '100%',
            textAlign: 'center',
            boxShadow: '0 30px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.4)',
            boxSizing: 'border-box'
          }}>
            <h1 style={{
              fontSize: '44px',
              fontWeight: 800,
              color: '#fff',
              margin: '0 0 16px 0',
              letterSpacing: '-0.03em',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              STRONG IMPACT
            </h1>
            <p style={{
              color: '#b2c0ff',
              fontSize: '16px',
              lineHeight: 1.6,
              margin: 0,
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              The pipeline is live. Scroll to navigate structural archives smoothly.
            </p>
          </div>
        </div>

        {/* METALLIC GRID INTERFACE ITEMS */}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px 140px 24px',
          boxSizing: 'border-box'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px'
          }}>
            {[1, 2, 3, 4, 5, 6].map((cardId) => (
              <div 
                key={cardId} 
                style={{
                  background: 'rgba(10, 11, 20, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  borderRadius: '16px',
                  height: '400px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255, 255, 255, 0.3)',
                  fontSize: '14px',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  boxShadow: '0 20px 45px rgba(0,0,0,0.4)'
                }}
              >
                ARCHIVE ITEM // 0{cardId}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}