import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Link } from 'react-router-dom';
import ProceduralChromeBackground from '../components/ProceduralChromeBackground';

export default function PhotosPage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* LINK LEVEL (Z-50) */}
      <div className="fixed top-6 left-6 z-50">
        <Link to="/gallery" className="px-5 py-3 bg-black/60 hover:bg-black/80 border border-white/20 rounded-2xl text-sm transition">
          ← Back to Gallery
        </Link>
      </div>

      {/* CLOUD LAYER 1: THE BACKGROUND CURTAIN (Z-20) */}
      {/* This creates a soft, rich carmine floor that covers the bottom 40% of the screen */}
      <div 
        className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-red-950/70 via-red-900/20 to-transparent"
        style={{
          maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 25%, rgba(0,0,0,0) 45%)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 25%, rgba(0,0,0,0) 45%)'
        }}
      />

      {/* BASE CHROME CANVAS (Z-10) */}
      <div className="absolute inset-0 z-10">
        <Canvas camera={{ position: [0, 0, 1], fov: 50 }} style={{ background: '#05050f' }}>
          <Suspense fallback={null}>
            <ProceduralChromeBackground />
          </Suspense>
        </Canvas>
      </div>

      {/* HEADER TEXT (Z-50) */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50 text-center pointer-events-none">
        <h1 className="text-6xl font-bold tracking-tighter text-white">PHOTOS</h1>
      </div>
    </div>
  );
}