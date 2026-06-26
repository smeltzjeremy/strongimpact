import React, { useEffect } from 'react';
import { useVideoTexture, Grid, Center } from '@react-three/drei';
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
      {/* HIGH-END METALLIC STUDIO LIGHTING */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
      
      {/* Intense Movie Screen Glow projecting crisp colors downwards */}
      <pointLight position={[0, 0.5, -4.5]} intensity={2.0} color="#e0f2fe" distance={10} />

      <group position={[0, 0, 0]}>
        
        {/* THE CORE SCREEN (Perfect, un-touched and brilliant) */}
        <mesh position={[0, 0.5, -5]}>
          <planeGeometry args={[7.1, 4.0]} />
          <meshStandardMaterial 
            map={texture} 
            emissive="#ffffff"
            emissiveMap={texture}
            emissiveIntensity={isPlaying ? 0.65 : 0.25}
            roughness={0.1}
            metalness={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Premium Chiseled Glossy Outer Frame */}
        <mesh position={[0, 0.5, -5.02]}>
          <planeGeometry args={[7.35, 4.25]} />
          <meshStandardMaterial color="#111827" roughness={0.2} metalness={0.8} />
        </mesh>

        {/* NEW GRAPHIC OVERLAY LAYER: Infinite Cyberpunk Architectural Floor Grid */}
        {/* This bypasses basic flat color meshes entirely to draw real interactive scale lines */}
        <group position={[0, -1.8, 0]}>
          <Grid
            renderOrder={-1}
            position={[0, -0.01, 0]}
            args={[30, 30]}
            cellSize={0.6}
            cellThickness={1}
            cellColor="#334155"
            sectionSize={3}
            sectionThickness={1.5}
            sectionColor="#1e293b"
            fadeDistance={25}
            infiniteGrid
          />
        </group>

        {/* Sleek Atmospheric Studio Horizon Enclosure */}
        <mesh position={[0, 2, -5.5]}>
          <planeGeometry args={[30, 15]} />
          <meshStandardMaterial color="#030712" roughness={0.9} />
        </mesh>

      </group>
    </>
  );
}