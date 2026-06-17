import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Environment } from '@react-three/drei';
import MenuRing from './MenuRing';

export default function SceneContainer() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
      <Canvas
        /* Pulling position back to 9 and tilting y up slightly to frame our new layout structure */
        camera={{ position: [0, 0.8, 9.0], fov: 50 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        <color attach="background" args={['#0a0a1a']} />
        <Environment preset="night" />

        {/* Dynamic Studio Lighting Updates to make glass panels pop */}
        <ambientLight intensity={0.35} />
        <directionalLight position={[5, 12, 6]} intensity={1.8} color="#e0f0ff" />
        <pointLight position={[-5, -5, -2]} intensity={0.5} color="#00ffcc" />

        <Stars radius={100} depth={50} count={2500} factor={6} saturation={0} fade speed={0.5} />
        <MenuRing />

        <OrbitControls 
          enableZoom={true} 
          enablePan={false}
          minDistance={6.0}
          maxDistance={12.0}
          minPolarAngle={Math.PI / 2.3}
          maxPolarAngle={Math.PI / 1.7}
        />
      </Canvas>
    </div>
  );
}