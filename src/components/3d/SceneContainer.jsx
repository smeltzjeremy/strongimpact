import React from 'react';
import { Canvas } from '@react-three/fiber';
import Lights from './Lights';
import CustomObject from './CustomObject';

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
        
        {/* Studio lighting rig */}
        <Lights />
        
        {/* Your shiny, light-reactive 3D object */}
        <CustomObject />
      </Canvas>
    </div>
  );
}