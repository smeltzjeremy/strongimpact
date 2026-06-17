import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Lights from './Lights';
import CustomObject from './CustomObject';
import SpaceParticles from './SpaceParticles'; // <-- 1. The crucial import

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
        <SpaceParticles /> {/* <-- 2. Dropped right inside the canvas */}
        
        {/* Shiny, light-reactive 3D object */}
        <CustomObject />
      </Canvas>
    </div>
  );
}