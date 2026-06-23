import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Link } from 'react-router-dom';
import ProceduralChromeBackground from '../components/ProceduralChromeBackground';

export default function PhotosPage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* 1. BUTTON LEVEL (Z-50) */}
      <div className="fixed top-6 left-6 z-50">
        <Link to="/gallery" className="px-5 py-3 bg-black/60 hover:bg-black/80 border border-white/20 rounded-2xl text-sm transition">
          ← Back to Gallery
        </Link>
      </div>

      {/* =========================================================================
          LAYER 1: THE BACKSTAGE PAPER-CUT CLOUD HORIZON (Z-20)
          - Deep, rich carmine crimson base.
          - Uses substantial, massive widths so the bubbles slam into each other.
          - Drops a heavy, soft pocket shadow onto the liquid chrome behind it.
         ========================================================================= */}
      <div className="absolute inset-x-0 bottom-0 h-[38vh] z-20 pointer-events-none filter drop-shadow-[0_-20px_35px_rgba(0,0,0,0.95)]">
        {/* Soft atmospheric ambient glow behind the cutout cluster */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2c0106]/95 via-[#570a18]/70 to-transparent" />
        
        {/* Master Hand-Packed Cutout Shapes */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {/* Puffy Cluster Left */}
          <div className="absolute -bottom-[15%] -left-[5%] w-[45vw] h-[45vw] bg-[#6e0b1b] rounded-full opacity-80 blur-[2px] border-t border-white/5" />
          
          {/* Main Towering Center Peak */}
          <div className="absolute -bottom-[25%] left-[20%] w-[55vw] h-[55vw] bg-[#540612] rounded-full opacity-90 blur-[1px] border-t border-white/5" />
          
          {/* Overlapping Mid-Right Peak */}
          <div className="absolute -bottom-[20%] left-[50%] w-[48vw] h-[48vw] bg-[#610815] rounded-full opacity-85 blur-[2px] border-t border-white/5" />
          
          {/* Puffy Cluster Far Right */}
          <div className="absolute -bottom-[10%] left-[75%] w-[38vw] h-[38vw] bg-[#4f040f] rounded-full opacity-90 blur-[3px] border-t border-white/5" />
        </div>
      </div>

      {/* BASE CHROMATIC VISUAL CANVASES (Z-10) */}
      <div className="absolute inset-0 z-10">
        <Canvas camera={{ position: [0, 0, 1], fov: 50 }} style={{ background: '#05050f' }}>
          <Suspense fallback={null}>
            <ProceduralChromeBackground />
          </Suspense>
        </Canvas>
      </div>

      {/* 5. TITLE TEXT ELEMENT (Z-50) */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50 text-center pointer-events-none">
        <h1 className="text-6xl font-bold tracking-tighter text-white">PHOTOS</h1>
      </div>
    </div>
  );
}