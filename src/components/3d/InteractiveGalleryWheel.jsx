import React, { useMemo } from 'react';
import * as THREE from 'three';

export default function InteractiveGalleryWheel() {
  // Construct a wide 3D surface using your exact high-frequency multiplied layout values
  const repeatingChromeGeometry = useMemo(() => {
    // Generates a massive backdrop to guarantee complete screen coverage
    const geo = new THREE.PlaneGeometry(60, 60, 120, 120);
    const pos = geo.attributes.position;
    
    // Multiplies the design folds cleanly down the page by removing uTime animations
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      
      // Your exact frequency tuning (1.2, 1.0, 2.2, 1.5) to crowd the empty space with ribbons
      const zValue = Math.sin(x * 1.2) * 0.5
                   + Math.cos(y * 1.0) * 0.4
                   + Math.sin(x * 2.2 + y * 1.5) * 0.3;
                   
      pos.setZ(i, zValue);
    }
    
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <group>
      {/* 🌊 LAYER 1: REPEATING HIGH-CONTRAST STATIC OBSIDIAN CHROME */}
      <mesh 
        geometry={repeatingChromeGeometry} 
        position={[0, -2, -10]} 
        rotation={[-Math.PI / 2.8, 0, 0]} // Your exact framing position vectors
      >
        <meshPhysicalMaterial 
          color="#040408"          // Deep midnight/black contrast base
          roughness={0.01}         // Maximum polish for bright reflections
          metalness={1.0}          // Heavy chrome surface rating
          clearcoat={1.0}          // High-gloss glassy layer to make highlights pop
          clearcoatRoughness={0.005}
        />
      </mesh>
    </group>
  );
}