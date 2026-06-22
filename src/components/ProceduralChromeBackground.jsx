// src/components/ProceduralChromeBackground.jsx
import React, { useMemo, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ProceduralChromeBackground() {
  const { size } = useThree();

  const uniforms = useMemo(() => ({
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
  }), [size.width, size.height]);

  useFrame(() => {
    uniforms.uResolution.value.set(size.width, size.height);
  });

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec2 uResolution;

        float hash(vec2 p) {
          p = fract(p * vec2(0.3183099, 0.3678794));
          p = p * p * (3.0 - 2.0 * p);
          return fract(p.x * p.y * (p.x + p.y));
        }

        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          return mix(mix(hash(i), hash(i + vec2(1.0,0.0)), f.x),
                     mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), f.x), f.y);
        }

        void main() {
          vec2 uv = gl_FragCoord.xy / uResolution.xy;
          uv = uv * 2.0 - 1.0;
          uv.x *= uResolution.x / uResolution.y;

          // Multi-octave domain warping for organic flow
          vec2 p = uv * 4.0;
          for (int i = 0; i < 5; i++) {
            p += 0.15 * vec2(noise(p + vec2(i)), noise(p.yx + vec2(i)));
          }

          float pattern = noise(p * 3.0) * 0.7 + noise(p * 8.0) * 0.3;

          vec3 darkMetal = vec3(0.04, 0.04, 0.06);
          vec3 brightChrome = vec3(0.85, 0.88, 0.95);

          vec3 color = mix(darkMetal, brightChrome, pattern * 1.1);

          gl_FragColor = vec4(color, 1.0);
        }
      `,
      depthWrite: false,
      depthTest: false,
    });
  }, [uniforms]);

  useEffect(() => {
    return () => material.dispose();
  }, [material]);

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}