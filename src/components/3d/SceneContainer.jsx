import React from 'react';
import { Canvas } from '@react-three/fiber';
import Lights from './Lights';

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
        
        {/* Our new custom studio lights */}
        <Lights />
        
        {/* Placeholder mesh to verify render chain */}
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="#00ffcc" wireframe />
        </mesh>
      </Canvas>
    </div>
  );
}