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

  // Math to position the panels on the ring radius
  const x = radius * Math.cos(angle);
  const z = radius * Math.sin(angle);

  useFrame((state) => {
    if (meshRef.current) {
      // 1. Subtle idle hover animation
      meshRef.current.position.y = hovered
        ? Math.sin(state.clock.getElapsedTime() * 4) * 0.08 + 0.03
        : Math.sin(state.clock.getElapsedTime() * 1.5) * 0.02;

      // 2. Continuous rotation so the panel faces the camera
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
        {/* Panel geometry (responsive width) */}
        <boxGeometry args={[isMobile ? 1.35 : 1.7, 0.9, 0.05]} />
        
        {/* 🛠️ FINALIZED CHROME GLASS MATERIAL 🛠️ */}
        <meshPhysicalMaterial
          color="#101115"           // FIXED: Deep obsidian base lets highlights slice with premium contrast. #ffffff creates the flat gray look.
          metalness={1.0}           // Pure reflective raw element status
          roughness={0.02}          // FIXED: Ultra-smooth mirror surface to catch clean, bright reflections of the linear light bar.
          envMapIntensity={5.5}     // High exposure multiplier to blow out the edges beautifully
          clearcoat={1.0}           // Thick, crystal-clear shell on top
          clearcoatRoughness={0.01} // FIXED: Liquid-smooth lacquer layer so highlights stay sharp like polished crystal
          transmission={0.65}       // FIXED: 65% physical light pass-through to create genuine heavy glass depth and see elements through each other.
          ior={1.7}                 // FIXED: Dense glass Index of Refraction for realistic heavy crystal bending and distortion.
          thickness={0.2}           // Simulates physical glass thickness
          transparent={true}
          opacity={hovered ? 0.98 : 0.90}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* HTML Text Overlay Label (Anchored to panel geometry) */}
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

  // Set the default width (acts as desktop fallback during SSR)
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const isMobile = width < 768;

  useEffect(() => {
    // Handle responsive resize events
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Configure responsive layout boundaries
  const activeRadius = isMobile ? 2.3 : 2.9;

  useFrame((state, delta) => {
    if (ringRef.current) {
      // Continuous idle ring spin (slow and subtle)
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