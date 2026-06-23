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

      {/* Chrome Background Canvas */}
      <div className="absolute inset-0 z-10">
        <Canvas camera={{ position: [0, 0, 1], fov: 50 }} style={{ background: '#05050f' }}>
          <Suspense fallback={null}>
            <ProceduralChromeBackground />
          </Suspense>
        </Canvas>
      </div>

      {/* Background Cloud Layer - softer & puffier */}
      <div 
        className="absolute inset-x-0 bottom-0 h-[58vh] z-20 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 20% 78%, rgba(120,18,28,0.55) 0%, transparent 48%),
            radial-gradient(ellipse at 68% 85%, rgba(135,22,32,0.48) 0%, transparent 52%),
            radial-gradient(ellipse at 12% 92%, rgba(100,15,25,0.5) 0%, transparent 42%),
            radial-gradient(ellipse at 82% 72%, rgba(145,28,38,0.38) 0%, transparent 58%),
            radial-gradient(ellipse at 48% 95%, rgba(115,20,30,0.45) 0%, transparent 38%)
          `,
          filter: 'blur(38px) saturate(1.5)',
          opacity: 0.78,
          mixBlendMode: 'screen'
        }}
      />

      {/* Foreground Cloud Layer - lighter and higher */}
      <div 
        className="absolute inset-x-0 bottom-0 h-[38vh] z-25 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 35% 68%, rgba(175,45,60,0.28) 0%, transparent 55%),
            radial-gradient(ellipse at 78% 80%, rgba(160,38,52,0.25) 0%, transparent 48%)
          `,
          filter: 'blur(55px)',
          opacity: 0.65,
          mixBlendMode: 'screen'
        }}
      />

      {/* Title */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50 text-center pointer-events-none">
        <h1 className="text-6xl font-bold tracking-tighter text-white">PHOTOS</h1>
      </div>
    </div>
  );
}