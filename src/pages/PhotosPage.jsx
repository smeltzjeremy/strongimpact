import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Link } from 'react-router-dom';
import * as THREE from 'three';

function MetallicWaves() {
  return (
    <mesh rotation={[Math.PI * -0.4, 0, 0]} position={[0, -4, -8]}>
      <planeGeometry args={[50, 50, 80, 80]} />
      <meshStandardMaterial 
        color="#0a0a0a"
        metalness={0.95}
        roughness={0.15}
        envMapIntensity={1.2}
      />
    </mesh>
  );
}

function CentralSphere() {
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[2.8, 64, 64]} />
      <meshStandardMaterial 
        color="#1a1a1a" 
        metalness={0.98} 
        roughness={0.08}
      />
    </mesh>
  );
}

export default function PhotosPage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Back Link - FIXED */}
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
          camera={{ position: [0, 2, 14], fov: 45 }}
          style={{ background: '#05050f' }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.4} />
            <pointLight position={[8, 12, 10]} intensity={2} color="#aaaaaa" />
            <pointLight position={[-10, -8, -5]} intensity={0.6} color="#444444" />

            <MetallicWaves />
            <CentralSphere />

            <Environment preset="night" />
            <OrbitControls 
              enablePan={false} 
              enableZoom={true} 
              minDistance={6} 
              maxDistance={35}
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