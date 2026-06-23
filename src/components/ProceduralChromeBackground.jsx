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
          float amp = 0.75;
          float freq = 0.95;
          
          for (int i = 0; i < 3; i++) {
            p *= rot(0.95);
            float warpFactor = 1.35;
            p += vec2(sin(p.y * 1.1 + 0.5), cos(p.x * 0.75 - 0.45)) * warpFactor;
            
            float layerNoise = noise(p * freq);
            
            // THE RIBBON STEPPING: Squeezing continuous waves into flat plateaus and drop-off lips
            layerNoise = smoothstep(-0.6, 0.6, layerNoise);
            layerNoise = pow(abs(layerNoise), 1.4) * sign(layerNoise);
            
            value += layerNoise * amp;
            freq *= 1.5;
            amp *= 0.48;
          }
          return value;
        }

        void main() {
          vec2 uv = gl_FragCoord.xy / uResolution.xy;
          uv = uv * 2.0 - 1.0;
          uv.x *= uResolution.x / uResolution.y;

          vec2 distortedUV = uv;
          distortedUV.y *= 0.85;
          distortedUV.x *= 1.15;

          float topologyScale = 0.55;

          vec2 epsX = vec2(0.002, 0.0);
          vec2 epsY = vec2(0.0, 0.002);

          float gradX = liquidSilkTopology((distortedUV.yx + epsX) * topologyScale) - liquidSilkTopology((distortedUV.yx - epsX) * topologyScale);
          float gradY = liquidSilkTopology((distortedUV.yx + epsY) * topologyScale) - liquidSilkTopology((distortedUV.yx - epsY) * topologyScale);
          
          // Amplified normal tracking to make the ribbon edges sharp and cliff-like
          vec3 normal = normalize(vec3(-gradX * 32.0, -gradY * 32.0, 0.008));

          // Locked lighting directions from the successful horizontal setup
          vec3 lightDir1 = normalize(vec3(1.05, 0.75, 0.48));  
          vec3 lightDir2 = normalize(vec3(-1.1, -0.6, 0.32)); 
          vec3 viewDir = vec3(0.0, 0.0, 1.0);

          // Specular exponents optimized for the new ribbon ridges
          float spec1 = pow(max(dot(normal, lightDir1), 0.0), 1200.0);
          float spec2 = pow(max(dot(normal, lightDir2), 0.0), 650.0);
          vec3 specular = (vec3(1.15) * spec1 * 18.0) + (vec3(0.85) * spec2 * 8.0);

          float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 4.5);
          vec3 rim = vec3(0.8, 0.85, 0.92) * fresnel * 0.4;

          // Pure ink-black valley floors for luxury depth contrast
          vec3 base = vec3(0.0, 0.0, 0.001);
          vec3 color = base + specular + rim;

          // HIGH-END CONTRAST GRADING: Flattens midtone grays, blasts white glare peaks
          color = smoothstep(0.04, 0.88, color);
          color = pow(color, vec3(1.25)); 
          
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