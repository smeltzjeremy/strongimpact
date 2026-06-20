import React, { useMemo } from 'react';
import * as THREE from 'three';

export default function InteractiveGalleryWheel() {
  // Building the backdrop using your dense grid specifications
  const ultraSmoothGeometry = useMemo(() => {
    // Your massive dimensions and high division counts to stop jagged stretching
    const geo = new THREE.PlaneGeometry(90, 90, 180, 180);
    const pos = geo.attributes.position;
    
    // Smooth ribbon coordinates mapped symmetrically without uTime
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      
      const zValue = Math.sin(x * 0.8) * 0.35
                   + Math.cos(y * 0.7) * 0.28
                   + Math.sin(x * 1.5 + y * 1.1) * 0.15;
                   
      pos.setZ(i, zValue);
    }
    
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <group>
      {/* 🌊 LAYER 1: ULTRA-DENSE STATIC SILK OBSIDIAN CHROME */}
      <mesh 
        geometry={ultraSmoothGeometry} 
        position={[0, -4, -15]}       // Your updated coordinate mapping
        rotation={[-Math.PI / 3.8, 0, 0]} // Your updated framing rotation vector
      >
        <meshPhysicalMaterial 
          color="#020204"              // Deep obsidian base
          roughness={0.05}             // Your optimized gloss specification
          metalness={1.0}              // Pure mirror reflective properties
          clearcoat={1.0}              // High-sheen top layer
          clearcoatRoughness={0.0}     // Your mirror-smooth glass finish vector
        />
      </mesh>
    </group>
  );
}