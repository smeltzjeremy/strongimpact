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
      {/* HIGH-END AMBIENT LIGHT SYSTEM */}
      <ambientLight intensity={0.05} />
      
      {/* Dynamic Screen Glow - projects the color of the movie onto the room floor/ceiling */}
      <directionalLight position={[0, 2, -4]} intensity={1.2} color="#7dd3fc" />
      
      {/* Mood Accent Lighting: Soft Luxury Deep Indigo Wall Washes */}
      <pointLight position={[-6, -1, -3]} intensity={1.5} color="#312e81" distance={10} />
      <pointLight position={[6, -1, -3]} intensity={1.5} color="#312e81" distance={10} />
      
      {/* Soft Overhead Downlight for Room Scale */}
      <pointLight position={[0, 4, 2]} intensity={0.6} color="#ffffff" distance={12} />

      <group position={[0, 0, 0]}>
        
        {/* 1. THE 3D MAIN SCREEN SURFACE MESH */}
        <mesh position={[0, 0.5, -5]}>
          <planeGeometry args={[7.1, 4.0]} />
          <meshStandardMaterial 
            map={texture} 
            emissive="#ffffff"
            emissiveMap={texture}
            emissiveIntensity={isPlaying ? 0.4 : 0.15}
            roughness={0.2}
            metalness={0.0}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Floating Widescreen Matte-Black Bezel */}
        <mesh position={[0, 0.5, -5.05]}>
          <planeGeometry args={[7.3, 4.2]} />
          <meshStandardMaterial color="#09090b" roughness={0.9} metalness={0.1} />
        </mesh>


        {/* 2. THE PREMIUM SURFACE FLOORS & CEILING */}
        {/* Ultra-Matte Luxury Midnight Velvet Carpet Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, 0]}>
          <planeGeometry args={[20, 16]} />
          <meshStandardMaterial 
            color="#0b0f19" // Elite Midnight Obsidian-Blue Tint
            roughness={0.95} // Extreme matte surface scattering to absorb harsh glares
            metalness={0.0} 
          />
        </mesh>

        {/* Clean Architectural Lounge Ceiling */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 4.0, 0]}>
          <planeGeometry args={[20, 16]} />
          <meshStandardMaterial color="#050507" roughness={0.85} />
        </mesh>


        {/* 3. WALL ENCLOSURES (Sleek Studio Finish) */}
        {/* Front Stage Wall Drop */}
        <mesh position={[0, 1.1, -5.2]}>
          <planeGeometry args={[20, 6.5]} />
          <meshStandardMaterial color="#030303" roughness={0.9} />
        </mesh>

        {/* Left Perimeter Ambient Wall */}
        <mesh rotation={[0, Math.PI / 2, 0]} position={[-7.5, 1.1, 0]}>
          <planeGeometry args={[16, 6.5]} />
          <meshStandardMaterial color="#07070a" roughness={0.8} />
        </mesh>

        {/* Right Perimeter Ambient Wall */}
        <mesh rotation={[0, -Math.PI / 2, 0]} position={[7.5, 1.1, 0]}>
          <planeGeometry args={[16, 6.5]} />
          <meshStandardMaterial color="#07070a" roughness={0.8} />
        </mesh>

      </group>
    </>
  );
}