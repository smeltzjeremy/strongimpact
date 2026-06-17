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
      background: 'radial-gradient(circle at center, #111622 0%, #07090e 100%)'
    }}>
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 60 }}
        gl={{ 
          antialias: true, 
          alpha: true,                  
          powerPreference: "high-performance" 
        }}
      >
        {/* Elite Photographic Lighting Environment Map Map - Simulates a real glass photo studio booth background */}
        <Environment preset="city" />

        {/* Studio Ambient and Directional Lights */}
        <ambientLight intensity={0.4} color="#1d293d" />
        <directionalLight position={[5, 8, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-5, -3, 2]} intensity={1.0} color="#00ffcc" />

        {/* Ambient Space Elements */}
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0.4} fade speed={0.8} />

        {/* Interactive Menu Ring */}
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