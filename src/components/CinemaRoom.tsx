import React, { useEffect, useState } from 'react';
import { useVideoTexture, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface CinemaRoomProps {
  videoUrl: string;
  isPlaying: boolean;
  isMuted: boolean;
}

// Direct secure web stream URL for the optimized old-school room asset
const THEATER_MODEL_URL = 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/TheMill/TheMill.glb';

export default function CinemaRoom({ videoUrl, isPlaying, isMuted }: CinemaRoomProps) {
  // 1. Rock-solid video texture engine from baseline
  const texture = useVideoTexture(videoUrl, {
    unsuspended: 'canplay',
    crossOrigin: 'anonymous',
    muted: isMuted,
    loop: true,
    playsInline: true
  });

  // 2. Stream the old-school movie theater room asset model safely from the cloud network
  const { scene } = useGLTF(THEATER_MODEL_URL);
  const [glowIntensity, setGlowIntensity] = useState<number>(0.3);

  useEffect(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
      const video = texture.image as HTMLVideoElement;
      if (video) {
        if (isPlaying) {
          video.play().catch(err => console.log("Playback interaction wait:", err));
        } else {
          video.pause();
        }
        video.muted = isMuted;
      }
    }
  }, [texture, isPlaying, isMuted]);

  // 3. Subtle Screen Glow Sync: Automatically pulses ambient light when the video plays
  useEffect(() => {
    let frameId: number;
    const adjustGlow = () => {
      if (isPlaying) {
        // Creates a subtle cinematic ambient flicker/pulse to simulate movie playback projection
        setGlowIntensity(0.4 + Math.sin(Date.now() * 0.003) * 0.15);
      } else {
        setGlowIntensity(0.15); // Dim atmospheric ambient light when paused
      }
      frameId = requestAnimationFrame(adjustGlow);
    };
    
    adjustGlow();
    return () => cancelAnimationFrame(frameId);
  }, [isPlaying]);

  return (
    <>
      {/* GLOBAL MOOD LIGHTING */}
      <ambientLight intensity={0.15} />
      
      {/* THE SUBTLE SCREEN GLOW: Hidden project light casting reactive washes onto theater chairs */}
      <pointLight 
        position={[0, 0.5, -3.5]} 
        intensity={glowIntensity * 2.5} 
        color="#cbd5e1" 
        distance={12} 
      />
      
      {/* Low overhead vintage room rim light */}
      <directionalLight position={[0, 4, 2]} intensity={0.2} color="#fcd34d" />

      <group position={[0, 0, 0]}>
        
        {/* 4. THE LIVE ENVIRONMENT ASSET */}
        {/* Renders the old-school architectural walls, trim, and seating geometry */}
        <primitive object={scene} position={[0, -2.2, 0]} scale={1.3} />

        {/* 5. PERFECT MOVIE SCREEN SURFACE MESH */}
        {/* Placed flat, centered, and optimized via MeshBasicMaterial to ensure it never crashes */}
        <mesh position={[0, 0.5, -5]}>
          <planeGeometry args={[7.1, 4.0]} />
          <meshBasicMaterial 
            map={texture} 
            side={THREE.DoubleSide}
            toneMapped={false} // Prevents global canvas exposure from altering video colors
          />
        </mesh>

        {/* Classic Dark Wood Screen Bezel Frame */}
        <mesh position={[0, 0.5, -5.02]}>
          <planeGeometry args={[7.35, 4.25]} />
          <meshStandardMaterial color="#1c1917" roughness={0.7} />
        </mesh>

      </group>
    </>
  );
}

// Precache the asset outside the processing loop to prevent visual stutters on page launch
useGLTF.preload(THEATER_MODEL_URL);