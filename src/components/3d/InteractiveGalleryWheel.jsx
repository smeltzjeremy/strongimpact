import React from 'react';

export default function InteractiveGalleryWheel() {
  return (
    <group>
      {/* 🌊 LAYER 1: SOLID CHROME BACKDROP STABILIZER */}
      <mesh position={[0, 0, -12]} rotation={[-Math.PI / 3, 0, 0]}>
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