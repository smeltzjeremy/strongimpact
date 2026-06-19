import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { OrbitControls } from '@react-three/drei';
import MenuRing from './MenuRing';

export default function SceneContainer() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
      <Canvas
        camera={{ position: [0, 1.8, 10], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Environment preset="studio" />
        <ambientLight intensity={0.24} />
        
        {/* Overhead key framing */}
        <directionalLight position={[0, 15, 2]} intensity={2.0} color="#ffffff" />
        
        {/* TUNED: Dropped to 1.65 to kill panel face washout while retaining the glowing back-lit floor layer */}
        <pointLight position={[0, -1.4, -4.0]} intensity={1.65} distance={8} color="#67ffcc" decay={2.0} />

        <group position={[0, -1.2, 0]}>
          <MenuRing />
        </group>

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={6}
          maxDistance={14}
          target={[0, -1.2, 0]}
        />
      </Canvas>
    </div>
  );
}