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
      // Floating animation physics
      meshRef.current.position.y = hovered
        ? Math.sin(state.clock.getElapsedTime() * 4) * 0.12 + 0.05
        : Math.sin(state.clock.getElapsedTime() * 1.5) * 0.02;

      const absoluteAngle = angle + currentRingRotation;
      meshRef.current.rotation.y = -absoluteAngle + Math.PI / 2;
    }
  });

  return (
    <group position={[x, 0, z]}>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={() => setHovered(false)}
        onClick={() => alert(`Accessing ${item.label} Module...`)}
        style={{ cursor: 'pointer' }}
      >
        {/* FIXED: Scaled width down from 1.8 to 1.35 for clean spacing on mobile */}
        <boxGeometry args={[isMobile ? 1.35 : 1.7, 0.9, 0.04]} />
        <meshPhysicalMaterial
          color="#f0f0f3"           // Crisp silver base for clean white reflection mapping
          metalness={1.0}           // Pure chrome material properties
          roughness={0.03}          // Ultra-smooth mirror polish
          envMapIntensity={3.5}     // Forces studio lights to clip brightly across the edges
          clearcoat={1.0}           // PBR lacquer top layer
          clearcoatRoughness={0.01} // Pristine outer shell reflection
          transparent={true}
          opacity={hovered ? 0.98 : 0.90}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* FIXED: Offset position upward to [0, 0.68, 0.05] so text floats above the reflection plane */}
      <Html position={[0, 0.68, 0.05]} center distanceFactor={3.5} pointerEvents="none">
        <span style={{
          color: hovered ? item.color : '#ffffff',
          fontSize: '13px',
          fontWeight: '900',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          padding: '8px 22px',
          background: 'rgba(5, 7, 15, 0.75)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: '9999px',
          border: hovered ? `1px solid ${item.color}` : '1px solid rgba(255,255,255,0.15)',
          boxShadow: hovered ? `0 12px 24px rgba(0,0,0,0.7), 0 0 15px ${item.color}33` : '0 8px 24px rgba(0,0,0,0.6)',
          transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
          whiteSpace: 'nowrap',
          userSelect: 'none',
          textShadow: hovered ? `0 0 10px ${item.color}` : '0 2px 4px rgba(0,0,0,0.8)'
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

  // Responsive radius with optimized clearance margins
  const activeRadius = isMobile ? 2.25 : 2.85;

  useFrame((state, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.y += delta * 0.07;
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