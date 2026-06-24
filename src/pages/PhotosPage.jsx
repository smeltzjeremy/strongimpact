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

            <group position={[-1.2, -2.55, 0]}>
              
              {/* BACK - Darkest */}
              <VectorCloudLayer zPos={-2.6} solidColor="#6f0d20" shadowOpacity={0.48} parallaxFactor={0.1} seed={5.2} />
              <VectorCloudLayer zPos={-2.4} solidColor="#7f1226" shadowOpacity={0.45} parallaxFactor={0.13} seed={6.8} />

              {/* MID-BACK */}
              <VectorCloudLayer zPos={-1.1} solidColor="#bf1c38" shadowOpacity={0.4} parallaxFactor={0.3} seed={3.4} />
              <VectorCloudLayer zPos={-0.9} solidColor="#d02847" shadowOpacity={0.37} parallaxFactor={0.33} seed={4.5} />

              {/* MID-FRONT */}
              <VectorCloudLayer zPos={0.5} solidColor="#e93f5d" shadowOpacity={0.32} parallaxFactor={0.55} seed={1.8} />
              <VectorCloudLayer zPos={0.7} solidColor="#f14f6f" shadowOpacity={0.28} parallaxFactor={0.6} seed={2.7} />

              {/* FOREGROUND - Lightest */}
              <VectorCloudLayer zPos={2.0} solidColor="#ff7492" shadowOpacity={0.1} parallaxFactor={0.8} seed={0.6} />

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