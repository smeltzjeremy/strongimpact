import React, { useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CinemaRoomProps {
  videoElement: HTMLVideoElement | null;
}

export default function CinemaRoom({ videoElement }: CinemaRoomProps) {
  
  // Transform the passed HTML element into a continuous 3D texture projection mapping
  const videoTexture = useMemo(() => {
    if (!videoElement) return null;
    const texture = new THREE.VideoTexture(videoElement);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    return texture;
  }, [videoElement]);

  // Request continuous 3D viewport updates on every engine tick if the video is moving
  useFrame(() => {
    if (videoTexture && videoElement && !videoElement.paused) {
      videoTexture.needsUpdate = true;
    }
  });

  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 4, -2]} intensity={2.0} color="#b0c0ff" />
      <pointLight position={[-5, -1.8, -1]} intensity={0.5} color="#ef4444" distance={8} />
      <pointLight position={[5, -1.8, -1]} intensity={0.5} color="#ef4444" distance={8} />

      <group position={[0, 0, 0]}>
        {/* VIRTUAL SCREEN SPACE SURFACE MESH */}
        <mesh position={[0, 0.5, -5]}>
          <planeGeometry args={[7.1, 4.0]} />
          <meshStandardMaterial 
            map={videoTexture} 
            emissive={videoTexture ? '#ffffff' : '#040408'}
            emissiveMap={videoTexture || undefined}
            emissiveIntensity={videoTexture ? 0.4 : 0.05}
            roughness={0.3}
            metalness={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* SCREEN FRAME BORDER BEZEL */}
        <mesh position={[0, 0.5, -5.02]}>
          <planeGeometry args={[7.4, 4.3]} />
          <meshStandardMaterial color="#050508" roughness={0.9} />
        </mesh>

        {/* THE FLOORED INTERACTIVE PLATFORM */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, 0]}>
          <planeGeometry args={[16, 12]} />
          <meshStandardMaterial color="#0f0f15" roughness={0.6} metalness={0.2} />
        </mesh>

        {/* BACK ACOUSTIC STRUCTURE WALL MESH */}
        <mesh position={[0, 2, -6]}>
          <planeGeometry args={[20, 10]} />
          <meshStandardMaterial color="#0a0a0f" roughness={0.8} />
        </mesh>

        {/* LEFT STUDIO WALL LAYER */}
        <mesh rotation={[0, Math.PI / 2, 0]} position={[-6.5, 1, 0]}>
          <planeGeometry args={[12, 6]} />
          <meshStandardMaterial color="#0c0c12" roughness={0.7} />
        </mesh>

        {/* RIGHT STUDIO WALL LAYER */}
        <mesh rotation={[0, -Math.PI / 2, 0]} position={[6.5, 1, 0]}>
          <planeGeometry args={[12, 6]} />
          <meshStandardMaterial color="#0c0c12" roughness={0.7} />
        </mesh>
      </group>
    </>
  );
}