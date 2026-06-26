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
      
      {/* Absolute Header Navigation Link Layer */}
      <div className="w-full p-6 flex justify-between items-center z-50 absolute top-0 left-0">
        <Link
          to="/gallery"
          className="px-5 py-3 bg-black/70 hover:bg-black border border-white/20 rounded-2xl text-sm font-medium transition backdrop-blur-md pointer-events-auto shadow-2xl"
        >
          ← Exit Theater
        </Link>
      </div>

      {/* THE 3D WORLD LAYER (Spans the entire screen and captures all mouse look-around interactions) */}
      <div className="w-full h-full absolute inset-0 z-30 pointer-events-auto">
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
            camera={{ position: [0, 0, 4.5], fov: 50 }}
            gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
            style={{ width: '100%', height: '100%' }}
          >
            {/* We hand the current video URL directly down inside the 3D room container mesh */}
            <CinemaRoom videoUrl={videoUrls[currentIndex]} />
            
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

      {/* Bottom Track Switching Panel Overlay HUD */}
      {!loading && videoUrls.length > 1 && (
        <div className="w-full p-6 absolute bottom-0 left-0 z-50 flex flex-col items-center bg-gradient-to-t from-black/90 to-transparent pointer-events-none">
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