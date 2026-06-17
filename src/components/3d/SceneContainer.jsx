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
      background: 'radial-gradient(circle at center, #140a0a 0%, #050303 100%)' /* Deep crimson-black background void */
    }}>
      <Canvas
        camera={{ position: [0, 0, 4.4], fov: 60 }}
        gl={{ 
          antialias: true, 
          alpha: true,                  
          powerPreference: "high-performance" 
        }}
      >
        {/* Pure Code High-Contrast Studio Lighting Layout */}
        <ambientLight intensity={0.05} color="#ffffff" />
        <directionalLight position={[6, 10, 4]} intensity={2.5} color="#ffffff" />
        <directionalLight position={[-6, -5, 2]} intensity={1.2} color="#ffffff" />

        {/* High-Visibility Cosmic Red Starfield Layer */}
        <Stars 
          radius={100} 
          depth={50} 
          count={3500} 
          factor={6} 
          saturation={1.0} 
          fade 
          speed={0.4} 
        />
        
        {/* Injecting a secondary point light to colorize the starfield particles into deep red */}
        <pointLight position={[0, 0, 0]} intensity={2.0} color="#ff3344" distance={50} />

        {/* Carousel Aligned Menu Ring */}
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