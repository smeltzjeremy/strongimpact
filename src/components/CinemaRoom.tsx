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

  // HIGH-END PAINT LAYER A: Procedural Acoustic Luxury Wall Panels
  const wallTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Base dark mahogany wood tone
      ctx.fillStyle = '#1c1917';
      ctx.fillRect(0, 0, 256, 256);
      // Modern vertical architectural slat slits
      ctx.fillStyle = '#0c0a09';
      for (let i = 0; i < 256; i += 16) {
        ctx.fillRect(i, 0, 4, 256);
      }
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(4, 1);
    return tex;
  }, []);

  // HIGH-END PAINT LAYER B: Fine Velvet/Carpet Fabric Texture
  const carpetTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#111827'; // Luxurious deep obsidian blue
      ctx.fillRect(0, 0, 128, 128);
      // Micro-weave noise to catch light dynamically
      for (let i = 0; i < 1000; i++) {
        const x = Math.random() * 128;
        const y = Math.random() * 128;
        ctx.fillStyle = Math.random() > 0.5 ? '#1f2937' : '#0f172a';
        ctx.fillRect(x, y, 1.5, 1.5);
      }
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(8, 8);
    return tex;
  }, []);

  return (
    <>
      {/* RESTORED LIGHTING BRIGHTNESS */}
      <ambientLight intensity={0.25} />
      
      {/* Vibrant Screen Glow - Projects crisp movie colors back into the lounge */}
      <directionalLight position={[0, 3, -4]} intensity={1.5} color="#e0f2fe" />
      
      {/* Soft warm architectural ceiling spots */}
      <pointLight position={[0, 4.2, 1]} intensity={1.0} color="#fef08a" distance={12} />

      <group position={[0, 0, 0]}>
        
        {/* 1. THE 3D MAIN SCREEN SURFACE (Boosted Emissive Intensity for maximum crisp clarity) */}
        <mesh position={[0, 0.5, -5]}>
          <planeGeometry args={[7.1, 4.0]} />
          <meshStandardMaterial 
            map={texture} 
            emissive="#ffffff"
            emissiveMap={texture}
            emissiveIntensity={isPlaying ? 0.6 : 0.2} // Restored pop and brilliance
            roughness={0.15}
            metalness={0.0}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Brushed Metal Widescreen Framing border */}
        <mesh position={[0, 0.5, -5.04]}>
          <planeGeometry args={[7.35, 4.25]} />
          <meshStandardMaterial color="#18181b" roughness={0.5} metalness={0.6} />
        </mesh>

        {/* 2. THE FLOORS & CEILING WITH PREMIUM TEXTURE LAYERS */}
        {/* Luxury Velvet Weave Carpet Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, 0]}>
          <planeGeometry args={[20, 16]} />
          <meshStandardMaterial 
            map={carpetTexture}
            roughness={0.8}
            metalness={0.1} 
          />
        </mesh>

        {/* Modern Studio Matte Ceiling */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 4.0, 0]}>
          <planeGeometry args={[20, 16]} />
          <meshStandardMaterial color="#0c0a09" roughness={0.9} />
        </mesh>

        {/* 3. WALLS WITH BUILT-IN WOOD SLAT PANELING PAINT LAYER */}
        {/* Front Screen Stage Backdrop */}
        <mesh position={[0, 1.1, -5.1]}>
          <planeGeometry args={[20, 6.5]} />
          <meshStandardMaterial color="#09090b" roughness={0.95} />
        </mesh>

        {/* Left Side Architectural Panel Wall */}
        <mesh rotation={[0, Math.PI / 2, 0]} position={[-7.5, 1.1, 0]}>
          <planeGeometry args={[16, 6.5]} />
          <meshStandardMaterial map={wallTexture} roughness={0.6} metalness={0.1} />
        </mesh>

        {/* Right Side Architectural Panel Wall */}
        <mesh rotation={[0, -Math.PI / 2, 0]} position={[7.5, 1.1, 0]}>
          <planeGeometry args={[16, 6.5]} />
          <meshStandardMaterial map={wallTexture} roughness={0.6} metalness={0.1} />
        </mesh>

      </group>
    </>
  );
}