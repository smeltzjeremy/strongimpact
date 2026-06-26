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
  
  // Track the hidden video reference for standard 2D full-screen overrides
  const hiddenVideoRef = useRef<HTMLVideoElement | null>(null);

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

  // Triggers native native device browser fullscreen directly on the video source
  const handleTriggerFullScreen = () => {
    if (hiddenVideoRef.current) {
      if (hiddenVideoRef.current.requestFullscreen) {
        hiddenVideoRef.current.requestFullscreen();
      } else if ((hiddenVideoRef.current as any).webkitRequestFullscreen) {
        (hiddenVideoRef.current as any).webkitRequestFullscreen(); // iOS Safari patch
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#020205] text-white relative overflow-hidden select-none w-full h-screen">
      
      {/* Hidden 2D video element used strictly to launch native Fullscreen video playback */}
      {videoUrls.length > 0 && (
        <video 
          ref={hiddenVideoRef}
          src={videoUrls[currentIndex]}
          className="hidden"
          controls
        />
      )}

      {/* Global Navigation Return Link */}
      <div className="absolute top-6 left-6 z-50 pointer-events-auto">
        <Link
          to="/gallery"
          className="px-5 py-3 bg-black/60 hover:bg-black/80 border border-white/20 rounded-2xl text-sm font-medium transition backdrop-blur-md"
        >
          ← Back to Gallery
        </Link>
      </div>

      {/* Header Branding Panel (Floating on top of the 3D space) */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-40 pointer-events-none text-center w-full px-4">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tighter bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent drop-shadow-md">
          STRONG IMPACT THEATER
        </h1>
        <p className="text-[10px] text-zinc-500 tracking-widest uppercase mt-1">
          Premium Immersive 3D Cinema Experience
        </p>
      </div>

      {/* THE 3D WORLD: Now spans 100% width and height immediately on load */}
      <div className="absolute inset-0 z-10 w-full h-full touch-none">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center text-zinc-500 text-sm tracking-widest animate-pulse bg-black">
            CALIBRATING 3D CINEMA ROOM...
          </div>
        ) : videoUrls.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center text-zinc-500 text-sm tracking-widest text-center px-4 bg-black">
            🍿 NO VIDEOS UPLOADED YET <br />
            <span className="text-xs text-zinc-600 font-normal mt-1 block">Add .mp4 tracks via the Admin CMS</span>
          </div>
        ) : (
          <Canvas
            camera={{ position: [0, 0, 1.8], fov: 55 }}
            gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
            style={{ width: '100%', height: '100%' }}
          >
            <CinemaRoom videoUrl={videoUrls[currentIndex]} isPlaying={isPlaying} />
            
            <OrbitControls 
              enableZoom={true}
              enablePan={false}
              minDistance={0.5}
              maxDistance={4.0}
              minAzimuthAngle={-Math.PI / 3}
              maxAzimuthAngle={Math.PI / 3}
              minPolarAngle={Math.PI / 2.8}
              maxPolarAngle={Math.PI / 1.6}
            />
          </Canvas>
        )}
      </div>

      {/* 2D HUD Controls Container Element Overlay */}
      {!loading && videoUrls.length > 0 && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-4 w-full px-4 pointer-events-none">
          
          {/* Main Action Triggers */}
          <div className="flex items-center gap-3 pointer-events-auto">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-8 py-4 rounded-2xl text-xs font-bold tracking-widest border text-white transition-all shadow-xl active:scale-95 uppercase ${isPlaying ? 'bg-zinc-900 border-white/10 hover:bg-red-600' : 'bg-red-600 border-white/20 hover:bg-red-700'}`}
            >
              {isPlaying ? '⏸ Pause Screen' : '▶ Play Cinema Screen'}
            </button>

            {isPlaying && (
              <button 
                onClick={handleTriggerFullScreen}
                className="px-6 py-4 bg-black/80 hover:bg-black border border-white/20 rounded-2xl text-xs font-bold tracking-widest text-white transition shadow-xl active:scale-95 uppercase"
              >
                🖥️ Full Screen Video
              </button>
            )}
          </div>

          {/* Track Switching Menu Switcher */}
          <div className="flex items-center justify-between bg-black/60 border border-white/10 max-w-xs w-full px-4 py-2 rounded-2xl backdrop-blur-md shadow-2xl pointer-events-auto">
            <button 
              onClick={handlePrev}
              className="px-3 py-1.5 text-xs bg-black/40 hover:bg-white/10 rounded-xl transition border border-white/5 font-bold"
            >
              ←
            </button>
            <span className="text-[11px] font-bold tracking-widest text-zinc-400 uppercase">
              Track {currentIndex + 1} of {videoUrls.length}
            </span>
            <button 
              onClick={handleNext}
              className="px-3 py-1.5 text-xs bg-black/40 hover:bg-white/10 rounded-xl transition border border-white/5 font-bold"
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}