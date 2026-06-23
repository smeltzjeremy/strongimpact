import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function VectorCloudLayer({ 
  zPos = 0, 
  solidColor = '#c23d55', 
  shadowOpacity = 0.4,
  parallaxFactor = 0.05,
  seed = 1.0 
}) {
  const containerRef = useRef();

  // 1. Structural Bezier Path Geometry (Stretched wide to secure ultra-wide screen bounds)
  const [geometry, lineGeometry] = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-14, -5); // Shifted even further left to permanently block corner leakage
    
    const h1 = -0.1 + Math.sin(seed) * 0.3;
    const h2 = 0.2 + Math.cos(seed) * 0.4;
    const h3 = 0.0 + Math.sin(seed * 2.5) * 0.25;

    shape.bezierCurveTo(-9.0, h1 - 0.1, -7.0, h1 + 0.9, -5.0, h2);
    shape.bezierCurveTo(-2.5, h2 + 0.7, -1.0, h2 + 0.6, 0.5, h3);
    shape.bezierCurveTo(2.5, h3 + 1.0, 4.5, h1 + 0.8, 6.5, h2 - 0.1);
    shape.bezierCurveTo(8.5, h2 + 0.6, 10.5, h3 + 0.7, 14, -0.2);
    
    // Bottom bounding lines for the solid fill mesh
    shape.lineTo(14, -5);
    shape.lineTo(-14, -5);
    shape.closePath();

    // 2. Isolate the top ridge path to generate a clean outline vector thread
    const points = [];
    points.push(new THREE.Vector3(-14, -0.2, 0));
    
    // Smoothly step across the curve function to draw a matching high-resolution rim line
    for (let i = 0; i <= 50; i++) {
      const t = i / 50;
      // Re-map the exact bezier profile calculation
      const x = -14 + t * 28;
      let y = 0;
      if (x < -5.0) y = THREE.MathUtils.lerp(-0.2, h2, (x + 14) / 9);
      else if (x < 0.5) y = THREE.MathUtils.lerp(h2, h3, (x + 5.0) / 5.5);
      else if (x < 6.5) y = THREE.MathUtils.lerp(h3, h2 - 0.1, (x - 0.5) / 6.0);
      else y = THREE.MathUtils.lerp(h2 - 0.1, -0.2, (x - 6.5) / 7.5);
      points.push(new THREE.Vector3(x, y + 0.01, 0)); // Nudged up slightly to sit on top edge
    }

    const shapeGeo = new THREE.ShapeGeometry(shape);
    const lineGeo = new THREE.BufferGeometry().setFromPoints(points);

    return [shapeGeo, lineGeo];
  }, [seed]);

  // Clean, opaque solid color block material
  const colorMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color(solidColor),
      transparent: false,
      depthTest: true,
      depthWrite: true,
      blending: THREE.NormalBlending
    });
  }, [solidColor]);

  // Crisp, light cutout outline line rim
  const rimLineMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: new THREE.Color('#ffb3be'), // Light, glowing coral white outline tone
      linewidth: 2, // Enhances vector edge presence
      transparent: true,
      opacity: 0.6,
      blending: THREE.NormalBlending
    });
  }, []);

  // Drop Shadow Material
  const shadowMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: '#000000',
      transparent: true,
      opacity: shadowOpacity,
      depthTest: true,
      depthWrite: false,
      blending: THREE.NormalBlending
    });
  }, [shadowOpacity]);

  // Parallax tracking
  useFrame((state) => {
    if (!containerRef.current) return;
    const targetX = state.pointer.x * parallaxFactor * 0.7;
    const targetY = state.pointer.y * parallaxFactor * 0.35;

    containerRef.current.position.x += (targetX - containerRef.current.position.x) * 0.05;
    containerRef.current.position.y += (targetY - containerRef.current.position.y) * 0.05;
  });

  return (
    <group ref={containerRef}>
      {/* PASS 1: TRANS-BLACK DROP SHADOW MESH */}
      <mesh 
        geometry={geometry} 
        material={shadowMaterial} 
        position={[0, -0.16, zPos - 0.05]} 
      />

      {/* PASS 2: SOLID OPAQUE COLOR SHEET */}
      <mesh 
        geometry={geometry} 
        material={colorMaterial} 
        position={[0, 0, zPos]} 
      />

      {/* PASS 3: CRISP LIGHT PAPERCUT OUTLINE RIM */}
      <line 
        geometry={lineGeometry} 
        material={rimLineMaterial} 
        position={[0, 0, zPos + 0.01]} // Layered cleanly over the color mesh
      />
    </group>
  );
}