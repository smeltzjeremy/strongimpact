import React, { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Link } from 'react-router-dom';
import * as THREE from 'three';

function LiquidMetalBackground() {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(60, 60, 140, 140);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      // Static wave displacement
      const z = Math.sin(x * 0.65) * 2.2 + Math.cos(y * 0.55) * 1.8 + Math.sin(x * 1.1 + y * 0.8) * 0.6;
      pos.setZ(i, z);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh 
      geometry={geometry} 
      rotation={[Math.PI * -0.38, 0, 0]} 
      position={[0, -7, -14]}
    >
      <meshStandardMaterial 
        color="#08080c"
        metalness={0.99}
        roughness={0.08}
        envMapIntensity={1.8}
      />
    </mesh>
  );
}

function CentralTestSphere() {
  return (
    <mesh position={[0, 1, 0]}>
      <sphereGeometry args={[2.1, 64, 64]} />
      <meshStandardMaterial 
        color="#0f0f12" 
        metalness={0.98} 
        roughness={0.05}
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
          camera={{ position: [0, 4, 18], fov: 40 }}
          style={{ background: '#05050f' }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.25} />
            <pointLight position={[15, 18, 10]} intensity={3} color="#e0e0e0" />
            <pointLight position={[-12, -5, -8]} intensity={1.2} color="#666666" />

            <LiquidMetalBackground />
            <CentralTestSphere />

            <Environment preset="night" />
            <OrbitControls 
              enablePan={false} 
              enableZoom={true} 
              minDistance={8} 
              maxDistance={45}
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