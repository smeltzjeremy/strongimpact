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
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

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

  useEffect(() => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.load();
    }
  }, [currentIndex]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(err => console.log("Playback policy bypass:", err));
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleTriggerFullScreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if ((videoRef.current as any).webkitEnterFullscreen) {
      (videoRef.current as any).webkitEnterFullscreen(); 
    } else if ((videoRef.current as any).webkitRequestFullscreen) {
      (videoRef.current as any).webkitRequestFullscreen();
    }
  };

  return (
    <div className="fixed inset-0 bg-[#020205] text-white overflow-hidden select-none w-screen h-screen flex flex-col justify-between">
      
      {/* Off-screen active hardware player element */}
      {!loading && videoUrls.length > 0 && (
        <video
          ref={videoRef}
          src={videoUrls[currentIndex]}
          muted={isMuted}
          playsInline
          webkit-playsinline="true"
          crossOrigin="anonymous"
          style={{ position: 'absolute', width: '1px', height: '1px', opacity: 0, pointerEvents: 'none' }}
        />
      )}

      {/* Top Header Controls Bar */}
      <div className="w-full p-6 flex justify-between items-center z-50 bg-gradient-to-b from-black/80 to-transparent absolute top-0 left-0 pointer-events-none">
        <Link
          to="/gallery"
          className="px-5 py-3 bg-black/70 hover:bg-black border border-white/20 rounded-2xl text-sm font-medium transition backdrop-blur-md pointer-events-auto"
        >
          ← Exit Theater
        </Link>
        <div className="hidden sm:block text-center pointer-events-none">
          <h1 className="text-xl font-bold tracking-tighter text-zinc-300">STRONG IMPACT THEATER</h1>
        </div>
        <div className="w-24 hidden sm:block"></div>
      </div>

      {/* IMMERSIVE 3D WEBGL SURFACE GRID */}
      <div className="w-full h-full absolute inset-0 z-10">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center text-zinc-500 text-sm tracking-widest animate-pulse bg-black">
            ENGAGING 3D CINEMA PROJECTORS...
          </div>
        ) : videoUrls.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center text-zinc-500 text-sm tracking-widest text-center px-4 bg-black">
            🍿 NO VIDEOS UPLOADED YET
          </div>
        ) : (
          <Canvas
            camera={{ position: [0, 0, 1.8], fov: 60 }}
            gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
            style={{ width: '100%', height: '100%' }}
          >
            <CinemaRoom videoElement={videoRef.current} />
            
            <OrbitControls 
              enableZoom={true}
              enablePan={false}
              minDistance={0.5}
              maxDistance={4.0}
              minAzimuthAngle={-Math.PI / 3}
              maxAzimuthAngle={Math.PI / 3}
              minPolarAngle={Math.PI / 2.5}
              maxPolarAngle={Math.PI / 1.6}
            />
          </Canvas>
        )}
      </div>

      {/* Control Panel Footer Panel HUD */}
      {!loading && videoUrls.length > 0 && (
        <div className="w-full p-6 absolute bottom-0 left-0 z-50 flex flex-col items-center gap-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none">
          
          <div className="flex flex-wrap items-center justify-center gap-3 pointer-events-auto max-w-lg w-full">
            <button 
              onClick={togglePlay}
              className={`px-6 py-3 rounded-xl text-xs font-bold tracking-widest border transition text-white shadow-xl ${isPlaying ? 'bg-zinc-900/90 border-white/10 hover:bg-red-600' : 'bg-emerald-600 border-white/20 hover:bg-emerald-700'}`}
            >
              {isPlaying ? '⏸ Pause Movie' : '▶ Play Movie'}
            </button>

            <button
              onClick={toggleMute}
              className="px-5 py-3 bg-black/60 hover:bg-black border border-white/10 rounded-xl text-xs font-bold tracking-widest transition backdrop-blur-md shadow-xl"
            >
              {isMuted ? '🔊 Unmute' : '🔇 Mute'}
            </button>

            <button
              onClick={handleTriggerFullScreen}
              className="px-5 py-3 bg-red-600 hover:bg-red-700 border border-white/10 rounded-xl text-xs font-bold tracking-widest text-white transition shadow-xl"
            >
              🖥️ Enlarge Full Screen
            </button>
          </div>

          {videoUrls.length > 1 && (
            <div className="flex items-center justify-between bg-black/80 border border-white/10 max-w-xs w-full px-4 py-2 rounded-xl backdrop-blur-md pointer-events-auto shadow-2xl">
              <button onClick={handlePrev} className="px-3 py-1 bg-zinc-900 rounded-lg text-xs font-bold">←</button>
              <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase">Track {currentIndex + 1} of {videoUrls.length}</span>
              <button onClick={handleNext} className="px-3 py-1 bg-zinc-900 rounded-lg text-xs font-bold">→</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}