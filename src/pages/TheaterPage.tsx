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
  
  // Clean state boxes to track player settings safely
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);

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
      console.error("Failed to load theater tracks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // Simple, direct function to find the running video element and make it go full screen
  const handleEnlarge = () => {
    const videoEl = document.querySelector('video');
    if (!videoEl) return;
    
    if (videoEl.requestFullscreen) {
      videoEl.requestFullscreen();
    } else if ((videoEl as any).webkitEnterFullscreen) {
      (videoEl as any).webkitEnterFullscreen(); // iOS Mobile backup
    }
  };

  // Safe control triggers that toggle the state boxes
  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = () => setIsMuted(!isMuted);
  const handleStop = () => {
    setIsPlaying(false);
    const videoEl = document.querySelector('video');
    if (videoEl) videoEl.currentTime = 0;
  };

  return (
    <div className="fixed inset-0 bg-black text-white overflow-hidden w-screen h-screen">
      
      {/* FLAT GLASS OVERLAY: Top Header Navigation */}
      <div className="w-full p-6 flex justify-between items-center z-50 absolute top-0 left-0 pointer-events-none">
        <Link
          to="/gallery"
          className="px-5 py-3 bg-black/70 hover:bg-black border border-white/20 rounded-2xl text-sm font-medium transition backdrop-blur-md pointer-events-auto shadow-2xl"
        >
          ← Exit Theater
        </Link>
      </div>

      {/* 3D CANVAS BACKGROUND LAYER */}
      <div className="w-full h-full absolute inset-0 z-10 pointer-events-auto">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center text-zinc-500 text-sm tracking-widest animate-pulse bg-black">
            LOADING THEATER...
          </div>
        ) : videoUrls.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center text-zinc-500 text-sm tracking-widest bg-black">
            🍿 NO VIDEOS FOUND
          </div>
        ) : (
          <Canvas 
            camera={{ position: [0, 0, 4.5], fov: 50 }}
            gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
            style={{ width: '100%', height: '100%' }}
          >
            {/* The 3D room reads the state boxes instantly to adjust playback */}
            <CinemaRoom 
              videoUrl={videoUrls[currentIndex]} 
              isPlaying={isPlaying}
              isMuted={isMuted}
            />
            
            <OrbitControls 
              enableZoom={true}
              enablePan={false}
              minDistance={2.0}
              maxDistance={7.0}
              minAzimuthAngle={-Math.PI / 3}
              maxAzimuthAngle={Math.PI / 3}
              minPolarAngle={Math.PI / 2.5}
              maxPolarAngle={Math.PI / 1.6}
            />
          </Canvas>
        )}
      </div>

      {/* FLAT GLASS OVERLAY: Floating Graphic Control Dashboard (Lifted into safe view) */}
      {!loading && videoUrls.length > 0 && (
        <div className="w-full absolute bottom-8 left-0 z-50 flex flex-col items-center justify-center px-4 pointer-events-none">
          <div className="flex items-center justify-center gap-6 bg-black/80 border border-white/10 px-6 py-3 rounded-2xl backdrop-blur-md pointer-events-auto shadow-2xl">
            
            {/* PLAY / PAUSE SHAPES */}
            <button onClick={togglePlay} className="hover:text-red-500 transition text-xl px-2">
              {isPlaying ? (
                <span>‖</span> // Pause Parallel Bars
              ) : (
                <span>▶</span> // Play Triangle
              )}
            </button>

            {/* STOP SHAPE */}
            <button onClick={handleStop} className="hover:text-red-500 transition text-lg px-2">
              ■
            </button>

            {/* MUTE / UNMUTE SHAPES */}
            <button onClick={toggleMute} className="hover:text-red-500 transition text-xl px-2">
              {isMuted ? '🔇' : '🔊'}
            </button>

            {/* TRACK SWITCHERS */}
            {videoUrls.length > 1 && (
              <div className="flex items-center gap-3 border-l border-r border-white/10 px-4 text-xs font-bold text-zinc-400 tracking-wider">
                <button onClick={() => setCurrentIndex(prev => (prev - 1 + videoUrls.length) % videoUrls.length)} className="hover:text-white transition">
                  ◀
                </button>
                <span>{currentIndex + 1} / {videoUrls.length}</span>
                <button onClick={() => setCurrentIndex(prev => (prev + 1) % videoUrls.length)} className="hover:text-white transition">
                  ▶
                </button>
              </div>
            )}

            {/* ENLARGE FULL SCREEN SHAPE */}
            <button onClick={handleEnlarge} className="hover:text-red-500 transition text-xl font-bold px-2">
              ⛶
            </button>

          </div>
        </div>
      )}

    </div>
  );
}