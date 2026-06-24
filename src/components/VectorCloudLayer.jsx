import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function VectorCloudLayer({ 
  zPos = 0, 
  solidColor = '#c23d55', 
  shadowOpacity = 0.35, // Slightly softened shadow to keep colors light
  parallaxFactor = 0.05,
  seed = 1.0 
}) {
  const containerRef = useRef();

  // 1. Procedurally generate curves
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

  // PASS A MATERIAL: Soft Ambient Occlusion Drop Shadow
  const shadowMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: '#000000',
      transparent: true,
      opacity: shadowOpacity,
      depthWrite: false,
      blending: THREE.NormalBlending
    });
  }, [shadowOpacity]);

  // PASS B MATERIAL: Crisp Outer Border Rim Highlight (Brightened up)
  const rimMaterial = useMemo(() => {
    const rimColor = new THREE.Color(solidColor);
    rimColor.addScalar(0.4); // Pushed significantly brighter for a glowing pink-red edge highlight
    
    return new THREE.MeshBasicMaterial({
      color: rimColor,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
      blending: THREE.NormalBlending
    });
  }, [solidColor]);

  // PASS C MATERIAL: Custom Shader with light vertical gradients
  const gradientMaterial = useMemo(() => {
    // FIXED: Raised from 0.28 to 0.55 so the baseline stays a vibrant, rich crimson instead of dark maroon
    const darkBaseColor = new THREE.Color(solidColor).multiplyScalar(0.55);

    return new THREE.ShaderMaterial({
      uniforms: {
        uColorTop: { value: new THREE.Color(solidColor) },
        uColorBottom: { value: darkBaseColor },
        uOpacity: { value: 0.85 }
      },
      vertexShader: `
        varying vec3 vLocalPosition;
        void main() {
          vLocalPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColorTop;
        uniform vec3 uColorBottom;
        uniform float uOpacity;
        varying vec3 vLocalPosition;

        void main() {
          float normalizedY = clamp((vLocalPosition.y + 6.0) / 7.2, 0.0, 1.0);
          vec3 finalColor = mix(uColorBottom, uColorTop, normalizedY);
          gl_FragColor = vec4(finalColor, uOpacity);
        }
      `,
      transparent: true,
      depthWrite: false,

      // ADVANCED: Enables vibrant pass-through blending so stacked transparent reds illuminate each other
      blending: THREE.CustomBlending,
      blendEquation: THREE.AddEquation,
      blendSrc: THREE.SrcAlphaFactor,
      blendDst: THREE.OneMinusSrcAlphaFactor
    });
  }, [solidColor]);

  // 4. Parallax physics loop
  useFrame((state) => {
    if (!containerRef.current) return;
    const targetX = state.pointer.x * parallaxFactor * 0.7;
    const targetY = state.pointer.y * parallaxFactor * 0.35;

    containerRef.current.position.x += (targetX - containerRef.current.position.x) * 0.05;
    containerRef.current.position.y += (targetY - containerRef.current.position.y) * 0.05;
  });

  return (
    <group ref={containerRef}>
      <mesh geometry={geometry} material={shadowMaterial} position={[0, -0.09, zPos - 0.1]} />
      <mesh geometry={geometry} material={rimMaterial} position={[0, 0, zPos]} />
      <mesh geometry={geometry} material={gradientMaterial} position={[0, -0.032, zPos + 0.02]} />
    </group>
  );
}
