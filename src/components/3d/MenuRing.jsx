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

function MenuPanel({ item, angle, radius, currentRingRotation }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Compute fixed layout coordinate spacing around the ring perimeter
  const x = radius * Math.cos(angle);
  const z = radius * Math.sin(angle);

  useFrame((state) => {
    if (meshRef.current) {
      // Smooth interactive hover bounce height adjustments
      meshRef.current.position.y = hovered 
        ? Math.sin(state.clock.getElapsedTime() * 5) * 0.06 
        : 0;

      // Rule 3: Strict Billboard Alignment Math
      // Manually offsets the panel's local frame against the parents rotation vector,
      // forcing the flat face to remain precisely parallel to the camera view axis.
      const absoluteAngle = angle + currentRingRotation;
      meshRef.current.rotation.y = -absoluteAngle + Math.PI / 2;
    }
  });

  return (
    <group position={[x, 0, z]}>
      {/* Rule 1 & 2: Main 3D Physical Glass Screen Asset */}
      <mesh
        ref={meshRef}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={() => setHovered(false)}
        onClick={() => alert(`Accessing ${item.label} Module...`)}
      >
        <boxGeometry args={[1.6, 0.9, 0.06]} />
        <meshPhysicalMaterial 
          color={hovered ? item.color : '#ffffff'} 
          transmission={0.65}
          roughness={0.15}
          metalness={0.0}
          thickness={0.6}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          transparent={true}
          opacity={hovered ? 0.90 : 0.35}
        />
      </mesh>

      {/* Rule 4: Clean HTML Fluid Overlay Text Integration */}
      <Html
        position={[0, 0, 0.04]}
        center
        distanceFactor={3}
        pointerEvents="none"
      >
        <span style={{ 
          color: hovered ? item.color : '#ffffff', 
          transition: 'color 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
          fontSize: '14px',
          fontWeight: '900',
          letterSpacing: '0.18em',
          userSelect: 'none',
          display: 'block',
          whiteSpace: 'nowrap',
          textShadow: hovered 
            ? `0 0 12px ${item.color}, 0 2px 4px rgba(0,0,0,0.8)` 
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
  const rotationRef = useRef(0);

  useFrame((state, delta) => {
    if (ringRef.current) {
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
            radius={2.5} 
            currentRingRotation={rotationRef.current}
          />
        );
      })}
    </group>
  );
}