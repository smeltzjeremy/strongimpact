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
    <group position={[x, 0, z]} rotation={[0, -angle - Math.PI / 2, 0]}>
      {/* Semi-transparent digital glass panels */}
      <mesh
        ref={meshRef}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={() => setHovered(false)}
        onClick={() => alert(`Accessing ${item.label} Module...`)}
      >
        <boxGeometry args={[1.3, 0.7, 0.04]} />
        <meshStandardMaterial 
          color={hovered ? item.color : '#1e2533'} 
          roughness={0.2}
          metalness={0.8}
          transparent={true}
          opacity={0.65}
        />
      </mesh>

      {/* Bulletproof 3D UI Projection Layer */}
      <Html
        position={[0, 0, 0.021]}
        center
        distanceFactor={4}
        className="glass-panel-label"
      >
        <span style={{ color: hovered ? item.color : '#ffffff', transition: 'color 0.2s ease' }}>
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
            key={item.id} 
            item={item} 
            angle={angle} 
            radius={2.3} 
          />
        );
      })}
    </group>
  );
}