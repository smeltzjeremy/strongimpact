// src/components/ProceduralChromeBackground.jsx
import React, { useMemo, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ProceduralChromeBackground() {
  const { size } = useThree();

  const uniforms = useMemo(() => ({
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
  }), []);

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

        // True continuous pseudo-random gradient hash
        float hash(vec2 p) {
          p = fract(p * vec2(127.1, 311.7));
          return fract(sin(dot(p, vec2(92.7, 549.3))) * 43758.5453123);
        }

        // True Bilinear Value Noise with smoothstep interpolation
        float noise(in vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
                     mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
        }

        // Clean 4-Octave liquid silk topology
        float liquidSilkTopology(vec2 p) {
          float value = 0.0;
          float amp = 0.6;
          float freq = 1.0;
          for (int i = 0; i < 4; i++) {
            p *= rot(0.785);
            p += vec2(sin(p.y * 0.5), cos(p.x * 0.5)) * 0.4;
            value += noise(p * freq) * amp;
            freq *= 1.8;
            amp *= 0.5;
          }
          return value;
        }

        void main() {
          vec2 uv = gl_FragCoord.xy / uResolution.xy;
          uv = uv * 2.0 - 1.0;
          uv.x *= uResolution.x / uResolution.y;

          float topologyScale = 0.85;

          vec2 eps = vec2(0.004, 0.0);
          float gradX = liquidSilkTopology((uv + eps.xy) * topologyScale) - liquidSilkTopology((uv - eps.xy) * topologyScale);
          float gradY = liquidSilkTopology((uv + eps.yx) * topologyScale) - liquidSilkTopology((uv - eps.yx) * topologyScale);
          vec3 normal = normalize(vec3(-gradX, -gradY, 0.15));

          vec3 lightDir1 = normalize(vec3(0.5, 0.8, 0.6));
          vec3 lightDir2 = normalize(vec3(-0.6, -0.4, 0.7));
          vec3 viewDir = vec3(0.0, 0.0, 1.0);

          float spec1 = pow(max(dot(normal, lightDir1), 0.0), 64.0);
          float spec2 = pow(max(dot(normal, lightDir2), 0.0), 32.0);
          vec3 specular = (vec3(1.0) * spec1 * 5.5) + (vec3(0.7) * spec2 * 2.2);

          float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 4.0);
          vec3 rim = vec3(0.7, 0.75, 0.82) * fresnel * 2.0;

          vec3 base = vec3(0.015, 0.015, 0.025);
          vec3 color = base + specular + rim;

          gl_FragColor = vec4(pow(color, vec3(1.0 / 2.2)), 1.0);
        }
      `,
      depthWrite: false,
      depthTest: false,
    });
  }, []);

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