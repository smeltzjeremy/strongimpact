import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';

const MENU_ITEMS = [
  { id: 1, color: '#00ffcc' },
  { id: 2, color: '#3399ff' },
  { id: 3, color: '#ff3366' },
  { id: 4, color: '#ffcc00' },
  { id: 5, color: '#b833ff' }
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
    <group position={[x, 0, z]} rotation={[0, -angle - Math.PI / 2, 0]}>
      {/* Absolute raw geometry baseline - No text, no canvas textures */}
      <mesh
        ref={meshRef}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={() => setHovered(false)}
        onClick={() => alert(`Clicked Panel ${item.id}`)}
      >
        <boxGeometry args={[1.2, 0.7, 0.05]} />
        <meshStandardMaterial 
          color={hovered ? item.color : '#22283a'} 
          roughness={0.5}
          metalness={0.2}
        />
      </mesh>
    </group>
  );
}

export default function MenuRing() {
  const ringRef = useRef();

  useFrame((state, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.y += delta * 0.15;
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
            radius={2.2} 
          />
        );
      })}
    </group>
  );
}