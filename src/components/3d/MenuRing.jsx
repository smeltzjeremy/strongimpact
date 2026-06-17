import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';

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

  // Calculate coordinates on the circle perimeter
  const x = radius * Math.cos(angle);
  const z = radius * Math.sin(angle);

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle float animation for hovered items
      meshRef.current.position.y = hovered 
        ? Math.sin(state.clock.getElapsedTime() * 5) * 0.08 
        : 0;
    }
  });

  return (
    <group position={[x, 0, z]} rotation={[0, -angle - Math.PI / 2, 0]}>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={() => setHovered(false)}
        onClick={() => alert(`Accessing ${item.label} Module...`)}
      >
        {/* Sleek, futuristic panel geometry */}
        <boxGeometry args={[1.2, 0.7, 0.05]} />
        <meshStandardMaterial 
          color={hovered ? item.color : '#1a1a1a'} 
          roughness={0.3}
          metalness={0.7}
          transparent
          opacity={0.85}
        />
      </mesh>
    </group>
  );
}

export default function MenuRing() {
  const ringRef = useRef();
  const radius = 2.2;

  useFrame((state, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.y += delta * 0.15; // Smooth rotational drift
    }
  });

  return (
    <group ref={ringRef}>
      {MENU_ITEMS.map((item, index) => {
        const angle = (index / MENU_ITEMS.length) * Math.PI * 2;
        return (
          <MenuPanel 
            key={item.id} 
            item={item} 
            angle={angle} 
            radius={radius} 
          />
        );
      })}
    </group>
  );
}