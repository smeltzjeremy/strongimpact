import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const MENU_ITEMS = [
  { id: 1, label: 'GRAPHICS', color: '#00ffcc' },
  { id: 2, label: 'PIPELINE', color: '#3399ff' },
  { id: 3, label: 'DATABASE', color: '#ff3366' },
  { id: 4, label: 'SECURITY', color: '#ffcc00' },
  { id: 5, label: 'NETWORKS', color: '#b833ff' }
];

// Procedurally generates a clean local canvas texture map for typography
function createLocalTextMesh(text) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgba(0,0,0,0)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = 'bold 32px sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  return new THREE.CanvasTexture(canvas);
}

function MenuPanel({ item, angle, radius, envMap }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const textTexture = useMemo(() => createLocalTextMesh(item.label), [item.label]);

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
      {/* Premium Glass Physical Geometry */}
      <mesh
        ref={meshRef}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={() => setHovered(false)}
        onClick={() => alert(`Accessing ${item.label} Module...`)}
      >
        <boxGeometry args={[1.2, 0.7, 0.05]} />
        <meshPhysicalMaterial 
          color={hovered ? item.color : '#ffffff'} 
          envMap={envMap}            /* Feeds studio reflections directly onto the glossy layer */
          envMapIntensity={2.5}      /* Highlights the edges of the panels */
          transmission={0.85}        /* High transmission allows background stars to distort through */
          opacity={1.0}
          transparent={true}
          roughness={0.15}           /* Perfect frosted gloss texture balance */
          metalness={0.0}
          thickness={0.4}            /* Physically bends light objects passing behind it */
          ior={1.45}                 /* Real-world Index of Refraction for premium glass sheets */
          clearcoat={1.0}            /* Crisp, high-gloss surface clearcoat reflection */
          clearcoatRoughness={0.05}
        />
      </mesh>

      {/* Local Text Overlay Layer */}
      <mesh position={[0, 0, 0.031]} pointerEvents="none">
        <planeGeometry args={[1.0, 0.25]} />
        <meshBasicMaterial 
          map={textTexture} 
          transparent={true} 
          opacity={0.85} 
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

export default function MenuRing() {
  const ringRef = useRef();
  
  // Generates a local, real-time procedural lighting environment texture map
  const generatedEnvMap = useMemo(() => {
    const size = 128;
    const data = new Uint8Array(size * size * 3);
    for (let i = 0; i < size * size; i++) {
      const stride = i * 3;
      // Procedural space-neon grid values to cast light maps onto the glass surfaces
      data[stride] = 15;   // R
      data[stride + 1] = 25; // G
      data[stride + 2] = 40; // B
    }
    const texture = new THREE.DataTexture(data, size, size, THREE.RGBFormat);
    texture.mapping = THREE.EquirectangularReflectionMapping;
    texture.needsUpdate = true;
    return texture;
  }, []);

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
            radius={2.2} 
            envMap={generatedEnvMap}
          />
        );
      })}
    </group>
  );
}