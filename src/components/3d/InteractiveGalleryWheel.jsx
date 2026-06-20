import React, { useMemo } from 'react';
import * as THREE from 'three';

export default function InteractiveGalleryWheel() {
  const smoothRibbonGeometry = useMemo(() => {
    // Large, high-density mesh to support perfectly fluid lines
    const geo = new THREE.PlaneGeometry(80, 80, 180, 180);
    const pos = geo.attributes.position;
    
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      
      // Dropped multipliers down significantly to widen and smooth out the ribbons
      const zValue = Math.sin(x * 0.4) * 0.8
                   + Math.cos(y * 0.3) * 0.6
                   + Math.sin(x * 0.8 + y * 0.6) * 0.4;
      
      pos.setZ(i, zValue);
    }
    
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <group>
      {/* 🌊 LAYER 1: SMOOTH LIQUID OBSIDIAN CHROME */}
      <mesh 
        geometry={smoothRibbonGeometry} 
        position={[0, 0, -12]} 
        rotation={[-Math.PI / 3.5, 0, 0]}
      >
        <meshPhysicalMaterial 
          color="#040407" 
          metalness={1.0} 
          roughness={0.2} // Blurs out jagged pixels into silky metallic gradients
          clearcoat={1.0}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </group>
  );
}