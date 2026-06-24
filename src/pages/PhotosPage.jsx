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

            <group position={[-0.1, -2.5, 0]}>
              
              {/* Back layers - subtle bottom tint */}
              <VectorCloudLayer zPos={-2.6} solidColor="#8c1224" shadowOpacity={0.5} seed={5.2} />
              <VectorCloudLayer zPos={-2.35} solidColor="#b31931" shadowOpacity={0.46} seed={6.7} />

              {/* [PHOTO WHEEL SPACE] */}

              {/* Mid layers - subtle bottom tint */}
              <VectorCloudLayer zPos={-1.05} solidColor="#d92341" shadowOpacity={0.38} seed={3.4} />
              <VectorCloudLayer zPos={-0.8} solidColor="#f03a58" shadowOpacity={0.34} seed={4.1} />

              {/* Foreground layers */}
              <VectorCloudLayer zPos={0.65} solidColor="#ff5774" shadowOpacity={0.25} seed={1.8} />
              {/* HERO LAYER: 100% Flat bright color, zero shading */}
              <VectorCloudLayer zPos={0.95} solidColor="#ff7a93" shadowOpacity={0.15} seed={0.9} isFront={true} />

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