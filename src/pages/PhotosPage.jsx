import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Link } from 'react-router-dom';
import ProceduralChromeBackground from '../components/ProceduralChromeBackground';
import CloudLayer from '../components/CloudLayer';

export default function PhotosPage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="fixed top-6 left-6 z-50">
        <Link to="/gallery" className="px-5 py-3 bg-black/60 hover:bg-black/80 border border-white/20 rounded-2xl text-sm transition">
          ← Back to Gallery
        </Link>
      </div>
      
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 1], fov: 50 }}
          style={{ background: '#05050f' }}
        >
          <Suspense fallback={null}>
            <ProceduralChromeBackground />

            {/* Background red mist */}
            <CloudLayer 
              intensity={0.28} 
              position={[0, 0, -0.5]} 
              scale={[4, 4, 1]}
              speed={0.12}
              layerOffset={0}
            />

            {/* Foreground light mist */}
            <CloudLayer 
              intensity={0.18} 
              position={[0, 0, 0.3]} 
              scale={[3.5, 3.5, 1]}
              speed={0.35}
              layerColor={[0.78, 0.15, 0.22]}
              layerOffset={67}
            />
          </Suspense>
        </Canvas>
      </div>

      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-40 text-center pointer-events-none">
        <h1 className="text-6xl font-bold tracking-tighter text-white">PHOTOS</h1>
      </div>
    </div>
  );
}