import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Link } from 'react-router-dom';
import ProceduralChromeBackground from '../components/ProceduralChromeBackground';
import VectorCloudLayer from '../components/VectorCloudLayer';

export default function PhotosPage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* BACK NAVIGATION */}
      <div className="fixed top-6 left-6 z-50">
        <Link 
          to="/gallery" 
          className="px-5 py-3 bg-black/60 hover:bg-black/80 border border-white/20 rounded-2xl text-sm transition"
        >
          ← Back to Gallery
        </Link>
      </div>

      {/* MASTER WEBGL FRAME VIEWPORT */}
      <div className="absolute inset-0 z-10">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          style={{ background: '#05050f' }}
        >
          <Suspense fallback={null}>
            
            {/* BACKGROUND REFLECTIVE LIQUID METAL */}
            <group position={[0, 0, -4]}>
              <ProceduralChromeBackground />
            </group>

            {/* UNIFIED COMPOSITING SPACE
                - Shifted safely left (X = -0.6) and down (Y = -2.55) 
                to force iron-clad boundary seals over the left corners
            */}
            <group position={[-0.6, -2.55, 0]}>
              
              {/* LAYER 2: BACK CLOUDS (Rich Crimson Baseline) */}
              <VectorCloudLayer 
                zPos={-2.5} 
                solidColor="#6e0a19" 
                shadowOpacity={0.55} 
                parallaxFactor={0.15} 
                seed={5.2}
              />

              {/* LAYER 3: MID-BACK CLOUDS (Vivid Velvet Cardinal) */}
              <VectorCloudLayer 
                zPos={-0.8} 
                solidColor="#a3142a" 
                shadowOpacity={0.45}
                parallaxFactor={0.35} 
                seed={3.4}
              />

              {/* LAYER 4: MID-FRONT CLOUDS (Bright Ruby Red) */}
              <VectorCloudLayer 
                zPos={0.8} 
                solidColor="#d42843" 
                shadowOpacity={0.38}
                parallaxFactor={0.6} 
                seed={1.8}
              />

              {/* LAYER 5: ABSOLUTE FOREGROUND (Screaming Neon Ruby Coral) */}
              <VectorCloudLayer 
                zPos={2.2} 
                solidColor="#ff4766" 
                shadowOpacity={0.0} 
                parallaxFactor={0.85} 
                seed={0.6}
              />

            </group>

          </Suspense>
        </Canvas>
      </div>

      {/* CORE FRAME TITLE */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-40 pointer-events-none text-center">
        <h1 className="text-6xl font-bold tracking-tighter text-white">PHOTOS</h1>
      </div>
    </div>
  );
}