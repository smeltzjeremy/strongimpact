import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { supabase } from '../lib/supabaseClient';
import CinemaRoom from '../components/CinemaRoom';
import * as THREE from 'three';

// Synchronization Component running directly inside the animation loop
function CameraSynchronizer({ mainControlsRef, videoCameraRef }: { 
  mainControlsRef: React.RefObject<any>; 
  videoCameraRef: React.RefObject<THREE.Camera | null>; 
}) {
  useFrame(() => {
    // Directly copy the matrix coordinates from Canvas 1 to Canvas 2 with zero lag
    if (mainControlsRef.current && videoCameraRef.current) {
      const mainCamera = mainControlsRef.current.object;
      videoCameraRef.current.position.copy(mainCamera.position);
      videoCameraRef.current.quaternion.copy(mainCamera.quaternion);
      videoCameraRef.current.updateMatrixWorld();
    }
  });
  return null;
}

export default function TheaterPage() {
  const [videoUrls, setVideoUrls] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  
  const [isEnlargedMode, setIsEnlargedMode] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  // Hardware Memory Hooks - No Lag, No State Re-renders
  const mainControlsRef = useRef<any>(null);
  const videoCameraRef = useRef<THREE.Camera | null>(null);

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

  if (isEnlargedMode && videoUrls.length > 0) {
    return (
      <div className="fixed inset-0 bg-black z-[9999] w-screen h-[100dvh] flex flex-col justify-between items-center p-4">
        <div className="w-full max-w-4xl flex justify-between items-center z-50 py-2">
          <button onClick={() => setIsEnlargedMode(false)} className="px-4 py-2 bg-zinc-900 border border-white/20 rounded-xl text-xs font-bold transition text-white">
            ✕ Return to 3D Room
          </button>
        </div>
        <div className="w-full max-w-4xl flex-1 flex items-center justify-center">
          <video src={videoUrls[currentIndex]} autoPlay={isPlaying} controls playsInline className="w-full max-h-[80vh] rounded-xl object-contain" />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black text-white overflow-hidden w-screen h-[100dvh]">
      
      {/* EXIT OVERLAY BUTTON */}
      <div className="w-full p-6 flex justify-between items-center z-[999] absolute top-0 left-0 pointer-events-none">
        <Link to="/gallery" className="px-5 py-3 bg-black/70 border border-white/20 rounded-2xl text-sm font-medium pointer-events-auto shadow-2xl">
          ← Exit Theater
        </Link>
      </div>

      {/* LAYER 1 (BOTTOM): INTERACTIVE DECORATION ROOM CANVAS */}
      <div className="w-full h-full absolute inset-0 z-10 pointer-events-auto">
        {!loading && videoUrls.length > 0 && (
          <Canvas camera={{ position: [0, 0, 4.5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[0, 3, 0]} intensity={1} color="#fde047" />
            
            {/* Base room floor structure */}
            <mesh position={[0, -1.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[20, 20]} />
              <meshStandardMaterial color="#0b0f19" roughness={0.9} />
            </mesh>
            
            <OrbitControls 
              ref={mainControlsRef}
              enableZoom={true} 
              enablePan={false} 
              minDistance={2.0} 
              maxDistance={7.0} 
            />
            
            {/* Bridge component syncing the hardware positions directly */}
            <CameraSynchronizer mainControlsRef={mainControlsRef} videoCameraRef={videoCameraRef} />
          </Canvas>
        )}
      </div>

      {/* LAYER 2 (TOP): TRANSPARENT VIDEO SCREEN STREAM CANVAS */}
      <div className="w-full h-full absolute inset-0 z-20 pointer-events-none">
        {!loading && videoUrls.length > 0 && (
          <Canvas 
            camera={{ position: [0, 0, 4.5], fov: 50 }} 
            gl={{ alpha: true }} 
            style={{ background: 'transparent' }}
            onCreated={({ camera }) => {
              videoCameraRef.current = camera;
              camera.matrixAutoUpdate = false; // Gives complete manual matrix authority over this layer
            }}
          >
            <CinemaRoom videoUrl={videoUrls[currentIndex]} isPlaying={isPlaying} isMuted={isMuted} />
          </Canvas>
        )}
      </div>

      {/* FLOATING HUD CONTROLS */}
      {!loading && videoUrls.length > 0 && (
        <div className="w-full absolute bottom-12 left-0 z-[999] flex justify-center px-4 pointer-events-none">
          <div className="flex items-center gap-5 bg-black/90 border border-white/20 px-6 py-3 rounded-2xl pointer-events-auto shadow-2xl">
            <button onClick={() => setIsPlaying(!isPlaying)} className="text-xl px-2">{isPlaying ? '‖' : '▶'}</button>
            <button onClick={() => setIsMuted(!isMuted)} className="text-xl px-2">{isMuted ? '🔇' : '🔊'}</button>
            <button onClick={() => setIsEnlargedMode(true)} className="text-xl font-bold px-2">⛶</button>
          </div>
        </div>
      )}

    </div>
  );
}