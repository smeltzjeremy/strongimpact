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

function MenuPanel({ item, angle, radius, currentRingRotation }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Position calculation based on the dynamic radius passed from the parent ring
  const x = radius * Math.cos(angle);
  const z = radius * Math.sin(angle);

  useFrame((state) => {
    if (meshRef.current) {
      // Smooth idle floating animation on the Y axis
      meshRef.current.position.y = hovered 
        ? Math.sin(state.clock.getElapsedTime() * 4) * 0.12 + 0.05 
        : Math.sin(state.clock.getElapsedTime() * 1.5) * 0.02;

      // Ensure the panel face always looks directly at the camera position as the ring rotates
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
      >
        <boxGeometry args={[1.8, 1.0, 0.08]} />
        <meshPhysicalMaterial 
          color="#ffffff"
          transmission={0.85}
          roughness={0.15}
          metalness={0.05}
          thickness={0.8}
          ior={1.5}
          clearcoat={1.0}
          clearcoatRoughness={0.0}
          envMapIntensity={0.6}
          transparent={true}
          opacity={hovered ? 0.95 : 0.75}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Floating UI Text Tag Label anchored inside the 3D space */}
      <Html position={[0, 0, 0.06]} center distanceFactor={3} pointerEvents="none">
        <span style={{ 
          color: hovered ? item.color : '#ffffff',
          fontSize: '14px',
          fontWeight: '800',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          padding: '10px 24px',
          background: 'rgba(10, 15, 30, 0.45)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderRadius: '9999px',
          border: hovered ? `1px solid ${item.color}` : '1px solid rgba(255,255,255,0.18)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
          transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
          whiteSpace: 'nowrap',
          userSelect: 'none',
          textShadow: hovered ? `0 0 12px ${item.color}` : '0 2px 6px rgba(0,0,0,0.8)'
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
  
  // Dynamic tracking for window scale context adjustments
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sets your optimized dynamic layout radius bounds 
  const activeRadius = width < 768 ? 2.2 : 2.8;

  useFrame((state, delta) => {
    if (ringRef.current) {
      // Smooth automatic ring rotation loop speed coefficients
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
          />
        );
      })}
    </group>
  );
}