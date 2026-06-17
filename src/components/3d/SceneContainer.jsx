import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Lights from './Lights';
import SpaceParticles from './SpaceParticles';
import MenuRing from './MenuRing';

export default function SceneContainer() {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 1 }}>
      <Canvas
        gl={{ 
          antialias: true, 
          alpha: true, /* Enabled alpha transparency so the CSS backdrop passes through */
          powerPreference: "high-performance" 
        }}
        camera={{ position: [0, 0, 5], fov: 60 }}
      >
        {/* Completely clear of color background tags to let the layout gradient show */}
        <OrbitControls enableZoom={true} makeDefault />
        <Lights />
        <SpaceParticles />
        <MenuRing />
      </Canvas>
    </div>
  );
}