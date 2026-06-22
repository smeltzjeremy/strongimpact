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
            p += vec2(sin(p.y * 1.2 + 0.5), cos(p.x * 0.8 - 0.5)) * 1.4;
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

          vec2 twistedUV = rot(1.1) * uv;

          vec2 distortedUV = twistedUV;
          distortedUV.y *= 0.8;
          distortedUV.x *= 1.1;

          float topologyScale = 0.58;

          vec2 epsX = vec2(0.001 * 0.65, 0.0);
          vec2 epsY = vec2(0.0, 0.001 * 1.35);

          float gradX = liquidSilkTopology((distortedUV + epsX) * topologyScale) - liquidSilkTopology((distortedUV - epsX) * topologyScale);
          float gradY = liquidSilkTopology((distortedUV + epsY) * topologyScale) - liquidSilkTopology((distortedUV - epsY) * topologyScale);

          // Balanced gradient amplification (restores 3D curves)
          vec3 normal = normalize(vec3(-gradX * 18.0, -gradY * 18.0, 0.012));

          // Slightly off-axis lights to graze the diagonal curves
          vec3 lightDir1 = normalize(vec3(0.6, 1.6, 0.5));
          vec3 lightDir2 = normalize(vec3(-0.7, -1.2, 0.6));
          vec3 viewDir = vec3(0.0, 0.0, 1.0);

          float spec1 = pow(max(dot(normal, lightDir1), 0.0), 600.0);
          float spec2 = pow(max(dot(normal, lightDir2), 0.0), 300.0);
          vec3 specular = (vec3(1.0) * spec1 * 12.0) + (vec3(0.8) * spec2 * 5.0);

          float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.8);
          vec3 rim = vec3(0.75, 0.8, 0.85) * fresnel * 0.3;

          vec3 base = vec3(0.0, 0.0, 0.005);
          vec3 color = base + specular + rim;

          // Softer contrast ramp (preserves beautiful mid-tone curves)
          color = smoothstep(0.05, 0.95, color);
          color = pow(color, vec3(1.2));

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