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
  
  const [isEnlargedMode, setIsEnlargedMode] = useState<boolean>(false);
  // START AS FALSE: Forces the video to sit on a still frame shot until users interact
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
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

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = () => setIsMuted(!isMuted);

  // Safely swap tracks and reset playback state back to a still frame shot
  const handleTrackChange = (direction: 'next' | 'prev') => {
    setIsPlaying(false); // Pause the current player loop immediately
    if (direction === 'next') {
      setCurrentIndex(prev => (prev + 1) % videoUrls.length);
    } else {
      setCurrentIndex(prev => (prev - 1 + videoUrls.length) % videoUrls.length);
    }
  };

  // VIEW A: DESTINATION FULL SCREEN PLAN
  if (isEnlargedMode && videoUrls.length > 0) {
    return (
      <div className="fixed inset-0 bg-black z-[9999] w-screen h-[100dvh] flex flex-col justify-between items-center p-4">
        <div className="w-full max-w-4xl flex justify-between items-center z-50 py-2">
          <span className="text-xs font-bold tracking-widest text-zinc-500 uppercase">
            Track {currentIndex + 1} of {videoUrls.length} — FULL SCREEN
          </span>
          <button 
            onClick={() => setIsEnlargedMode(false)}
            className="px-4 py-2 bg-zinc-900 border border-white/20 rounded-xl text-xs font-bold hover:bg-zinc-800 transition text-white"
          >
            ✕ Return to 3D Room
          </button>
        </div>

        <div className="w-full max-w-4xl flex-1 flex items-center justify-center">
          <video 
            src={videoUrls[currentIndex]} 
            autoPlay={isPlaying} // Keeps play/pause choice in sync 
            controls 
            playsInline
            className="w-full max-h-[80vh] rounded-xl shadow-2xl object-contain"
          />
        </div>
      </div>
    );
  }

  // VIEW B: ORIGINAL WORKING 3D CINEMA VIEW
  return (
    <div id="theater-root" className="fixed inset-0 bg-black text-white overflow-hidden w-screen h-[100dvh] flex flex-col justify-between">
      
      {/* EXIT BUTTON LAYER */}
      <div className="w-full p-6 flex justify-between items-center z-[999] absolute top-0 left-0 pointer-events-none">
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

      {/* GRAPHIC HUD CONTROL OVERLAY */}
      {!loading && videoUrls.length > 0 && (
        <div className="w-full absolute bottom-12 left-0 z-[999] flex flex-col items-center justify-center px-4 pointer-events-none">
          <div className="flex items-center justify-center gap-5 bg-black/90 border border-white/20 px-6 py-3 rounded-2xl backdrop-blur-md pointer-events-auto shadow-2xl scale-110 sm:scale-100">
            
            {/* PLAY / PAUSE BUTTON */}
            <button onClick={togglePlay} className="hover:text-red-500 transition text-xl px-2">
              {isPlaying ? <span>‖</span> : <span>▶</span>}
            </button>

            {/* AUDIO BUTTON */}
            <button onClick={toggleMute} className="hover:text-red-500 transition text-xl px-2">
              {isMuted ? '🔇' : '🔊'}
            </button>

            {/* VIDEO SELECTOR GALLERY COMPONENT */}
            {videoUrls.length > 1 && (
              <div className="flex items-center gap-3 border-l border-r border-white/10 px-4 text-xs font-bold text-zinc-400 tracking-wider">
                <button onClick={() => handleTrackChange('prev')} className="hover:text-white transition p-1">
                  ◀
                </button>
                <span className="min-w-[40px] text-center">
                  {currentIndex + 1} / {videoUrls.length}
                </span>
                <button onClick={() => handleTrackChange('next')} className="hover:text-white transition p-1">
                  ▶
                </button>
              </div>
            )}

            {/* ENLARGE BUTTON */}
            <button onClick={() => setIsEnlargedMode(true)} className="hover:text-red-500 transition text-xl font-bold px-2">
              ⛶
            </button>

          </div>
        </div>
      )}

    </div>
  );
}