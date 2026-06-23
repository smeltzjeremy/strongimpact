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

          float currentRotation = 1.15;
          vec2 twistedUV = rot(currentRotation) * uv;

          vec2 distortedUV = twistedUV;
          distortedUV.y *= 0.85;
          distortedUV.x *= 1.15;

          float topologyScale = 0.55;

          vec2 eps = vec2(0.0015, 0.0);
          float gradX = liquidSilkTopology((distortedUV + eps.xy) * topologyScale) - liquidSilkTopology((distortedUV - eps.xy) * topologyScale);
          float gradY = liquidSilkTopology((distortedUV + eps.yx) * topologyScale) - liquidSilkTopology((distortedUV - eps.yx) * topologyScale);

          vec3 normal = normalize(vec3(-gradX * 16.0, -gradY * 16.0, 0.045));

          vec3 viewDir = vec3(0.0, 0.0, 1.0);
          vec3 r = reflect(viewDir, normal);

          // Dynamic lights that rotate with the coordinate system
          vec2 lightRot1 = rot(currentRotation) * vec2(0.0, 1.0);
          vec3 lightDir1 = normalize(vec3(lightRot1.x, lightRot1.y, 0.6));

          vec2 lightRot2 = rot(currentRotation) * vec2(-1.0, -0.5);
          vec3 lightDir2 = normalize(vec3(lightRot2.x, lightRot2.y, 0.4));

          float box1 = smoothstep(0.1, 0.8, max(0.0, dot(r, lightDir1)));
          float spec1 = pow(box1, 60.0) * 5.0;

          float box2 = smoothstep(0.2, 0.85, max(0.0, dot(r, lightDir2)));
          float spec2 = pow(box2, 320.0) * 12.0;

          vec3 specular = vec3(1.0) * spec1 + vec3(0.92, 0.95, 0.99) * spec2;

          float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 4.2);
          vec3 rim = vec3(0.75, 0.8, 0.85) * fresnel * 0.5;

          vec3 base = vec3(0.002, 0.002, 0.005);
          vec3 color = base + specular + rim;

          color = smoothstep(0.02, 0.98, color);
          
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