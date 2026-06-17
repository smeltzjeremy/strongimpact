import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

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

  // Calculate fixed circle layout coordinates
  const x = radius * Math.cos(angle);
  const z = radius * Math.sin(angle);

  // Add subtle float animation to hovered panel
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = hovered 
        ? Math.sin(state.clock.getElapsedTime() * 5) * 0.1 
        : 0;
    }
  });

  return (
    <group position={[x, 0, z]} rotation={[0, -angle - Math.PI / 2, 0]}>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={(e) => setHovered(false)}
        onClick={() => alert(`Accessing ${item.label} Module...`)}
      >
        {/* Sleek semi-translucent futuristic screen panel */}
        <boxGeometry args={[1.2, 0.7, 0.05]} />
        <meshStandardMaterial 
          color={hovered ? item.color : '#1a1a1a'} 
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.85}
        />
      </mesh>
      
      {/* Crisp typography floated slightly in front of the panel */}
      <Text
        position={[0, 0, 0.04]}
        fontSize={0.12}
        color="#ffffff"
        font="https://fonts.gstatic.com/s/manrope/v14/xn7_YHEm1n6pf1XnWdhJXs6E.woff"
        anchorX="center"
        anchorY="middle"
      >
        {item.label}
      </Text>
    </group>
  );
}

export default function MenuRing() {
  const ringRef = useRef();
  const radius = 2.5;

  // Slowly rotate the entire selection ring system over time
  useFrame((state, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.y += delta * 0.05;
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