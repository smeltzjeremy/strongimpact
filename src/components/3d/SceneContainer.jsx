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
      background: 'radial-gradient(circle at center, #0f131c 0%, #05070a 100%)'
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
        <ambientLight intensity={0.08} color="#ffffff" />
        <directionalLight position={[5, 10, 4]} intensity={2.2} color="#ffffff" />
        <directionalLight position={[-5, -5, 2]} intensity={1.0} color="#ffffff" />

        {/* Dense White Cosmic Starfield Layer */}
        <Stars 
          radius={100} 
          depth={50} 
          count={3500} 
          factor={6} 
          saturation={0.0} 
          fade 
          speed={0.4} 
        />

        {/* Carousel Aligned Menu Ring */}
        <MenuRing />

        {/* Fully Unlocked Interactive Viewport Controls */}
        <OrbitControls 
          enableZoom={true}         /* Zooming functionality completely restored */
          enablePan={false}
          minDistance={3.0}         /* Guardrail to prevent zooming straight into a card */
          maxDistance={6.0}         /* Guardrail to prevent zooming out into infinite space */
          minPolarAngle={Math.PI / 2.5} /* Restored full vertical tilt freedom */
          maxPolarAngle={Math.PI / 1.6}
        />
      </Canvas>
    </div>
  );
}