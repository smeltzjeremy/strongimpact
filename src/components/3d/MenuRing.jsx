import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

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
      meshRef.current.position.y = hovered
        ? Math.sin(state.clock.getElapsedTime() * 4) * 0.12 + 0.05
        : Math.sin(state.clock.getElapsedTime() * 1.5) * 0.02;

      const absoluteAngle = angle + currentRingRotation;
      meshRef.current.rotation.y = -absoluteAngle + Math.PI / 2;
    }
  });

  return (
    <group position={[x, 0, z]}>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={() => setHovered(false)}
        onClick={() => alert(`Accessing ${item.label} Module...`)}
      >
        <boxGeometry args={[1.8, 1.0, 0.03]} />
        <meshPhysicalMaterial
          color="#22242a"               // Smoked charcoal base color to create a dark refraction core
          transmission={0.91}           // Slightly adjusted down to retain dark body contrast
          roughness={0.12}              // Smoother satin floor for sharper reflections
          metalness={0.10}              // Micro-bumped metalness to harden specular shine
          thickness={0.15}              
          ior={1.54}                    
          clearcoat={1.0}               
          clearcoatRoughness={0.01}     
          envMapIntensity={2.5}         // Enhanced reflection response to pop against the dark backdrop
          transparent={true}
          opacity={hovered ? 0.95 : 0.75}
          side={THREE.DoubleSide}
        />
      </mesh>

      <Html position={[0, 0, 0.03]} center distanceFactor={3} pointerEvents="none">
        <span style={{
          color: hovered ? item.color : '#ffffff',
          fontSize: '14px',
          fontWeight: '800',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          padding: '10px 26px',
          background: 'rgba(10, 15, 30, 0.5)',
          backdropFilter: 'blur(12px)',
          borderRadius: '9999px',
          border: hovered ? `1px solid ${item.color}` : '1px solid rgba(255,255,255,0.2)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
          transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
          whiteSpace: 'nowrap',
          userSelect: 'none',
          textShadow: hovered ? `0 0 12px ${item.color}` : '0 2px 6px rgba(0,0,0,0.8)'
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

  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const activeRadius = width < 768 ? 2.15 : 2.75;

  useFrame((state, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.y += delta * 0.08;
      rotationRef.current = ringRef.current.rotation.y;
    }
  });

  return (
    <group>
      {/* Retained rim and back-lighting profile to keep edge layouts sharp */}
      <directionalLight
        position={[0, 9, -15]}
        intensity={6.8}                
        color="#b0f2ff"
      />

      <pointLight 
        position={[-6, 7, -10]} 
        intensity={4.0}                 
        color="#67ffcc" 
        distance={30}
      />

      <pointLight 
        position={[6, 7, -10]} 
        intensity={4.0}                 
        color="#3399ff" 
        distance={30}
      />

      <directionalLight
        position={[0, 4, 12]}
        intensity={1.0}
        color="#ffffff"
      />

      <ambientLight intensity={0.12} color="#0a1530" />

      <group ref={ringRef}>
        {MENU_ITEMS.map((item, index) => {
          const angle = (index / MENU_ITEMS.length) * Math.PI * 2;
          return (
            <MenuPanel
              key={`${item.id}-${index}`}
              item={item}
              angle={angle}
              radius={activeRadius}
              currentRingRotation={rotationRef.current}
            />
          );
        })}
      </group>
    </group>
  );
}