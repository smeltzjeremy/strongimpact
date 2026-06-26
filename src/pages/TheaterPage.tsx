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
  const [isMuted, setIsMuted] = useState<boolean>(true);
  
  const canvasRef = useRef<HTMLDivElement | null>(null);

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
    setCurrentIndex((prev) => (prev + 1) % videoUrls.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + videoUrls.length) % videoUrls.length);
  };

  const handleTriggerFullScreen = () => {
    const videoEl = document.querySelector('.r3f-video-source') as HTMLVideoElement;
    if (videoEl) {
      if (videoEl.requestFullscreen) {
        videoEl.requestFullscreen();
      } else if ((videoEl as any).webkitEnterFullscreen) {
        (videoEl as any).webkitEnterFullscreen(); // iOS Safari specific video override
      } else if ((videoEl as any).webkitRequestFullscreen) {
        (videoEl as any).webkitRequestFullscreen();
      }
    }
  };

  const toggleMute = () => {
    const videoEl = document.querySelector('.r3f-video-source') as HTMLVideoElement;
    if (videoEl) {
      videoEl.muted = !videoEl.muted;
      setIsMuted(videoEl.muted);
    }
  };

  return (
    <div className="min-h-screen bg-[#020205] text-white relative overflow-hidden select-none w-full h-screen">
      
      {/* Absolute Header Branding Overlays */}
      <div className="absolute top-6 left-6 z-50 flex items-center gap-4">
        <Link
          to="/gallery"
          className="px-5 py-3 bg-black/60 hover:bg-black/80 border border-white/20 rounded-2xl text-sm font-medium transition backdrop-blur-md"
        >
          ← Exit Theater
        </Link>
      </div>

      <div className="absolute top-6 right-6 z-50 flex items-center gap-3">
        {videoUrls.length > 0 && !loading && (
          <>
            <button
              onClick={toggleMute}
              className="px-5 py-3 bg-black/60 hover:bg-black/80 border border-white/20 rounded-2xl text-sm font-medium transition backdrop-blur-md uppercase tracking-wider"
            >
              {isMuted ? '🔊 Unmute Audio' : '🔇 Mute Audio'}
            </button>
            <button
              onClick={handleTriggerFullScreen}
              className="px-5 py-3 bg-red-600 hover:bg-red-700 border border-white/10 rounded-2xl text-sm font-medium transition backdrop-blur-md uppercase tracking-wider font-bold"
            >
              🖥️ Enlarge Full Screen
            </button>
          </>
        )}
      </div>

      {/* IMMERSIVE 3D CANVAS WORLD CONTAINER (Spans 100% instantly) */}
      <div ref={canvasRef} className="absolute inset-0 z-10 w-full h-full touch-none">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center text-zinc-500 text-sm tracking-widest animate-pulse bg-black">
            ENGAGING 3D CINEMA PROJECTORS...
          </div>
        ) : videoUrls.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center text-zinc-500 text-sm tracking-widest text-center px-4 bg-black">
            🍿 NO VIDEOS UPLOADED YET <br />
            <span className="text-xs text-zinc-600 font-normal mt-1 block">Add .mp4 tracks via the Admin CMS</span>
          </div>
        ) : (
          <Canvas
            camera={{ position: [0, 0, 1.6], fov: 55 }}
            gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
            style={{ width: '100%', height: '100%' }}
          >
            {/* The video plays automatically here in a muted state to bypass mobile safety blocks */}
            <CinemaRoom videoUrl={videoUrls[currentIndex]} isPlaying={true} />
            
            <OrbitControls 
              enableZoom={true}
              enablePan={false}
              minDistance={0.5}
              maxDistance={3.8}
              minAzimuthAngle={-Math.PI / 3}
              maxAzimuthAngle={Math.PI / 3}
              minPolarAngle={Math.PI / 2.6}
              maxPolarAngle={Math.PI / 1.6}
            />
          </Canvas>
        )}
      </div>

      {/* Floating Track Selector Box HUD at bottom */}
      {!loading && videoUrls.length > 1 && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between bg-black/60 border border-white/10 max-w-xs w-full px-4 py-2 rounded-2xl backdrop-blur-md shadow-2xl">
          <button 
            onClick={handlePrev}
            className="px-4 py-2 text-sm bg-black/40 hover:bg-white/10 rounded-xl transition border border-white/5 font-bold"
          >
            ←
          </button>
          <span className="text-[11px] font-bold tracking-widest text-zinc-400 uppercase">
            Track {currentIndex + 1} of {videoUrls.length}
          </span>
          <button 
            onClick={handleNext}
            className="px-4 py-2 text-sm bg-black/40 hover:bg-white/10 rounded-xl transition border border-white/5 font-bold"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}