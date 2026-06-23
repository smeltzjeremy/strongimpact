import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Link } from 'react-router-dom';
import ProceduralChromeBackground from '../components/ProceduralChromeBackground';

export default function PhotosPage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Back Link */}
      <div className="fixed top-6 left-6 z-50">
        <Link to="/gallery" className="px-5 py-3 bg-black/60 hover:bg-black/80 border border-white/20 rounded-2xl text-sm transition">
          ← Back to Gallery
        </Link>
      </div>

      {/* Chrome Background */}
      <div className="absolute inset-0 z-10">
        <Canvas camera={{ position: [0, 0, 1], fov: 50 }} style={{ background: '#05050f' }}>
          <Suspense fallback={null}>
            <ProceduralChromeBackground />
          </Suspense>
        </Canvas>
      </div>

      {/* Fluffy Red Translucent Cloud Layer - HTML Bubbles */}
      <div className="absolute inset-x-0 bottom-0 h-[42vh] z-20 pointer-events-none overflow-hidden drop-shadow-[0_-25px_35px_rgba(0,0,0,0.9)]">
        {/* Color base */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#3a020a] via-[#7a0f22] to-transparent" />
        
        {/* Overlapping fluffy cloud puffs */}
        <div className="absolute bottom-0 left-0 w-full h-full flex items-end justify-around">
          <div className="w-64 h-64 bg-[#c23d55] rounded-full -mb-20 -ml-12 opacity-70 blur-[2px]" />
          <div className="w-80 h-80 bg-[#d15a6a] rounded-full -mb-28 opacity-65 blur-[3px]" />
          <div className="w-56 h-56 bg-[#b82f4a] rounded-full -mb-16 opacity-75 blur-[1px]" />
          <div className="w-72 h-72 bg-[#e0707f] rounded-full -mb-36 opacity-55 blur-[4px]" />
          <div className="w-52 h-52 bg-[#c23d55] rounded-full -mb-20 opacity-70 blur-[2px]" />
        </div>
      </div>

      {/* Title */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50 text-center pointer-events-none">
        <h1 className="text-6xl font-bold tracking-tighter text-white">PHOTOS</h1>
      </div>
    </div>
  );
}