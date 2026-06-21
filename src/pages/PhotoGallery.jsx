import React from 'react';
import { Canvas } from '@react-three/fiber';
import SatinChromeShader from '../components/3d/SatinChromeShader';
export default function PhotoGallery() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000', overflow: 'hidden' }}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <SatinChromeShader />
      </Canvas>
    </div>;
  );
}
