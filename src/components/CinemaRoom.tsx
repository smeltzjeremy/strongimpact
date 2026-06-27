import React, { useEffect } from 'react';
import { useVideoTexture } from '@react-three/drei';
import * as THREE from 'three';

interface CinemaRoomProps {
  videoUrl: string;
  isPlaying: boolean;
  isMuted: boolean;
}

export default function CinemaRoom({ videoUrl, isPlaying, isMuted }: CinemaRoomProps) {
  // Pure local video texture calculation loop from baseline
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
      {/* RICH MODERN STUDIO LIGHTING */}
      {/* Low ambient fill so the room feels deep and atmospheric */}
      <ambientLight intensity={0.15} />
      
      {/* Crisp, cool screen illumination wash casting down onto the flooring panels */}
      <directionalLight position={[0, 4, -2]} intensity={1.2} color="#cbd5e1" />
      
      {/* YOUR CUSTOM RED ACCENT LIGHTING EFFECT */}
      {/* Subtle crimson rim washes catching the far left and right edges of the space */}
      <pointLight position={[-6, -1.7, -2]} intensity={0.8} color="#ef4444" distance={10} />
      <pointLight position={[6, -1.7, -2]} intensity={0.8} color="#ef4444" distance={10} />

      <group position={[0, 0, 0]}>
        
        {/* 1. THE 3D MOVIE SCREEN SURFACE */}
        {/* Uses MeshBasicMaterial to remain light, responsive, and armor-plated against crashes */}
        <mesh position={[0, 0.5, -5]}>
          <planeGeometry args={[7.1, 4.0]} />
          <meshBasicMaterial 
            map={texture} 
            side={THREE.DoubleSide}
            toneMapped={false} // Guarantees video colors match your storage stream exactly
          />
        </mesh>

        {/* Premium Chiseled Matte Outer Bezel Frame */}
        <mesh position={[0, 0.5, -5.02]}>
          <planeGeometry args={[7.35, 4.25]} />
          <meshStandardMaterial color="#09090b" roughness={0.8} metalness={0.2} />
        </mesh>

        {/* 2. THE FLOORS & CEILING (LUXURY TEXTURE SIMULATION) */}
        {/* Studio Charcoal Panel Flooring */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, 0]}>
          <planeGeometry args={[18, 14]} />
          <meshStandardMaterial color="#111116" roughness={0.5} metalness={0.1} />
        </mesh>

        {/* Acoustic Matte Ceiling Dropper */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 3.8, 0]}>
          <planeGeometry args={[18, 14]} />
          <meshStandardMaterial color="#09090c" roughness={0.9} />
        </mesh>

        {/* 3. ATMOSPHERIC BACKSTAGE WALL PANELS */}
        {/* Main Stage Backdrop Wall */}
        <mesh position={[0, 1.0, -5.2]}>
          <planeGeometry args={[18, 6.5]} />
          <meshStandardMaterial color="#060608" roughness={0.95} />
        </mesh>

        {/* Architectural Left Side Flanking Wall Profile */}
        <mesh position={[-9, 1.0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[14, 6.5]} />
          <meshStandardMaterial color="#08080a" roughness={0.7} />
        </mesh>

        {/* Architectural Right Side Flanking Wall Profile */}
        <mesh position={[9, 1.0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[14, 6.5]} />
          <meshStandardMaterial color="#08080a" roughness={0.7} />
        </mesh>

      </group>
    </>
  );
}