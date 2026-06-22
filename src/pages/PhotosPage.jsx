import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

function MetallicBackground() {
  return (
    <mesh rotation={[Math.PI * -0.5, 0, 0]} position={[0, -3, 0]}>
      <planeGeometry args={[40, 40]} />
      <meshStandardMaterial 
        color="#111111" 
        metalness={0.9} 
        roughness={0.2}
        envMapIntensity={0.6}
      />
    </mesh>
  );
}

export default function PhotosPage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Back Link */}
      <div className="fixed top-6 left-6 z-50">
        <a 
          href="/gallery"
          className="px-5 py-3 bg-black/60 hover:bg-black/80 border border-white/20 rounded-2xl text-sm transition"
        >
          ← Back to Gallery
        </a>
      </div>

      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 12], fov: 50 }}
          style={{ background: '#05050f' }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
            
            <MetallicBackground />

            {/* Temporary placeholder sphere - we'll replace this later */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[2.5, 64, 64]} />
              <meshStandardMaterial 
                color="#222222" 
                metalness={0.95} 
                roughness={0.1}
              />
            </mesh>

            <Environment preset="night" />
            <OrbitControls enablePan={false} enableZoom={true} minDistance={5} maxDistance={30} />
          </Suspense>
        </Canvas>
      </div>

      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-40 text-center">
        <h1 className="text-6xl font-bold tracking-tighter">PHOTOS</h1>
      </div>
    </div>
  );
}