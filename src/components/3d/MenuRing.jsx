import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';

const MENU_ITEMS = [
  { id: 1, label: 'GRAPHICS', color: '#00ffcc' },
  { id: 2, label: 'PIPELINE', color: '#3399ff' },
  { id: 3, label: 'DATABASE', color: '#ff3366' },
  { id: 4, label: 'GALLERY', color: '#ff3344' }, 
  { id: 5, label: 'NETWORKS', color: '#b833ff' }
];

function MenuPanel({ item, angle, radius, currentRingRotation, isMobile }) {
  const meshRef = useRef();
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const [time, setTime] = useState(0);

  const x = radius * Math.cos(angle);
  const z = radius * Math.sin(angle);

  useFrame((state) => {
    // Keep a running time scalar for custom slow breathing effects
    setTime(state.clock.getElapsedTime());

    if (meshRef.current) {
      meshRef.current.position.y = hovered
        ? Math.sin(state.clock.getElapsedTime() * 4) * 0.12 + 0.05
        : Math.sin(state.clock.getElapsedTime() * 1.5) * 0.02;
      
      const absoluteAngle = angle + currentRingRotation;
      meshRef.current.rotation.y = -absoluteAngle + Math.PI / 2;
    }
  });

  const handlePipelineLaunch = (e) => {
    e.stopPropagation();
    if (item.label === 'GALLERY') {
      navigate('/gallery');
    } else {
      alert(`Opening ${item.label} Pipeline...`);
    }
  };

  // Create a gentle, slow, non-aggressive breathing scale factor (oscillates between 0.96 and 1.04)
  const slowPulseScale = hovered ? 1.1 : 1 + Math.sin(time * 2) * 0.04;

  return (
    <group position={[x, 0, z]}>
      {/* 🔮 THE VISUAL DRAG CARD */}
      <mesh
        ref={meshRef}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[2.4, 1.0, 0.05]} />
        <meshPhysicalMaterial
          color="#d2d6e0"
          transmission={0.93}
          roughness={0.14}
          metalness={0.08}
          thickness={0.15}
          ior={1.54}
          clearcoat={1.0}
          clearcoatRoughness={0.01}
          envMapIntensity={2.3}
          transparent={true}
          opacity={hovered ? 0.95 : 0.70}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 🏈 UPDATED HOLOGRAPHIC TARGET RIG */}
      <Html position={[0, 1.2, 0]} center style={{ pointerEvents: 'auto' }}>
        <div className="flex flex-col items-center gap-2 select-none">
          
          {/* Target Button with dynamic mobile upscale */}
          <button 
            onClick={handlePipelineLaunch}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="rounded-full border bg-zinc-950/90 backdrop-blur-xl flex items-center justify-center cursor-pointer transition-all duration-500 group relative shadow-[0_0_35px_rgba(0,0,0,0.9)]"
            style={{ 
              width: isMobile ? '4.25rem' : '3.75rem',  // Upsized on mobile for thumb safety
              height: isMobile ? '4.25rem' : '3.75rem', // Upsized on mobile for thumb safety
              transform: `scale(${slowPulseScale})`,
              borderColor: hovered ? item.color : 'rgba(255, 255, 255, 0.15)',
              boxShadow: hovered 
                ? `0 0 35px ${item.color}bb, inset 0 0 15px ${item.color}44` 
                : `0 0 20px rgba(0,0,0,0.8), inset 0 0 10px rgba(255,255,255,0.03)`
            }}
          >
            {/* 🌌 SOFT OUTSIDE HOLOGRAPHIC GLOW RING */}
            <div 
              className="absolute inset-[-6px] rounded-full border transition-all duration-700 opacity-40 mix-blend-screen"
              style={{ 
                borderColor: item.color,
                boxShadow: `0 0 15px ${item.color}33`,
                transform: hovered ? 'scale(1.15)' : `scale(${1 + Math.sin(time * 2) * 0.05})`
              }}
            />

            {/* Subtle Radar Ring Wave */}
            <div 
              className="absolute inset-0 rounded-full animate-ping opacity-10 duration-[3000ms]"
              style={{ backgroundColor: item.color }}
            />

            {/* Core Element */}
            <div 
              className="w-5 h-5 rounded-full transition-transform duration-500 group-hover:scale-125" 
              style={{ 
                backgroundColor: item.color,
                boxShadow: `0 0 20px ${item.color}, inset 0 2px 4px rgba(255,255,255,0.4)`
              }}
            />
          </button>

          {/* Contextual Hover Label */}
          <div 
            className={`transition-all duration-300 transform pointer-events-none ${
              hovered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-1 scale-95'
            }`}
          >
            <span 
              className="text-[9px] font-black tracking-[0.3em] px-2.5 py-1 rounded bg-zinc-950/95 border text-white shadow-2xl"
              style={{ borderColor: `${item.color}33` }}
            >
              LAUNCH
            </span>
          </div>
        </div>
      </Html>

      {/* TEXT LABEL OVERLAY */}
      <Html position={[0, -0.9, 0]} center style={{ pointerEvents: 'none' }}>
        <span 
          className="font-black text-xs tracking-[0.2em] uppercase select-none transition-all duration-300 bg-black/50 px-4 py-1.5 rounded-full backdrop-blur-md border shadow-md"
          style={{ 
            color: hovered ? item.color : '#ffffff',
            borderColor: hovered ? `${item.color}44` : 'rgba(255,255,255,0.05)'
          }}
        >
          {item.label}
        </span>
      </Html>
    </group>
  );
}

export default function MenuRing() {
  const ringRef = useRef();
  const rotationRef = useRef(0);
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const isMobile = width < 768;

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const activeRadius = isMobile ? 2.3 : 2.6;

  useFrame((state, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.y += delta * 0.08;
      rotationRef.current = ringRef.current.rotation.y;
    }
  });

  return (
    <group ref={ringRef}>
      {MENU_ITEMS.map((item, index) => {
        const angle = (index / MENU_ITEMS.length) * Math.PI * 2;
        return (
          <MenuPanel
            key={`${item.id}-${index}`}
            item={item}
            angle={angle}
            radius={activeRadius}
            currentRingRotation={rotationRef.current}
            isMobile={isMobile}
          />
        );
      })}
    </group>
  );
}