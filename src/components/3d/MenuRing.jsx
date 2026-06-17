import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const MENU_ITEMS = [
  { id: 1, label: 'GRAPHICS', color: '#00ffcc' },
  { id: 2, label: 'PIPELINE', color: '#3399ff' },
  { id: 3, label: 'DATABASE', color: '#ff3366' },
  { id: 4, label: 'SECURITY', color: '#ffcc00' },
  { id: 5, label: 'NETWORKS', color: '#b833ff' }
];

// Helper function to procedurally draw block-style text paths entirely locally
function createLocalTextMesh(text) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  
  // Create a crisp, high-contrast text map texture locally
  ctx.fillStyle = 'rgba(0,0,0,0)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = 'bold 32px sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

function MenuPanel({ item, angle, radius }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Generate the text texture locally once per component mounting
  const textTexture = useMemo(() => createLocalTextMesh(item.label), [item.label]);

  // Position coordinates calculated around the perimeter circle
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
      {/* The Glass Panel */}
      <mesh
        ref={meshRef}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={() => setHovered(false)}
        onClick={() => alert(`Accessing ${item.label} Module...`)}
      >
        <boxGeometry args={[1.2, 0.7, 0.05]} />
        <meshPhysicalMaterial 
          color={hovered ? item.color : '#ffffff'} 
          transmission={0.6}
          opacity={1}
          transparent={true}
          roughness={0.25}
          metalness={0.1}
          thickness={0.5}
          ior={1.5}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* The Localized Label Floating Slightly in Front */}
      <mesh position={[0, 0, 0.031]} pointerEvents="none">
        <planeGeometry args={[1.0, 0.25]} />
        <meshBasicMaterial 
          map={textTexture} 
          transparent={true} 
          blending={THREE.AdditiveBlending}
          opacity={0.9}
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
            radius={radius} 
          />
        );
      })}
    </group>
  );
}