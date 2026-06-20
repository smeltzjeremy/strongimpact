import React, { useMemo } from 'react';
import * as THREE from 'three';

export default function InteractiveGalleryWheel() {
  // Construct a perfectly smooth, full-coverage backdrop using your clean ribbon tuning
  const smoothChromeGeometry = useMemo(() => {
    // Large, dense grid to support the smooth curve translations edge-to-edge
    const geo = new THREE.PlaneGeometry(60, 60, 140, 140);
    const pos = geo.attributes.position;
    
    // Applying your cleaner frequency multipliers (0.8, 0.7, 1.5, 1.1) completely frozen
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      
      // Removed uTime so this pristine ribbon structure locks in solid
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
      {/* 🌊 LAYER 1: CLEAN FULL-VIEWPORT STATIC OBSIDIAN CHROME */}
      <mesh 
        geometry={smoothChromeGeometry} 
        position={[0, 0, -8]} // Kept flat at center to ensure zero top-edge clipping
      >
        <meshPhysicalMaterial 
          color="#030306"          // Match your precise color vector mix base
          roughness={0.01}         // Maximum gloss mirror polish
          metalness={1.0}          // Pure chrome surface rating
          clearcoat={1.0}          // Mirror clearcoat layer
          clearcoatRoughness={0.0} // Perfectly smooth glass shell reflections
        />
      </mesh>
    </group>
  );
}