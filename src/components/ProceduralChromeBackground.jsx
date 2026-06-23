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

        float hash(vec2 p) {
          p = fract(p * vec2(127.1, 311.7));
          return fract(sin(dot(p, vec2(92.7, 549.3))) * 43758.5453123);
        }

        float noise(in vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          vec2 u = f * f * (3.0 - 2.0 * f);
          float n = mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
                        mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
          return n * 2.0 - 1.0;
        }

        float liquidSilkTopology(vec2 p) {
          float value = 0.0;
          float amp = 0.7;
          float freq = 1.0;
          for (int i = 0; i < 3; i++) {
            p *= rot(0.95);
            float warpFactor = 1.4;
            p += vec2(sin(p.y * 1.2 + 0.5), cos(p.x * 0.8 - 0.5)) * warpFactor;
            value += noise(p * freq) * amp;
            freq *= 1.45;
            amp *= 0.52;
          }
          return value;
        }

        void main() {
          vec2 uv = gl_FragCoord.xy / uResolution.xy;
          uv = uv * 2.0 - 1.0;
          uv.x *= uResolution.x / uResolution.y;

          vec2 distortedUV = uv;
          distortedUV.y *= 0.8;
          distortedUV.x *= 1.1;

          float topologyScale = 0.58;

          vec2 epsX = vec2(0.003 * 1.1, 0.0);
          vec2 epsY = vec2(0.0, 0.003 * 0.8);

          float gradX = liquidSilkTopology((distortedUV.yx + epsX) * topologyScale) - liquidSilkTopology((distortedUV.yx - epsX) * topologyScale);
          float gradY = liquidSilkTopology((distortedUV.yx + epsY) * topologyScale) - liquidSilkTopology((distortedUV.yx - epsY) * topologyScale);
          
          vec3 normal = normalize(vec3(-gradX * 24.0, -gradY * 24.0, 0.012));

          // Your requested direction: slightly over the top, angling down toward bottom-left
          vec3 lightDir1 = normalize(vec3(1.05, 0.75, 0.48));   // Main light from upper-right
          vec3 lightDir2 = normalize(vec3(-1.1, -0.6, 0.32));   // Fill from opposite side
          vec3 viewDir = vec3(0.0, 0.0, 1.0);

          float spec1 = pow(max(dot(normal, lightDir1), 0.0), 680.0);
          float spec2 = pow(max(dot(normal, lightDir2), 0.0), 400.0);
          vec3 specular = (vec3(1.0) * spec1 * 13.0) + (vec3(0.75) * spec2 * 6.0);

          float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.8);
          vec3 rim = vec3(0.75, 0.8, 0.85) * fresnel * 0.3;

          vec3 base = vec3(0.012, 0.012, 0.02);
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