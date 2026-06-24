import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';

export default function VectorCloudLayer({ 
  zPos = 0, 
  solidColor = '#c23d55', 
  shadowOpacity = 0.45,
  seed = 1.0,
  isFront = false // NEW: Direct flag to bypass shading entirely
}) {
  const containerRef = useRef();

  // 1. Immutable Shape Geometry
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

  // 2. Custom Shader: Tuned down to only tint the absolute lowest valley line
  const colorMaterial = useMemo(() => {
    // If it's the front cloud, make the base mix color identical to the top (completely flat)
    // Otherwise, use a gentle 0.55 multiplier so the black tint is a soft whisper
    const darkBaseColor = isFront 
      ? new THREE.Color(solidColor) 
      : new THREE.Color(solidColor).clone().multiplyScalar(0.55);

    return new THREE.ShaderMaterial({
      uniforms: {
        uColorTop: { value: new THREE.Color(solidColor) },
        uColorBottom: { value: darkBaseColor }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColorTop;
        uniform vec3 uColorBottom;
        varying vec2 vUv;

        void main() {
          float normalizedY = clamp(vUv.y, 0.0, 1.0);
          
          // CRITICAL: High exponent (3.5) forces the shadow to compress entirely into the bottom baseline
          float shadeCurve = pow(normalizedY, 3.5);
          vec3 finalColor = mix(uColorBottom, uColorTop, shadeCurve);
          
          gl_FragColor = vec4(finalColor, 0.95);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending
    });
  }, [solidColor, isFront]);

  // 3. One-Step Darker Red Outline Crease
  const rimMaterial = useMemo(() => {
    const darkEdgeColor = new THREE.Color(solidColor).clone();
    darkEdgeColor.multiplyScalar(0.50); // Balanced crease contrast
    
    return new THREE.MeshBasicMaterial({
      color: darkEdgeColor,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
      blending: THREE.NormalBlending
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
      <mesh geometry={geometry} material={shadowMaterial} position={[0, -0.15, zPos - 0.08]} />
      <mesh geometry={geometry} material={rimMaterial} position={[0, 0, zPos]} />
      <mesh geometry={geometry} material={colorMaterial} position={[0, -0.045, zPos + 0.02]} />
    </group>
  );
}