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
  
  const [isEnlargedMode, setIsEnlargedMode] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  const breakoutVideoRef = useRef<HTMLVideoElement | null>(null);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.storage.from('gallery').list('theater', {
        sortBy: { column: 'name', order: 'asc' }
      });
      if (error) throw error;
      if (data && data.length > 0) {
        const urls = data.map(file => supabase.storage.from('gallery').getPublicUrl(`theater/${file.name}`).data.publicUrl);
        setVideoUrls(urls);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchVideos(); }, []);

  useEffect(() => {
    if (isEnlargedMode && breakoutVideoRef.current) {
      if (isPlaying) {
        breakoutVideoRef.current.play().catch(err => console.log("Breakout play delay:", err));
      } else {
        breakoutVideoRef.current.pause();
      }
    }
  }, [isPlaying, isEnlargedMode]);

  if (isEnlargedMode && videoUrls.length > 0) {
    return (
      <div className="fixed inset-0 bg-black z-[9999] w-screen h-[100dvh] flex flex-col justify-between items-center p-4">
        <div className="w-full max-w-4xl flex justify-between items-center z-50 py-2">
          <button 
            onClick={() => setIsEnlargedMode(false)} 
            className="px-4 py-2 bg-zinc-900 border border-white/20 rounded-xl text-xs font-bold transition text-white hover:bg-zinc-800"
          >
            ✕ Return to 3D Room
          </button>
        </div>
        <div className="w-full max-w-4xl flex-1 flex items-center justify-center">
          <video 
            ref={breakoutVideoRef}
            src={videoUrls[currentIndex]} 
            muted={isMuted}
            controls 
            playsInline 
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onVolumeChange={(e) => setIsMuted((e.target as HTMLVideoElement).muted)}
            className="w-full max-h-[80vh] rounded-xl object-contain" 
          />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#050508] text-white overflow-hidden w-screen h-[100dvh]">
      
      <div className="w-full h-full absolute inset-0 z-10 pointer-events-auto">
        {!loading && videoUrls.length > 0 && (
          <Canvas 
            camera={{ position: [0, 0, 4.5], fov: 50 }}
            gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
          >
            <CinemaRoom videoUrl={videoUrls[currentIndex]} isPlaying={isPlaying} isMuted={isMuted} />
            <OrbitControls enableZoom={true} enablePan={false} minDistance={2.0} maxDistance={7.0} />
          </Canvas>
        )}
      </div>

      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-6 bg-[radial-gradient(circle,rgba(0,0,0,0)_35%,rgba(9,9,14,0.65)_70%,rgba(5,5,8,0.95)_100%)]">
        
        <div className="w-full flex justify-between items-center z-30">
          <Link to="/gallery" className="px-5 py-3 bg-zinc-950/50 border border-white/10 rounded-2xl text-xs uppercase tracking-wider font-semibold pointer-events-auto backdrop-blur-md shadow-2xl hover:bg-zinc-900/80 transition text-zinc-300">
            ← Exit Suite
          </Link>
          <div className="px-4 py-2 bg-zinc-950/30 border border-white/5 rounded-xl text-[10px] tracking-widest uppercase font-bold text-zinc-500 backdrop-blur-sm">
            Studio Room Mode
          </div>
        </div>

        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050508]/90 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050508]/90 to-transparent pointer-events-none" />

        <div className="w-full flex justify-center mb-6 z-30">
          <div className="flex items-center gap-6 bg-[#0c0c14]/70 border border-white/10 px-8 py-3.5 rounded-2xl pointer-events-auto backdrop-blur-xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.05)] transition-all">
            
            <button 
              onClick={() => setIsPlaying(!isPlaying)} 
              className={`text-xs font-mono tracking-widest transition-all duration-300 ${isPlaying ? 'text-zinc-400' : 'text-emerald-400 [filter:drop-shadow(0_0_6px_#10b981)]'}`}
            >
              {isPlaying ? 'PAUSE' : 'PLAY'}
            </button>
            
            <div className="h-4 w-[1px] bg-white/10" />
            
            <button 
              onClick={() => setIsMuted(!isMuted)} 
              className={`text-xs font-mono tracking-widest transition-all duration-300 ${isMuted ? 'text-rose-400 [filter:drop-shadow(0_0_6px_#f43f5e)]' : 'text-zinc-400'}`}
            >
              {isMuted ? 'UNMUTE' : 'MUTE'}
            </button>
            
            <div className="h-4 w-[1px] bg-white/10" />
            
            <button 
              onClick={() => setIsEnlargedMode(true)} 
              className="text-xs font-mono tracking-widest text-zinc-400 hover:text-white transition-colors"
            >
              EXPAND
            </button>

          </div>
        </div>

      </div>

    </div>
  );
}