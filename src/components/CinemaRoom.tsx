import React, { useEffect, useMemo } from 'react';
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

  // ATMOSPHERIC DYNAMIC GLOW MATERIAL
  const reactiveGlowMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#ffffff",
    emissive: new THREE.Color("#ffffff"),
    emissiveMap: texture,
    emissiveIntensity: 2.2, 
    transparent: true,
    opacity: 0.35,
  }), [texture]);

  // Premium Custom Materials for Classic Theater Look
  const cushionMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#1c1917", roughness: 0.6, metalness: 0.1 }), []);
  const armrestMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#0c0a09", roughness: 0.8 }), []);
  const curtainMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#181414", roughness: 0.7, metalness: 0.0 }), []);

  return (
    <>
      {/* BRIGHTNESS BOOST: Raised baseline illumination so features stand out clearly */}
      <ambientLight intensity={0.55} />
      <directionalLight position={[0, 6, 2]} intensity={1.2} color="#cbd5e1" />
      
      {/* Backlight halo glow projection intensity tracking */}
      <pointLight position={[0, 1.2, -4.8]} intensity={4.0} color="#cbd5e1" distance={12} />
      
      {/* Crimson accent point lights */}
      <pointLight position={[-5.0, -1.0, -2.5]} intensity={4.5} color="#ef4444" distance={9} />
      <pointLight position={[5.0, -1.0, -2.5]} intensity={4.5} color="#ef4444" distance={9} />

      <group position={[0, 0, 0]}>
        
        {/* 1. MOVIE SCREEN & DEEP SCREEN GLOW ACCENT */}
        <mesh position={[0, 0.5, -5]}>
          <planeGeometry args={[7.1, 4.0]} />
          <meshBasicMaterial map={texture} side={THREE.DoubleSide} toneMapped={false} />
        </mesh>

        {/* Dynamic Halo Glow Layer Backing Panel */}
        <mesh position={[0, 0.5, -5.08]}>
          <planeGeometry args={[9.5, 5.5]} />
          <primitive object={reactiveGlowMaterial} attach="material" />
        </mesh>

        {/* Screen Frame Outer Bezel */}
        <mesh position={[0, 0.5, -5.02]}>
          <planeGeometry args={[7.35, 4.25]} />
          <meshStandardMaterial color="#09090b" roughness={0.9} />
        </mesh>

        {/* 2. BASE PLATFORM ENVIRONMENT */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, -1]}>
          <planeGeometry args={[14, 14]} />
          <meshStandardMaterial color="#0b0914" roughness={0.35} metalness={0.3} />
        </mesh>

        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 3.2, -1]}>
          <planeGeometry args={[14, 14]} />
          <meshStandardMaterial color="#090d16" roughness={0.8} />
        </mesh>

        {/* Stage Back Backdrop Wall Panel */}
        <mesh position={[0, 0.7, -5.15]}>
          <planeGeometry args={[14, 6.5]} />
          <meshStandardMaterial color="#0f172a" roughness={0.6} />
        </mesh>

        {/* 3. FLUTED VELVET SIDE WALL DRAPERIES */}
        {[-4, -2, 0, 2, 4].map((zOffset, index) => (
          <group key={`drapery-${index}`}>
            {/* Left Column Flute */}
            <mesh position={[-5.45, 0.7, zOffset]}>
              <boxGeometry args={[0.15, 6.5, 0.6]} />
              <primitive object={curtainMaterial} attach="material" />
            </mesh>
            {/* Right Column Flute */}
            <mesh position={[5.45, 0.7, zOffset]}>
              <boxGeometry args={[0.15, 6.5, 0.6]} />
              <primitive object={curtainMaterial} attach="material" />
            </mesh>
          </group>
        ))}

        {/* Base Structural Side Walls behind the flutes */}
        <mesh position={[-5.5, 0.7, -1]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[14, 6.5]} />
          <meshStandardMaterial color="#09090d" roughness={0.8} />
        </mesh>
        <mesh position={[5.5, 0.7, -1]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[14, 6.5]} />
          <meshStandardMaterial color="#09090d" roughness={0.8} />
        </mesh>

        {/* 4. MULTI-TIER LUXURY SEATING ROWS & ARMRESTS */}
        {/* Row 1: Low Foreground Tier Seating Profile */}
        <group position={[0, 0, 0]}>
          {/* Main Lounge Base */}
          <mesh position={[0, -1.5, -1.5]}>
            <boxGeometry args={[6.6, 0.5, 1.2]} />
            <meshStandardMaterial color="#1c1917" roughness={0.5} />
          </mesh>
          {/* Main Lounge Backrest */}
          <mesh position={[0, -0.95, -2.0]}>
            <boxGeometry args={[6.6, 0.8, 0.2]} />
            <meshStandardMaterial color="#141211" roughness={0.6} />
          </mesh>
          {/* Procedural Armrests */}
          {[-3.2, -1.6, 0, 1.6, 3.2].map((xOffset, i) => (
            <mesh key={`arm-r1-${i}`} position={[xOffset, -1.15, -1.4]}>
              <boxGeometry args={[0.18, 0.45, 1.0]} />
              <primitive object={armrestMaterial} attach="material" />
            </mesh>
          ))}
          {/* Staggered seat cushion divisions */}
          {[-2.4, -0.8, 0.8, 2.4].map((xOffset, i) => (
            <mesh key={`cushion-r1-${i}`} position={[xOffset, -1.22, -1.4]}>
              <boxGeometry args={[1.3, 0.1, 0.9]} />
              <primitive object={cushionMaterial} attach="material" />
            </mesh>
          ))}
        </group>

        {/* Row 2: Elevated Stadium Tier Seating Profile - Pushed back safely to clear camera lens path */}
        <group position={[0, 0.35, 3.5]}>
          {/* Elevated Step Base Platform */}
          <mesh position={[0, -1.65, -1.5]}>
            <boxGeometry args={[7.2, 0.4, 1.5]} />
            <meshStandardMaterial color="#0c0a0f" roughness={0.4} />
          </mesh>
          {/* Lounge Base Frame */}
          <mesh position={[0, -1.35, -1.5]}>
            <boxGeometry args={[6.6, 0.5, 1.2]} />
            <meshStandardMaterial color="#1c1917" roughness={0.5} />
          </mesh>
          {/* Lounge Backrest */}
          <mesh position={[0, -0.8, -2.0]}>
            <boxGeometry args={[6.6, 0.8, 0.2]} />
            <meshStandardMaterial color="#141211" roughness={0.6} />
          </mesh>
          {/* Elevated Row Armrests */}
          {[-3.2, -1.6, 0, 1.6, 3.2].map((xOffset, i) => (
            <mesh key={`arm-r2-${i}`} position={[xOffset, -1.0, -1.4]}>
              <boxGeometry args={[0.18, 0.45, 1.0]} />
              <primitive object={armrestMaterial} attach="material" />
            </mesh>
          ))}
          {/* Elevated Row Cushions */}
          {[-2.4, -0.8, 0.8, 2.4].map((xOffset, i) => (
            <mesh key={`cushion-r2-${i}`} position={[xOffset, -1.07, -1.4]}>
              <boxGeometry args={[1.3, 0.1, 0.9]} />
              <primitive object={cushionMaterial} attach="material" />
            </mesh>
          ))}
        </group>

        {/* Grounding Luxury Side Trims */}
        <mesh position={[-5.4, -1.7, -1]}>
          <boxGeometry args={[0.1, 0.2, 14]} />
          <meshStandardMaterial color="#572507" roughness={0.3} />
        </mesh>
        <mesh position={[5.4, -1.7, -1]}>
          <boxGeometry args={[0.1, 0.2, 14]} />
          <meshStandardMaterial color="#572507" roughness={0.3} />
        </mesh>

      </group>
    </>
  );
}