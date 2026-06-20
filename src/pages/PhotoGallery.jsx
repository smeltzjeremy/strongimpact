import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import InteractiveGalleryWheel from '../components/3d/InteractiveGalleryWheel';

export default function PhotoGallery() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div className="w-full h-screen bg-[#030308] relative overflow-hidden">
      
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 52 }} 
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        dpr={[1, isMobile ? 1.2 : 1.5]}
      >
        <ambientLight intensity={0.3} />
        <Environment preset="studio" />

        <InteractiveGalleryWheel />
      </Canvas>

      {/* Fixed Close Command Return Link */}
      <button 
        onClick={() => window.history.back()} 
        className="fixed top-6 right-6 z-50 px-5 py-2.5 bg-zinc-950/80 backdrop-blur-md border border-white/10 rounded-xl text-white text-xs font-black tracking-widest hover:bg-white/10 active:scale-95 transition-all cursor-pointer shadow-2xl"
      >
        CLOSE GALLERY
      </button>
    </div>
  );
}