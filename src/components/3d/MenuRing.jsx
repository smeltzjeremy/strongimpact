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

  // Math-calculated stable layout positions on the circle path
  const x = radius * Math.cos(angle);
  const z = radius * Math.sin(angle);

  useFrame((state) => {
    if (meshRef.current) {
      // Smooth hovering floating animation
      meshRef.current.position.y = hovered 
        ? Math.sin(state.clock.getElapsedTime() * 5) * 0.08 
        : 0;

      // Absolute Correction Matrix:
      // Dynamically angles the panel to face the camera center perfectly
      const totalAngle = angle + currentRingRotation;
      meshRef.current.rotation.y = -totalAngle + Math.PI / 2;
    }
  });

  return (
    <group position={[x, 0, z]}>
      {/* 3D Physical Glass Card Asset */}
      <mesh
        ref={meshRef}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={() => setHovered(false)}
        onClick={() => alert(`Accessing ${item.label} Module...`)}
      >
        {/* Adjusted dimensions (1.0 width) for a sleek, beautifully fitted mobile presence */}
        <boxGeometry args={[1.0, 0.6, 0.04]} />
        <meshPhysicalMaterial 
          color={hovered ? item.color : '#ffffff'} 
          transmission={0.85}       /* High transmission for pristine star visibility */
          roughness={0.22}          /* Frosted finish scatters harsh highlights into a premium glow */
          metalness={0.02}
          thickness={0.5}           /* Fine edge thickness */
          clearcoat={0.4}           /* Subdued glossy outer layer to prevent unpolished smearing */
          clearcoatRoughness={0.1} 
          transparent={true}
          opacity={hovered ? 0.9 : 0.35} 
        />
      </mesh>

      {/* Frosted Backdrop HTML Element */}
      <Html
        position={[0, 0, 0.03]}
        center
        distanceFactor={3}
        occlude={[meshRef]}
        className="glass-panel-label"
        style={{
          background: hovered ? 'rgba(0, 0, 0, 0.25)' : 'rgba(255, 255, 255, 0.01)',
          padding: '12px 24px',
          borderRadius: '8px',
          border: hovered ? `1px solid ${item.color}` : '1px solid rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          boxShadow: hovered ? `0 8px 24px 0 rgba(0, 0, 0, 0.2)` : '0 4px 16px 0 rgba(0, 0, 0, 0.3)',
          transition: 'all 0.3s ease',
          pointerEvents: 'none'
        }}
      >
        <span style={{ 
          color: hovered ? item.color : '#ffffff', 
          transition: 'color 0.3s ease',
          fontSize: '12px',
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
      ringRef.current.rotation.y += delta * 0.08; // Elegant, slow-rolling pacing
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
            radius={2.6} /* Pushed radius out to give mobile viewports breathing room */
            currentRingRotation={rotationRef.current}
          />
        );
      })}
    </group>
  );
}