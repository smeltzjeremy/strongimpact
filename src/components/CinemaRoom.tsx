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

  // HARDWARE EVENT LISTENER: Seamless loop logic
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
      {/* PERMANENT SHOWCASE LIGHTING: High visibility across the entire room */}
      <ambientLight intensity={1.4} />
      <directionalLight position={[0, 6, 3]} intensity={1.8} color="#ffffff" />
      
      {/* Downward stage spotlights over the screen and curtains */}
      <pointLight position={[0, 2.5, -2]} intensity={4.0} color="#ffffff" distance={15} />
      <pointLight position={[-4.0, 0.5, -2.5]} intensity={5.0} color="#ff4444" distance={10} />
      <pointLight position={[4.0, 0.5, -2.5]} intensity={5.0} color="#ff4444" distance={10} />

      <group position={[0, 0, 0]}>
        
        {/* 1. THE CORE MOVIE SCREEN */}
        <mesh position={[0, 0.6, -5]}>
          <planeGeometry args={[7.1, 4.0]} />
          <meshBasicMaterial map={texture} side={THREE.DoubleSide} toneMapped={false} />
        </mesh>

        {/* Premium Dark Bezel Frame */}
        <mesh position={[0, 0.6, -5.01]}>
          <planeGeometry args={[7.35, 4.25]} />
          <meshStandardMaterial color="#1e293b" roughness={0.5} />
        </mesh>

        {/* 2. BASE ENVIRONMENT PLATFORMS */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, -1]}>
          <planeGeometry args={[14, 14]} />
          <meshStandardMaterial color="#1e1b4b" roughness={0.4} metalness={0.2} />
        </mesh>

        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 3.2, -1]}>
          <planeGeometry args={[14, 14]} />
          <meshStandardMaterial color="#1e2937" roughness={0.7} />
        </mesh>

        {/* Slate Grey Backdrop Stage Wall */}
        <mesh position={[0, 0.7, -5.15]}>
          <planeGeometry args={[14, 6.5]} />
          <meshStandardMaterial color="#334155" roughness={0.6} />
        </mesh>

        {/* 3. FLOWING VELVET SIDE WALL DRAPERIES - Moved inward to frame the screen closely */}
        {/* Left Side Curtain Assembly */}
        <group position={[-4.3, 0.7, -1]}>
          {[-4.5, -3.5, -2.5, -1.5, -0.5, 0.5, 1.5, 2.5].map((zOffset, index) => (
            <mesh key={`left-curtain-${index}`} position={[Math.sin(index * 2) * 0.08, 0, zOffset]}>
              <cylinderGeometry args={[0.22, 0.22, 6.5, 16]} />
              <meshStandardMaterial color="#450a0a" roughness={0.6} metalness={0.1} />
            </mesh>
          ))}
        </group>

        {/* Right Side Curtain Assembly */}
        <group position={[4.3, 0.7, -1]}>
          {[-4.5, -3.5, -2.5, -1.5, -0.5, 0.5, 1.5, 2.5].map((zOffset, index) => (
            <mesh key={`right-curtain-${index}`} position={[Math.sin(index * 2) * 0.08, 0, zOffset]}>
              <cylinderGeometry args={[0.22, 0.22, 6.5, 16]} />
              <meshStandardMaterial color="#450a0a" roughness={0.6} metalness={0.1} />
            </mesh>
          ))}
        </group>

        {/* Structural Boundary Side Walls */}
        <mesh position={[-5.5, 0.7, -1]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[14, 6.5]} />
          <meshStandardMaterial color="#0f172a" roughness={0.7} />
        </mesh>
        <mesh position={[5.5, 0.7, -1]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[14, 6.5]} />
          <meshStandardMaterial color="#0f172a" roughness={0.7} />
        </mesh>

        {/* Grounding Trim Runners */}
        <mesh position={[-5.4, -1.7, -1]}>
          <boxGeometry args={[0.08, 0.15, 14]} />
          <meshStandardMaterial color="#9a3412" roughness={0.3} />
        </mesh>
        <mesh position={[5.4, -1.7, -1]}>
          <boxGeometry args={[0.08, 0.15, 14]} />
          <meshStandardMaterial color="#9a3412" roughness={0.3} />
        </mesh>

      </group>
    </>
  );
}