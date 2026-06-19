import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import MenuRing from './MenuRing';

export default function SceneContainer() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
      <Canvas
        // FIXED: Dropped camera y from 1.8 down to -0.2 to perfectly align with the drop group.
        // This keeps the panels facing the lens directly for clean, uniform reflections.
        camera={{ position: [0, -0.2, 7.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Environment preset="studio" />

        <ambientLight intensity={0.35} />

        {/* Key lights for sharp rim highlights */}
        <directionalLight position={[6, 12, 5]} intensity={2.4} color="#ffffff" />
        <directionalLight position={[-5, 8, 4]} intensity={1.2} color="#e0f0ff" />

        {/* Soft back fill light for deep glassmorphism depth pass-through */}
        <pointLight position={[0, -1.2, -4]} intensity={2.2} color="#a0c0ff" />

        <group position={[0, -1.2, 0]}>
          <MenuRing />
        </group>

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={5}
          maxDistance={12}
          target={[0, -1.2, 0]} // Perfectly targeted center pivot point
        />
      </Canvas>
    </div>
  );
}