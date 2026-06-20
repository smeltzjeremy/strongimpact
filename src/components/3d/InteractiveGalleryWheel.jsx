import React from 'react';

export default function InteractiveGalleryWheel() {
  return (
    <group>
      {/* 🌊 LAYER 1: STATIC HIGH-GLOSS CHROME BACKDROP (REVERTED BASE) */}
      <mesh position={[0, 0, -8]} rotation={[-Math.PI / 3.5, 0, 0]}>
        <planeGeometry args={[40, 40, 80, 80]} />
        <meshPhongMaterial 
          color="#0a0a0a" 
          shininess={100} 
          specular="#ffffff" 
          emissive="#000000" 
        />
      </mesh>
    </group>
  );
}