import React, { useEffect } from 'react';
import { useVideoTexture } from '@react-three/drei';
import * as THREE from 'three';

interface CinemaRoomProps {
  videoUrl: string;
  isPlaying: boolean;
}

export default function CinemaRoom({ videoUrl, isPlaying }: CinemaRoomProps) {
  
  // Forces the video player to load up instantly and stream inside the canvas space
  const videoTexture = useVideoTexture(videoUrl, {
    unsuspend: 'canplay',
    crossOrigin: 'anonymous',
    loop: false,
    muted: true,         // Vital for immediate mobile browser pass-through
    playsInline: true,   // Blocks native mobile app player hijack on load
    start: true          // Turn video rendering engine on immediately
  });

  videoTexture.colorSpace = THREE.SRGBColorSpace;

  useEffect(() => {
    const videoEl = videoTexture.image as HTMLVideoElement;
    if (!videoEl) return;

    // Direct string signature identifier for target elements
    videoEl.className = 'r3f-video-source';

    if (isPlaying) {
      videoEl.play().catch(err => console.log("Auto-stream frame initialization update:", err));
    } else {
      videoEl.pause();
    }
  }, [isPlaying, videoUrl, videoTexture]);

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[0, 4, -2]} intensity={2.0} color="#b0c0ff" />
      <pointLight position={[-5, -1.8, -1]} intensity={0.5} color="#ef4444" distance={8} />
      <pointLight position={[5, -1.8, -1]} intensity={0.5} color="#ef4444" distance={8} />

      <group position={[0, 0, 0]}>
        {/* THE MOVIE SCREEN */}
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

        {/* SCREEN BORDER BEZEL */}
        <mesh position={[0, 0.5, -5.02]}>
          <planeGeometry args={[7.4, 4.3]} />
          <meshStandardMaterial color="#050508" roughness={0.9} />
        </mesh>

        {/* STAGE FLOOR */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, 0]}>
          <planeGeometry args={[16, 12]} />
          <meshStandardMaterial color="#0f0f15" roughness={0.6} metalness={0.2} />
        </mesh>

        {/* REAR ACOUSTIC WALL */}
        <mesh position={[0, 2, -6]}>
          <planeGeometry args={[20, 10]} />
          <meshStandardMaterial color="#0a0a0f" roughness={0.8} />
        </mesh>

        {/* LEFT ACOUSTIC PANEL */}
        <mesh rotation={[0, Math.PI / 2, 0]} position={[-6.5, 1, 0]}>
          <planeGeometry args={[12, 6]} />
          <meshStandardMaterial color="#0c0c12" roughness={0.7} />
        </mesh>

        {/* RIGHT ACOUSTIC PANEL */}
        <mesh rotation={[0, -Math.PI / 2, 0]} position={[6.5, 1, 0]}>
          <planeGeometry args={[12, 6]} />
          <meshStandardMaterial color="#0c0c12" roughness={0.7} />
        </mesh>
      </group>
    </>
  );
}