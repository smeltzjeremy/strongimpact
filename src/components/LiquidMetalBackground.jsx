// src/components/LiquidMetalBackground.jsx
import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';

export default function LiquidMetalBackground() {
  const meshRef = useRef();

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        uniform float uTime;
        
        void main() {
          vec3 viewDir = vec3(0.0, 0.0, 1.0);
          float fresnel = pow(1.0 - dot(vNormal, viewDir), 2.8);
          
          vec3 baseColor = vec3(0.05, 0.05, 0.08);
          vec3 highlight = vec3(1.0, 1.0, 1.0);
          
          float specular = pow(fresnel, 1.6);
          vec3 color = mix(baseColor, highlight, specular * 1.6);
          
          gl_FragColor = vec4(color, 1.0);
        }
      `,
      side: THREE.DoubleSide,
    });
  }, []);

  return (
    <mesh 
      ref={meshRef}
      rotation={[-0.85, 0.04, 0]} 
      position={[0, -8, -10]}
    >
      <planeGeometry args={[80, 80, 180, 180]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}