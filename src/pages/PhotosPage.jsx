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

      {/* LAYER 1: Background Cardboard Cutout Cloud */}
      <div
        className="absolute inset-x-0 bottom-0 h-[32vh] z-20 pointer-events-none filter drop-shadow-[0_-20px_30px_rgba(0,0,0,0.95)] blur-[2px]"
      >
        <svg viewBox="0 0 1440 300" preserveAspectRatio="none" className="w-full h-full">
          <defs>
            <linearGradient id="backCloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#7a0c17" stopOpacity="0.65" />
              <stop offset="40%" stopColor="#4a040b" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#1f0104" stopOpacity="0.98" />
            </linearGradient>
          </defs>
          <path
            fill="url(#backCloudGrad)"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="1"
            d="M0,150
               C120,90 220,190 340,160
               C460,130 520,70 660,110
               C800,150 880,210 1020,170
               C1160,130 1260,80 1360,120
               C1410,140 1425,145 1440,150
               L1440,300 L0,300 Z"
          />
        </svg>
      </div>

      {/* Chrome Background */}
      <div className="absolute inset-0 z-10">
        <Canvas camera={{ position: [0, 0, 1], fov: 50 }} style={{ background: '#05050f' }}>
          <Suspense fallback={null}>
            <ProceduralChromeBackground />
          </Suspense>
        </Canvas>
      </div>

      {/* Title */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50 text-center pointer-events-none">
        <h1 className="text-6xl font-bold tracking-tighter text-white">PHOTOS</h1>
      </div>
    </div>
  );
}