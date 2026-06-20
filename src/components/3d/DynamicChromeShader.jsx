import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function DynamicChromeShader() {
  const meshRef = useRef();
  const { size } = useThree();

  // Initialize the resolution uniform using standard R3F window metrics
  const shaderUniforms = useMemo(() => ({
    u_resolution: { value: new THREE.Vector2(size.width, size.height) }
  }), []);

  // Ensure resolution updates seamlessly if the device switches orientation
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.u_resolution.value.set(size.width, size.height);
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        depthWrite={false}
        depthTest={false}
        uniforms={shaderUniforms}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec2 u_resolution;
          varying vec2 vUv;

          // Pure math curves creating broad, silk-smooth fluid topology
          float getSilkHeight(vec2 uv) {
            vec2 p = uv * 2.5;
            
            // Large, sweeping sine combinations mimic physical flowing metal ribbons
            float wave1 = sin(p.x * 1.5 + p.y * 1.0);
            float wave2 = cos(p.y * 2.0 - p.x * 0.5 + wave1 * 0.8);
            float wave3 = sin(p.x * 1.0 + wave2 * 1.2);
            
            return (wave1 * 0.4 + wave2 * 0.4 + wave3 * 0.2) * 0.5 + 0.5;
          }

          void main() {
            // Perfect aspect ratio matching to avoid any viewport stretching
            vec2 uv = gl_FragCoord.xy / u_resolution.y;

            // Sharp, precise pixel sampling intervals for crisp specular mapping
            float delta = 0.002; 
            float h = getSilkHeight(uv);
            float hX = getSilkHeight(uv + vec2(delta, 0.0));
            float hY = getSilkHeight(uv + vec2(0.0, delta));

            // Derive intense surface slopes to generate mirror reflection vectors
            vec3 normal = normalize(vec3((h - hX) / delta, (h - hY) / delta, 0.08));

            // Cinematic high-contrast studio light placement vectors
            vec3 lightDir1 = normalize(vec3(0.4, 0.7, 0.8));
            vec3 lightDir2 = normalize(vec3(-0.5, -0.3, 0.4));
            vec3 viewDir = vec3(0.0, 0.0, 1.0);

            // Calculate hyper-polished specular gloss reflections
            float spec1 = pow(max(dot(reflect(-lightDir1, normal), viewDir), 0.0), 40.0);
            float spec2 = pow(max(dot(reflect(-lightDir2, normal), viewDir), 0.0), 20.0);
            float diffuse = max(dot(normal, lightDir1), 0.0);

            // COLOR PALETTE: Pitch Black Obsidian Void to Pure Platinum White Highlights
            vec3 pureVoidBlack = vec3(0.0, 0.0, 0.0);
            vec3 metallicSilver = vec3(0.55, 0.57, 0.62);
            vec3 pureWhiteShine = vec3(1.0, 1.0, 1.0);

            // Construct composite surface lighting
            vec3 finalColor = mix(pureVoidBlack, metallicSilver, diffuse * 0.4);
            finalColor += (spec1 * 0.95 + spec2 * 0.35) * pureWhiteShine;

            // Extreme high-contrast curve mapping to give it that hard, liquid metal edge
            finalColor = smoothstep(0.05, 0.95, finalColor);

            gl_FragColor = vec4(finalColor, 1.0);
          }
        `}
      />
    </mesh>
  );
}