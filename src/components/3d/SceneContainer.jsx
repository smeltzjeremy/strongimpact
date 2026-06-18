import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Environment } from '@react-three/drei';
import MenuRing from './MenuRing';

export default function SceneContainer() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
      <Canvas
        /* Shifting Y to 1.2 and pulling frame back to 8.5 pushes the 3D horizon into the lower dark open space */
        camera={{ position: [0, 1.2, 8.5], fov: 50 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        <color attach="background" args={['#05050f']} />
        <Environment preset="night" />

        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 10, 4]} intensity={1.5} color="#e0f0ff" />

        <Stars radius={100} depth={50} count={2500} factor={6} saturation={0} fade speed={0.5} />
        <MenuRing />

        <OrbitControls 
          enableZoom={true} 
          enablePan={false}
          minDistance={5.5}
          maxDistance={11.0}
          minPolarAngle={Math.PI / 2.3}
          maxPolarAngle={Math.PI / 1.7}
        />
      </Canvas>
    </div>
  );
}