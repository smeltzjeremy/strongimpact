import React, { useMemo } from 'react';
import * as THREE from 'three';

export default function InteractiveGalleryWheel() {
  const curvedGeometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(80, 80, 200, 200);
    const pos = geo.attributes.position;
    
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      
      const zValue = Math.sin(x * 1.5) * 0.4
                   + Math.cos(y * 1.2) * 0.35
                   + Math.sin(x * 2.5 + y * 1.8) * 0.2;
      
      pos.setZ(i, zValue);
    }
    
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <group>
      <mesh 
        geometry={curvedGeometry} 
        position={[0, 0, -12]} 
        rotation={[-Math.PI / 3.5, 0, 0]}
      >
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