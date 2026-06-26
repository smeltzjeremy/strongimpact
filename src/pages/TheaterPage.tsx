import React from 'react';
import { Link } from 'react-router-dom';

export default function TheaterPage() {
  // Staging data placeholder for video playbacks
  const stagingVideoUrl = "https://www.w3schools.com/html/mov_bbb.mp4"; 

  return (
    <div className="min-h-screen bg-[#05050f] text-white flex flex-col items-center justify-center relative p-4">
      
      {/* Navigation Return Link */}
      <Link
        to="/gallery"
        className="fixed top-6 left-6 z-50 px-5 py-3 bg-black/60 hover:bg-black/80 border border-white/20 rounded-2xl text-sm font-medium transition backdrop-blur-md"
      >
        ← Back to Gallery
      </Link>

      {/* Main Content Layout Container */}
      <div className="w-full max-w-4xl text-center z-10 flex flex-col gap-6">
        <div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tighter bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
            STRONG IMPACT THEATER
          </h1>
          <p className="text-xs text-zinc-500 tracking-widest uppercase mt-2">
            Dynamic Video Screen System
          </p>
        </div>

        {/* Video Player Display Sandbox */}
        <div className="relative w-full aspect-video bg-black/90 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          <video 
            src={stagingVideoUrl}
            controls
            autoPlay
            muted
            className="w-full h-full object-contain"
          />
        </div>

        {/* Status/Controls Region Placeholder */}
        <div className="text-zinc-400 text-sm font-medium bg-white/5 border border-white/10 max-w-sm mx-auto px-6 py-3 rounded-2xl backdrop-blur-sm">
          🎬 Currently Streaming: Staging Clip
        </div>
      </div>

      {/* Background Ambience Layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.06)_0%,transparent_70%)] pointer-events-none" />
    </div>
  );
}