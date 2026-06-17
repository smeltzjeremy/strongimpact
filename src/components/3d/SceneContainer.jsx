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
      /* Clear, deep background gradient for crisp contrast */
      background: 'radial-gradient(circle at center, #0f131c 0%, #05070a 100%)'
    }}>
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 60 }}
        gl={{ 
          antialias: true, 
          alpha: true,                  
          powerPreference: "high-performance" 
        }}
      >
        {/* ================================================================= */}
        {/* PURE-CODE HIGH-CONTRAST LIGHTING RIG                              */}
        {/* ================================================================= */}
        
        {/* Minimal ambient light to keep the cosmic background dark and deep */}
        <ambientLight intensity={0.05} color="#ffffff" />

        {/* Primary Key Light: Sharp overhead white studio light.
            This creates the clean, bright glare streaks across the polished glass edges. */}
        <directionalLight 
          position={[5, 10, 3]} 
          intensity={2.5} 
          color="#ffffff" 
        />

        {/* Fill Light: A softer white light from the opposite side 
            to define the physical 3D thickness of the panels as they turn. */}
        <directionalLight 
          position={[-5, -5, 2]} 
          intensity={1.2} 
          color="#ffffff" 
        />

        {/* ================================================================= */}

        {/* Bright, Crisp White Starfield */}
        <Stars 
          radius={100} 
          depth={50} 
          count={3500} 
          factor={6} 
          saturation={0.0} /* Strips out any color to keep stars purely white */
          fade 
          speed={0.5} 
        />

        {/* Carousel Aligned Menu Ring */}
        <MenuRing />

        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 2.2}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Canvas>
    </div>
  );
}