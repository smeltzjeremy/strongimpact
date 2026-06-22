// src/components/ProceduralChromeBackground.jsx
import React, { useMemo, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ProceduralChromeBackground() {
  const { size } = useThree();

  // Immutable uniform allocation + properly reactive to resize
  const uniforms = useMemo(() => ({
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
  }), [size.width, size.height]);

  // Direct GPU uniform value streaming pipeline
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

        // Clean spatial rotation matrix
        mat2 rot(float a) {
          float c = cos(a), s = sin(a);
          return mat2(c, -s, s, c);
        }

        // Fast-path procedural continuous wave fields
        float noise(in vec2 p) {
          return sin(p.x * 1.5) * sin(p.y * 1.5);
        }

        // 5-octave domain warping + rotation for organic liquid silk
        float liquidSilkTopology(vec2 p) {
          float amp = 0.55;
          float freq = 1.1;
          float value = 0.0;
          for(int i = 0; i < 5; i++) {
            p *= rot(0.65);
            p += vec2(sin(p.y * 0.4), cos(p.x * 0.4)) * 0.3;
            value += noise(p * freq) * amp;
            freq *= 1.65;
            amp *= 0.52;
          }
          return value;
        }

        void main() {
          vec2 uv = gl_FragCoord.xy / uResolution.xy;
          uv = uv * 2.0 - 1.0;
          uv.x *= uResolution.x / uResolution.y;

          float topology = liquidSilkTopology(uv * 1.3 + vec2(0.5, -0.5));
          
          // Analytical normals via central differences
          vec2 eps = vec2(0.003, 0.0);
          float gradX = liquidSilkTopology((uv + eps.xy) * 1.3) - liquidSilkTopology((uv - eps.xy) * 1.3);
          float gradY = liquidSilkTopology((uv + eps.yx) * 1.3) - liquidSilkTopology((uv - eps.yx) * 1.3);
          vec3 normal = normalize(vec3(-gradX, -gradY, 0.12));

          vec3 lightDir1 = normalize(vec3(0.6, 0.75, 0.5));
          vec3 lightDir2 = normalize(vec3(-0.6, -0.4, 0.7));
          vec3 viewDir = vec3(0.0, 0.0, 1.0);

          // Dual-source high-power specular
          float spec1 = pow(max(dot(normal, lightDir1), 0.0), 45.0);
          float spec2 = pow(max(dot(normal, lightDir2), 0.0), 24.0);
          vec3 specularComposition = (vec3(1.0) * spec1 * 4.6) + (vec3(0.7) * spec2 * 1.8);
          
          // Fresnel edge reflection rim
          float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 4.0);
          vec3 fresnelRim = vec3(0.65, 0.68, 0.72) * fresnel * 1.5;

          // Deep black metal base
          vec3 darkMetal = vec3(0.02, 0.02, 0.03);
          vec3 finalLinearColor = darkMetal + specularComposition + fresnelRim;

          // sRGB gamma correction
          gl_FragColor = vec4(pow(finalLinearColor, vec3(1.0 / 2.2)), 1.0);
        }
      `,
      depthWrite: false,
      depthTest: false,
    });
  }, [uniforms]);

  // Explicit GPU memory cleanup on route change
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