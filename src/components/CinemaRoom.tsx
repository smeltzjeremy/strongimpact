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
          video.play().catch(err => console.log("Playback interaction wait:", err));
        } else {
          video.pause();
        }
        video.muted = isMuted;
      }
    }
  }, [texture, isPlaying, isMuted]);

  // FIXED TEXTURE A: Architectural Linear Slat Wall Paneling
  const wallTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Warm, visible luxury dark wood base color
      ctx.fillStyle = '#292524'; 
      ctx.fillRect(0, 0, 512, 512);
      
      // Crisp architectural linear slits
      ctx.fillStyle = '#141414';
      for (let i = 0; i < 512; i += 32) {
        ctx.fillRect(i, 0, 8, 512);
      }
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(6, 1);
    tex.needsUpdate = true; // Forces WebGL to read the canvas instantly
    return tex;
  }, []);

  // FIXED TEXTURE B: High-Contrast Plush Cinema Carpet Weave
  const carpetTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Visible luxurious deep blue tone base
      ctx.fillStyle = '#1e293b'; 
      ctx.fillRect(0, 0, 256, 256);
      
      // Distinct micro-weave texture noise pattern
      for (let i = 0; i < 3000; i++) {
        const x = Math.random() * 256;
        const y = Math.random() * 256;
        ctx.fillStyle = Math.random() > 0.5 ? '#334155' : '#0f172a';
        ctx.fillRect(x, y, 2, 2);
      }
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(10, 10);
    tex.needsUpdate = true; // Forces WebGL to read the canvas instantly
    return tex;
  }, []);

  return (
    <>
      <ambientLight intensity={0.4} />
      
      {/* Crisp Screen Glow - projects colors onto the newly painted floor/walls */}
      <directionalLight position={[0, 3, -4]} intensity={1.5} color="#f0f9ff" />
      
      {/* Overhead warm studio downlight */}
      <pointLight position={[0, 3.8, 1]} intensity={1.2} color="#fef08a" distance={15} />

      <group position={[0, 0, 0]}>
        
        {/* 1. THE 3D MAIN SCREEN SURFACE */}
        <mesh position={[0, 0.5, -5]}>
          <planeGeometry args={[7.1, 4.0]} />
          <meshStandardMaterial 
            map={texture} 
            emissive="#ffffff"
            emissiveMap={texture}
            emissiveIntensity={isPlaying ? 0.6 : 0.2}
            roughness={0.15}
            metalness={0.0}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Brushed Metal Widescreen Framing border */}
        <mesh position={[0, 0.5, -5.04]}>
          <planeGeometry args={[7.35, 4.25]} />
          <meshStandardMaterial color="#1f2937" roughness={0.4} metalness={0.7} />
        </mesh>

        {/* 2. THE FLOORS & CEILING WITH FIXED TEXTURE LAYERS */}
        {/* Luxury Velvet Weave Carpet Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, 0]}>
          <planeGeometry args={[22, 18]} />
          <meshStandardMaterial 
            map={carpetTexture}
            roughness={0.7}
            metalness={0.1} 
          />
        </mesh>

        {/* Modern Studio Matte Ceiling */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 4.0, 0]}>
          <planeGeometry args={[22, 18]} />
          <meshStandardMaterial color="#1c1917" roughness={0.9} />
        </mesh>

        {/* 3. WALLS WITH FIXED WOOD SLAT PANELING PAINT LAYER */}
        {/* Front Screen Stage Backdrop */}
        <mesh position={[0, 1.1, -5.1]}>
          <planeGeometry args={[22, 6.5]} />
          <meshStandardMaterial color="#0c0a09" roughness={0.95} />
        </mesh>

        {/* Left Side Architectural Panel Wall */}
        <mesh rotation={[0, Math.PI / 2, 0]} position={[-8.5, 1.1, 0]}>
          <planeGeometry args={[18, 6.5]} />
          <meshStandardMaterial map={wallTexture} roughness={0.5} metalness={0.1} />
        </mesh>

        {/* Right Side Architectural Panel Wall */}
        <mesh rotation={[0, -Math.PI / 2, 0]} position={[8.5, 1.1, 0]}>
          <planeGeometry args={[18, 6.5]} />
          <meshStandardMaterial map={wallTexture} roughness={0.5} metalness={0.1} />
        </mesh>

      </group>
    </>
  );
}