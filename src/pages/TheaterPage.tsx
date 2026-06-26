import React, { useState, useEffect, useRef } from 'react';
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
  
  // Ref to target the actual video instance for standard device fullscreen overrides
  const videoRef = useRef<HTMLVideoElement | null>(null);

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

  // Triggers native device fullscreen on either PC or mobile elegantly
  const handleTriggerFullScreen = () => {
    const videoEl = document.querySelector('.r3f-video-source') as HTMLVideoElement;
    if (videoEl) {
      if (videoEl.requestFullscreen) {
        videoEl.requestFullscreen();
      } else if ((videoEl as any).webkitEnterFullscreen) {
        (videoEl as any).webkitEnterFullscreen(); // Pure iOS Safari override
      } else if ((videoEl as any).webkitRequestFullscreen) {
        (videoEl as any).webkitRequestFullscreen();
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#05050f] text-white flex flex-col items-center justify-center relative p-4 select-none">
      
      {/* Global Return Route */}
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
            Premium Immersive 3D Experience
          </p>
        </div>

        {/* 3D Container Canvas: Restored to a container box for maximum performance */}
        <div className="relative w-full aspect-video bg-black rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center">
          {loading ? (
            <div className="text-zinc-500 text-sm tracking-widest animate-pulse">
              LOADING THEATER SYSTEM...
            </div>
          ) : videoUrls.length === 0 ? (
            <div className="text-zinc-500 text-sm tracking-widest text-center px-4">
              🍿 NO VIDEOS UPLOADED YET <br />
              <span className="text-xs text-zinc-600 font-normal mt-1 block">Add .mp4 tracks via the Admin CMS</span>
            </div>
          ) : (
            <>
              {/* React Three Fiber Canvas executing inside localized bounds */}
              <Canvas
                camera={{ position: [0, 0, 1.8], fov: 52 }}
                gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
                style={{ position: 'absolute', inset: 0 }}
              >
                <CinemaRoom videoUrl={videoUrls[currentIndex]} isPlaying={isPlaying} />
                
                <OrbitControls 
                  enableZoom={true}
                  enablePan={false}
                  minDistance={0.5}
                  maxDistance={3.5}
                  minAzimuthAngle={-Math.PI / 4}
                  maxAzimuthAngle={Math.PI / 4}
                  minPolarAngle={Math.PI / 2.5}
                  maxPolarAngle={Math.PI / 1.7}
                />
              </Canvas>

              {/* HUD Play/Pause Intermediary States */}
              {!isPlaying && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm p-6 pointer-events-none">
                  <div 
                    className="w-20 h-20 bg-white/10 hover:bg-red-600 border border-white/20 rounded-full flex items-center justify-center cursor-pointer transition-all transform active:scale-95 shadow-2xl group pointer-events-auto"
                    onClick={() => setIsPlaying(true)}
                  >
                    <svg className="w-8 h-8 text-white fill-current translate-x-0.5 group-hover:scale-110 transition" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <p className="text-xs text-zinc-400 tracking-widest mt-4 font-bold">CLICK TO ENTER 3D ROOM</p>
                </div>
              )}

              {/* Floating control buttons inside the player box container */}
              {isPlaying && (
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-30 pointer-events-none">
                  <button 
                    onClick={() => setIsPlaying(false)}
                    className="px-4 py-2 bg-black/80 hover:bg-red-600/90 border border-white/10 rounded-xl text-xs font-bold tracking-widest text-white transition backdrop-blur-md uppercase pointer-events-auto shadow-md"
                  >
                    ⏸ Pause Room
                  </button>
                  
                  <button 
                    onClick={handleTriggerFullScreen}
                    className="px-4 py-2 bg-black/80 hover:bg-zinc-800 border border-white/10 rounded-xl text-xs font-bold tracking-widest text-white transition backdrop-blur-md uppercase pointer-events-auto shadow-md"
                  >
                    🖥️ Max Full Screen
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Track Selection Switcher displaying below the container box */}
        {!loading && videoUrls.length > 0 && (
          <div className="flex items-center justify-between bg-white/5 border border-white/10 max-w-sm w-full mx-auto px-4 py-2 rounded-2xl backdrop-blur-sm shadow-md">
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

      {/* Background Ambience Radial Layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.04)_0%,transparent_70%)] pointer-events-none" />
    </div>
  );
}