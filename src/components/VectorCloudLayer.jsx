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

  // 1. Structural Bezier Path Geometry (Wide overflow bounds)
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-12, -5);
    
    const h1 = -0.1 + Math.sin(seed) * 0.3;
    const h2 = 0.2 + Math.cos(seed) * 0.4;
    const h3 = 0.0 + Math.sin(seed * 2.5) * 0.25;

    shape.bezierCurveTo(-8.0, h1 - 0.1, -6.0, h1 + 0.9, -4.5, h2);
    shape.bezierCurveTo(-2.5, h2 + 0.7, -1.0, h2 + 0.6, 0.5, h3);
    shape.bezierCurveTo(2.0, h3 + 1.0, 4.0, h1 + 0.8, 6.0, h2 - 0.1);
    shape.bezierCurveTo(8.0, h2 + 0.6, 10.0, h3 + 0.7, 12, -0.2);
    
    shape.lineTo(12, -5);
    shape.lineTo(-12, -5);
    shape.closePath();

    return new THREE.ShapeGeometry(shape);
  }, [seed]);

  // 2. FORCE OPAQUE MATERIAL (Blocks out everything behind it like wood/paper)
  const colorMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color(solidColor),
      transparent: false, // HARD COATED OPAQUE
      opacity: 1.0,       // FULL STRENGTH
      depthTest: true,    // Evaluates 3D spacing
      depthWrite: true,   // Blocks hidden pixels from rendering
      blending: THREE.NormalBlending // Reverts to basic, non-translucent sorting
    });
  }, [solidColor]);

  // 3. Drop Shadow Material (Kept translucent so it can darken the solid layer beneath it)
  const shadowMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: '#000000',
      transparent: true,
      opacity: shadowOpacity,
      depthTest: true,
      depthWrite: false, // Allows the shadow overlay to rest gently on the next plane
      blending: THREE.NormalBlending
    });
  }, [shadowOpacity]);

  // 4. Parallax calculations
  useFrame((state) => {
    if (!containerRef.current) return;
    const targetX = state.pointer.x * parallaxFactor * 0.7;
    const targetY = state.pointer.y * parallaxFactor * 0.35;

    containerRef.current.position.x += (targetX - containerRef.current.position.x) * 0.05;
    containerRef.current.position.y += (targetY - containerRef.current.position.y) * 0.05;
  });

  return (
    <group ref={containerRef}>
      {/* SHADOW BASE */}
      <mesh 
        geometry={geometry} 
        material={shadowMaterial} 
        position={[0, -0.15, zPos - 0.05]} // Pushed slightly closer behind to sharpen the shadow lip
      />

      {/* SOLID COLOR TOP */}
      <mesh 
        geometry={geometry} 
        material={colorMaterial} 
        position={[0, 0, zPos]} 
      />
    </group>
  );
}