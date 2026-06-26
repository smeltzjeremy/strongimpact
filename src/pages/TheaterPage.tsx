import React from 'react';
import { Link } from 'react-router-dom';

export default function TheaterPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-6">
      <h1 className="text-3xl font-bold tracking-widest mb-4">STRONG IMPACT THEATER</h1>
      <p className="text-zinc-500 mb-8 uppercase text-xs tracking-[0.2em]">Staging Phase Placeholder</p>
      
      <Link 
        to="/gallery" 
        className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl text-sm transition"
      >
        ← Back to Gallery
      </Link>
    </div>
  );
}