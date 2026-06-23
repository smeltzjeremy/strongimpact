import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Link } from 'react-router-dom';
import ProceduralChromeBackground from '../components/ProceduralChromeBackground';
import VectorCloudLayer from '../components/VectorCloudLayer';

export default function PhotosPage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* HEADER NAV LINK */}
      <div className="fixed top-6 left-6 z-50">
        <Link 
          to="/gallery" 
          className="px-5 py-3 bg-black/60 hover:bg-black/80 border border-white/20 rounded-2xl text-sm transition"
        >
          ← Back to Gallery
        </Link>
      </div>

      {/* WEBGL ENVIRONMENT PORT */}
      <div className="absolute inset-0 z-10">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          style={{ background: '#05050f' }}
        >
          <Suspense fallback={null}>
            
            {/* CHROMATIC BACKGROUND LAYERING */}
            <group position={[0, 0, -4]}>
              <ProceduralChromeBackground />
            </group>

            {/* STACKED VECTOR DECK CONTAINER
                - Shifted safely left (X = -0.8) and down (Y = -2.7) 
                to lock down the bottom left corner across all display types
            */}
            <group position={[-0.8, -2.7, 0]}>
              
              {/* LAYER 2: BACK CLOUDS (Rich Crimson Baseline) */}
              <VectorCloudLayer 
                zPos={-2.5} 
                solidColor="#730b1a" 
                shadowOpacity={0.5} 
                parallaxFactor={0.15} 
                seed={5.2}
              />

              {/* LAYER 3: MID-BACK CLOUDS (Vivid Velvet Cardinal) */}
              <VectorCloudLayer 
                zPos={-0.8} 
                solidColor="#ad132c" 
                shadowOpacity={0.4}
                parallaxFactor={0.35} 
                seed={3.4}
              />

              {/* LAYER 4: MID-FRONT CLOUDS (Bright Ruby Crimson) */}
              <VectorCloudLayer 
                zPos={0.8} 
                solidColor="#db2342" 
                shadowOpacity={0.35}
                parallaxFactor={0.6} 
                seed={1.8}
              />

              {/* LAYER 5: ABSOLUTE FOREGROUND (Screaming Intense Coral Ruby) */}
              <VectorCloudLayer 
                zPos={2.2} 
                solidColor="#ff4262" 
                shadowOpacity={0.0} 
                parallaxFactor={0.85} 
                seed={0.6}
              />

            </group>

          </Suspense>
        </Canvas>
      </div>

      {/* TITLE OVERLAY CONTAINER */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-40 pointer-events-none text-center">
        <h1 className="text-6xl font-bold tracking-tighter text-white">PHOTOS</h1>
      </div>
    </div>
  );
}