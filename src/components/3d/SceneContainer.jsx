import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Lights from './Lights';
import SpaceParticles from './SpaceParticles';
import MenuRing from './MenuRing'; // <-- 1. Swap the import to MenuRing

export default function SceneContainer() {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 1 }}>
      <Canvas
        gl={{ 
          antialias: true, 
          alpha: false, 
          powerPreference: "high-performance" 
        }}
        camera={{ position: [0, 0, 5], fov: 60 }}
      >
        <color attach="background" args={['#0a0a0a']} />
        
        {/* Enable mouse drag-to-rotate and scroll-to-zoom controls */}
        <OrbitControls enableZoom={true} makeDefault />
        
        {/* Studio lighting rig */}
        <Lights />
        
        {/* Dynamic, slowly drifting background starfield */}
        <SpaceParticles />
        
        {/* Multi-element interactive 3D menu array */}
        <MenuRing /> {/* <-- 2. Render the rotating panel ring */}
      </Canvas>
    </div>
  );
}