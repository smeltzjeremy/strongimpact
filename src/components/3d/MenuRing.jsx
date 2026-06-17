import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

const MENU_ITEMS = [
  { id: 1, label: 'GRAPHICS', color: '#00ffcc' },
  { id: 2, label: 'PIPELINE', color: '#3399ff' },
  { id: 3, label: 'DATABASE', color: '#ff3366' },
  { id: 4, label: 'SECURITY', color: '#ffcc00' },
  { id: 5, label: 'NETWORKS', color: '#b833ff' }
];

function MenuPanel({ item, angle, radius }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  const x = radius * Math.cos(angle);
  const z = radius * Math.sin(angle);

  useFrame((state) => {
    if (meshRef.current) {
      // Elegant hovering bounce effect
      meshRef.current.position.y = hovered 
        ? Math.sin(state.clock.getElapsedTime() * 5) * 0.08 
        : 0;
    }
  });

  return (
    <group position={[x, 0, z]}>
      {/* High-Performance Physical Glass Panel */}
      <mesh
        ref={meshRef}
        rotation={[0, -angle - Math.PI / 2, 0]}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={() => setHovered(false)}
        onClick={() => alert(`Accessing ${item.label} Module...`)}
      >
        <boxGeometry args={[1.4, 0.7, 0.04]} />
        <meshPhysicalMaterial 
          color={hovered ? item.color : '#ffffff'} 
          transmission={0.7}        /* High transmission for clean glass transparency */
          roughness={0.2}           /* Slight frost surface to catch studio light glares */
          metalness={0.1}
          thickness={0.4}           /* Gives the panel physical edge-refraction depth */
          clearcoat={1.0}           /* Super glossy outer shell layer */
          clearcoatRoughness={0.1}
          transparent={true}
          opacity={0.9}
        />
      </mesh>

      {/* Sharp DOM Typography Overlay */}
      <Html
        position={[0, 0, 0.05]}
        center
        distanceFactor={3}
        occlude={[meshRef]}
        className="glass-panel-label"
      >
        <span style={{ 
          color: hovered ? item.color : '#ffffff', 
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          fontSize: '15px',
          fontWeight: '900',
          letterSpacing: '0.12em',
          userSelect: 'none',
          pointerEvents: 'none',
          display: 'block',
          transform: hovered ? 'scale(1.15)' : 'scale(1.0)',
          textShadow: hovered 
            ? `0 0 10px ${item.color}, 0 2px 4px rgba(0,0,0,0.8)` 
            : '0 2px 5px rgba(0,0,0,0.9)'
        }}>
          {item.label}
        </span>
      </Html>
    </group>
  );
}

export default function MenuRing() {
  const ringRef = useRef();

  useFrame((state, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.y += delta * 0.12;
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
            radius={2.4} 
          />
        );
      })}
    </group>
  );
}