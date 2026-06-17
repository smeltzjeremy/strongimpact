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

  // Position coordinates calculated around the perimeter circle
  const x = radius * Math.cos(angle);
  const z = radius * Math.sin(angle);

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle float animation for interactive items
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
        {/* Futuristic floating panel layout geometry */}
        <boxGeometry args={[1.2, 0.7, 0.05]} />
        
        {/* High-End Frosted Glassmorphism Physical Material */}
        <meshPhysicalMaterial 
          color={hovered ? item.color : '#ffffff'} 
          transmission={0.6}       /* High transparency to let background light pass through */
          opacity={1}              /* Full material opacity so transmission works perfectly */
          transparent={true}
          roughness={0.25}         /* Micro-surface texture to create the frosted blur effect */
          metalness={0.1}          /* Low metalness to maintain glass refraction properties */
          thickness={0.5}          /* Simulates internal glass thickness to refract background stars */
          ior={1.5}                /* Index of Refraction for standard window/tempered glass */
          clearcoat={1.0}          /* Added ultra-smooth glossy reflection coat on top of frost */
          clearcoatRoughness={0.1}
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
      ringRef.current.rotation.y += delta * 0.15; // Continuous smooth orbital rotation
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