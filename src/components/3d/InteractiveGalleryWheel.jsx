import React, { useMemo } from 'react';
import * as THREE from 'three';

export default function InteractiveGalleryWheel() {
  const chromeGeometry = useMemo(() => {
    // Keeping your high density grid to ensure those glassy reflections stay silky smooth
    const geo = new THREE.PlaneGeometry(80, 80, 140, 140);
    const pos = geo.attributes.position;
    
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      
      // Your exact optimized frequency formula to draw more ribbons down the page
      const zValue = Math.sin(x * 1.2) * 0.45
                   + Math.cos(y * 1.0) * 0.35
                   + Math.sin(x * 2.0 + y * 1.5) * 0.25;
                   
      pos.setZ(i, zValue);
    }
    
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <group>
      {/* 🌊 LAYER 1: MULTIPLIED LIQUID CHROMIUM BACKDROP */}
      <mesh 
        geometry={chromeGeometry} 
        position={[0, -1, -11]}       // Shifted slightly down/forward to pull ribbons to the bottom
        rotation={[-Math.PI / 3.2, 0, 0]} // Adjusted tilt angle to keep the bottom half in view
      >
        <meshPhysicalMaterial 
          color="#0a0a0f" 
          metalness={1.0} 
          roughness={0.07}            // Tailored gloss finish to match your pristine reflection quality
          clearcoat={1.0} 
        />
      </mesh>
    </group>
  );
}