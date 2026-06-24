import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';

export default function VectorCloudLayer({ 
  zPos = 0, 
  solidColor = '#c23d55', 
  shadowOpacity = 0.45,
  seed = 1.0 
}) {
  const containerRef = useRef();

  // 1. Procedural Shape Creation - Extended to +/- 12 to secure wide viewports statically
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

  // Gradient fill pass
  const colorMaterial = useMemo(() => {
    const darkBaseColor = new THREE.Color(solidColor).multiplyScalar(0.65);

    return new THREE.ShaderMaterial({
      uniforms: {
        uColorTop: { value: new THREE.Color(solidColor) },
        uColorBottom: { value: darkBaseColor },
        uOpacity: { value: 0.88 }
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
          float normalizedY = clamp((vLocalPosition.y + 4.5) / 5.5, 0.0, 1.0);
          vec3 finalColor = mix(uColorBottom, uColorTop, normalizedY);
          gl_FragColor = vec4(finalColor, uOpacity);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending
    });
  }, [solidColor]);

  // Stepped-lighter rim accent pass (Calculates a color one step lighter than base)
  const rimMaterial = useMemo(() => {
    const rimColor = new THREE.Color(solidColor);
    rimColor.addScalar(0.22);
    
    return new THREE.MeshBasicMaterial({
      color: rimColor,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
      blending: THREE.NormalBlending
    });
  }, [solidColor]);

  // Soft drop shadow pass
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
      {/* 1. DROP SHADOW BACKDROP */}
      <mesh 
        geometry={geometry} 
        material={shadowMaterial} 
        position={[0, -0.08, zPos - 0.12]} 
      />

      {/* 2. LIGHTER MONOCHROMATIC BACKGROUND RIM SHAPE */}
      <mesh 
        geometry={geometry} 
        material={rimMaterial} 
        position={[0, 0, zPos]} 
      />

      {/* 3. SOLID COLOR FOREGROUND SHEET (Offset down slightly to expose the clean rim) */}
      <mesh 
        geometry={geometry} 
        material={colorMaterial} 
        position={[0, -0.032, zPos + 0.02]} 
      />
    </group>
  );
}