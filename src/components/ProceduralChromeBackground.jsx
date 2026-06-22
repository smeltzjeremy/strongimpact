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
      vertexShader: `void main() { gl_Position = vec4(position, 1.0); }`,
      fragmentShader: `
        uniform vec2 uResolution;

        mat2 rot(float a) {
          float c = cos(a), s = sin(a);
          return mat2(c, -s, s, c);
        }

        float noise(vec2 p) {
          return sin(p.x * 1.8) * sin(p.y * 1.8);
        }

        float liquidSilkTopology(vec2 p) {
          float value = 0.0;
          float amp = 0.6;
          float freq = 1.2;
          for(int i = 0; i < 5; i++) {
            p *= rot(0.8);
            p += vec2(sin(p.y * 0.5), cos(p.x * 0.5)) * 0.4;
            value += noise(p * freq) * amp;
            freq *= 1.7;
            amp *= 0.5;
          }
          return value;
        }

        void main() {
          vec2 uv = gl_FragCoord.xy / uResolution.xy;
          uv = uv * 2.0 - 1.0;
          uv.x *= uResolution.x / uResolution.y;

          float topo = liquidSilkTopology(uv * 1.4);

          // Stronger lighting for visibility
          vec3 base = vec3(0.04, 0.04, 0.06);
          vec3 highlight = vec3(0.9, 0.95, 1.0);

          float brightness = pow(max(topo, 0.0), 1.8) * 1.6;
          vec3 color = mix(base, highlight, brightness);

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