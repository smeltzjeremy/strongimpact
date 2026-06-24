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

  // 1. Procedural Shape and True 3D Highlight Border Creation
  const [geometry, borderGeometry] = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-15, -6);
    
    const h1 = -0.1 + Math.sin(seed) * 0.3;
    const h2 = 0.2 + Math.cos(seed) * 0.4;
    const h3 = 0.0 + Math.sin(seed * 2.5) * 0.25;

    shape.bezierCurveTo(-10.0, h1 - 0.1, -7.5, h1 + 0.9, -5.0, h2);
    shape.bezierCurveTo(-2.5, h2 + 0.7, -1.0, h2 + 0.6, 0.5, h3);
    shape.bezierCurveTo(2.5, h3 + 1.0, 4.5, h1 + 0.8, 6.5, h2 - 0.1);
    shape.bezierCurveTo(9.0, h2 + 0.6, 11.5, h3 + 0.7, 15, -0.2);
    
    shape.lineTo(15, -6);
    shape.lineTo(-15, -6);
    shape.closePath();

    const shapeGeo = new THREE.ShapeGeometry(shape);
    
    // Isolate the upper ridge points for a true physical highlight border mesh
    const points = [];
    for (let i = 0; i <= 100; i++) {
      const t = i / 100;
      const x = -15 + t * 30;
      let y = 0;
      if (x < -5.0) y = THREE.MathUtils.lerp(-0.2, h2, (x + 15) / 10);
      else if (x < 0.5) y = THREE.MathUtils.lerp(h2, h3, (x + 5.0) / 5.5);
      else if (x < 6.5) y = THREE.MathUtils.lerp(h3, h2 - 0.1, (x - 0.5) / 6.0);
      else y = THREE.MathUtils.lerp(h2 - 0.1, -0.2, (x - 6.5) / 8.5);
      points.push(new THREE.Vector3(x, y, 0));
    }
    
    // Create a physical thick ribbon shape along the top crest path
    const curve = new THREE.CatmullRomCurve3(points);
    const lineGeo = new THREE.TubeGeometry(curve, 100, 0.04, 6, false); // 0.04 radius guarantees visible thickness

    return [shapeGeo, lineGeo];
  }, [seed]);

  const colorMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color(solidColor),
      transparent: false,
      depthTest: true,
      depthWrite: true
    });
  }, [solidColor]);

  // 2. MONOCHROMATIC STEPPED LIGHT: Pure color + value jump
  const borderMaterial = useMemo(() => {
    const highlightColor = new THREE.Color(solidColor);
    highlightColor.addScalar(0.25); // Explicitly lightens the red value by a step

    return new THREE.MeshBasicMaterial({
      color: highlightColor,
      transparent: false,
      depthTest: true,
      depthWrite: true
    });
  }, [solidColor]);

  const shadowMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: '#000000',
      transparent: true,
      opacity: shadowOpacity,
      depthTest: true,
      depthWrite: false
    });
  }, [shadowOpacity]);

  useFrame((state) => {
    if (!containerRef.current) return;
    const targetX = state.pointer.x * parallaxFactor * 0.7;
    const targetY = state.pointer.y * parallaxFactor * 0.35;

    containerRef.current.position.x += (targetX - containerRef.current.position.x) * 0.05;
    containerRef.current.position.y += (targetY - containerRef.current.position.y) * 0.05;
  });

  return (
    <group ref={containerRef}>
      {/* PASS 1: DROP SHADOW */}
      <mesh 
        geometry={geometry} 
        material={shadowMaterial} 
        position={[0, -0.18, zPos - 0.05]} 
      />

      {/* PASS 2: SOLID OPAQUE CLOUD CARD */}
      <mesh 
        geometry={geometry} 
        material={colorMaterial} 
        position={[0, 0, zPos]} 
      />

      {/* PASS 3: PHYSICAL THICK BORDER RIBBON */}
      <mesh 
        geometry={borderGeometry} 
        material={borderMaterial} 
        position={[0, 0.02, zPos + 0.05]} // Layered safely forward along the Z-axis to prevent clipping
      />
    </group>
  );
}