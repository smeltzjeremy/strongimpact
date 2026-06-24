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

    // Top edge border curve only
    const points = [];
    for (let i = 0; i <= 120; i++) {
      const t = i / 120;
      const x = -15 + t * 30;
      let y = 0;
      if (x < -5) y = THREE.MathUtils.lerp(-0.2, h2, (x + 15) / 10);
      else if (x < 0.5) y = THREE.MathUtils.lerp(h2, h3, (x + 5) / 5.5);
      else if (x < 6.5) y = THREE.MathUtils.lerp(h3, h2 - 0.1, (x - 0.5) / 6);
      else y = THREE.MathUtils.lerp(h2 - 0.1, -0.2, (x - 6.5) / 8.5);
      points.push(new THREE.Vector3(x, y + 0.03, 0)); // slight offset up
    }
    const curve = new THREE.CatmullRomCurve3(points);
    const borderGeo = new THREE.TubeGeometry(curve, 80, 0.035, 8, false);

    return [shapeGeo, borderGeo];
  }, [seed]);

  const colorMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: new THREE.Color(solidColor),
  }), [solidColor]);

  const borderMaterial = useMemo(() => {
    const highlight = new THREE.Color(solidColor);
    highlight.addScalar(0.35);
    return new THREE.MeshBasicMaterial({ color: highlight });
  }, [solidColor]);

  const shadowMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: '#000000',
    transparent: true,
    opacity: shadowOpacity,
    depthWrite: false,
  }), [shadowOpacity]);

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
      <mesh geometry={borderGeometry} material={borderMaterial} position={[0, 0, zPos + 0.1]} />
    </group>
  );
}