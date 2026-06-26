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
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);

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
      console.error("Failed to load theater tracks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // Force texture synchronization updates safely 
  useEffect(() => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
    videoRef.current.muted = isMuted;
  }, [isPlaying, isMuted, currentIndex, videoLoaded]);

  const handleEnlarge = () => {
    const video = videoRef.current;
    if (!video) return;
    
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if ((video as any).webkitEnterFullscreen) {
      (video as any).webkitEnterFullscreen();
    }
  };

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = () => setIsMuted(!isMuted);
  const handleStop = () => {
    setIsPlaying(false);
    if (videoRef.current) videoRef.current.currentTime = 0;
  };

  return (
    <div className="fixed inset-0 bg-black text-white overflow-hidden w-screen h-[100dvh] flex flex-col justify-between">
      
      {/* HARDWARE INTERACTION LINK: Positioned safely out of bounds instead of using display:none */}
      {!loading && videoUrls.length > 0 && (
        <video
          ref={videoRef}
          src={videoUrls[currentIndex]}
          loop
          playsInline
          muted={isMuted}
          onLoadedMetadata={() => setVideoLoaded(true)}
          style={{ position: 'absolute', top: '-9999px', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
        />
      )}

      {/* EXIT BUTTON LAYER */}
      <div className="w-full p-6 flex justify-between items-center z-[999] absolute top-0 left-0 pointer-events-none">
        <Link
          to="/gallery"
          className="px-5 py-3 bg-black/70 hover:bg-black border border-white/20 rounded-2xl text-sm font-medium transition backdrop-blur-md pointer-events-auto shadow-2xl"
        >
          ← Exit Theater
        </Link>
      </div>

      {/* 3D CANVAS LAYER */}
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
            {/* Only drop into WebGL once the element pipeline is actively loaded and ready */}
            {videoRef.current && videoLoaded && <CinemaRoom videoElement={videoRef.current} />}
            
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

      {/* GRAPHIC HUD CONTROL OVERLAY */}
      {!loading && videoUrls.length > 0 && (
        <div className="w-full absolute bottom-12 left-0 z-[999] flex flex-col items-center justify-center px-4 pointer-events-none">
          <div className="flex items-center justify-center gap-5 bg-black/90 border border-white/20 px-6 py-3 rounded-2xl backdrop-blur-md pointer-events-auto shadow-2xl scale-110 sm:scale-100">
            
            <button onClick={togglePlay} className="hover:text-red-500 transition text-xl px-2">
              {isPlaying ? <span>‖</span> : <span>▶</span>}
            </button>

            <button onClick={handleStop} className="hover:text-red-500 transition text-lg px-2">
              ■
            </button>

            <button onClick={toggleMute} className="hover:text-red-500 transition text-xl px-2">
              {isMuted ? '🔇' : '🔊'}
            </button>

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

            <button onClick={handleEnlarge} className="hover:text-red-500 transition text-xl font-bold px-2">
              ⛶
            </button>

          </div>
        </div>
      )}

    </div>
  );
}