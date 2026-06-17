import React from 'react';

export default function CustomObject() {
  return (
    <mesh castShadow receiveShadow position={[0, 0, 0]}>
      {/* A complex torusknot shape to perfectly showcase our studio lighting angles */}
      <torusKnotGeometry args={[0.8, 0.25, 120, 16]} />
      
      {/* High-quality material that dynamically reflects key, fill, and rim lights */}
      <meshStandardMaterial 
        color="#00ffcc" 
        roughness={0.2} 
        metalness={0.8} 
      />
    </mesh>
  );
}