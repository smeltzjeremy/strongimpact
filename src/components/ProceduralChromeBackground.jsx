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
          float amp = 0.55;
          float freq = 1.2;
          
          for (int i = 0; i < 5; i++) {
            p *= rot(0.85);
            p += vec2(sin(p.y * 0.9 + 0.5), cos(p.x * 0.9 - 0.5)) * 0.42;
            value += noise(p * freq) * amp;
            freq *= 1.68;
            amp *= 0.48;
          }
          return value;
        }

        void main() {
          vec2 uv = gl_FragCoord.xy / uResolution.xy;
          uv = uv * 2.0 - 1.0;
          uv.x *= uResolution.x / uResolution.y;

          vec2 twistedUV = rot(1.1) * uv;

          vec2 distortedUV = twistedUV;
          distortedUV.y *= 0.85;
          distortedUV.x *= 1.15;

          float topologyScale = 1.35;

          vec2 eps = vec2(0.002, 0.0);
          float gradX = liquidSilkTopology((distortedUV + eps.xy) * topologyScale) - liquidSilkTopology((distortedUV - eps.xy) * topologyScale);
          float gradY = liquidSilkTopology((distortedUV + eps.yx) * topologyScale) - liquidSilkTopology((distortedUV - eps.yx) * topologyScale);

          // Relaxed gradients + higher Z for natural volumetric curvature
          vec3 normal = normalize(vec3(-gradX * 6.5, -gradY * 6.5, 0.085));

          vec3 viewDir = vec3(0.0, 0.0, 1.0);
          vec3 r = reflect(viewDir, normal);

          float box1 = smoothstep(-0.2, 0.8, max(0.0, dot(r, normalize(vec3(0.5, 0.5, 0.7)))));
          float spec1 = pow(box1, 35.0) * 3.5;

          float box2 = smoothstep(0.1, 0.9, max(0.0, dot(r, normalize(vec3(-0.5, 0.8, 0.4)))));
          float spec2 = pow(box2, 650.0) * 12.5;

          vec3 specular = vec3(1.0) * spec1 + vec3(0.92, 0.94, 0.98) * spec2;

          float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 4.2);
          vec3 rim = vec3(0.75, 0.8, 0.85) * fresnel * 1.5;

          vec3 base = vec3(0.005, 0.005, 0.01);
          vec3 color = base + specular + rim;

          // No artificial contrast clamping — let the physics render naturally
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