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

  return (
    <div className="fixed inset-0 bg-[#020205] text-white overflow-hidden w-screen h-screen flex flex-col justify-between">
      
      {/* Top Navigation Row */}
      <div className="w-full p-6 flex justify-between items-center z-50 absolute top-0 left-0 pointer-events-none">
        <Link
          to="/gallery"
          className="px-5 py-3 bg-black/70 hover:bg-black border border-white/20 rounded-2xl text-sm font-medium transition backdrop-blur-md pointer-events-auto"
        >
          ← Exit Theater
        </Link>
      </div>

      {/* Main Screen Layout Container */}
      <div className="w-full h-full absolute inset-0 z-10 flex items-center justify-center">
        {loading ? (
          <div className="text-zinc-500 text-sm tracking-widest animate-pulse">
            LOADING THEATER ENGINE...
          </div>
        ) : videoUrls.length === 0 ? (
          <div className="text-zinc-500 text-sm tracking-widest text-center px-4">
            🍿 NO VIDEOS UPLOADED YET <br />
            <span className="text-xs text-zinc-600 font-normal mt-1 block">Add .mp4 tracks via the Admin CMS</span>
          </div>
        ) : (
          <div className="relative w-full h-full max-w-4xl aspect-video max-h-[75vh] flex items-center justify-center p-4">
            
            {/* THE 3D BACKGROUND ENVIRONMENT LAYER */}
            <div className="absolute inset-0 z-10 pointer-events-auto">
              <Canvas camera={{ position: [0, 0, 2.2], fof: 55 }}>
                <CinemaRoom />
                <OrbitControls 
                  enableZoom={false}
                  enablePan={false}
                  minAzimuthAngle={-Math.PI / 6}
                  maxAzimuthAngle={Math.PI / 6}
                  minPolarAngle={Math.PI / 2.2}
                  maxPolarAngle={Math.PI / 1.8}
                />
              </Canvas>
            </div>

            {/* THE STANDARD, BULLETPROOF VIDEO PLAYER OVERLAY */}
            <div className="absolute z-20 w-[72%] aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-black translate-y-[-4%]">
              <video
                src={videoUrls[currentIndex]}
                controls
                playsInline
                webkit-playsinline="true"
                crossOrigin="anonymous"
                className="w-full h-full object-contain"
              />
            </div>

          </div>
        )}
      </div>

      {/* Bottom Track Switching Selector HUD */}
      {!loading && videoUrls.length > 1 && (
        <div className="w-full p-6 absolute bottom-0 left-0 z-50 flex flex-col items-center bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
          <div className="flex items-center justify-between bg-black/80 border border-white/10 max-w-xs w-full px-4 py-2 rounded-xl backdrop-blur-md pointer-events-auto shadow-2xl">
            <button 
              onClick={() => setCurrentIndex(prev => (prev - 1 + videoUrls.length) % videoUrls.length)} 
              className="px-3 py-1 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-xs font-bold transition"
            >
              ←
            </button>
            <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase">
              Track {currentIndex + 1} of {videoUrls.length}
            </span>
            <button 
              onClick={() => setCurrentIndex(prev => (prev + 1) % videoUrls.length)} 
              className="px-3 py-1 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-xs font-bold transition"
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}