import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

const MENU_ITEMS = [
  { id: 1, label: 'GRAPHICS', color: '#00ffcc' },
  { id: 2, label: 'PIPELINE', color: '#3399ff' },
  { id: 3, label: 'DATABASE', color: '#ff3366' },
  { id: 4, label: 'SECURITY', color: '#ffcc00' },
  { id: 5, label: 'NETWORKS', color: '#b833ff' }
];

function MenuPanel({ item, angle, radius, currentRingRotation, isMobile }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  const x = radius * Math.cos(angle);
  const z = radius * Math.sin(angle);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = hovered
        ? Math.sin(state.clock.getElapsedTime() * 4) * 0.08 + 0.03
        : Math.sin(state.clock.getElapsedTime() * 1.5) * 0.02;

      const absoluteAngle = angle + currentRingRotation;
      meshRef.current.rotation.y = -absoluteAngle + Math.PI / 2;
    }
  });

  return (
    <group position={[x, 0, z]}>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => { 
          e.stopPropagation(); 
          setHovered(true); 
          document.body.style.cursor = 'pointer'; 
        }}
        onPointerOut={() => { 
          setHovered(false); 
          document.body.style.cursor = 'auto'; 
        }}
        onClick={() => alert(`Accessing ${item.label} Module...`)}
      >
        <boxGeometry args={[isMobile ? 1.35 : 2.4, 0.9, 0.05]} />
        
        {/* 🛠️ MASTER RECALIBRATION: THE HYBRID SPECULAR CHROME-GLASS PROFILE */}
        <meshPhysicalMaterial
          color="#d0d5e0"           // TUNED: Cool grayish tint provides perfect architectural depth base
          metalness={0.70}          // TUNED: Restores solid chrome reflections across the panel faces
          roughness={0.07}          // TUNED: Sharper specular highlights without creating black mirror void clips
          envMapIntensity={5.0}     
          clearcoat={1.0}           // High-gloss outer crystal clear coat lacquer shell
          clearcoatRoughness={0.015}// Polished outer shell finish
          transmission={0.78}       // TUNED: High translucent pass-through for rich glassmorphic stacking
          ior={1.60}                // Refractive capability index
          thickness={0.22}          // Structural edge-depth slab factor
          transparent={true}
          opacity={hovered ? 0.82 : 0.52}   // Balanced visibility tracking
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* HTML Text Overlay Label */}
      <Html position={[0, 0, 0.04]} center distanceFactor={4.0} pointerEvents="none">
        <span style={{
          color: hovered ? item.color : '#ffffff',
          fontSize: isMobile ? '11px' : '13px',
          fontWeight: '900',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          padding: '8px 20px',
          background: 'rgba(4, 4, 6, 0.82)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: '9999px',
          border: hovered ? `1px solid ${item.color}` : '1px solid rgba(255,255,255,0.12)',
          boxShadow: hovered ? `0 12px 24px rgba(0,0,0,0.8), 0 0 15px ${item.color}44` : '0 6px 20px rgba(0,0,0,0.7)',
          transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
          whiteSpace: 'nowrap',
          userSelect: 'none',
        }}>
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

  const activeRadius = isMobile ? 2.3 : 2.4;

  useFrame((state, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.y += delta * 0.06;
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