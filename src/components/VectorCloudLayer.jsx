import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function VectorCloudLayer({ 
  zPos = 0, 
  solidColor = '#c23d55', 
  shadowOpacity = 0.45,
  parallaxFactor = 0.05,
  seed = 1.0 
}) {
  const containerRef = useRef();

  // 1. Procedurally generate extra-wide papercut curves with guaranteed bottom anchoring
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    
    // Extended well past screen edges (-10 to 10) to secure ultra-widescreen viewports
    shape.moveTo(-10, -5);
    
    const h1 = -0.2 + Math.sin(seed) * 0.25;
    const h2 = 0.1 + Math.cos(seed) * 0.35;
    const h3 = -0.1 + Math.sin(seed * 2.5) * 0.2;

    // Chain overlapping loops to form the distinct paper-cut cloud layers
    shape.bezierCurveTo(-7.0, h1 - 0.2, -5.5, h1 + 0.8, -4.0, h2);
    shape.bezierCurveTo(-2.0, h2 + 0.6, -1.0, h2 + 0.5, 0.0, h3);
    shape.bezierCurveTo(1.0, h3 + 0.9, 2.5, h1 + 0.7, 4.0, h2 - 0.1);
    shape.bezierCurveTo(5.5, h2 + 0.5, 7.5, h3 + 0.6, 10, -0.4);
    
    // Drop down and form a massive solid block underneath to guarantee zero corner gaps
    shape.lineTo(10, -5);
    shape.lineTo(-10, -5);
    shape.closePath();

    return new THREE.ShapeGeometry(shape);
  }, [seed]);

  // 2. Solid Color Material (No translucency, no muddy blending bugs)
  const colorMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color(solidColor),
      transparent: false, // Opaque solid color blocks out everything behind it cleanly
      depthWrite: false
    });
  }, [solidColor]);

  // 3. Drop Shadow Material to physically separate the solid layers
  const shadowMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: '#000000',
      transparent: true,
      opacity: shadowOpacity,
      depthWrite: false,
      blending: THREE.NormalBlending
    });
  }, [shadowOpacity]);

  // 4. Parallax physics interpolation loop
  useFrame((state) => {
    if (!containerRef.current) return;
    
    const targetX = state.pointer.x * parallaxFactor * 0.7;
    const targetY = state.pointer.y * parallaxFactor * 0.35;

    containerRef.current.position.x += (targetX - containerRef.current.position.x) * 0.05;
    containerRef.current.position.y += (targetY - containerRef.current.position.y) * 0.05;
  });

  return (
    <group ref={containerRef}>
      {/* THE SHADOW: Casts a crisp silhouette onto the layer behind it */}
      <mesh 
        geometry={geometry} 
        material={shadowMaterial} 
        position={[0, -0.12, zPos - 0.1]} 
      />

      {/* THE CLOUD: Flat, clean vector cutout fill */}
      <mesh 
        geometry={geometry} 
        material={colorMaterial} 
        position={[0, 0, zPos]} 
      />
    </group>
  );
}