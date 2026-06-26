import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { supabase } from '../lib/supabaseClient';
import CinemaRoom from '../components/CinemaRoom';

export default function TheaterPage() {
  const [videoUrls, setVideoUrls] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.storage.from('gallery').list('theater', {
        sortBy: { column: 'name', order: 'asc' }
      });

      if (error) throw error;

      if (data && data.length > 0) {
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
    setIsPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % videoUrls.length);
  };

  const handlePrev = () => {
    setIsPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + videoUrls.length) % videoUrls.length);
  };

  return (
    <div className="min-h-screen bg-[#020205] text-white flex flex-col items-center justify-center relative overflow-hidden select-none">
      
      {/* Navigation Return Link (Hidden in Full Screen Mode) */}
      {!isFullScreen && (
        <Link
          to="/gallery"
          className="fixed top-6 left-6 z-50 px-5 py-3 bg-black/60 hover:bg-black/80 border border-white/20 rounded-2xl text-sm font-medium transition backdrop-blur-md"
        >
          ← Back to Gallery
        </Link>
      )}

      {/* Full Screen Toggle Button */}
      <button
        onClick={() => setIsFullScreen(!isFullScreen)}
        className="fixed top-6 right-6 z-50 px-5 py-3 bg-black/60 hover:bg-black/80 border border-white/20 rounded-2xl text-sm font-medium transition backdrop-blur-md uppercase tracking-wider"
      >
        {isFullScreen ? 'Exit Full Screen' : '🖥️ Full Screen'}
      </button>

      {/* Layout Grid Adjuster */}
      <div className={`w-full text-center z-10 flex flex-col transition-all duration-500 ${isFullScreen ? 'h-screen p-0 max-w-full' : 'max-w-5xl p-4 gap-6'}`}>
        
        {/* Header Branding (Hidden in Full Screen Mode) */}
        {!isFullScreen && (
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tighter bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
              STRONG IMPACT THEATER
            </h1>
            <p className="text-xs text-zinc-500 tracking-widest uppercase mt-2">
              Premium 3D Virtual Cinema Experience
            </p>
          </div>
        )}

        {/* 3D WebGL Canvas Layer Container */}
        <div className={`relative w-full bg-black border border-white/5 shadow-2xl flex items-center justify-center transition-all duration-500 overflow-hidden ${isFullScreen ? 'h-full border-none rounded-none' : 'aspect-video rounded-3xl'}`}>
          {loading ? (
            <div className="text-zinc-500 text-sm tracking-widest animate-pulse">
              CALIBRATING CINEMA SCREEN...
            </div>
          ) : videoUrls.length === 0 ? (
            <div className="text-zinc-500 text-sm tracking-widest text-center px-4">
              🍿 NO VIDEOS UPLOADED YET <br />
              <span className="text-xs text-zinc-600 font-normal mt-1 block">Add .mp4 tracks via the Admin CMS</span>
            </div>
          ) : (
            <>
              {/* The 3D World */}
              <Canvas
                camera={{ position: [0, 0, 1.8], fov: 50 }}
                gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
                style={{ position: 'absolute', inset: 0 }}
              >
                <CinemaRoom videoUrl={videoUrls[currentIndex]} isPlaying={isPlaying} />
                
                <OrbitControls 
                  enableZoom={true}
                  enablePan={false}
                  minDistance={0.5}
                  maxDistance={4.5}
                  minAzimuthAngle={-Math.PI / 4}
                  maxAzimuthAngle={Math.PI / 4}
                  minPolarAngle={Math.PI / 3}
                  maxPolarAngle={Math.PI / 1.8}
                />
              </Canvas>

              {/* Dynamic 2D Overlay Control State */}
              {!isPlaying && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm p-6 pointer-events-none">
                  <div 
                    className="w-24 h-24 bg-white/10 hover:bg-red-600 border border-white/20 rounded-full flex items-center justify-center cursor-pointer transition-all transform active:scale-95 shadow-2xl group pointer-events-auto"
                    onClick={() => setIsPlaying(true)}
                  >
                    <svg className="w-10 h-10 text-white fill-current translate-x-1 group-hover:scale-110 transition" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <p className="text-xs text-zinc-400 tracking-widest mt-6 font-bold bg-black/40 px-4 py-2 rounded-xl border border-white/5 backdrop-blur-md">
                    ENTER 3D CINEMA & PLAY
                  </p>
                </div>
              )}

              {/* Minimal floating stop control layer when video is active */}
              {isPlaying && (
                <button 
                  onClick={() => setIsPlaying(false)}
                  className="absolute bottom-6 left-6 px-4 py-2 bg-black/80 hover:bg-red-600/90 border border-white/10 rounded-xl text-xs font-bold tracking-widest text-white transition backdrop-blur-md uppercase"
                >
                  ⏸ Pause Stream
                </button>
              )}
            </>
          )}
        </div>

        {/* Dynamic Track Switching Menu (Hidden in Full Screen Mode) */}
        {!loading && videoUrls.length > 0 && !isFullScreen && (
          <div className="flex items-center justify-between bg-white/5 border border-white/10 max-w-sm w-full mx-auto px-4 py-2 rounded-2xl backdrop-blur-sm shadow-lg">
            <button 
              onClick={handlePrev}
              className="px-4 py-2 text-sm bg-black/40 hover:bg-white/10 rounded-xl transition border border-white/5 active:scale-95 font-bold"
            >
              ←
            </button>
            <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
              Track {currentIndex + 1} of {videoUrls.length}
            </span>
            <button 
              onClick={handleNext}
              className="px-4 py-2 text-sm bg-black/40 hover:bg-white/10 rounded-xl transition border border-white/5 active:scale-95 font-bold"
            >
              →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}