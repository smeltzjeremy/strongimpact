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

      {/* Background Chrome */}
      <div className="absolute inset-0 z-10">
        <Canvas camera={{ position: [0, 0, 1], fov: 50 }} style={{ background: '#05050f' }}>
          <Suspense fallback={null}>
            <ProceduralChromeBackground />
          </Suspense>
        </Canvas>
      </div>

      {/* Fluffy Red Translucent Cloud Layer */}
      <div className="absolute inset-x-0 bottom-0 h-[45vh] z-20 pointer-events-none">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-full opacity-80">
          <defs>
            <linearGradient id="redCloud" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#4a020c" stopOpacity="0.95" />
              <stop offset="45%" stopColor="#8c1a2e" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#c23d55" stopOpacity="0.35" />
            </linearGradient>
          </defs>
          <path
            fill="url(#redCloud)"
            d="M0,280 
               Q180,220 320,245 
               Q480,180 620,225 
               Q780,160 920,210 
               Q1080,190 1180,245 
               Q1300,200 1440,260 
               L1440,320 L0,320 Z"
          />
          {/* Extra puff layer for more fluff */}
          <path
            fill="url(#redCloud)"
            opacity="0.65"
            d="M0,265 
               Q150,200 280,230 
               Q450,165 590,200 
               Q750,175 880,215 
               Q1050,180 1200,225 
               Q1350,195 1440,245 
               L1440,320 L0,320 Z"
          />
        </svg>
      </div>

      {/* Title */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50 text-center pointer-events-none">
        <h1 className="text-6xl font-bold tracking-tighter text-white">PHOTOS</h1>
      </div>
    </div>
  );
}