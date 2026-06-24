import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';

export default function VectorCloudLayer({ 
  zPos = 0, 
  solidColor = '#c23d55', 
  shadowOpacity = 0.45,
  seed = 1.0 
}) {
  const containerRef = useRef();

  // Your exact, locked geometric curves
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-12.0, -4.5);
    
    const h1 = -0.2 + Math.sin(seed) * 0.25;
    const h2 = 0.1 + Math.cos(seed) * 0.35;
    const h3 = -0.1 + Math.sin(seed * 2.5) * 0.25;

    shape.bezierCurveTo(-9.0, h1 - 0.2, -7.0, h1 + 0.8, -5.0, h2);
    shape.bezierCurveTo(-3.0, h2 + 0.6, -1.0, h2 + 0.5, 1.0, h3);
    shape.bezierCurveTo(3.0, h3 + 0.9, 5.0, h1 + 0.7, 7.5, h2 - 0.1);
    shape.bezierCurveTo(9.0, h2 + 0.5, 10.5, h3 + 0.6, 12.0, -0.4);
    
    shape.lineTo(12.0, -4.5);
    shape.lineTo(-12.0, -4.5);
    shape.closePath();

    return new THREE.ShapeGeometry(shape);
  }, [seed]);

  // Restored to pure, unshaded flat basic color
  const colorMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color(solidColor),
      transparent: true,
      opacity: 0.95,
      depthWrite: false
    });
  }, [solidColor]);

  // Restored to the clean, step-darker red outline lip backer
  const rimMaterial = useMemo(() => {
    const darkEdgeColor = new THREE.Color(solidColor).clone();
    darkEdgeColor.multiplyScalar(0.65);
    
    return new THREE.MeshBasicMaterial({
      color: darkEdgeColor,
      transparent: true,
      opacity: 0.95,
      depthWrite: false
    });
  }, [solidColor]);

  const shadowMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: '#000000',
      transparent: true,
      opacity: shadowOpacity,
      depthWrite: false,
      blending: THREE.NormalBlending
    });
  }, [shadowOpacity]);

  return (
    <group ref={containerRef}>
      {/* 1. SOFT DROP SHADOW */}
      <mesh geometry={geometry} material={shadowMaterial} position={[0, -0.15, zPos - 0.08]} />
      
      {/* 2. RECESSED DARK RIM BACKER */}
      <mesh geometry={geometry} material={rimMaterial} position={[0, 0, zPos]} />
      
      {/* 3. PURE SOLID COLOR FACE SHEET */}
      <mesh geometry={geometry} material={colorMaterial} position={[0, -0.045, zPos + 0.02]} />
    </group>
  );
}