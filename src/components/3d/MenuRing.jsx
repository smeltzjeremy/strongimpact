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

  // Calculate the static position on the circle radius
  const x = radius * Math.cos(angle);
  const z = radius * Math.sin(angle);

  useFrame((state) => {
    if (meshRef.current) {
      // 1. Smooth hovering float physics
      meshRef.current.position.y = hovered 
        ? Math.sin(state.clock.getElapsedTime() * 5) * 0.08 
        : 0;

      // 2. Continuous Mathematical Alignment Matrix
      // To prevent HTML clipping errors, we manually compute the exact counter-angle 
      // required to keep the panel's front face pointing perfectly at the viewport lens.
      const totalAbsoluteAngle = angle + currentRingRotation;
      meshRef.current.rotation.y = -totalAbsoluteAngle - Math.PI / 2;
    }
  });

  return (
    <group position={[x, 0, z]}>
      {/* Premium 3D Physical Glass Plate */}
      <mesh
        ref={meshRef}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={() => setHovered(false)}
        onClick={() => alert(`Accessing ${item.label} Module...`)}
      >
        <boxGeometry args={[1.4, 0.7, 0.06]} />
        <meshPhysicalMaterial 
          color={hovered ? item.color : '#111622'} 
          transmission={0.85}       /* Highly translucent obsidian glass pass */
          roughness={0.05}          /* Ultra polished, mirror-like finish */
          metalness={0.1}
          thickness={1.2}           /* Thick edge depth for dramatic light refraction */
          clearcoat={1.0}           /* Adds a highly reflective glossy outer lacquer shell */
          clearcoatRoughness={0.02} /* Sharp glares from the environment skybox map */
          transparent={true}
          opacity={hovered ? 0.95 : 0.6} 
        />
      </mesh>

      {/* Frosted Backdrop HTML Element */}
      <Html
        position={[0, 0, 0.04]}
        center
        distanceFactor={3}
        occlude={[meshRef]}
        className="glass-panel-label"
        style={{
          background: hovered ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.02)',
          padding: '16px 32px',
          borderRadius: '8px',
          border: hovered ? `1px solid ${item.color}` : '1px solid rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow: hovered 
            ? `0 8px 32px 0 rgba(0, 255, 204, 0.15), inset 0 0 8px ${item.color}` 
            : '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
          transition: 'all 0.3s ease',
          pointerEvents: 'none'
        }}
      >
        <span style={{ 
          color: hovered ? item.color : '#ffffff', 
          transition: 'color 0.3s ease',
          fontSize: '14px',
          fontWeight: '900',
          letterSpacing: '0.15em',
          display: 'block',
          textShadow: hovered ? `0 0 10px ${item.color}` : '0 2px 4px rgba(0,0,0,0.5)'
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
      const increment = delta * 0.08; // Smooth, premium cinematic spin speed
      ringRef.current.rotation.y += increment;
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