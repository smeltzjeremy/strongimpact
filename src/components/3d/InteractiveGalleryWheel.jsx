import React from 'react';

export default function InteractiveGalleryWheel() {
  return (
    <group>
      {/* 🌊 LAYER 1: BASIC HIGH-SHINE PLANE (RELIABLE COVERAGE) */}
      <mesh position={[0, 0, -10]} rotation={[-Math.PI / 3, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshPhysicalMaterial 
          color="#0a0a0f" 
          metalness={1.0} 
          roughness={0.05} 
          clearcoat={1.0} 
        />
      </mesh>
    </group>
  );
}