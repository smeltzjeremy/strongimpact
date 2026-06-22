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

        // Simple hash for noise
        float hash(vec2 p) {
          p = fract(p * vec2(0.3183099, 0.3678794));
          p = p * p * (3.0 - 2.0 * p);
          return fract(p.x * p.y * (p.x + p.y));
        }

        // 2D noise
        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), f.x),
                     mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), f.x), f.y);
        }

        void main() {
          vec2 uv = vUv * 2.0 - 1.0;
          uv.x *= uResolution.x / uResolution.y;

          // 5-octave domain warping
          vec2 p = uv * 3.0;
          for(int i = 0; i < 5; i++) {
            p += 0.2 * vec2(noise(p + vec2(0.0, i)), noise(p + vec2(i, 0.0)));
          }

          float pattern = noise(p * 2.5) * 0.6 + noise(p * 6.0) * 0.3;

          vec3 base = vec3(0.04, 0.04, 0.07);
          vec3 highlight = vec3(0.95, 0.96, 1.0);

          vec3 color = mix(base, highlight, pattern * 0.85);

          gl_FragColor = vec4(color, 1.0);
        }
      `,
      side: THREE.DoubleSide,
    });
  }, [size]);

  return (
    <mesh position={[0, 0, -0.01]}>
      <planeGeometry args={[2, 2]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}