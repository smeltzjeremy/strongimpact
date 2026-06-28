import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import MenuRing from './MenuRing';

const DEFAULT_CAMERA = { position: [0, -0.4, 7.5], fov: 45 };
const DEFAULT_TARGET = [0, -1.2, 0];

export default function SceneContainer({ menuOpen = false }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: menuOpen ? 'none' : 'auto',
      }}
    >
      <Canvas
        camera={DEFAULT_CAMERA}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Environment preset="studio" />

        <ambientLight intensity={0.35} />

        <directionalLight position={[6, 12, 5]} intensity={2.5} color="#ffffff" />
        <directionalLight position={[-5, 8, 4]} intensity={1.5} color="#e0f0ff" />
        <directionalLight position={[0, 0, 8]} intensity={2.2} color="#f0f5ff" />
        <pointLight position={[0, -1.2, -4]} intensity={2.4} color="#a0c0ff" />

        <group position={[0, -1.2, 0]}>
          <MenuRing paused={menuOpen} />
        </group>

        <OrbitControls
          enabled={!menuOpen}
          enableZoom={true}
          enablePan={false}
          minDistance={5}
          maxDistance={12}
          target={DEFAULT_TARGET}
        />
      </Canvas>
    </div>
  );
}