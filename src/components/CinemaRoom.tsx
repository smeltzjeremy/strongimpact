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
      {/* RICH MODERN STUDIO LIGHTING */}
      <ambientLight intensity={0.3} />
      
      {/* High-vibrancy movie screen wash projecting downwards */}
      <pointLight position={[0, -1, -3.5]} intensity={2.5} color="#cbd5e1" distance={12} />
      
      {/* Soft warm overhead architectural mood lighting */}
      <pointLight position={[0, 3.5, 2]} intensity={1.5} color="#fef08a" distance={15} />

      <group position={[0, 0, 0]}>
        
        {/* 1. THE 3D MOVIE SCREEN SURFACE */}
        <mesh position={[0, 0.5, -5]}>
          <planeGeometry args={[7.1, 4.0]} />
          <meshStandardMaterial 
            map={texture} 
            emissive="#ffffff"
            emissiveMap={texture}
            emissiveIntensity={isPlaying ? 0.65 : 0.25}
            roughness={0.2}
            metalness={0.0}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Brushed Charcoal Aluminum Widescreen Frame */}
        <mesh position={[0, 0.5, -5.02]}>
          <boxGeometry args={[7.4, 4.3, 0.05]} />
          <meshStandardMaterial color="#1f2937" roughness={0.4} metalness={0.6} />
        </mesh>


        {/* 2. REAL STRUCTURAL FLOORING (Replacing the Tron Lines) */}
        {/* We are generating an array of physical geometric plates to create a luxury tiled floor layout */}
        <group position={[0, -1.8, 0]}>
          {/* Main Solid Floor Base Plate */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
            <planeGeometry args={[24, 20]} />
            <meshStandardMaterial color="#0f172a" roughness={0.85} metalness={0.1} />
          </mesh>

          {/* Individual Architectural Tile Dividers to catch reflections and shadows */}
          {[-8, -4, 0, 4, 8].map((x, i) => (
            <mesh key={`v-${i}`} position={[x, 0, 0]} rotation={[0, 0, 0]}>
              <boxGeometry args={[0.04, 0.02, 20]} />
              <meshStandardMaterial color="#020617" roughness={0.9} />
            </mesh>
          ))}
          {[-6, -3, 0, 3, 6, 9].map((z, i) => (
            <mesh key={`h-${i}`} position={[0, 0, z]} rotation={[0, 0, 0]}>
              <boxGeometry args={[24, 0.02, 0.04]} />
              <meshStandardMaterial color="#020617" roughness={0.9} />
            </mesh>
          ))}
        </group>


        {/* 3. SOLID ENCLOSING WALL BACKDROP */}
        {/* Large premium acoustic background wall panel plate */}
        <mesh position={[0, 1.2, -5.3]}>
          <boxGeometry args={[24, 7, 0.1]} />
          <meshStandardMaterial color="#09090b" roughness={0.9} />
        </mesh>

        {/* Deep Left Perimeter Wall shadow blocker */}
        <mesh position={[-10, 1.2, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[20, 7]} />
          <meshStandardMaterial color="#040405" roughness={0.95} />
        </mesh>

        {/* Deep Right Perimeter Wall shadow blocker */}
        <mesh position={[10, 1.2, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[20, 7]} />
          <meshStandardMaterial color="#040405" roughness={0.95} />
        </mesh>

      </group>
    </>
  );
}