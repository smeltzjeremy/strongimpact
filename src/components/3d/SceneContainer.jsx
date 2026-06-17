import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Environment } from '@react-three/drei';
import MenuRing from './MenuRing';

export default function SceneContainer() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
      <Canvas
        /* Tip 2: Pulled perspective frame coordinate out to 5.8 to perfectly encompass the wide geometry */
        camera={{ position: [0, 0, 5.8], fov: 55 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        {/* Enforces dark context background attachment layout directly */}
        <color attach="background" args={['#05050f']} />

        {/* Environmental Preset for High-End Glass Surface Reflections */}
        <Environment preset="night" />

        {/* Ambient + Specular Lighting Setup */}
        <ambientLight intensity={0.25} />
        <directionalLight position={[5, 10, 4]} intensity={1.5} />

        <Stars radius={100} depth={50} count={2500} factor={6} saturation={0} fade speed={0.5} />

        <MenuRing />

        <OrbitControls 
          enableZoom={true} 
          enablePan={false}
          minDistance={4.0}
          maxDistance={8.0}
          minPolarAngle={Math.PI / 2.2}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Canvas>
    </div>
  );
}