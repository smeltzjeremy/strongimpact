import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import MenuRing from './MenuRing';

export default function SceneContainer() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
      <Canvas
        camera={{ position: [0, -0.4, 7.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Environment preset="studio" />

        <ambientLight intensity={0.35} />

        {/* Sharp overhead directional lights */}
        <directionalLight position={[6, 12, 5]} intensity={2.5} color="#ffffff" />
        <directionalLight position={[-5, 8, 4]} intensity={1.5} color="#e0f0ff" />

        {/* TUNED: Front Key Fill Light raised to a 2.2 intensity multiplier.
            Forces the high-metalness panels to reflect an authoritative, premium face glint. */}
        <directionalLight position={[0, 0, 8]} intensity={2.2} color="#f0f5ff" />

        {/* Back point light for deep translucency pass-through illumination */}
        <pointLight position={[0, -1.2, -4]} intensity={2.4} color="#a0c0ff" />

        <group position={[0, -1.2, 0]}>
          <MenuRing />
        </group>

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={5}
          maxDistance={12}
          target={[0, -1.2, 0]} 
        />
      </Canvas>
    </div>
  );
}