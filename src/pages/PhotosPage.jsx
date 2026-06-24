import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Link } from 'react-router-dom';
import ProceduralChromeBackground from '../components/ProceduralChromeBackground';
import VectorCloudLayer from '../components/VectorCloudLayer';

export default function PhotosPage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden w-full h-full">
      {/* NAVIGATION PANEL (HTML Overlay Container) */}
      <div className="fixed top-6 left-6 z-50">
        <Link 
          to="/gallery" 
          className="px-5 py-3 bg-black/60 hover:bg-black/80 border border-white/20 rounded-2xl text-sm transition text-white font-sans"
        >
          ← Back to Gallery
        </Link>
      </div>

      {/* UNIFIED WEBGL RENDER VIEWPORT */}
      <div className="absolute inset-0 z-10 w-full h-full">
        <Canvas
          camera={{ position:, fov: 60 }}
          style={{ background: '#05050f' }}
        >
          <Suspense fallback={null}>
            
            {/* LAYER 1: BASE METALLIC SILK */}
            <group position={[0, 0, -4]}>
              <ProceduralChromeBackground />
            </group>

            {/* HOVERING PAPERCUT COMPOSITING GROUP 
                - Baseline anchored deeply at Y = -2.75 to mask the flat geometry bases completely
            */}
            <group position={[0, -2.75, 0]}>
              
              {/* LAYER 2: BACKGROUND PAPERCUT CLOUDS 
                  - Lighter black-cherry baseline shade */}
              <VectorCloudLayer 
                zPos={-2.5} 
                solidColor="#540510" 
                shadowOpacity={0.45} 
                parallaxFactor={0.15} 
                seed={5.2}
              />

              {/* LAYER 3: MID-BACKGROUND PAPERCUT CLOUDS
                  - Lighter burgundy red shade */}
              <VectorCloudLayer 
                zPos={-0.8} 
                solidColor="#820e20" 
                shadowOpacity={0.45} 
                parallaxFactor={0.35} 
                seed={3.4}
              />

              {/* LAYER 4: MID-FOREGROUND PAPERCUT CLOUDS
                  - Lighter core deep crimson shade */}
              <VectorCloudLayer 
                zPos={0.8} 
                solidColor="#ad132c" 
                shadowOpacity={0.45} 
                parallaxFactor={0.6} 
                seed={1.8}
              />

              {/* LAYER 5: ABSOLUTE FOREGROUND PAPERCUT CLOUDS
                  - Lighter vibrant ruby red shade */}
              <VectorCloudLayer 
                zPos={2.2} 
                solidColor="#d6455d" 
                shadowOpacity={0.45} 
                parallaxFactor={0.85} 
                seed={0.6}
              />

            </group>

          </Suspense>
        </Canvas>
      </div>

      {/* TEXT LAYER */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-40 pointer-events-none text-center select-none">
        <h1 className="text-6xl font-bold tracking-tighter text-white font-sans">PHOTOS</h1>
      </div>
    </div>
  );
}
