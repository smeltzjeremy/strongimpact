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

  // HARDWARE EVENT LISTENER: Forces video to loop seamlessly even if browser state chokes
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

        // Explicitly force a hard restart if the stream hits the end frame
        const handleVideoEnd = () => {
          video.currentTime = 0;
          video.play().catch(err => console.log("Loop restart wait:", err));
        };

        video.addEventListener('ended', handleVideoEnd);
        return () => {
          video.removeEventListener('ended', handleVideoEnd);
        };
      }
    }
  }, [texture, isPlaying, isMuted]);

  return (
    <>
      {/* RICH CINEMATIC STUDIO LIGHTING */}
      <ambientLight intensity={0.15} />
      
      {/* Soft mathematical light gradient projecting onto the backdrop wall */}
      <pointLight position={[0, 0.5, -4.9]} intensity={3.5} color="#cbd5e1" distance={8} decay={2} />
      
      {/* Crimson lights repositioned to catch the peaks of the flowing curtains */}
      <pointLight position={[-4.8, -1.0, -2.5]} intensity={4.5} color="#ef4444" distance={7} />
      <pointLight position={[4.8, -1.0, -2.5]} intensity={4.5} color="#ef4444" distance={7} />

      <group position={[0, 0, 0]}>
        
        {/* 1. THE CORE MOVIE SCREEN */}
        <mesh position={[0, 0.5, -5]}>
          <planeGeometry args={[7.1, 4.0]} />
          <meshBasicMaterial map={texture} side={THREE.DoubleSide} toneMapped={false} />
        </mesh>

        {/* Premium Dark Bezel Frame */}
        <mesh position={[0, 0.5, -5.01]}>
          <planeGeometry args={[7.35, 4.25]} />
          <meshStandardMaterial color="#0c0c0f" roughness={0.8} metalness={0.2} />
        </mesh>

        {/* 2. GLOSSY ARCHITECTURAL FLOORS & CEILING */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, -1]}>
          <planeGeometry args={[12, 12]} />
          <meshStandardMaterial color="#06060a" roughness={0.15} metalness={0.7} />
        </mesh>

        {/* Matte Ceiling */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 3.2, -1]}>
          <planeGeometry args={[12, 12]} />
          <meshStandardMaterial color="#040406" roughness={0.8} />
        </mesh>

        {/* 3. COZY THEATER WALL CLOSURES */}
        {/* Backdrop Wall: Receives the soft screen ambient pointLight glow */}
        <mesh position={[0, 0.7, -5.15]}>
          <planeGeometry args={[12, 6.5]} />
          <meshStandardMaterial color="#060609" roughness={0.6} metalness={0.2} />
        </mesh>

        {/* FLOWING VELVET SIDE WALL DRAPERIES */}
        {/* Left Side Curtain Assembly using continuous mathematical sine folds */}
        <group position={[-5.0, 0.7, -1]}>
          {[-4.5, -3.5, -2.5, -1.5, -0.5, 0.5, 1.5, 2.5].map((zOffset, index) => (
            <mesh key={`left-curtain-${index}`} position={[Math.sin(index * 2) * 0.08, 0, zOffset]}>
              <cylinderGeometry args={[0.22, 0.22, 6.5, 16]} />
              <meshStandardMaterial color="#22030a" roughness={0.7} metalness={0.0} />
            </mesh>
          ))}
        </group>

        {/* Right Side Curtain Assembly using continuous mathematical sine folds */}
        <group position={[5.0, 0.7, -1]}>
          {[-4.5, -3.5, -2.5, -1.5, -0.5, 0.5, 1.5, 2.5].map((zOffset, index) => (
            <mesh key={`right-curtain-${index}`} position={[Math.sin(index * 2) * 0.08, 0, zOffset]}>
              <cylinderGeometry args={[0.22, 0.22, 6.5, 16]} />
              <meshStandardMaterial color="#22030a" roughness={0.7} metalness={0.0} />
            </mesh>
          ))}
        </group>

        {/* Base Structural Side Walls behind the drapes */}
        <mesh position={[-5.2, 0.7, -1]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[12, 6.5]} />
          <meshStandardMaterial color="#040406" roughness={0.8} />
        </mesh>
        <mesh position={[5.2, 0.7, -1]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[12, 6.5]} />
          <meshStandardMaterial color="#040406" roughness={0.8} />
        </mesh>

      </group>
    </>
  );
}