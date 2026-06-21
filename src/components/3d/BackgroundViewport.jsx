import React from 'react';
import { Canvas } from '@react-three/fiber';
import SatinChromeShader from './SatinChromeShader';

export default function BackgroundViewport() {
  return (
    <Canvas
      camera={{ position: [0, 0, 1], fov: 50 }}
      dpr={[1, 2]}
      gl={{ 
        antialias: true, 
        alpha: true, 
        powerPreference: "high-performance" 
      }}
      style={{ width: '100%', height: '100%' }}
    >
      <SatinChromeShader />
    </Canvas>
  );
}