import React, { useEffect, useState } from 'react';
import * as THREE from 'three';

interface CinemaRoomProps {
  videoElement: HTMLVideoElement;
}

export default function CinemaRoom({ videoElement }: CinemaRoomProps) {
  const [texture, setTexture] = useState<THREE.VideoTexture | null>(null);

  useEffect(() => {
    if (!videoElement) return;

    // Build the video texture link explicitly
    const videoTex = new THREE.VideoTexture(videoElement);
    videoTex.colorSpace = THREE.SRGBColorSpace;
    videoTex.minFilter = THREE.LinearFilter;
    videoTex.magFilter = THREE.LinearFilter;
    
    setTexture(videoTex);

    // This forces Three.js to constantly look at the video element for new frames
    videoElement.addEventListener('timeupdate', () => {
      videoTex.needsUpdate = true;
    });

    return () => {
      videoTex.dispose();
    };
  }, [videoElement]);

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[0, 4, -2]} intensity={1.5} color="#b0c0ff" />
      <pointLight position={[-5, -1.8, -1]} intensity={0.5} color="#ef4444" distance={8} />
      <pointLight position={[5, -1.8, -1]} intensity={0.5} color="#ef4444" distance={8} />

      <group position={[0, 0, 0]}>
        {/* THE 3D SCREEN SURFACE MESH */}
        <mesh position={[0, 0.5, -5]}>
          <planeGeometry args={[7.1, 4.0]} />
          {/* If the video texture isn't ready yet, it falls back to a clean dark zinc material instead of crashing */}
          <meshStandardMaterial 
            map={texture || null} 
            color={texture ? "#ffffff" : "#18181b"}
            emissive={texture ? "#ffffff" : "#000000"}
            emissiveMap={texture || null}
            emissiveIntensity={texture ? 0.3 : 0}
            roughness={0.4}
            metalness={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* SCREEN FRAME BEZEL */}
        <mesh position={[0, 0.5, -5.02]}>
          <planeGeometry args={[7.4, 4.3]} />
          <meshStandardMaterial color="#050508" roughness={0.9} />
        </mesh>

        {/* FLOOR */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, 0]}>
          <planeGeometry args={[16, 12]} />
          <meshStandardMaterial color="#0f0f15" roughness={0.6} />
        </mesh>

        {/* REAR WALL */}
        <mesh position={[0, 2, -6]}>
          <planeGeometry args={[20, 10]} />
          <meshStandardMaterial color="#0a0a0f" roughness={0.8} />
        </mesh>
      </group>
    </>
  );
}