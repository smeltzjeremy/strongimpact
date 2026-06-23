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

      {/* LAYER 1: Shallow overlapping red cloud horizon */}
      <div className="absolute inset-x-0 bottom-0 h-[28vh] z-20 pointer-events-none filter drop-shadow-[0_-15px_25px_rgba(0,0,0,0.92)]">
        <div className="absolute inset-0 bg-gradient-to-t from-[#200104] via-[#4d0814]/80 to-transparent" />
        
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div className="absolute -bottom-6 -left-[5%] w-[35%] h-[15vh] bg-[#5e0a17]/85 rounded-full border-t border-white/5" />
          <div className="absolute -bottom-10 left-[18%] w-[32%] h-[13vh] bg-[#4f040f]/90 rounded-full border-t border-white/5" />
          <div className="absolute -bottom-4 left-[38%] w-[38%] h-[16vh] bg-[#590714]/85 rounded-full border-t border-white/5" />
          <div className="absolute -bottom-8 left-[62%] w-[30%] h-[12vh] bg-[#4a030d]/95 rounded-full border-t border-white/5" />
          <div className="absolute -bottom-6 left-[80%] w-[28%] h-[14vh] bg-[#540612]/90 rounded-full border-t border-white/5" />
        </div>
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