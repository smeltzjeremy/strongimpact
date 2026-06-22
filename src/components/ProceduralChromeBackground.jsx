// src/components/ProceduralChromeBackground.jsx
import React, { useMemo, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ProceduralChromeBackground() {
  const { size } = useThree();

  // Persistent material (no recompilation on resize)
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

        float noise(vec2 p) {
          return sin(p.x * 3.0) * sin(p.y * 3.0);
        }

        float liquidSilkTopology(vec2 p) {
          float value = 0.0;
          float amp = 0.62;
          float freq = 1.9;
          for (int i = 0; i < 5; i++) {
            p *= rot(0.85);
            p += vec2(sin(p.y * 0.55), cos(p.x * 0.55)) * 0.42;
            value += noise(p * freq) * amp;
            freq *= 1.68;
            amp *= 0.47;
          }
          return value;
        }

        void main() {
          vec2 uv = gl_FragCoord.xy / uResolution.xy;
          uv = uv * 2.0 - 1.0;
          uv.x *= uResolution.x / uResolution.y;

          // Analytical normals
          vec2 eps = vec2(0.0025, 0.0);
          float gradX = liquidSilkTopology((uv + eps.xy) * 2.1) - liquidSilkTopology((uv - eps.xy) * 2.1);
          float gradY = liquidSilkTopology((uv + eps.yx) * 2.1) - liquidSilkTopology((uv - eps.yx) * 2.1);
          vec3 normal = normalize(vec3(-gradX, -gradY, 0.13));

          // Dual lighting
          vec3 lightDir1 = normalize(vec3(0.55, 0.78, 0.55));
          vec3 lightDir2 = normalize(vec3(-0.65, -0.35, 0.68));
          vec3 viewDir = vec3(0.0, 0.0, 1.0);

          // Specular
          float spec1 = pow(max(dot(normal, lightDir1), 0.0), 52.0);
          float spec2 = pow(max(dot(normal, lightDir2), 0.0), 26.0);
          vec3 specular = (vec3(1.0) * spec1 * 5.2) + (vec3(0.8) * spec2 * 2.1);

          // Fresnel
          float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 4.2);
          vec3 rim = vec3(0.72, 0.76, 0.82) * fresnel * 2.1;

          vec3 base = vec3(0.018, 0.018, 0.032);
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