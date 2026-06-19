import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import MenuRing from './MenuRing';

export default function SceneContainer() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
      <Canvas
        // TUNED: Positioned camera vertically at y: -0.4.
        // This precise alignment forces the panel faces to clip your main light sources head-on.
        camera={{ position: [0, -0.4, 7.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Environment preset="studio" />

        <ambientLight intensity={0.35} />

        {/* Sharp overhead rims */}
        <directionalLight position={[6, 12, 5]} intensity={2.5} color="#ffffff" />
        <directionalLight position={[-5, 8, 4]} intensity={1.5} color="#e0f0ff" />

        {/* TUNED: Front Key Fill Light elevated to 1.9 intensity.
            Provides constant face illumination, locking in a clean metallic sheen on the canvas center plane. */}
        <directionalLight position={[0, 0, 8]} intensity={1.9} color="#f0f5ff" />

        {/* Back point illumination source */}
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