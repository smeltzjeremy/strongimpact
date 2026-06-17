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

  const x = radius * Math.cos(angle);
  const z = radius * Math.sin(angle);

  useFrame((state) => {
    if (meshRef.current) {
      // Smooth floating animation
      meshRef.current.position.y = hovered 
        ? Math.sin(state.clock.getElapsedTime() * 5) * 0.08 
        : 0;

      // Absolute Correction Matrix to face camera perfectly
      const totalAngle = angle + currentRingRotation;
      meshRef.current.rotation.y = -totalAngle + Math.PI / 2;
    }
  });

  return (
    <group position={[x, 0, z]}>
      {/* Premium Translucent Frosted Glass Plate */}
      <mesh
        ref={meshRef}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={() => setHovered(false)}
        onClick={() => alert(`Accessing ${item.label} Module...`)}
      >
        <boxGeometry args={[1.0, 0.6, 0.03]} />
        <meshPhysicalMaterial 
          color={hovered ? item.color : '#ffffff'} 
          transmission={0.9}        /* High transmission so red stars glide beautifully through the panel body */
          roughness={0.15}          /* Balanced roughness: frost appearance without losing glass sheen */
          metalness={0.0}
          thickness={0.3}
          clearcoat={0.8}           /* Brings back a high-end glossy polished lacquer shine */
          clearcoatRoughness={0.05}
          transparent={true}
          opacity={hovered ? 0.95 : 0.25} /* Deep transparency to make it look lightweight and premium */
        />
      </mesh>

      {/* Crisp Overlay Label - Removed 'occlude' to instantly fix header text blackout bug */}
      <Html
        position={[0, 0, 0.02]}
        center
        distanceFactor={3}
        className="glass-panel-label"
        style={{
          background: hovered ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.01)',
          padding: '12px 24px',
          borderRadius: '8px',
          border: hovered ? `1px solid ${item.color}` : '1px solid rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
          transition: 'all 0.3s ease',
          pointerEvents: 'none'
        }}
      >
        <span style={{ 
          color: hovered ? item.color : '#ffffff', 
          transition: 'color 0.3s ease',
          fontSize: '11px',
          fontWeight: '900',
          letterSpacing: '0.15em',
          display: 'block',
          textShadow: hovered ? `0 0 10px ${item.color}` : '0 2px 4px rgba(0,0,0,0.6)'
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
      ringRef.current.rotation.y += delta * 0.07;
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
            radius={2.6} 
            currentRingRotation={rotationRef.current}
          />
        );
      })}
    </group>
  );
}