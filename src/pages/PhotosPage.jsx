import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Link } from 'react-router-dom';
import ProceduralChromeBackground from '../components/ProceduralChromeBackground';

export default function PhotosPage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* LEVEL 50: INTERACTIVE INTERFACE & TEXT */}
      <div className="fixed top-6 left-6 z-50">
        <Link to="/gallery" className="px-5 py-3 bg-black/60 hover:bg-black/80 border border-white/20 rounded-2xl text-sm transition">
          ← Back to Gallery
        </Link>
      </div>

      {/* =========================================================================
          LAYER 3: THE FOREGROUND CLOUDS (Z-40)
          - Passes *in front* of the wheel.
          - Uses backdrop-blur to softly diffuse the wheel edges for massive 3D depth.
         ========================================================================= */}
      <div 
        className="absolute inset-x-0 bottom-0 h-[25vh] z-40 pointer-events-none bg-gradient-to-t from-red-950/90 via-red-900/40 to-transparent backdrop-blur-[2px]"
        style={{
          clipPath: 'path("M 0 60 C 200 20, 450 100, 700 40 C 950 -20, 1200 80, 1450 30 C 1700 -10, 1800 50, 1920 10 L 1920 1080 L 0 1080 Z")',
          filter: 'blur(8px)'
        }}
      />


      {/* =========================================================================
          LAYER 2: THE WHEEL ENTITY PLACEHOLDER (Z-30)
          - Sandwiched perfectly in the middle.
         ========================================================================= */}
      <div className="absolute inset-x-0 bottom-[10vh] h-[40vh] z-30 flex items-center justify-center pointer-events-none">
        {/* This represents where your crisp, vivid wheel graphic will mount */}
        <div className="w-64 h-64 border-4 border-dashed border-white/30 rounded-full flex items-center justify-center text-white/50 text-sm">
          [ MASTER 2D WHEEL COMPONENT GOES HERE ]
        </div>
      </div>


      {/* =========================================================================
          LAYER 1: THE BACKGROUND CLOUD BANK (Z-20)
          - Sits *behind* the wheel but *over* the chrome.
         ========================================================================= */}
      <div 
        className="absolute inset-x-0 bottom-0 h-[45vh] z-20 pointer-events-none bg-gradient-to-t from-red-950 via-red-900/60 to-transparent"
        style={{
          clipPath: 'path("M 0 40 C 150 10, 300 80, 500 30 C 700 -20, 900 60, 1100 20 C 1300 -20, 1500 70, 1700 30 C 1800 10, 1870 40, 1920 20 L 1920 1080 L 0 1080 Z")',
          filter: 'blur(20px)' // Deeper blur keeps it soft and far away
        }}
      />


      {/* LEVEL 10: BASE CHROMATIC VISUALS */}
      <div className="absolute inset-0 z-10">
        <Canvas camera={{ position: [0, 0, 1], fov: 50 }}>
          <Suspense fallback={null}>
            <ProceduralChromeBackground />
          </Suspense>
        </Canvas>
      </div>

      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50 text-center pointer-events-none">
        <h1 className="text-6xl font-bold tracking-tighter text-white">PHOTOS</h1>
      </div>
    </div>
  );
}