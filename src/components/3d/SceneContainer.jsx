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
          powerPreference: "high-performance" 
        }}
        camera={{ position: [0, 0, 5], fov: 60 }}
      >
        {/* Explicitly declaring a dark clear color stabilizes the WebGL frame buffer pass */}
        <color attach="background" args={['#0c101b']} />
        
        <OrbitControls enableZoom={true} makeDefault />
        
        <Lights />
        
        <SpaceParticles />
        
        <MenuRing />
      </Canvas>
    </div>
  );
}