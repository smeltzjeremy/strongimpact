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
      meshRef.current.position.y = hovered 
        ? Math.sin(state.clock.getElapsedTime() * 5) * 0.08 
        : 0;
    }
  });

  return (
    <group position={[x, 0, z]}>
      {/* Semi-transparent glass panels rotated to face the center ring anchor */}
      <mesh
        ref={meshRef}
        rotation={[0, -angle - Math.PI / 2, 0]}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={() => setHovered(false)}
        onClick={() => alert(`Accessing ${item.label} Module...`)}
      >
        <boxGeometry args={[1.4, 0.7, 0.04]} />
        <meshStandardMaterial 
          color={hovered ? item.color : '#161c28'} 
          roughness={0.3}
          metalness={0.7}
          transparent={true}
          opacity={0.75}
        />
      </mesh>

      {/* Upgraded 3D DOM Typography Layer:
        - Removed 'transform' to make labels billboard face forward (no mirror flip)
        - Added 'occlude' array to drop opacity to zero when passing behind foreground meshes
      */}
      <Html
        position={[0, 0, 0.05]}
        center
        distanceFactor={3}
        occlude={[meshRef]}
        className="glass-panel-label"
      >
        <span style={{ 
          color: hovered ? item.color : '#ffffff', 
          transition: 'color 0.2s ease, transform 0.2s ease',
          fontSize: '16px',
          fontWeight: '800',
          letterSpacing: '0.08em',
          userSelect: 'none',
          pointerEvents: 'none',
          display: 'block',
          transform: hovered ? 'scale(1.1)' : 'scale(1.0)'
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