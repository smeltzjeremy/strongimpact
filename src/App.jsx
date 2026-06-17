import React from 'react';
import { Canvas } from '@react-three/fiber';

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#000000', margin: 0, padding: 0, overflow: 'hidden' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="#ff0000" />
        </mesh>
      </Canvas>
    </div>
  );
}