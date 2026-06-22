import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { Link } from 'react-router-dom';
import LiquidMetalBackground from '../components/LiquidMetalBackground';

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
            <ambientLight intensity={0.3} />
            <pointLight position={[20, 25, 15]} intensity={5} color="#ffffff" />
            <pointLight position={[-18, -8, -12]} intensity={1.8} color="#888888" />

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