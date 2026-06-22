import React, { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { Link } from 'react-router-dom';
import * as THREE from 'three';

function LiquidMetalBackground() {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(75, 75, 160, 160);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      // Cleaner, more elegant wave pattern
      const z = 
        Math.sin(x * 0.55) * 2.6 + 
        Math.cos(y * 0.48) * 2.2 + 
        Math.sin(x * 0.95 + y * 0.65) * 0.9;
      pos.setZ(i, z);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh 
      geometry={geometry} 
      rotation={[-0.82, 0.03, 0]} 
      position={[0, -8.5, -10]}
    >
      <meshStandardMaterial 
        color="#0a0a10"
        metalness={0.99}
        roughness={0.04}
        envMapIntensity={2.6}
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
          camera={{ position: [0, 7.5, 23], fov: 37 }}
          style={{ background: '#05050f' }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.35} />
            <pointLight position={[18, 22, 14]} intensity={4.8} color="#f4f4f4" />
            <pointLight position={[-16, -6, -9]} intensity={1.6} color="#666666" />

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