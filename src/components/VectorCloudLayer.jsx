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

  const geometry = useMemo(() => {
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

    return new THREE.ShapeGeometry(shape);
  }, [seed]);

  const colorMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color(solidColor),
      transparent: false,
    });
  }, [solidColor]);

  const borderMaterial = useMemo(() => {
    const borderColor = new THREE.Color(solidColor);
    borderColor.addScalar(0.3); // Brighter red border
    return new THREE.MeshBasicMaterial({
      color: borderColor,
      transparent: false,
    });
  }, [solidColor]);

  const shadowMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: '#000000',
      transparent: true,
      opacity: shadowOpacity,
      depthWrite: false,
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
      <mesh geometry={geometry} material={shadowMaterial} position={[0, -0.18, zPos - 0.05]} />
      <mesh geometry={geometry} material={colorMaterial} position={[0, 0, zPos]} />
      <mesh geometry={geometry} material={borderMaterial} position={[0, 0.04, zPos + 0.08]} scale={[1.015, 1.02, 1]} />
    </group>
  );
}