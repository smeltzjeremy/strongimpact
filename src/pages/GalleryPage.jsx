import React from 'react';
import { Link } from 'react-router-dom';

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-[#05050f] text-white flex items-center justify-center relative">
      <div className="text-center z-10">
        <h1 className="text-6xl font-bold mb-8 tracking-tighter">GALLERY</h1>
       
        <div className="flex flex-col gap-4 max-w-xs mx-auto">
          <Link
            to="/photos"
            className="block px-10 py-5 bg-white/10 hover:bg-white/20 border border-white/30 rounded-3xl text-xl font-medium transition"
          >
            Photos
          </Link>
          <Link
            to="/videos"
            className="block px-10 py-5 bg-white/10 hover:bg-white/20 border border-white/30 rounded-3xl text-xl font-medium transition"
          >
            Videos
          </Link>
        </div>
      </div>

      {/* Back button */}
      <Link
        to="/"
        className="fixed top-6 left-6 px-5 py-3 bg-black/60 hover:bg-black/80 border border-white/20 rounded-2xl text-sm transition"
      >
        ← Back
      </Link>
    </div>
  );
}