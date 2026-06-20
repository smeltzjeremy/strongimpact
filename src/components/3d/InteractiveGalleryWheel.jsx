import React, { useMemo } from 'react';
import * as THREE from 'three';

export default function InteractiveGalleryWheel() {
  // Construct a larger, wider static 3D chrome surface with no motion textures
  const massiveChromeGeometry = useMemo(() => {
    // Applied your expanded [50, 50] grid sizing parameters
    const geo = new THREE.PlaneGeometry(50, 50, 90, 90);
    const pos = geo.attributes.position;
    
    // Static math molds the metal ribbons using your snippet's spatial frequencies (0.5, 0.4, 1.2)
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      
      // Removed uTime entirely so it stays completely frozen
      const zValue = Math.sin(x * 0.5) * 0.6
                   + Math.cos(y * 0.4) * 0.45
                   + Math.sin(x * 1.2 + y * 0.8) * 0.25;
                   
      pos.setZ(i, zValue);
    }
    
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <group>
      {/* 🌊 LAYER 1: EXPANDED BRIGHT STATIC OBSIDIAN CHROME */}
      <mesh 
        geometry={massiveChromeGeometry} 
        position={[0, 0, -8]} 
        rotation={[-Math.PI / 3.2, 0, 0]} // Applied your layout rotation angle
      >
        <meshPhysicalMaterial 
          color="#030305"          // Dark obsidian contrast base
          roughness={0.01}         // Max polish for brighter, mirror reflections
          metalness={1.0}          // Heavy metal rating
          clearcoat={1.0}          // Intense glassy clearcoat layer to pop white highlights
          clearcoatRoughness={0.005}
        />
      </mesh>
    </group>
  );
}