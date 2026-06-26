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
    <div className="fixed inset-0 bg-black text-white overflow-hidden w-screen h-screen">
      
      {/* SOLID OVERLAY LAYER: Fixed Exit Button (Guaranteed to work on PC & Mobile) */}
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

    </div>
  );
}