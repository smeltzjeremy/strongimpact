import React, { useMemo } from 'react';
import * as THREE from 'three';

export default function InteractiveGalleryWheel() {
  const chromeGeometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(80, 80, 120, 120);
    const pos = geo.attributes.position;
    
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const elevation = Math.sin(x * 0.6) * 0.4 + Math.cos(y * 0.5) * 0.3;
      pos.setZ(i, elevation);
    }
    
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <group>
      <mesh geometry={chromeGeometry} position={[0, 0, -12]} rotation={[-Math.PI / 3.5, 0, 0]}>
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