import React, { useEffect } from 'react';
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
      {/* HIGH-VISIBILITY ENVIRONMENT LIGHTING */}
      <ambientLight intensity={1.4} />
      <directionalLight position={[0, 6, 3]} intensity={1.8} color="#ffffff" />
      
      {/* Red accent spots angled directly down the curtain folds */}
      <pointLight position={[-4.0, 0.5, -2.5]} intensity={5.0} color="#ff3333" distance={10} />
      <pointLight position={[4.0, 0.5, -2.5]} intensity={5.0} color="#ff3333" distance={10} />

      <group position={[0, 0, 0]}>
        
        {/* 1. MOVIE SCREEN & FRAME BEZEL */}
        <mesh position={[0, 1.0, -5]}>
          <planeGeometry args={[7.1, 4.0]} />
          <meshBasicMaterial map={texture} side={THREE.DoubleSide} toneMapped={false} />
        </mesh>

        <mesh position={[0, 1.0, -5.02]}>
          <planeGeometry args={[7.35, 4.25]} />
          <meshStandardMaterial color="#0f172a" roughness={0.6} />
        </mesh>

        {/* 2. ENV PLATFORMS */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, -1]}>
          <planeGeometry args={[14, 14]} />
          <meshStandardMaterial color="#0f0e17" roughness={0.5} metalness={0.1} />
        </mesh>

        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 3.2, -1]}>
          <planeGeometry args={[14, 14]} />
          <meshStandardMaterial color="#111827" roughness={0.8} />
        </mesh>

        <mesh position={[0, 0.7, -5.15]}>
          <planeGeometry args={[14, 6.5]} />
          <meshStandardMaterial color="#1e293b" roughness={0.75} />
        </mesh>

        {/* 3. OPTIMIZED HIGH-PERFORMANCE VELVET CURTAINS */}
        {/* Lowered cylinder resolution definitions to instantly fix rendering lags */}
        {Array.from({ length: 45 }).map((_, i) => {
          const zPos = -4.5 + i * 0.2; 
          const waveOffset = Math.sin(i * 1.4) * 0.12; 
          return (
            <group key={`theater-curtain-folds-${i}`}>
              {/* Left Wing Drapery */}
              <mesh position={[-4.4 + waveOffset, 0.7, zPos]}>
                <cylinderGeometry args={[0.1, 0.1, 6.5, 5]} />
                <meshStandardMaterial color="#310512" roughness={0.85} metalness={0.0} />
              </mesh>
              {/* Right Wing Drapery */}
              <mesh position={[4.4 - waveOffset, 0.7, zPos]}>
                <cylinderGeometry args={[0.1, 0.1, 6.5, 5]} />
                <meshStandardMaterial color="#310512" roughness={0.85} metalness={0.0} />
              </mesh>
            </group>
          );
        })}

        {/* Outer Boundary Shell Walls */}
        <mesh position={[-5.5, 0.7, -1]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[14, 6.5]} />
          <meshStandardMaterial color="#0f172a" roughness={0.7} />
        </mesh>
        <mesh position={[5.5, 0.7, -1]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[14, 6.5]} />
          <meshStandardMaterial color="#0f172a" roughness={0.7} />
        </mesh>

        {/* 4. SEATING ARCHITECTURE */}
        <group position={[0, -0.4, -2.4]}>
          
          <RoundedBox args={[6.4, 0.15, 0.9]} radius={0.03} smoothness={3} position={[0, -1.35, 0]}>
            <meshStandardMaterial color="#1c1917" roughness={0.35} metalness={0.3} />
          </RoundedBox>
          
          <RoundedBox args={[6.4, 0.6, 0.12]} radius={0.05} smoothness={3} position={[0, -0.9, 0.4]}>
            <meshStandardMaterial color="#4c0519" roughness={0.7} metalness={0.0} />
          </RoundedBox>

          {[-2.3, -0.77, 0.77, 2.3].map((xOffset, i) => (
            <RoundedBox key={`cush-${i}`} args={[1.4, 0.12, 0.75]} radius={0.04} smoothness={3} position={[xOffset, -1.22, 0.02]}>
              <meshStandardMaterial color="#4c0519" roughness={0.7} metalness={0.0} />
            </RoundedBox>
          ))}

          {[-3.15, -1.55, 0, 1.55, 3.15].map((xOffset, i) => (
            <RoundedBox key={`arm-${i}`} args={[0.08, 0.35, 0.8]} radius={0.02} smoothness={3} position={[xOffset, -1.1, 0.05]}>
              <meshStandardMaterial color="#1c1917" roughness={0.35} metalness={0.3} />
            </RoundedBox>
          ))}

        </group>

        {/* Base Side Wood Trims */}
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