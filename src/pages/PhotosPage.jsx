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
                - Baseline safely dropped to Y = -2.75 to mask the flat geometry bases across all aspect ratios
            */}
            <group position={[0, -2.75, 0]}>
              
              {/* LAYER 2: BACK CLOUDS (Deep Maroon Cutout) */}
              <VectorCloudLayer 
                zPos={-2.5} 
                colorTop="#300106" 
                colorBottom="#120002" 
                opacity={0.85} 
                parallaxFactor={0.15} 
                seed={5.2}
              />

              {/* LAYER 3: MID-BACK CLOUDS (Rich Burgundy Cutout) */}
              <VectorCloudLayer 
                zPos={-0.8} 
                colorTop="#5c0714" 
                colorBottom="#240105" 
                opacity={0.75} 
                parallaxFactor={0.35} 
                seed={3.4}
              />

              {/* LAYER 4: MID-FRONT CLOUDS (Vivid Crimson Cutout) */}
              <VectorCloudLayer 
                zPos={0.8} 
                colorTop="#911428" 
                colorBottom="#42020a" 
                opacity={0.65} 
                parallaxFactor={0.6} 
                seed={1.8}
              />

              {/* LAYER 5: ABSOLUTE FOREGROUND (Bright Translucent Ruby Cutout) */}
              <VectorCloudLayer 
                zPos={2.2} 
                colorTop="#c23d55" 
                colorBottom="#590511" 
                opacity={0.5} 
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