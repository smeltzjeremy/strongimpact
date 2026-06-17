import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Environment } from '@react-three/drei';
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
      background: 'radial-gradient(circle at center, #0d131f 0%, #05070a 100%)'
    }}>
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 60 }}
        gl={{ 
          antialias: true, 
          alpha: true,                  
          powerPreference: "high-performance" 
        }}
      >
        {/* Swapped "city" for "studio" to get pure high-end light reflections instead of background scenery objects */}
        <Environment preset="studio" />

        {/* Adjusted Core Lights to Let Stars Shine */}
        <ambientLight intensity={0.2} color="#1d293d" />
        <directionalLight position={[5, 8, 5]} intensity={2.0} color="#ffffff" />
        <pointLight position={[-5, -3, 2]} intensity={1.2} color="#00ffcc" />

        {/* Vibrant Cosmic Starfield Layer */}
        <Stars 
          radius={100} 
          depth={50} 
          count={3000} 
          factor={7} 
          saturation={1.0} 
          fade 
          speed={0.6} 
        />

        {/* Carousel Aligned Glass Menu Ring */}
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