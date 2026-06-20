import React from 'react';
import { Canvas } from '@react-three/fiber';
import DynamicChromeShader from '../components/3d/DynamicChromeShader';

export default function GalleryPage() {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: '#000' }}>
      {/* Layer 1: Full-Screen Chrome Background */}
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: 1,
        pointerEvents: 'none' 
      }}>
        <Canvas 
          camera={{ position: [0, 0, 1], fov: 50 }} 
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ width: '100%', height: '100%' }}
        >
          <DynamicChromeShader />
        </Canvas>
      </div>

      {/* Layer 2: Scrollable Content */}
      <div style={{ 
        position: 'relative', 
        zIndex: 2, 
        width: '100%', 
        minHeight: '200vh', 
        overflowY: 'auto',
        padding: '120px 20px 80px'
      }}>
        {/* Hero Section */}
        <div style={{ 
          height: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          textAlign: 'center'
        }}>
          <div style={{
            background: 'rgba(15, 18, 35, 0.28)',
            backdropFilter: 'blur(28px)',
            border: '1px solid rgba(255,255,255,0.18)',
            borderRadius: '24px',
            padding: '48px 40px',
            maxWidth: '420px',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.35)'
          }}>
            <h1 style={{ 
              fontSize: '42px', 
              fontWeight: 700, 
              color: '#fff', 
              marginBottom: '12px',
              letterSpacing: '-0.02em'
            }}>
              STRONG IMPACT
            </h1>
            <p style={{ color: '#a0b0ff', fontSize: '17px', lineHeight: 1.5 }}>
              The pipeline is live. Scroll to explore.
            </p>
          </div>
        </div>

        {/* Portfolio Gallery Section */}
        <div style={{ 
          padding: '80px 20px', 
          maxWidth: '1200px', 
          margin: '0 auto' 
        }}>
          <h2 style={{ 
            fontSize: '32px', 
            color: '#fff', 
            textAlign: 'center', 
            marginBottom: '60px' 
          }}>
            Selected Works
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '32px' 
          }}>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} style={{
                background: 'rgba(15, 18, 35, 0.6)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '16px',
                height: '420px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#666',
                fontSize: '15px'
              }}>
                Portfolio Item {i}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}