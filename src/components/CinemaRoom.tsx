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
    muted: true, // Auto-mutes internally to force pass browser security blocks on load
    playsInline: true,
    start: true
  });

  videoTexture.colorSpace = THREE.SRGBColorSpace;

  useEffect(() => {
    const videoEl = videoTexture.image as HTMLVideoElement;
    if (!videoEl) return;

    // Hardcode matching layout ID strings for standard device handlers
    videoEl.id = 'cinema-video-core';
    videoEl.setAttribute('playsinline', 'true');
    videoEl.setAttribute('webkit-playsinline', 'true');

    if (isPlaying) {
      videoEl.play().catch(err => console.log("Engine sync update:", err));
    } else {
      videoEl.pause();
    }
  }, [isPlaying, videoUrl, videoTexture]);

  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 4, -2]} intensity={2.0} color="#b0c0ff" />
      <pointLight position={[-5, -1.8, -1]} intensity={0.5} color="#ef4444" distance={8} />
      <pointLight position={[5, -1.8, -1]} intensity={0.5} color="#ef4444" distance={8} />

      <group position={[0, 0, 0]}>
        {/* MOVIE SCREEN DISPLAY */}
        <mesh position={[0, 0.5, -5]}>
          <planeGeometry args={[7.1, 4.0]} />
          <meshStandardMaterial 
            map={videoTexture} 
            emissive={'#ffffff'}
            emissiveMap={videoTexture}
            emissiveIntensity={0.4}
            roughness={0.3}
            metalness={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* SCREEN BEZEL FRAME */}
        <mesh position={[0, 0.5, -5.02]}>
          <planeGeometry args={[7.4, 4.3]} />
          <meshStandardMaterial color="#050508" roughness={0.9} />
        </mesh>

        {/* WORKSPACE STAGE FLOOR */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, 0]}>
          <planeGeometry args={[16, 12]} />
          <meshStandardMaterial color="#0f0f15" roughness={0.6} metalness={0.2} />
        </mesh>

        {/* BACK WALL */}
        <mesh position={[0, 2, -6]}>
          <planeGeometry args={[20, 10]} />
          <meshStandardMaterial color="#0a0a0f" roughness={0.8} />
        </mesh>

        {/* LEFT PANEL */}
        <mesh rotation={[0, Math.PI / 2, 0]} position={[-6.5, 1, 0]}>
          <planeGeometry args={[12, 6]} />
          <meshStandardMaterial color="#0c0c12" roughness={0.7} />
        </mesh>

        {/* RIGHT PANEL */}
        <mesh rotation={[0, -Math.PI / 2, 0]} position={[6.5, 1, 0]}>
          <planeGeometry args={[12, 6]} />
          <meshStandardMaterial color="#0c0c12" roughness={0.7} />
        </mesh>
      </group>
    </>
  );
}