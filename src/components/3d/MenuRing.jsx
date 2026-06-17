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
  const groupRef = useRef();
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Calculate base layout positions along the circle radius
  const x = radius * Math.cos(angle);
  const z = radius * Math.sin(angle);

  useFrame((state) => {
    // 1. Smooth hovering float physics
    if (meshRef.current) {
      meshRef.current.position.y = hovered 
        ? Math.sin(state.clock.getElapsedTime() * 5) * 0.08 
        : 0;
    }

    // 2. Continuous Camera Look-At Vector Alignment
    // This dynamically tracks the camera's real-time position matrix 
    // and twists the panel's rotation axis so it always squarely faces your eyes.
    if (groupRef.current) {
      groupRef.current.lookAt(state.camera.position);
    }
  });

  return (
    // We bind the position and the lookAt target calculation directly to the local group anchor
    <group ref={groupRef} position={[x, 0, z]}>
      
      {/* Dynamic 3D Physical Glass Plate */}
      <mesh
        ref={meshRef}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={() => setHovered(false)}
        onClick={() => alert(`Accessing ${item.label} Module...`)}
      >
        <boxGeometry args={[1.4, 0.7, 0.06]} />
        <meshPhysicalMaterial 
          color={hovered ? item.color : '#ffffff'} 
          transmission={0.6}        
          roughness={0.1}           
          metalness={0.05}
          thickness={0.8}           
          clearcoat={1.0}           
          clearcoatRoughness={0.05} 
          transparent={true}
          opacity={hovered ? 0.85 : 0.45} 
        />
      </mesh>

      {/* Frosted Backdrop Glassmorphism Overlay */}
      <Html
        position={[0, 0, 0.035]}
        center
        distanceFactor={3}
        occlude={[meshRef]}
        className="glass-panel-label"
        style={{
          background: hovered ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.03)',
          padding: '20px 40px',
          borderRadius: '12px',
          border: hovered ? `1px solid ${item.color}` : '1px solid rgba(255, 255, 255, 0.12)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: hovered 
            ? `0 8px 32px 0 rgba(0, 255, 204, 0.2), inset 0 0 12px ${item.color}` 
            : '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 0 6px rgba(255,255,255,0.05)',
          transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
          pointerEvents: 'none'
        }}
      >
        <span style={{ 
          color: hovered ? item.color : '#ffffff', 
          transition: 'color 0.3s ease',
          fontSize: '15px',
          fontWeight: '900',
          letterSpacing: '0.15em',
          display: 'block',
          textShadow: hovered 
            ? `0 0 12px ${item.color}` 
            : '0 2px 4px rgba(0,0,0,0.6)'
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
      ringRef.current.rotation.y += delta * 0.10; // Cinematic pacing rotation
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
          />
        );
      })}
    </group>
  );
}