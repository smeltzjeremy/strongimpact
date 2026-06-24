import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Link } from 'react-router-dom';
import ProceduralChromeBackground from '../components/ProceduralChromeBackground';
import VectorCloudLayer from '../components/VectorCloudLayer';

export default function PhotosPage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Back Link */}
      <div className="fixed top-6 left-6 z-50">
        <Link 
          to="/gallery" 
          className="px-5 py-3 bg-black/60 hover:bg-black/80 border border-white/20 rounded-2xl text-sm transition text-white"
        >
          ← Back to Gallery
        </Link>
      </div>

      {/* Unified Canvas Viewport */}
      <div className="absolute inset-0 z-10">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          style={{ background: '#05050f' }}
        >
          <Suspense fallback={null}>
            
            {/* Layer 1: Background Chrome Mesh */}
            <group position={[0, 0, -4]}>
              <ProceduralChromeBackground />
            </group>

            {/* Cloud Group Container */}
            <group position={[0, -2.75, 0]}>
              
              <VectorCloudLayer 
                zPos={-2.5} 
                solidColor="#540510" 
                shadowOpacity={0.45} 
                parallaxFactor={0.15} 
                seed={5.2}
              />

              <VectorCloudLayer 
                zPos={-0.8} 
                solidColor="#820e20" 
                shadowOpacity={0.45} 
                parallaxFactor={0.35} 
                seed={3.4}
              />

              <VectorCloudLayer 
                zPos={0.8} 
                solidColor="#ad132c" 
                shadowOpacity={0.45} 
                parallaxFactor={0.6} 
                seed={1.8}
              />

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

      {/* Main Page Title */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-40 pointer-events-none text-center">
        <h1 className="text-6xl font-bold tracking-tighter text-white">PHOTOS</h1>
      </div>
    </div>
  );
}