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

  // BRIGHTENED MATERIALS: Shifting away from black to visible grey/red tones
  const cushionMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#b91c1c", roughness: 0.5, metalness: 0.1 }), []); // Classic Red Velvet Seats
  const armrestMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#292524", roughness: 0.6 }), []);
  const curtainMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#450a0a", roughness: 0.6, metalness: 0.1 }), []); // Warm burgundy curtain columns
  const wallMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#334155", roughness: 0.6 }), []); // Slate grey to show lighting details

  return (
    <>
      {/* MASSIVE LIGHTING BOOST FOR VISIBILITY ASSESSMENT */}
      <ambientLight intensity={1.8} />
      <directionalLight position={[0, 8, 4]} intensity={2.5} color="#ffffff" />
      
      {/* Downward spotlights over the room features */}
      <pointLight position={[0, 2.5, -2]} intensity={5.0} color="#ffffff" distance={15} />
      <pointLight position={[-4.5, 0.5, -2.5]} intensity={6.0} color="#ff3333" distance={10} />
      <pointLight position={[4.5, 0.5, -2.5]} intensity={6.0} color="#ff3333" distance={10} />

      <group position={[0, 0, 0]}>
        
        {/* 1. MOVIE SCREEN & DEEP SCREEN GLOW ACCENT */}
        {/* Slightly raised screen position to clear floor geometry */}
        <mesh position={[0, 0.8, -5]}>
          <planeGeometry args={[7.1, 4.0]} />
          <meshBasicMaterial map={texture} side={THREE.DoubleSide} toneMapped={false} />
        </mesh>

        {/* Screen Frame Outer Bezel */}
        <mesh position={[0, 0.8, -5.02]}>
          <planeGeometry args={[7.35, 4.25]} />
          <meshStandardMaterial color="#1e293b" roughness={0.5} />
        </mesh>

        {/* 2. BASE PLATFORM ENVIRONMENT */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, -1]}>
          <planeGeometry args={[14, 14]} />
          <meshStandardMaterial color="#1e1b4b" roughness={0.4} metalness={0.2} />
        </mesh>

        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 3.2, -1]}>
          <planeGeometry args={[14, 14]} />
          <meshStandardMaterial color="#1e2937" roughness={0.7} />
        </mesh>

        {/* Stage Back Backdrop Wall Panel */}
        <mesh position={[0, 0.7, -5.15]}>
          <planeGeometry args={[14, 6.5]} />
          <primitive object={wallMaterial} attach="material" />
        </mesh>

        {/* 3. FLUTED VELVET SIDE WALL DRAPERIES */}
        {[-4, -2, 0, 2, 4].map((zOffset, index) => (
          <group key={`drapery-${index}`}>
            <mesh position={[-5.45, 0.7, zOffset]}>
              <boxGeometry args={[0.15, 6.5, 0.6]} />
              <primitive object={curtainMaterial} attach="material" />
            </mesh>
            <mesh position={[5.45, 0.7, zOffset]}>
              <boxGeometry args={[0.15, 6.5, 0.6]} />
              <primitive object={curtainMaterial} attach="material" />
            </mesh>
          </group>
        ))}

        {/* Base Structural Side Walls */}
        <mesh position={[-5.5, 0.7, -1]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[14, 6.5]} />
          <meshStandardMaterial color="#0f172a" roughness={0.7} />
        </mesh>
        <mesh position={[5.5, 0.7, -1]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[14, 6.5]} />
          <meshStandardMaterial color="#0f172a" roughness={0.7} />
        </mesh>

        {/* 4. REPOSITIONED SEATING ROWS (LOWERED & PUSHED BACK) */}
        {/* Row 1: Dropped down low and moved closer to the screen out of camera block range */}
        <group position={[0, -0.2, -3.2]}>
          {/* Main Lounge Base */}
          <mesh position={[0, -1.5, 0]}>
            <boxGeometry args={[6.6, 0.4, 1.0]} />
            <meshStandardMaterial color="#1e293b" roughness={0.5} />
          </mesh>
          {/* Main Lounge Backrest */}
          <mesh position={[0, -1.0, -0.4]}>
            <boxGeometry args={[6.6, 0.6, 0.2]} />
            <primitive object={cushionMaterial} attach="material" />
          </mesh>
          {/* Armrests */}
          {[-3.2, -1.6, 0, 1.6, 3.2].map((xOffset, i) => (
            <mesh key={`arm-r1-${i}`} position={[xOffset, -1.15, 0]}>
              <boxGeometry args={[0.18, 0.4, 0.8]} />
              <primitive object={armrestMaterial} attach="material" />
            </mesh>
          ))}
          {/* Cushions */}
          {[-2.4, -0.8, 0.8, 2.4].map((xOffset, i) => (
            <mesh key={`cushion-r1-${i}`} position={[xOffset, -1.28, 0]}>
              <boxGeometry args={[1.3, 0.1, 0.7]} />
              <primitive object={cushionMaterial} attach="material" />
            </mesh>
          ))}
        </group>

        {/* Row 2: Placed further back behind the camera default view to avoid lens blockages */}
        <group position={[0, 0.1, 1.5]}>
          {/* Elevated Step Base Platform */}
          <mesh position={[0, -1.65, 0]}>
            <boxGeometry args={[7.2, 0.3, 1.2]} />
            <meshStandardMaterial color="#0f172a" roughness={0.5} />
          </mesh>
          {/* Lounge Base Frame */}
          <mesh position={[0, -1.35, 0]}>
            <boxGeometry args={[6.6, 0.4, 1.0]} />
            <meshStandardMaterial color="#1e293b" roughness={0.5} />
          </mesh>
          {/* Lounge Backrest */}
          <mesh position={[0, -0.85, -0.4]}>
            <boxGeometry args={[6.6, 0.6, 0.2]} />
            <primitive object={cushionMaterial} attach="material" />
          </mesh>
          {/* Elevated Row Armrests */}
          {[-3.2, -1.6, 0, 1.6, 3.2].map((xOffset, i) => (
            <mesh key={`arm-r2-${i}`} position={[xOffset, -1.0, 0]}>
              <boxGeometry args={[0.18, 0.4, 0.8]} />
              <primitive object={armrestMaterial} attach="material" />
            </mesh>
          ))}
          {/* Elevated Row Cushions */}
          {[-2.4, -0.8, 0.8, 2.4].map((xOffset, i) => (
            <mesh key={`cushion-r2-${i}`} position={[xOffset, -1.13, 0]}>
              <boxGeometry args={[1.3, 0.1, 0.7]} />
              <primitive object={cushionMaterial} attach="material" />
            </mesh>
          ))}
        </group>

        {/* Grounding Luxury Side Trims */}
        <mesh position={[-5.4, -1.7, -1]}>
          <boxGeometry args={[0.1, 0.2, 14]} />
          <meshStandardMaterial color="#9a3412" roughness={0.3} />
        </mesh>
        <mesh position={[5.4, -1.7, -1]}>
          <boxGeometry args={[0.1, 0.2, 14]} />
          <meshStandardMaterial color="#9a3412" roughness={0.3} />
        </mesh>

      </group>
    </>
  );
}