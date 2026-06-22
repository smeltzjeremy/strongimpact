import React from 'react';

export default function PhotosPage() {
  return (
    <div className="min-h-screen bg-[#05050f] text-white flex items-center justify-center relative">
      <div className="text-center z-10">
        <h1 className="text-6xl font-bold mb-6 tracking-tighter">PHOTOS</h1>
        <p className="text-white/60 mb-8">Premium gallery coming soon</p>
        
        <a 
          href="/gallery" 
          className="inline-block px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 rounded-3xl text-sm font-medium transition"
        >
          ← Back to Gallery
        </a>
      </div>
    </div>
  );
}