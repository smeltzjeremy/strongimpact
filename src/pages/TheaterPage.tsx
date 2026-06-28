import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';
import { supabase } from '../lib/supabaseClient';
import CinemaRoom from '../components/CinemaRoom';

export default function TheaterPage(): React.JSX.Element {
  const [videoUrls, setVideoUrls] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const [isEnlargedMode, setIsEnlargedMode] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  const breakoutVideoRef = useRef<HTMLVideoElement | null>(null);

  const fetchVideos = async (): Promise<void> => {
    try {
      setLoading(true);
      const { data, error } = await supabase.storage.from('gallery').list('theater', {
        sortBy: { column: 'name', order: 'asc' },
      });
      if (error) throw error;
      if (data && data.length > 0) {
        const urls = data.map(
          (file) => supabase.storage.from('gallery').getPublicUrl(`theater/${file.name}`).data.publicUrl,
        );
        setVideoUrls(urls);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  useEffect(() => {
    if (isEnlargedMode && breakoutVideoRef.current) {
      if (isPlaying) {
        breakoutVideoRef.current.play().catch((err) => console.log('Breakout play delay:', err));
      } else {
        breakoutVideoRef.current.pause();
      }
    }
  }, [isPlaying, isEnlargedMode]);

  if (isEnlargedMode && videoUrls.length > 0) {
    return (
      <div className="fixed inset-0 z-[9999] flex h-[100dvh] w-screen flex-col items-center justify-between bg-black p-4">
        <div className="z-50 flex w-full max-w-4xl items-center justify-between py-2">
          <button
            onClick={() => setIsEnlargedMode(false)}
            className="rounded-xl border border-white/20 bg-zinc-900 px-4 py-2 text-xs font-bold text-white transition hover:bg-zinc-800"
          >
            ✕ Return to 3D Room
          </button>
        </div>
        <div className="flex w-full max-w-4xl flex-1 items-center justify-center">
          <video
            ref={breakoutVideoRef}
            src={videoUrls[currentIndex]}
            muted={isMuted}
            controls
            playsInline
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onVolumeChange={(e) => setIsMuted((e.target as HTMLVideoElement).muted)}
            className="max-h-[80vh] w-full rounded-xl object-contain"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 h-[100dvh] w-screen overflow-hidden bg-[#030308] text-white">
      <div className="pointer-events-auto absolute inset-0 z-10 h-full w-full">
        {!loading && videoUrls.length > 0 ? (
          <Canvas
            shadows
            dpr={[1, 1.5]}
            camera={{ position: [0, 0.12, 4.85], fov: 48 }}
            gl={{
              antialias: true,
              alpha: false,
              powerPreference: 'high-performance',
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 0.95,
            }}
          >
            <CinemaRoom
              videoUrl={videoUrls[currentIndex]}
              isPlaying={isPlaying}
              isMuted={isMuted}
            />
            <OrbitControls enableZoom enablePan={false} minDistance={2.2} maxDistance={7.5} target={[0, -0.2, -2]} />
          </Canvas>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-zinc-600">
              {loading ? 'Loading Theater Archive…' : 'No videos in theater folder'}
            </span>
          </div>
        )}
      </div>

      {/* Cinematic vignette overlay — dark theater, not crimson premium */}
      <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between bg-[radial-gradient(ellipse_80%_70%_at_50%_45%,rgba(0,0,0,0)_30%,rgba(3,3,8,0.55)_65%,rgba(2,2,6,0.92)_100%)] p-6">
        <div className="z-30 flex w-full items-center justify-between">
          <Link
            to="/gallery"
            className="pointer-events-auto rounded-2xl border border-white/10 bg-zinc-950/60 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-300 shadow-2xl backdrop-blur-md transition hover:bg-zinc-900/80"
          >
            ← Exit Suite
          </Link>
          <div className="rounded-xl border border-white/[0.06] bg-zinc-950/40 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-zinc-600 backdrop-blur-sm">
            Studio Room Mode
          </div>
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-36 bg-gradient-to-r from-[#030308]/95 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-36 bg-gradient-to-l from-[#030308]/95 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#030308]/80 to-transparent" />

        <div className="z-30 mb-6 flex w-full justify-center">
          <div className="pointer-events-auto flex items-center gap-6 rounded-2xl border border-white/[0.08] bg-[#0a0a12]/75 px-8 py-3.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),inset_0_1px_1px_rgba(255,255,255,0.04)] backdrop-blur-xl transition-all">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`font-mono text-xs tracking-widest transition-all duration-300 ${isPlaying ? 'text-zinc-500' : 'text-emerald-400 [filter:drop-shadow(0_0_6px_#10b981)]'}`}
            >
              {isPlaying ? 'PAUSE' : 'PLAY'}
            </button>

            <div className="h-4 w-px bg-white/10" />

            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`font-mono text-xs tracking-widest transition-all duration-300 ${isMuted ? 'text-rose-400 [filter:drop-shadow(0_0_6px_#f43f5e)]' : 'text-zinc-500'}`}
            >
              {isMuted ? 'UNMUTE' : 'MUTE'}
            </button>

            <div className="h-4 w-px bg-white/10" />

            <button
              onClick={() => setIsEnlargedMode(true)}
              className="font-mono text-xs tracking-widest text-zinc-500 transition-colors hover:text-white"
            >
              EXPAND
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}