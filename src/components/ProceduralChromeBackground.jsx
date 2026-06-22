// src/components/ProceduralChromeBackground.jsx
import React, { useMemo } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function ProceduralChromeBackground() {
  const { size } = useThree();

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uResolution: { value: new THREE.Vector2(size.width, size.height) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform vec2 uResolution;

        void main() {
          vec2 uv = vUv;
          vec3 color = vec3(0.05); // dark base

          // Very basic test pattern so we can see it working
          float pattern = sin(uv.x * 40.0) * sin(uv.y * 40.0);
          color = mix(color, vec3(0.9), pattern * 0.15);

          gl_FragColor = vec4(color, 1.0);
        }
      `,
      side: THREE.DoubleSide,
    });
  }, [size]);

  return (
    <mesh position={[0, 0, -0.01]} rotation={[0, 0, 0]}>
      <planeGeometry args={[2, 2]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}