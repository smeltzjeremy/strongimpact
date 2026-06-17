import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Environment } from '@react-three/drei';
import MenuRing from './MenuRing';

export default function SceneContainer() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: 60 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        {/* Tip 2: Dark Canvas Background Attachment */}
        <color attach="background" args={['#05050f']} />

        {/* Tip 1: Environment Map Preset for Elegant Glass Reflections */}
        <Environment preset="night" />

        {/* Supporting Crisp Studio Lights */}
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 10, 4]} intensity={1.5} />

        {/* Background Cosmic Atmosphere */}
        <Stars radius={100} depth={50} count={2500} factor={6} saturation={0} fade speed={0.5} />

        {/* Core Menu Component */}
        <MenuRing />

        <OrbitControls 
          enableZoom={true} 
          enablePan={false}
          minDistance={3.5}
          maxDistance={7.0}
          minPolarAngle={Math.PI / 2.3}
          maxPolarAngle={Math.PI / 1.7}
        />
      </Canvas>
    </div>
  );
}