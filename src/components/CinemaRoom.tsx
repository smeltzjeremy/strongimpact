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
      <ambientLight intensity={0.05} />
      
      {/* Real ambient light projecting from behind the frame map onto the walls smoothly */}
      <pointLight position={[0, 0.5, -4.9]} intensity={3.5} color="#cbd5e1" distance={8} decay={2} />
      
      {/* Crimson lights repositioned to perfectly hit the custom close-quarters walls */}
      <pointLight position={[-4.8, -1.0, -3]} intensity={2.5} color="#ef4444" distance={6} />
      <pointLight position={[4.8, -1.0, -3]} intensity={2.5} color="#ef4444" distance={6} />

      <group position={[0, 0, 0]}>
        
        {/* MOVIE SCREEN PANEL */}
        <mesh position={[0, 0.5, -5]}>
          <planeGeometry args={[7.1, 4.0]} />
          <meshBasicMaterial map={texture} side={THREE.DoubleSide} toneMapped={false} />
        </mesh>

        {/* Outer Matte Bezel Screen Trim Frame */}
        <mesh position={[0, 0.5, -5.01]}>
          <planeGeometry args={[7.35, 4.25]} />
          <meshStandardMaterial color="#0c0c0f" roughness={0.8} metalness={0.2} />
        </mesh>

        {/* Polished Glossy Architectural Floor Plane */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, -1]}>
          <planeGeometry args={[12, 12]} />
          <meshStandardMaterial color="#06060a" roughness={0.15} metalness={0.7} />
        </mesh>

        {/* Ceiling */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 3.2, -1]}>
          <planeGeometry args={[12, 12]} />
          <meshStandardMaterial color="#040406" roughness={0.8} />
        </mesh>

        {/* Tight Stage Backdrop Wall */}
        <mesh position={[0, 0.7, -5.15]}>
          <planeGeometry args={[12, 6.5]} />
          <meshStandardMaterial color="#060609" roughness={0.6} metalness={0.2} />
        </mesh>

        {/* Left Studio Flanking Wall Panel */}
        <mesh position={[-5, 0.7, -1]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[12, 6.5]} />
          <meshStandardMaterial color="#050507" roughness={0.4} metalness={0.3} />
        </mesh>

        {/* Right Studio Flanking Wall Panel */}
        <mesh position={[5, 0.7, -1]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[12, 6.5]} />
          <meshStandardMaterial color="#050507" roughness={0.4} metalness={0.3} />
        </mesh>

      </group>
    </>
  );
}