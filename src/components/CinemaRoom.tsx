import React, { useEffect, useMemo } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface CinemaRoomProps {
  videoUrl: string;
  isPlaying: boolean;
}

export default function CinemaRoom({ videoUrl, isPlaying }: CinemaRoomProps) {
  const { gl } = useThree();

  // Create HTML5 Video Element out of the Canvas DOM loop to avoid namespace crashes
  const videoElement = useMemo(() => {
    const video = document.createElement('video');
    video.src = videoUrl;
    video.crossOrigin = 'anonymous';
    video.loop = false; // Strictly protect Supabase free-tier data
    video.autoplay = false;
    video.muted = false;
    video.playsInline = true;
    return video;
  }, [videoUrl]);

  // Convert the active streaming video into a dynamic WebGL texture
  const videoTexture = useMemo(() => {
    const texture = new THREE.VideoTexture(videoElement);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    return texture;
  }, [videoElement]);

  // Track state changes to safely trigger and freeze playback
  useEffect(() => {
    if (isPlaying) {
      videoElement.play().catch(err => console.error("Playback interrupted:", err));
    } else {
      videoElement.pause();
    }

    // Cleanup video stream immediately on unmount to prevent invisible data leaking
    return () => {
      videoElement.pause();
      videoElement.src = '';
      videoElement.load();
    };
  }, [isPlaying, videoElement]);

  return (
    <>
      {/* Cinematic Ambient Lighting Profiles */}
      <ambientLight intensity={0.04} />
      
      {/* Screen Emissive Glow: Subtle light cast downward into the room from the screen face */}
      <directionalLight position={[0, 2, -4]} intensity={isPlaying ? 0.6 : 0.1} color="#a0c0ff" />
      
      {/* Subtle floor neon paths */}
      <pointLight position={[-4, -2.5, 2]} intensity={0.15} color="#ef4444" />
      <pointLight position={[4, -2.5, 2]} intensity={0.15} color="#ef4444" />

      {/* Main Theater Room Mesh Architecture */}
      <group position={[0, 0, 0]}>
        
        {/* THE SCREEN: Premium curved 16:9 cinematic display surface */}
        <mesh position={[0, 0.5, -5]}>
          <planeGeometry args={[7.1, 4.0]} />
          <meshStandardMaterial 
            map={videoTexture} 
            emissive={isPlaying ? '#ffffff' : '#0a0a10'}
            emissiveMap={videoTexture}
            emissiveIntensity={isPlaying ? 0.35 : 0}
            roughness={0.2}
            metalness={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* SCREEN BORDER FRAME: Matte black bezel for contrast */}
        <mesh position={[0, 0.5, -5.02]}>
          <planeGeometry args={[7.4, 4.3]} />
          <meshStandardMaterial color="#020205" roughness={0.8} />
        </mesh>

        {/* THE STAGE FLOOR */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, 0]}>
          <planeGeometry args={[16, 12]} />
          <meshStandardMaterial color="#08080c" roughness={0.9} />
        </mesh>

        {/* THE BACK WALL */}
        <mesh position={[0, 2, -6]}>
          <planeGeometry args={[20, 10]} />
          <meshStandardMaterial color="#040406" roughness={0.95} />
        </mesh>

        {/* ACOUSTIC SIDE WALL PANEL (LEFT) */}
        <mesh rotation={[0, Math.PI / 2, 0]} position={[-6.5, 1, 0]}>
          <planeGeometry args={[12, 6]} />
          <meshStandardMaterial color="#06060a" roughness={0.9} />
        </mesh>

        {/* ACOUSTIC SIDE WALL PANEL (RIGHT) */}
        <mesh rotation={[0, -Math.PI / 2, 0]} position={[6.5, 1, 0]}>
          <planeGeometry args={[12, 6]} />
          <meshStandardMaterial color="#06060a" roughness={0.9} />
        </mesh>

      </group>
    </>
  );
}