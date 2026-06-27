import React, { useEffect } from 'react';
import { useVideoTexture } from '@react-three/drei';
import * as THREE from 'three';

interface CinemaRoomProps {
  videoUrl: string;
  isPlaying: boolean;
  isMuted: boolean;
}

export default function CinemaRoom({ videoUrl, isPlaying, isMuted }: CinemaRoomProps) {
  const texture = useVideoTexture(videoUrl, {
    unsuspended: 'canplay',
    crossOrigin: 'anonymous',
    muted: isMuted,
    loop: true,
    playsInline: true
  });

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

  return (
    <>
      {/* ATMOSPHERIC STUDIO LIGHTING */}
      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 5, -2]} intensity={1.5} color="#e2e8f0" />
      
      {/* RED ACCENT SOURCE LIGHTS - Lowered position to wash across the floor panels */}
      <pointLight position={[-7, -1.5, -4]} intensity={1.8} color="#ef4444" distance={12} />
      <pointLight position={[7, -1.5, -4]} intensity={1.8} color="#ef4444" distance={12} />

      <group position={[0, 0, 0]}>
        
        {/* 1. THE CORE VIDEO MESH SURFACE */}
        <mesh position={[0, 0.5, -5]}>
          <planeGeometry args={[7.1, 4.0]} />
          <meshBasicMaterial map={texture} side={THREE.DoubleSide} toneMapped={false} />
        </mesh>

        {/* GLOWING SCREEN BACKLIGHT HALO */}
        {/* This bleeds the video colors outward behind the screen onto your studio walls */}
        <mesh position={[0, 0.5, -5.08]}>
          <planeGeometry args={[8.8, 5.2]} />
          <meshStandardMaterial 
            color="#ffffff" 
            emissiveMap={texture} 
            emissive="#ffffff" 
            emissiveIntensity={1.5} 
            transparent 
            opacity={0.4} 
          />
        </mesh>

        {/* Premium Dark Outer Bezel Frame */}
        <mesh position={[0, 0.5, -5.04]}>
          <planeGeometry args={[7.4, 4.3]} />
          <meshStandardMaterial color="#09090b" roughness={0.7} metalness={0.3} />
        </mesh>

        {/* 2. GLOSSY ARCHITECTURAL SURFACES */}
        {/* Reflective Studio Charcoal Flooring Panels */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, -2]}>
          <planeGeometry args={[24, 16]} />
          <meshStandardMaterial 
            color="#0a0a0f" 
            roughness={0.18} // Low roughness makes it glossy like dark polished concrete
            metalness={0.6}  // Reflects the movie screen backlight halo beautifully
          />
        </mesh>

        {/* Acoustic Matte Ceiling Dropper */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 3.8, -2]}>
          <planeGeometry args={[24, 16]} />
          <meshStandardMaterial color="#07070a" roughness={0.6} metalness={0.2} />
        </mesh>

        {/* 3. PUSHED-BACK ROOM WALLS (Creates Depth) */}
        {/* Rear Studio Stage Wall - Pushed back safely behind the screen setup */}
        <mesh position={[0, 1.0, -8]}>
          <planeGeometry args={[24, 12]} />
          <meshStandardMaterial color="#050507" roughness={0.35} metalness={0.5} />
        </mesh>

        {/* Left Side Wall Flanking Profile */}
        <mesh position={[-12, 1.0, -2]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[16, 12]} />
          <meshStandardMaterial color="#07070a" roughness={0.25} metalness={0.4} />
        </mesh>

        {/* Right Side Wall Flanking Profile */}
        <mesh position={[12, 1.0, -2]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[16, 12]} />
          <meshStandardMaterial color="#07070a" roughness={0.25} metalness={0.4} />
        </mesh>

      </group>
    </>
  );
}