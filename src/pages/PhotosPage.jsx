import React, { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Link } from 'react-router-dom';
import * as THREE from 'three';

function LiquidMetalBackground() {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(60, 60, 120, 120);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = Math.sin(x * 0.8) * 1.8 + Math.cos(y * 0.7) * 1.4;
      pos.setZ(i, z);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh 
      geometry={geometry} 
      rotation={[Math.PI * -0.35, 0, 0]} 
      position={[0, -6, -12]}
    >
      <meshStandardMaterial 
        color="#0a0a0f"
        metalness={0.98}
        roughness={0.12}
        envMapIntensity={1.4}
      />
    </mesh>
  );
}

function CentralTestSphere() {
  return (
    <mesh position={[0, 0.5, 0]}>
      <sphereGeometry args={[2.2, 64, 64]} />
      <meshStandardMaterial 
        color="#111111" 
        metalness={0.98} 
        roughness={0.06}
      />
    </mesh>
  );
}

export default function PhotosPage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="fixed top-6 left-6 z-50">
        <Link 
          to="/gallery"
          className="px-5 py-3 bg-black/60 hover:bg-black/80 border border-white/20 rounded-2xl text-sm transition"
        >
          ← Back to Gallery
        </Link>
      </div>

      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 3, 16], fov: 42 }}
          style={{ background: '#05050f' }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.35} />
            <pointLight position={[12, 14, 8]} intensity={2.2} color="#cccccc" />
            <pointLight position={[-14, -6, -10]} intensity={0.7} color="#555555" />

            <LiquidMetalBackground />
            <CentralTestSphere />

            <Environment preset="night" />
            <OrbitControls 
              enablePan={false} 
              enableZoom={true} 
              minDistance={7} 
              maxDistance={40}
              target={[0, 0, 0]}
            />
          </Suspense>
        </Canvas>
      </div>

      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-40 text-center pointer-events-none">
        <h1 className="text-6xl font-bold tracking-tighter">PHOTOS</h1>
      </div>
    </div>
  );
}