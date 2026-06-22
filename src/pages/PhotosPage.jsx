import React, { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { Link } from 'react-router-dom';
import * as THREE from 'three';

function LiquidMetalBackground() {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(70, 70, 160, 160);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = Math.sin(x * 0.6) * 2.4 + Math.cos(y * 0.5) * 2.0 + Math.sin((x + y) * 0.9) * 0.7;
      pos.setZ(i, z);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh 
      geometry={geometry} 
      rotation={[-0.9, 0, 0]} 
      position={[0, -8, -10]}
    >
      <meshStandardMaterial 
        color="#07070b"
        metalness={0.99}
        roughness={0.07}
        envMapIntensity={2.0}
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
          camera={{ position: [0, 6, 22], fov: 38 }}
          style={{ background: '#05050f' }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.2} />
            <pointLight position={[18, 20, 12]} intensity={3.5} color="#f0f0f0" />
            <pointLight position={[-15, -4, -10]} intensity={1.4} color="#555555" />

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