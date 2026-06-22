import React, { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { Link } from 'react-router-dom';
import * as THREE from 'three';

function LiquidMetalBackground() {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(80, 80, 180, 180);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      // More varied organic waves
      const z = 
        Math.sin(x * 0.45) * 2.8 + 
        Math.cos(y * 0.4) * 2.4 + 
        Math.sin(x * 1.15 + y * 0.75) * 1.1 +
        Math.cos(x * 0.7 + y * 1.1) * 0.8;
      pos.setZ(i, z);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh 
      geometry={geometry} 
      rotation={[-0.85, 0.05, 0]} 
      position={[0, -9, -11]}
    >
      <meshStandardMaterial 
        color="#0c0c12"
        metalness={0.99}
        roughness={0.05}
        envMapIntensity={2.4}
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
          camera={{ position: [0, 8, 24], fov: 36 }}
          style={{ background: '#05050f' }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.4} />
            <pointLight position={[20, 25, 15]} intensity={4.5} color="#f8f8f8" />
            <pointLight position={[-18, -8, -12]} intensity={1.8} color="#777777" />

            <LiquidMetalBackground />

            <Environment preset="night" />
          </Suspense>
        </Canvas>
      </div>

      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-40 text-center pointer-events-none">
        <h1 className="text-6xl font-bold tracking-tighter">PHOTOS</h1>
      </div>
    </div>
  );
}