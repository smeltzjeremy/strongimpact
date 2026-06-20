import React from 'react';

export default function InteractiveGalleryWheel() {
  return (
    <group>
      {/* 🌊 LAYER 1: ROBUST HIGH-SHINE METAL STANDARD PLANE */}
      <mesh position={[0, 0, -12]} rotation={[-Math.PI / 3, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial 
          color="#0a0a0f" 
          metalness={1.0} 
          roughness={0.1} // Smoothly disperses the harsh light spot
        />
      </mesh>
    </group>
  );
}