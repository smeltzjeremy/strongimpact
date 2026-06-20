import React, { useMemo } from 'react';
import * as THREE from 'three';

export default function InteractiveGalleryWheel() {
  // 📐 Construct a static 3D sculptural surface with smooth physical ripples
  const curvedGeometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(40, 40, 100, 100);
    const pos = geo.attributes.position;
    
    // Mold physical 3D valleys and peaks into the mesh so it catches light like the photo
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      
      // Static math creates fixed ribbons: no time variable, no motion
      const zValue = Math.sin(x * 0.25) * Math.cos(y * 0.2) * 0.8 
                   + Math.sin(x * 0.5) * 0.4;
                   
      pos.setZ(i, zValue);
    }
    
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <group>
      {/* 🌊 LAYER 1: STATIC HIGH-GLOSS CHROMIUM SCULPTURE */}
      <mesh 
        geometry={curvedGeometry} 
        position={[0, 0, -8]} 
        rotation={[-Math.PI / 3.5, 0, 0]}
      >
        <meshPhysicalMaterial 
          color="#020204"          // Deep obsidian black base
          roughness={0.03}         // Highly polished, mirror finish
          metalness={1.0}          // Pure metallic reflection properties
          clearcoat={1.0}          // Secondary glass shell layer to catch rim light
          clearcoatRoughness={0.01}
        />
      </mesh>
    </group>
  );
}