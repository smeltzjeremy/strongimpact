import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Link } from 'react-router-dom';
import ProceduralChromeBackground from '../components/ProceduralChromeBackground';
import VectorCloudLayer from '../components/VectorCloudLayer';

export default function PhotosPage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* APPLICATION BACK LINK */}
      <div className="fixed top-6 left-6 z-50">
        <Link 
          to="/gallery" 
          className="px-5 py-3 bg-black/60 hover:bg-black/80 border border-white/20 rounded-2xl text-sm transition"
        >
          ← Back to Gallery
        </Link>
      </div>

      {/* FIXED VIEWPORT WEBGL RENDER WINDOW */}
      <div className="absolute inset-0 z-10">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          style={{ background: '#05050f' }}
        >
          <Suspense fallback={null}>
            
            {/* LAYER 1: BASE CHROMATIC LIQUID SILK METAL */}
            <group position={[0, 0, -4]}>
              <ProceduralChromeBackground />
            </group>

            {/* UNIFIED PAPERCUT SCENE ANCHOR 
                - Dropped slightly to Y = -2.8 to seal the baseline completely
            */}
            <group position={[0, -2.8, 0]}>
              
              {/* LAYER 2: BACK CLOUDS (Darkest Crimson Shadow Plane) */}
              <VectorCloudLayer 
                zPos={-2.5} 
                solidColor="#1c0004" 
                shadowOpacity={0.6} // Heavier shadow over the chrome background
                parallaxFactor={0.15} 
                seed={5.2}
              />

              {/* LAYER 3: MID-BACK CLOUDS (Deep Blood Crimson) */}
              <VectorCloudLayer 
                zPos={-0.8} 
                solidColor="#3d020b" 
                shadowOpacity={0.5}
                parallaxFactor={0.35} 
                seed={3.4}
              />

              {/* LAYER 4: MID-FRONT CLOUDS (Rich Velvet Red) */}
              <VectorCloudLayer 
                zPos={0.8} 
                solidColor="#730a1a" 
                shadowOpacity={0.45}
                parallaxFactor={0.6} 
                seed={1.8}
              />

              {/* LAYER 5: ABSOLUTE FOREGROUND (Lightest Vivid Ruby) */}
              <VectorCloudLayer 
                zPos={2.2} 
                solidColor="#ba233b" 
                shadowOpacity={0.4}
                parallaxFactor={0.85} 
                seed={0.6}
              />

            </group>

          </Suspense>
        </Canvas>
      </div>

      {/* MAIN VIEWPORT TITLE */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-40 pointer-events-none text-center">
        <h1 className="text-6xl font-bold tracking-tighter text-white">PHOTOS</h1>
      </div>
    </div>
  );
}