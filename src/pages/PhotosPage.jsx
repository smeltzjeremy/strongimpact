import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Link } from 'react-router-dom';
import ProceduralChromeBackground from '../components/ProceduralChromeBackground';
import VectorCloudLayer from '../components/VectorCloudLayer';

export default function PhotosPage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="fixed top-6 left-6 z-50">
        <Link 
          to="/gallery" 
          className="px-5 py-3 bg-black/60 hover:bg-black/80 border border-white/20 rounded-2xl text-sm transition"
        >
          ← Back to Gallery
        </Link>
      </div>

      <div className="absolute inset-0 z-10">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          style={{ background: '#05050f' }}
        >
          <Suspense fallback={null}>
            
            <group position={[0, 0, -4]}>
              <ProceduralChromeBackground />
            </group>

            <group position={[-1.1, -2.5, 0]}>
              
              {/* 1 & 2 - Darkest Back */}
              <VectorCloudLayer zPos={-2.6} solidColor="#9c1a2f" shadowOpacity={0.45} parallaxFactor={0.1} seed={5.2} />
              <VectorCloudLayer zPos={-2.35} solidColor="#a82237" shadowOpacity={0.43} parallaxFactor={0.13} seed={6.7} />

              {/* 3 & 4 - Mid */}
              <VectorCloudLayer zPos={-1.05} solidColor="#d12f4a" shadowOpacity={0.37} parallaxFactor={0.32} seed={3.4} />
              <VectorCloudLayer zPos={-0.8} solidColor="#e03d5a" shadowOpacity={0.34} parallaxFactor={0.36} seed={4.1} />

              {/* 5 & 6 - Front / Lightest */}
              <VectorCloudLayer zPos={0.65} solidColor="#f15a73" shadowOpacity={0.28} parallaxFactor={0.58} seed={1.8} />
              <VectorCloudLayer zPos={0.95} solidColor="#ff7a90" shadowOpacity={0.18} parallaxFactor={0.78} seed={0.9} />

            </group>

          </Suspense>
        </Canvas>
      </div>

      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-40 pointer-events-none text-center">
        <h1 className="text-6xl font-bold tracking-tighter text-white">PHOTOS</h1>
      </div>
    </div>
  );
}