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
          video.play().catch(err => console.log("3D media play wait:", err));
        } else {
          video.pause();
        }
        video.muted = isMuted;
      }
    }
  }, [texture, isPlaying, isMuted]);

  return (
    <>
      {/* HIGH-VISIBILITY LIGHTING STREAM */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[0, 6, 2]} intensity={2.0} color="#e2e8f0" />
      
      {/* Wide white screen backlight halo */}
      <pointLight position={[0, 1.2, -3.2]} intensity={5.0} color="#cbd5e1" distance={15} decay={1.2} />
      
      {/* Crimson lights tracking our physical side pillars */}
      <pointLight position={[-4.5, -0.8, -2.5]} intensity={4.0} color="#ef4444" distance={8} />
      <pointLight position={[4.5, -0.8, -2.5]} intensity={4.0} color="#ef4444" distance={8} />

      <group position={[0, 0, 0]}>
        
        {/* 1. MOVIE SCREEN & FRAME */}
        <mesh position={[0, 0.5, -5]}>
          <planeGeometry args={[7.1, 4.0]} />
          <meshBasicMaterial map={texture} side={THREE.DoubleSide} toneMapped={false} />
        </mesh>

        <mesh position={[0, 0.5, -5.01]}>
          <planeGeometry args={[7.35, 4.25]} />
          <meshStandardMaterial color="#18181b" roughness={0.7} />
        </mesh>

        {/* 2. GLOSSY CARPETED INTERIOR FLOORS */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, -1]}>
          <planeGeometry args={[14, 14]} />
          <meshStandardMaterial color="#1e1b4b" roughness={0.3} metalness={0.4} />
        </mesh>

        {/* Ceiling Panels */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 3.2, -1]}>
          <planeGeometry args={[14, 14]} />
          <meshStandardMaterial color="#111827" roughness={0.8} />
        </mesh>

        {/* 3. REFLECTIVE STUDIO ARCHITECTURAL WALLS (Lightened Base Colors) */}
        {/* Stage Back Wall */}
        <mesh position={[0, 0.7, -5.15]}>
          <planeGeometry args={[14, 6.5]} />
          <meshStandardMaterial color="#1f2937" roughness={0.5} />
        </mesh>

        {/* Left Main Wall */}
        <mesh position={[-5.5, 0.7, -1]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[14, 6.5]} />
          <meshStandardMaterial color="#111827" roughness={0.5} />
        </mesh>

        {/* Right Main Wall */}
        <mesh position={[5.5, 0.7, -1]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[14, 6.5]} />
          <meshStandardMaterial color="#111827" roughness={0.5} />
        </mesh>

        {/* 4. THEATER SEATING & PHYSICAL DETAILS */}
        {/* VIP Lounge Sofa Row 1 (Right in front of viewpoint) */}
        <mesh position={[0, -1.5, -1.5]}>
          <boxGeometry args={[6.5, 0.6, 1.2]} />
          <meshStandardMaterial color="#27272a" roughness={0.4} metalness={0.2} />
        </mesh>
        {/* Sofa Row 1 Backrest */}
        <mesh position={[0, -1.0, -0.9]}>
          <boxGeometry args={[6.5, 0.8, 0.25]} />
          <meshStandardMaterial color="#18181b" roughness={0.4} />
        </mesh>

        {/* Luxury Wood Side Accent Trims (Grounds the space) */}
        <mesh position={[-5.4, -1.7, -1]}>
          <boxGeometry args={[0.1, 0.2, 14]} />
          <meshStandardMaterial color="#78350f" roughness={0.2} />
        </mesh>
        <mesh position={[5.4, -1.7, -1]}>
          <boxGeometry args={[0.1, 0.2, 14]} />
          <meshStandardMaterial color="#78350f" roughness={0.2} />
        </mesh>

      </group>
    </>
  );
}