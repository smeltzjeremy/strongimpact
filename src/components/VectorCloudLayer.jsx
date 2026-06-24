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

  // 1. Procedurally generate the identical base shape across all three styling passes
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

  // PASS A MATERIAL: Deep Ambient Occlusion Drop Shadow
  const shadowMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: '#000000',
      transparent: true,
      opacity: shadowOpacity,
      depthWrite: false,
      blending: THREE.NormalBlending
    });
  }, [shadowOpacity]);

  // PASS B MATERIAL: Crisp Outer Border Rim Highlight
  const rimMaterial = useMemo(() => {
    const rimColor = new THREE.Color(solidColor);
    // Slightly shift the rim scalar brighter than the core color to catch premium light glints
    rimColor.addScalar(0.22); 
    
    return new THREE.MeshBasicMaterial({
      color: rimColor,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
      blending: THREE.NormalBlending
    });
  }, [solidColor]);

  // PASS C MATERIAL: Custom Shader to fix stretching & inject moody vertical gradients
  const gradientMaterial = useMemo(() => {
    // Generate a rich, deep burgundy color for the dark baseline anchor
    const darkBaseColor = new THREE.Color(solidColor).multiplyScalar(0.28);

    return new THREE.ShaderMaterial({
      uniforms: {
        uColorTop: { value: new THREE.Color(solidColor) },
        uColorBottom: { value: darkBaseColor },
        uOpacity: { value: 0.88 }
      },
      vertexShader: `
        varying vec3 vLocalPosition;
        void main() {
          vLocalPosition = position; // Feed local position coordinates to the fragment pipeline
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColorTop;
        uniform vec3 uColorBottom;
        uniform float uOpacity;
        varying vec3 vLocalPosition;

        void main() {
          // Normalize localized Y coordinates from base boundary (-6.0) to top peak (~1.2)
          float normalizedY = clamp((vLocalPosition.y + 6.0) / 7.2, 0.0, 1.0);
          
          // Mix a flawless, clean vertical gradient
          vec3 finalColor = mix(uColorBottom, uColorTop, normalizedY);
          gl_FragColor = vec4(finalColor, uOpacity);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending
    });
  }, [solidColor]);

  // 4. Parallax physics loop for smooth translation shifts
  useFrame((state) => {
    if (!containerRef.current) return;
    const targetX = state.pointer.x * parallaxFactor * 0.7;
    const targetY = state.pointer.y * parallaxFactor * 0.35;

    containerRef.current.position.x += (targetX - containerRef.current.position.x) * 0.05;
    containerRef.current.position.y += (targetY - containerRef.current.position.y) * 0.05;
  });

  return (
    <group ref={containerRef}>
      {/* PASS A: DROP SHADOW MESH - Shifted slightly down (Y) and back (Z) */}
      <mesh 
        geometry={geometry} 
        material={shadowMaterial} 
        position={[0, -0.08, zPos - 0.12]} 
      />

      {/* PASS B: HIGH-CONTRAST BORDER HIGHLIGHT RIM MESH */}
      <mesh 
        geometry={geometry} 
        material={rimMaterial} 
        position={[0, 0, zPos]} 
      />

      {/* PASS C: INTERIOR VERTICAL GRADIENT MESH 
          - Shifted micro-fractions down (Y) and forward (Z) to overlap Pass B, 
            perfectly exposing just the top edge rim profile like crisp paper layers!
      */}
      <mesh 
        geometry={geometry} 
        material={gradientMaterial} 
        position={[0, -0.032, zPos + 0.02]} 
      />
    </group>
  );
}
