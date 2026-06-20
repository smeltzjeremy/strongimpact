import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import InteractiveGalleryWheel from '../components/3d/InteractiveGalleryWheel';

export default function PhotoGallery() {
  return (
    <div className="w-full h-screen bg-black relative overflow-hidden">
      
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 50 }} 
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
      >
        {/* Balanced ambient base */}
        <ambientLight intensity={0.15} />
        
        {/* 💡 THE MIRROR ENGINE: Studio map gives the chrome white light boxes to reflect */}
        <Environment preset="studio" />

        <InteractiveGalleryWheel />
      </Canvas>

      {/* Clean Close Link */}
      <button 
        onClick={() => window.history.back()} 
        className="fixed top-6 right-6 z-50 px-5 py-2.5 bg-zinc-950/80 backdrop-blur-md border border-white/10 rounded-xl text-white text-xs font-black tracking-widest hover:bg-white/10 active:scale-95 transition-all cursor-pointer shadow-2xl"
      >
        CLOSE GALLERY
      </button>
    </div>
  );
}