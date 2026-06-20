import React, { useMemo } from 'react';
import * as THREE from 'three';

export default function InteractiveGalleryWheel() {
  const ribbonGeometry = useMemo(() => {
    // Large, high-density grid to keep the reflections perfectly fluid
    const geo = new THREE.PlaneGeometry(120, 120, 150, 150);
    const pos = geo.attributes.position;
    
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      
      // Clean, low-frequency math to repeat the design without jagged crinkles
      const zValue = Math.sin(x * 0.4) * 0.6 
                   + Math.cos(y * 0.3) * 0.5 
                   + Math.sin(x * 0.6 + y * 0.5) * 0.3;
                   
      pos.setZ(i, zValue);
    }
    
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <group>
      {/* 🌊 LAYER 1: SMOOTH MULTIPLIED CHROME BACKDROP */}
      <mesh 
        geometry={ribbonGeometry} 
        position={[0, 0, -12]} 
        rotation={[-Math.PI / 3, 0, 0]} // Your exact framing transforms
      >
        <meshPhysicalMaterial 
          color="#0a0a0f" 
          metalness={1.0} 
          roughness={0.08} 
          clearcoat={1.0} 
        />
      </mesh>
    </group>
  );
}