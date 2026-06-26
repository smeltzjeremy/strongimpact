import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function TheaterPage() {
  const [videoUrls, setVideoUrls] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Phase 2 Pipeline: Query files in your storage bucket
  const fetchVideos = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.storage.from('gallery').list('theater', {
        sortBy: { column: 'name', order: 'asc' }
      });

      if (error) throw error;

      if (data && data.length > 0) {
        // Map available videos into real public URLs
        const urls = data.map(file => 
          supabase.storage.from('gallery').getPublicUrl(`theater/${file.name}`).data.publicUrl
        );
        setVideoUrls(urls);
      }
    } catch (err) {
      console.error("Failed to stream video metadata:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleNext = () => {
    setIsPlaying(false); // Force stop to cut off active data leakage
    setCurrentIndex((prev) => (prev + 1) % videoUrls.length);
  };

  const handlePrev = () => {
    setIsPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + videoUrls.length) % videoUrls.length);
  };

  return (
    <div className="min-h-screen bg-[#05050f] text-white flex flex-col items-center justify-center relative p-4">
      
      {/* Navigation Return Link */}
      <Link
        to="/gallery"
        className="fixed top-6 left-6 z-50 px-5 py-3 bg-black/60 hover:bg-black/80 border border-white/20 rounded-2xl text-sm font-medium transition backdrop-blur-md"
      >
        ← Back to Gallery
      </Link>

      <div className="w-full max-w-4xl text-center z-10 flex flex-col gap-6">
        <div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tighter bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
            STRONG IMPACT THEATER
          </h1>
          <p className="text-xs text-zinc-500 tracking-widest uppercase mt-2">
            Dynamic Selector Sandbox
          </p>
        </div>

        {/* Dynamic Screen Area */}
        <div className="relative w-full aspect-video bg-black/90 rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center">
          {loading ? (
            <div className="text-zinc-500 text-sm tracking-widest animate-pulse">
              LOADING TRACK SELECTIONS...
            </div>
          ) : videoUrls.length === 0 ? (
            <div className="text-zinc-500 text-sm tracking-widest text-center px-4">
              🍿 NO VIDEOS UPLOADED YET <br />
              <span className="text-xs text-zinc-600 font-normal mt-1 block">Add .mp4 tracks via the Admin CMS</span>
            </div>
          ) : (
            <>
              {/* Controlled HTML Video Component */}
              {isPlaying ? (
                <video 
                  src={videoUrls[currentIndex]}
                  controls
                  autoPlay
                  loop={false} // Crucial parameter to save free-tier bandwidth
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/40 backdrop-blur-sm p-6">
                  <div className="w-20 h-20 bg-white/10 hover:bg-red-600 border border-white/20 rounded-full flex items-center justify-center cursor-pointer transition-all transform active:scale-95 shadow-xl group" onClick={() => setIsPlaying(true)}>
                    <svg className="w-8 h-8 text-white fill-current translate-x-0.5 group-hover:scale-110 transition" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <p className="text-xs text-zinc-400 tracking-widest mt-4 font-semibold">CLICK TO STREAM SELECTION</p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Dynamic Selector Display Panel */}
        {!loading && videoUrls.length > 0 && (
          <div className="flex items-center justify-between bg-white/5 border border-white/10 max-w-sm w-full mx-auto px-4 py-2 rounded-2xl backdrop-blur-sm">
            <button 
              onClick={handlePrev}
              className="px-4 py-2 text-sm bg-black/40 hover:bg-white/10 rounded-xl transition border border-white/5 active:scale-95"
            >
              ←
            </button>
            <span className="text-sm font-bold tracking-widest text-zinc-300">
              SELECTION {currentIndex + 1} OF {videoUrls.length}
            </span>
            <button 
              onClick={handleNext}
              className="px-4 py-2 text-sm bg-black/40 hover:bg-white/10 rounded-xl transition border border-white/5 active:scale-95"
            >
              →
            </button>
          </div>
        )}
      </div>

      {/* Background Ambience Layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.06)_0%,transparent_70%)] pointer-events-none" />
    </div>
  );
}