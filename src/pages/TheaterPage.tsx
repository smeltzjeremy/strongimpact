import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { supabase } from '../lib/supabaseClient';
import CinemaRoom from '../components/CinemaRoom';

// A tiny invisible listener that steals the background camera coordinates
function CameraMirror({ onChange }: { onChange: (matrix: number[]) => void }) {
  useFrame(({ camera }) => {
    onChange(camera.matrix.toArray());
  });
  return null;
}

// A tiny receiver that forces the foreground movie screen to match the angle
function CameraReceiver({ matrixArray }: { matrixArray: number[] | null }) {
  useFrame(({ camera }) => {
    if (matrixArray) {
      camera.matrix.fromArray(matrixArray);
      camera.matrix.decompose(camera.position, camera.quaternion, camera.scale);
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

  // The secret synchronization bridge
  const [sharedCameraMatrix, setSharedCameraMatrix] = useState<number[] | null>(null);

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
      
      {/* BUTTONS OVERLAY */}
      <div className="w-full p-6 flex justify-between items-center z-[999] absolute top-0 left-0 pointer-events-none">
        <Link to="/gallery" className="px-5 py-3 bg-black/70 border border-white/20 rounded-2xl text-sm font-medium pointer-events-auto shadow-2xl">
          ← Exit Theater
        </Link>
      </div>

      {/* LAYER 1 (BOTTOM): THE HIGH-END DECORATIONS LAYER */}
      {/* This holds all the luxury furniture, styling, and main controls */}
      <div className="w-full h-full absolute inset-0 z-10 pointer-events-auto">
        {!loading && videoUrls.length > 0 && (
          <Canvas camera={{ position: [0, 0, 4.5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[0, 3, 0]} intensity={1} color="#fde047" />
            
            {/* FUTURE HIGH-END ROOM MODEL GOES RIGHT HERE */}
            <mesh position={[0, -1.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[20, 20]} />
              <meshStandardMaterial color="#0b0f19" roughness={0.9} />
            </mesh>
            
            {/* Steals the tracking data from your finger swipes */}
            <CameraMirror onChange={setSharedCameraMatrix} />
            <OrbitControls enableZoom={true} enablePan={false} minDistance={2.0} maxDistance={7.0} />
          </Canvas>
        )}
      </div>

      {/* LAYER 2 (TOP): THE ULTRA-CRISP PURE MOVIE CANVAS */}
      {/* Pointer-events-none makes it completely invisible to clicks, so it never blocks the camera */}
      <div className="w-full h-full absolute inset-0 z-20 pointer-events-none">
        {!loading && videoUrls.length > 0 && (
          <Canvas camera={{ position: [0, 0, 4.5], fov: 50 }} gl={{ alpha: true }} style={{ background: 'transparent' }}>
            {/* Receives the camera coordinates and locks itself to Layer 1 */}
            <CameraReceiver matrixArray={sharedCameraMatrix} />
            
            {/* Your pristine, untouched working movie screen engine */}
            <CinemaRoom videoUrl={videoUrls[currentIndex]} isPlaying={isPlaying} isMuted={isMuted} />
          </Canvas>
        )}
      </div>

      {/* CONTROL BAR HUD OVERLAY */}
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