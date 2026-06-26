import React, { useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CinemaRoomProps {
  videoElement: HTMLVideoElement | null;
}

export default function CinemaRoom({ videoElement }: CinemaRoomProps) {
  const [texture, setTexture] = useState<THREE.VideoTexture | null>(null);

  // Hook into the video element dynamically the moment it loads into the DOM
  useEffect(() => {
    if (!videoElement) return;

    const newTexture = new THREE.VideoTexture(videoElement);
    newTexture.colorSpace = THREE.SRGBColorSpace;
    newTexture.minFilter = THREE.LinearFilter;
    newTexture.magFilter = THREE.LinearFilter;
    
    setTexture(newTexture);

    return () => {
      newTexture.dispose();
    };
  }, [videoElement]);

  // CRITICAL ENGINE RE-RENDER LOOP: Forces WebGL to redraw the video frame-by-frame 
  useFrame(() => {
    if (texture && videoElement && !videoElement.paused) {
      texture.needsUpdate = true;
    }
  });

  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 4, -2]} intensity={2.0} color="#b0c0ff" />
      <pointLight position={[-5, -1.8, -1]} intensity={0.5} color="#ef4444" distance={8} />
      <pointLight position={[5, -1.8, -1]} intensity={0.5} color="#ef4444" distance={8} />

      <group position={[0, 0, 0]}>
        {/* THE MOVIE SCREEN */}
        <mesh position={[0, 0.5, -5]}>
          <planeGeometry args={[7.1, 4.0]} />
          <meshStandardMaterial 
            map={texture} 
            emissive={texture ? '#ffffff' : '#040408'}
            emissiveMap={texture || undefined}
            emissiveIntensity={texture ? 0.4 : 0.05}
            roughness={0.3}
            metalness={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* SCREEN FRAME BEZEL */}
        <mesh position={[0, 0.5, -5.02]}>
          <planeGeometry args={[7.4, 4.3]} />
          <meshStandardMaterial color="#050508" roughness={0.9} />
        </mesh>

        {/* STAGE FLOOR */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, 0]}>
          <planeGeometry args={[16, 12]} />
          <meshStandardMaterial color="#0f0f15" roughness={0.6} metalness={0.2} />
        </mesh>

        {/* BACK WALL */}
        <mesh position={[0, 2, -6]}>
          <planeGeometry args={[20, 10]} />
          <meshStandardMaterial color="#0a0a0f" roughness={0.8} />
        </mesh>

        {/* LEFT STUDIO WALL */}
        <mesh rotation={[0, Math.PI / 2, 0]} position={[-6.5, 1, 0]}>
          <planeGeometry args={[12, 6]} />
          <meshStandardMaterial color="#0c0c12" roughness={0.7} />
        </mesh>

        {/* RIGHT STUDIO WALL */}
        <mesh rotation={[0, -Math.PI / 2, 0]} position={[6.5, 1, 0]}>
          <planeGeometry args={[12, 6]} />
          <meshStandardMaterial color="#0c0c12" roughness={0.7} />
        </mesh>
      </group>
    </>
  );
}