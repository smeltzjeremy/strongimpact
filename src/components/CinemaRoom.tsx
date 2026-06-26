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
      {/* AMBIENT & LIGHTING DESIGN */}
      <ambientLight intensity={0.15} />
      {/* Subtle blue screen glow casting backwards into the room */}
      <directionalLight position={[0, 2, -4]} intensity={0.8} color="#7dd3fc" castShadow />
      {/* Overhead warm ceiling pot lights */}
      <pointLight position={[0, 4, 0]} intensity={1.2} color="#fde047" distance={10} />
      
      {/* Luxury Red Neon Side Aisle Glow Strips */}
      <pointLight position={[-7.8, -1.7, 0]} intensity={0.8} color="#ef4444" distance={8} />
      <pointLight position={[7.8, -1.7, 0]} intensity={0.8} color="#ef4444" distance={8} />

      <group position={[0, 0, 0]}>
        
        {/* 1. THE 3D MOVIE SCREEN */}
        <mesh position={[0, 0.5, -5]}>
          <planeGeometry args={[7.1, 4.0]} />
          <meshStandardMaterial 
            map={texture} 
            emissive="#ffffff"
            emissiveMap={texture}
            emissiveIntensity={isPlaying ? 0.35 : 0.1}
            roughness={0.3}
            metalness={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Thick Beveled Screen Frame */}
        <mesh position={[0, 0.5, -5.02]}>
          <boxGeometry args={[7.5, 4.4, 0.1]} />
          <meshStandardMaterial color="#09090b" roughness={0.85} />
        </mesh>


        {/* 2. THE FLOORS & CEILING (Enclosing the space) */}
        {/* Plush Theater Carpet Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, 0]}>
          <planeGeometry args={[16, 14]} />
          <meshStandardMaterial 
            color="#1e1b4b" // Deep luxurious midnight indigo/violet carpet base
            roughness={0.9} // Extremely rough matte to mimic heavy fabric/carpet fibers
            metalness={0.0} 
          />
        </mesh>

        {/* Acoustic Panelled Ceiling */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 4.5, 0]}>
          <planeGeometry args={[16, 14]} />
          <meshStandardMaterial color="#09090b" roughness={0.95} />
        </mesh>


        {/* 3. THE WALLS (With built-in decorative styling details) */}
        {/* Front Stage Wall Behind Screen */}
        <mesh position={[0, 1.35, -5.1]}>
          <planeGeometry args={[16, 6.5]} />
          <meshStandardMaterial color="#0c0a09" roughness={0.9} />
        </mesh>

        {/* Left Side Wall + Decorative Pillars */}
        <mesh rotation={[0, Math.PI / 2, 0]} position={[-8, 1.35, 0]}>
          <planeGeometry args={[14, 6.5]} />
          <meshStandardMaterial color="#1c1917" roughness={0.8} />
        </mesh>
        {/* Pillar A */}
        <mesh position={[-7.9, 1.35, -2]}>
          <boxGeometry args={[0.2, 6.5, 0.6]} />
          <meshStandardMaterial color="#0c0a09" roughness={0.7} />
        </mesh>
        {/* Pillar B */}
        <mesh position={[-7.9, 1.35, 2]}>
          <boxGeometry args={[0.2, 6.5, 0.6]} />
          <meshStandardMaterial color="#0c0a09" roughness={0.7} />
        </mesh>

        {/* Right Side Wall + Decorative Pillars */}
        <mesh rotation={[0, -Math.PI / 2, 0]} position={[8, 1.35, 0]}>
          <planeGeometry args={[14, 6.5]} />
          <meshStandardMaterial color="#1c1917" roughness={0.8} />
        </mesh>
        {/* Pillar A */}
        <mesh position={[7.9, 1.35, -2]}>
          <boxGeometry args={[0.2, 6.5, 0.6]} />
          <meshStandardMaterial color="#0c0a09" roughness={0.7} />
        </mesh>
        {/* Pillar B */}
        <mesh position={[7.9, 1.35, 2]}>
          <boxGeometry args={[0.2, 6.5, 0.6]} />
          <meshStandardMaterial color="#0c0a09" roughness={0.7} />
        </mesh>


        {/* 4. THEATER ROW SEATING (Stylized Plush Lounges) */}
        {/* Front Row Row Row - Center Seat */}
        <group position={[0, -1.8, 1.5]}>
          {/* Bottom Cushion */}
          <mesh position={[0, 0.25, 0]}>
            <boxGeometry args={[1.4, 0.4, 0.9]} />
            <meshStandardMaterial color="#7f1d1d" roughness={0.7} /> {/* Deep Crimson Red Velour */}
          </mesh>
          {/* Back Rest */}
          <mesh position={[0, 0.75, 0.4]}>
            <boxGeometry args={[1.4, 0.8, 0.2]} />
            <meshStandardMaterial color="#7f1d1d" roughness={0.7} />
          </mesh>
          {/* Armrest Left */}
          <mesh position={[-0.75, 0.4, 0]}>
            <boxGeometry args={[0.15, 0.5, 0.9]} />
            <meshStandardMaterial color="#450a0a" roughness={0.8} />
          </mesh>
          {/* Armrest Right */}
          <mesh position={[0.75, 0.4, 0]}>
            <boxGeometry args={[0.15, 0.5, 0.9]} />
            <meshStandardMaterial color="#450a0a" roughness={0.8} />
          </mesh>
        </group>

        {/* Front Row - Left Companion Seat */}
        <group position={[-2, -1.8, 1.5]}>
          <mesh position={[0, 0.25, 0]}><boxGeometry args={[1.4, 0.4, 0.9]} /><meshStandardMaterial color="#7f1d1d" roughness={0.7} /></mesh>
          <mesh position={[0, 0.75, 0.4]}><boxGeometry args={[1.4, 0.8, 0.2]} /><meshStandardMaterial color="#7f1d1d" roughness={0.7} /></mesh>
          <mesh position={[-0.75, 0.4, 0]}><boxGeometry args={[0.15, 0.5, 0.9]} /><meshStandardMaterial color="#450a0a" roughness={0.8} /></mesh>
          <mesh position={[0.75, 0.4, 0]}><boxGeometry args={[0.15, 0.5, 0.9]} /><meshStandardMaterial color="#450a0a" roughness={0.8} /></mesh>
        </group>

        {/* Front Row - Right Companion Seat */}
        <group position={[2, -1.8, 1.5]}>
          <mesh position={[0, 0.25, 0]}><boxGeometry args={[1.4, 0.4, 0.9]} /><meshStandardMaterial color="#7f1d1d" roughness={0.7} /></mesh>
          <mesh position={[0, 0.75, 0.4]}><boxGeometry args={[1.4, 0.8, 0.2]} /><meshStandardMaterial color="#7f1d1d" roughness={0.7} /></mesh>
          <mesh position={[-0.75, 0.4, 0]}><boxGeometry args={[0.15, 0.5, 0.9]} /><meshStandardMaterial color="#450a0a" roughness={0.8} /></mesh>
          <mesh position={[0.75, 0.4, 0]}><boxGeometry args={[0.15, 0.5, 0.9]} /><meshStandardMaterial color="#450a0a" roughness={0.8} /></mesh>
        </group>

      </group>
    </>
  );
}