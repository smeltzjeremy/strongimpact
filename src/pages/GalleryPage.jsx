import React from 'react';

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-[#05050f] text-white flex items-center justify-center relative">
      <div className="text-center z-10">
        <h1 className="text-6xl font-bold mb-8 tracking-tighter">GALLERY</h1>
        
        <div className="flex flex-col gap-4 max-w-xs mx-auto">
          <a 
            href="/photos" 
            className="block px-10 py-5 bg-white/10 hover:bg-white/20 border border-white/30 rounded-3xl text-xl font-medium transition"
          >
            Photos
          </a>
          <a 
            href="/videos" 
            className="block px-10 py-5 bg-white/10 hover:bg-white/20 border border-white/30 rounded-3xl text-xl font-medium transition"
          >
            Videos
          </a>
        </div>
      </div>

      {/* Back button */}
      <a 
        href="/" 
        className="fixed top-6 left-6 px-5 py-3 bg-black/60 hover:bg-black/80 border border-white/20 rounded-2xl text-sm transition"
      >
        ← Back
      </a>
    </div>
  );
}