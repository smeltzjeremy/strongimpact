import React, { useEffect, useState } from 'react';
import * as THREE from 'three';

interface CinemaRoomProps {
  videoElement: HTMLVideoElement;
}

export default function CinemaRoom({ videoElement }: CinemaRoomProps) {
  const [texture, setTexture] = useState<THREE.VideoTexture | null>(null);

  useEffect(() => {
    if (!videoElement) return;

    // Creates the texture link explicitly using the stable background element
    const videoTex = new THREE.VideoTexture(videoElement);
    videoTex.colorSpace = THREE.SRGBColorSpace;
    videoTex.minFilter = THREE.LinearFilter;
    videoTex.magFilter = THREE.LinearFilter;
    
    setTexture(videoTex);

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
          {texture && (
            <meshStandardMaterial 
              map={texture} 
              emissive="#ffffff"
              emissiveMap={texture}
              emissiveIntensity={0.3}
              roughness={0.4}
              metalness={0.1}
              side={THREE.DoubleSide}
            />
          )}
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