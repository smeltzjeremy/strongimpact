import React, { useEffect, useMemo } from 'react';
import { useVideoTexture, RoundedBox } from '@react-three/drei';
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

  // LUXURY FABRIC MATRICES
  const luxuryCouchVelvet = useMemo(() => new THREE.MeshStandardMaterial({ color: "#4c0519", roughness: 0.7, metalness: 0.0 }), []); // Rich Rosewood Burgundy Velvet
  const sleekConsoleMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#1c1917", roughness: 0.35, metalness: 0.3 }), []); // Polished Premium Trim Console
  const customWallMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#1e293b", roughness: 0.75 }), []); // Matte Slate Wall Panels
  const curtainMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#2d0612", roughness: 0.8 }), []);

  return (
    <>
      {/* PERFECT ILLUMINATION SETTINGS FOR THEATER VISIBILITY */}
      <ambientLight intensity={1.5} />
      <directionalLight position={[0, 6, 2]} intensity={2.2} color="#ffffff" />
      
      {/* Floor pathway light runners to ground your custom structures */}
      <pointLight position={[-4.5, -0.2, -2.5]} intensity={4.5} color="#ef4444" distance={8} />
      <pointLight position={[4.5, -0.2, -2.5]} intensity={4.5} color="#ef4444" distance={8} />

      <group position={[0, 0, 0]}>
        
        {/* 1. ELEVATED VIDEO SURFACE MESH CONTAINER */}
        <mesh position={[0, 1.0, -5]}>
          <planeGeometry args={[7.1, 4.0]} />
          <meshBasicMaterial map={texture} side={THREE.DoubleSide} toneMapped={false} />
        </mesh>

        {/* Outer Frame Bezel - Staggered back to prevent clipping tracks */}
        <mesh position={[0, 1.0, -5.02]}>
          <planeGeometry args={[7.35, 4.25]} />
          <meshStandardMaterial color="#0f172a" roughness={0.6} />
        </mesh>

        {/* 2. BASE INTERIOR SURFACE GRID PLATFORMS */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, -1]}>
          <planeGeometry args={[14, 14]} />
          <meshStandardMaterial color="#0f0e17" roughness={0.5} metalness={0.1} />
        </mesh>

        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 3.2, -1]}>
          <planeGeometry args={[14, 14]} />
          <meshStandardMaterial color="#111827" roughness={0.8} />
        </mesh>

        {/* Stage Main Backrest Wall Panel */}
        <mesh position={[0, 0.7, -5.15]}>
          <planeGeometry args={[14, 6.5]} />
          <primitive object={customWallMaterial} attach="material" />
        </mesh>

        {/* 3. VERTICAL ACOUSTIC THEATER WALL PANEL SEPARATIONS */}
        {[-4, -2, 0, 2, 4].map((zOffset, index) => (
          <group key={`flute-${index}`}>
            <mesh position={[-5.45, 0.7, zOffset]}>
              <boxGeometry args={[0.12, 6.5, 0.5]} />
              <primitive object={curtainMaterial} attach="material" />
            </mesh>
            <mesh position={[5.45, 0.7, zOffset]}>
              <boxGeometry args={[0.12, 6.5, 0.5]} />
              <primitive object={curtainMaterial} attach="material" />
            </mesh>
          </group>
        ))}

        {/* 4. CURVED FURNITURE ENGINEERING (Sleek, Proportional, Faced Correctly) */}
        {/* VIP Lounge Row 1 Setup: Lowered to Y=-0.4 to prevent screen overlaps completely */}
        <group position={[0, -0.4, -2.4]}>
          
          {/* Main Seating Platform Base Frame with smooth edge curvature */}
          <RoundedBox 
            args={[6.4, 0.15, 0.9]} 
            radius={0.03} // Curve radius parameter smoothing out sharp edges
            smoothness={4} // Vertices segment resolution mapping
            position={[0, -1.35, 0]}
          >
            <primitive object={sleekConsoleMaterial} attach="material" />
          </RoundedBox>
          
          {/* CURVED REAR BACKREST: Shifted to front (+Z) to face the screen correctly */}
          <RoundedBox 
            args={[6.4, 0.6, 0.12]} 
            radius={0.05} // Thick luxurious corner edge smoothing curves
            smoothness={5}
            position={[0, -0.9, 0.4]}
          >
            <primitive object={luxuryCouchVelvet} attach="material" />
          </RoundedBox>

          {/* INDIVIDUAL SMOOTH COUCH SEAT CUSHIONS */}
          {[-2.3, -0.77, 0.77, 2.3].map((xOffset, i) => (
            <RoundedBox 
              key={`curved-cush-${i}`} 
              args={[1.4, 0.12, 0.75]} 
              radius={0.04} // Gives cushions a plush, curved texture profile
              smoothness={4}
              position={[xOffset, -1.22, 0.02]}
            >
              <primitive object={luxuryCouchVelvet} attach="material" />
            </RoundedBox>
          ))}

          {/* HIGH-END RAZOR CONSOLE ARMRESTS: Reduced thickness to 0.08 with beveled curves */}
          {[-3.15, -1.55, 0, 1.55, 3.15].map((xOffset, i) => (
            <RoundedBox 
              key={`curved-arm-${i}`} 
              args={[0.08, 0.35, 0.8]} 
              radius={0.02} // Gives armrest dividers smooth luxury trim profiles
              smoothness={4}
              position={[xOffset, -1.1, 0.05]}
            >
              <primitive object={sleekConsoleMaterial} attach="material" />
            </RoundedBox>
          ))}

        </group>

        {/* Luxury Room Base Trim Runners */}
        <mesh position={[-5.4, -1.7, -1]}>
          <boxGeometry args={[0.08, 0.15, 14]} />
          <meshStandardMaterial color="#451a03" roughness={0.4} />
        </mesh>
        <mesh position={[5.4, -1.7, -1]}>
          <boxGeometry args={[0.08, 0.15, 14]} />
          <meshStandardMaterial color="#451a03" roughness={0.4} />
        </mesh>

      </group>
    </>
  );
}