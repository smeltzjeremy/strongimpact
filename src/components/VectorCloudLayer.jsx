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

  // 1. Procedural Shape Creation (Stretched ultra-wide to completely anchor the left corner)
  const [geometry, outlineGeometry] = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-15, -6); // Pushed extra deep left and down to guarantee zero baseline leak
    
    const h1 = -0.1 + Math.sin(seed) * 0.3;
    const h2 = 0.2 + Math.cos(seed) * 0.4;
    const h3 = 0.0 + Math.sin(seed * 2.5) * 0.25;

    // The identical billowy vector path curves
    shape.bezierCurveTo(-10.0, h1 - 0.1, -7.5, h1 + 0.9, -5.0, h2);
    shape.bezierCurveTo(-2.5, h2 + 0.7, -1.0, h2 + 0.6, 0.5, h3);
    shape.bezierCurveTo(2.5, h3 + 1.0, 4.5, h1 + 0.8, 6.5, h2 - 0.1);
    shape.bezierCurveTo(9.0, h2 + 0.6, 11.5, h3 + 0.7, 15, -0.2);
    
    shape.lineTo(15, -6);
    shape.lineTo(-15, -6);
    shape.closePath();

    const shapeGeo = new THREE.ShapeGeometry(shape);
    
    // 2. SAFE WEBGL OUTLINES: Uses the true shape outline to prevent criss-cross artifact strings
    const points = shape.getPoints(60);
    const lineGeo = new THREE.BufferGeometry().setFromPoints(points);

    return [shapeGeo, lineGeo];
  }, [seed]);

  // Completely opaque solid color card mesh
  const colorMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color(solidColor),
      transparent: false,
      depthTest: true,
      depthWrite: true,
      blending: THREE.NormalBlending
    });
  }, [solidColor]);

  // Clean, thin card-lip accent highlight line
  const outlineMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: new THREE.Color('#ffa6b5'), // Clean, illuminated coral white outline
      linewidth: 2,
      transparent: true,
      opacity: 0.65,
      depthTest: true,
      depthWrite: false
    });
  }, []);

  // Soft drop shadow backdrop
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

  // Motion engine tracking
  useFrame((state) => {
    if (!containerRef.current) return;
    const targetX = state.pointer.x * parallaxFactor * 0.7;
    const targetY = state.pointer.y * parallaxFactor * 0.35;

    containerRef.current.position.x += (targetX - containerRef.current.position.x) * 0.05;
    containerRef.current.position.y += (targetY - containerRef.current.position.y) * 0.05;
  });

  return (
    <group ref={containerRef}>
      {/* SHADOW BACKER */}
      <mesh 
        geometry={geometry} 
        material={shadowMaterial} 
        position={[0, -0.16, zPos - 0.05]} 
      />

      {/* OPAQUE COLOR CARD FACE */}
      <mesh 
        geometry={geometry} 
        material={colorMaterial} 
        position={[0, 0, zPos]} 
      />

      {/* HIGHLIGHT RIM LINE (Traced directly around the cloud face perimeter) */}
      <line 
        geometry={outlineGeometry} 
        material={outlineMaterial} 
        position={[0, 0, zPos + 0.01]} 
      />
    </group>
  );
}