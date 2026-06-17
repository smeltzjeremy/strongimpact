import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import MenuRing from './MenuRing';

export default function SceneContainer() {
  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      position: 'absolute', 
      top: 0, 
      left: 0,
      zIndex: 1,
      background: 'radial-gradient(circle at center, #120606 0%, #030101 100%)'
    }}>
      {/* Dynamic override to force the layout headers back to crisp white */}
      <style>{`
        header h1, .brand-title, [class*="title"], h1 {
          color: #ffffff !important;
          text-shadow: 0 2px 10px rgba(255, 255, 255, 0.2) !important;
        }
      `}</style>

      <Canvas
        camera={{ position: [0, 0, 4.4], fov: 60 }}
        gl={{ 
          antialias: true, 
          alpha: true,                  
          powerPreference: "high-performance" 
        }}
      >
        <ambientLight intensity={0.05} color="#ffffff" />
        <directionalLight position={[6, 10, 4]} intensity={2.5} color="#ffffff" />
        <directionalLight position={[-6, -5, 2]} intensity={1.2} color="#ffffff" />

        {/* Pure-code native red color assignment for the stars */}
        <Stars 
          radius={100} 
          depth={50} 
          count={3500} 
          factor={6} 
          color="#ff3344" 
          fade 
          speed={0.4} 
        />

        <MenuRing />

        <OrbitControls 
          enableZoom={true}         
          enablePan={false}
          minDistance={3.0}         
          maxDistance={6.0}         
          minPolarAngle={Math.PI / 2.5} 
          maxPolarAngle={Math.PI / 1.6}
        />
      </Canvas>
    </div>
  );
}