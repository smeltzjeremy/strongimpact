import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import MenuRing from './MenuRing';

export default function SceneContainer() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
      <Canvas
        camera={{ position: [0, 1.8, 10], fov: 45 }}
        // alpha: true lets your App.jsx CSS backgrounds and vignettes bleed through perfectly
        gl={{ antialias: true, alpha: true }}
      >
        {/* REMOVED: <color attach="background" /> to fix redundancy */}
        
        {/* Studio Environment for high-end metallic reflections */}
        <Environment preset="studio" />

        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 12, 5]} intensity={2.0} color="#ffffff" />

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