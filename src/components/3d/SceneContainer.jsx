import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Environment } from '@react-three/drei';
import MenuRing from './MenuRing';

export default function SceneContainer() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
      <Canvas
        camera={{ position: [0, 1.6, 9.5], fov: 48 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        <color attach="background" args={['#05050f']} />
        <Environment preset="night" />

        <ambientLight intensity={0.35} />
        <directionalLight position={[5, 12, 5]} intensity={1.6} color="#e0f0ff" />

        <Stars radius={100} depth={50} count={2500} factor={6} saturation={0} fade speed={0.5} />
        
        {/* Pulls the center of the ring down below the top cards cleanly */}
        <group position={[0, -1.3, 0]}>
          <MenuRing />
        </group>

        <OrbitControls 
          enableZoom={true} 
          enablePan={false}
          minDistance={6.0}
          maxDistance={12.0}
          target={[0, -1.3, 0]}
          minPolarAngle={Math.PI / 2.3}
          maxPolarAngle={Math.PI / 1.7}
        />
      </Canvas>
    </div>
  );
}