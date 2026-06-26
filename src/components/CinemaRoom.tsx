import React, { useEffect } from 'react';
import { useVideoTexture } from '@react-three/drei';
import * as THREE from 'three';

interface CinemaRoomProps {
  videoUrl: string;
  isPlaying: boolean;
}

export default function CinemaRoom({ videoUrl, isPlaying }: CinemaRoomProps) {
  
  // Mobile-Optimized Video Texture Pipeline
  const videoTexture = useVideoTexture(videoUrl, {
    unsuspend: 'canplay',
    crossOrigin: 'anonymous',
    loop: false,
    muted: true,          // CRITICAL FOR MOBILE: Bypasses browser autoplay/play blocking
    playsInline: true,    // CRITICAL FOR MOBILE: Stops iOS from opening native fullscreen app player
    start: false          // Wait for manual trigger
  });

  videoTexture.colorSpace = THREE.SRGBColorSpace;

  useEffect(() => {
    const videoEl = videoTexture.image as HTMLVideoElement;
    if (!videoEl) return;

    if (isPlaying) {
      // Unmute right at the moment of playing if browser permissions allow
      videoEl.muted = false; 
      videoEl.play().catch(err => {
        console.warn("Audio playback blocked by mobile policy, falling back to muted video:", err);
        videoEl.muted = true;
        videoEl.play();
      });
    } else {
      videoEl.pause();
    }
  }, [isPlaying, videoTexture]);

  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight position={[0, 4, -2]} intensity={isPlaying ? 1.8 : 0.2} color="#b0c0ff" />
      <pointLight position={[-5, -1.8, -1]} intensity={0.6} color="#ef4444" distance={8} />
      <pointLight position={[5, -1.8, -1]} intensity={0.6} color="#ef4444" distance={8} />

      <group position={[0, 0, 0]}>
        {/* THE MOVIE SCREEN */}
        <mesh position={[0, 0.5, -5]}>
          <planeGeometry args={[7.1, 4.0]} />
          <meshStandardMaterial 
            map={videoTexture} 
            emissive={isPlaying ? '#ffffff' : '#0a0a10'}
            emissiveMap={videoTexture}
            emissiveIntensity={isPlaying ? 0.45 : 0.05}
            roughness={0.3}
            metalness={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* SCREEN BORDER BEZEL */}
        <mesh position={[0, 0.5, -5.02]}>
          <planeGeometry args={[7.4, 4.3]} />
          <meshStandardMaterial color="#050508" roughness={0.9} />
        </mesh>

        {/* STAGE FLOOR */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, 0]}>
          <planeGeometry args={[16, 12]} />
          <meshStandardMaterial color="#0f0f15" roughness={0.6} metalness={0.2} />
        </mesh>

        {/* REAR ACOUSTIC WALL */}
        <mesh position={[0, 2, -6]}>
          <planeGeometry args={[20, 10]} />
          <meshStandardMaterial color="#0a0a0f" roughness={0.8} />
        </mesh>

        {/* LEFT ACOUSTIC PANEL */}
        <mesh rotation={[0, Math.PI / 2, 0]} position={[-6.5, 1, 0]}>
          <planeGeometry args={[12, 6]} />
          <meshStandardMaterial color="#0c0c12" roughness={0.7} />
        </mesh>

        {/* RIGHT ACOUSTIC PANEL */}
        <mesh rotation={[0, -Math.PI / 2, 0]} position={[6.5, 1, 0]}>
          <planeGeometry args={[12, 6]} />
          <meshStandardMaterial color="#0c0c12" roughness={0.7} />
        </mesh>
      </group>
    </>
  );
}