import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import MenuRing from './MenuRing';

export default function SceneContainer() {
  const [verticalOffset, setVerticalOffset] = useState(-1.3);

  useEffect(() => {
    const updateOffset = () => {
      const isMobile = window.innerWidth < 768;
      setVerticalOffset(isMobile ? -2.4 : -1.3);
    };

    updateOffset();
    window.addEventListener('resize', updateOffset);
    return () => window.removeEventListener('resize', updateOffset);
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
      <Canvas
        camera={{ position: [0, 2.0, 11], fov: 48 }}
        gl={{ 
          alpha: true, 
          antialias: true, 
          powerPreference: "high-performance" 
        }}
      >
        {/* Swapped to studio for clean, abstract soft-box lighting reflections */}
        <Environment preset="studio" />
        
        <ambientLight intensity={0.35} />
        <directionalLight position={[5, 12, 5]} intensity={1.6} color="#e0f0ff" />

        <group position={[0, verticalOffset, 0]}>
          <MenuRing />
        </group>

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={6.5}
          maxDistance={14}
          target={[0, verticalOffset, 0]}
          minPolarAngle={Math.PI / 2.4}
          maxPolarAngle={Math.PI / 1.6}
        />
      </Canvas>
    </div>
  );
}