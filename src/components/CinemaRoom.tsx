import React, { useEffect } from 'react';
import { useVideoTexture } from '@react-three/drei';
import * as THREE from 'three';

interface CinemaRoomProps {
  videoUrl: string;
  isPlaying: boolean;
}

export default function CinemaRoom({ videoUrl, isPlaying }: CinemaRoomProps) {
  
  const videoTexture = useVideoTexture(videoUrl, {
    unsuspend: 'canplay',
    crossOrigin: 'anonymous',
    loop: false,
    muted: true,
    playsInline: true,
    start: false
  });

  videoTexture.colorSpace = THREE.SRGBColorSpace;

  useEffect(() => {
    const videoEl = videoTexture.image as HTMLVideoElement;
    if (!videoEl) return;

    // Attach class target for standard 2D fullscreen handlers to identify
    videoEl.classList.add('r3f-video-source');

    if (isPlaying) {
      videoEl.muted = false; 
      videoEl.play().catch(err => {
        console.warn("Audio permissions locked, playing muted fallback:", err);
        videoEl.muted = true;
        videoEl.play();
      });
    } else {
      videoEl.pause();
    }
  }, [isPlaying, videoTexture]);

  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight position={[0, 4, -2]} intensity={isPlaying ? 1.8 : 0.2} color="#b0c0ff" />
      <pointLight position={[-5, -1.8, -1]} intensity={0.6} color="#ef4444" distance={8} />
      <pointLight position={[5, -1.8, -1]} intensity={0.6} color="#ef4444" distance={8} />

      <group position={[0, 0, 0]}>
        <mesh position={[0, 0.5, -5]}>
          <planeGeometry args={[7.1, 4.0]} />
          <meshStandardMaterial 
            map={videoTexture} 
            emissive={isPlaying ? '#ffffff' : '#0a0a10'}
            emissiveMap={videoTexture}
            emissiveIntensity={isPlaying ? 0.45 : 0.05}
            roughness={0.3}
            metalness={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>

        <mesh position={[0, 0.5, -5.02]}>
          <planeGeometry args={[7.4, 4.3]} />
          <meshStandardMaterial color="#050508" roughness={0.9} />
        </mesh>

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, 0]}>
          <planeGeometry args={[16, 12]} />
          <meshStandardMaterial color="#0f0f15" roughness={0.6} metalness={0.2} />
        </mesh>

        <mesh position={[0, 2, -6]}>
          <planeGeometry args={[20, 10]} />
          <meshStandardMaterial color="#0a0a0f" roughness={0.8} />
        </mesh>

        <mesh rotation={[0, Math.PI / 2, 0]} position={[-6.5, 1, 0]}>
          <planeGeometry args={[12, 6]} />
          <meshStandardMaterial color="#0c0c12" roughness={0.7} />
        </mesh>

        <mesh rotation={[0, -Math.PI / 2, 0]} position={[6.5, 1, 0]}>
          <planeGeometry args={[12, 6]} />
          <meshStandardMaterial color="#0c0c12" roughness={0.7} />
        </mesh>
      </group>
    </>
  );
}