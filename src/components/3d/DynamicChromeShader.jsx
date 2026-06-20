import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function DynamicChromeShader() {
  const meshRef = useRef();
  const { size } = useThree();

  // Memoize uniform map structure to retain permanent memory context addresses
  const shaderUniforms = useMemo(() => ({
    u_resolution: { value: new THREE.Vector2(size.width, size.height) }
  }), []);

  // Update resolutions smoothly on viewport adjustment ticks
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.u_resolution.value.set(size.width, size.height);
    }
  });

  return (
    <mesh ref={meshRef}>
      {/* 2x2 Plane pushed directly across the full screen clip space layout */}
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        depthWrite={false}
        depthTest={false}
        uniforms={shaderUniforms}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            // Overriding structural matrices to force absolute quad coverage
            gl_Position = vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec2 u_resolution;
          varying vec2 vUv;

          // Pure math curves creating broad, silk-smooth fluid topology
          float getSilkHeight(vec2 uv) {
            // Scale and shift coordinates to frame the sweeping waves perfectly
            vec2 p = (uv - 0.5) * 4.5;
            
            // Large, sweeping sine combinations mimic physical flowing metal ribbons
            float wave1 = sin(p.x * 1.5 + p.y * 1.0);
            float wave2 = cos(p.y * 1.8 - p.x * 0.6 + wave1 * 0.8);
            float wave3 = sin(p.x * 1.2 + wave2 * 1.4);
            
            return (wave1 * 0.45 + wave2 * 0.4 + wave3 * 0.15) * 0.5 + 0.5;
          }

          void main() {
            // Enforce perfect pixel coordinates mapping independent of aspect changes
            vec2 uv = gl_FragCoord.xy / u_resolution.xy;

            // Sharp, precise pixel sampling intervals for crisp specular mapping
            float delta = 0.0015; 
            float h = getSilkHeight(uv);
            float hX = getSilkHeight(uv + vec2(delta, 0.0));
            float hY = getSilkHeight(uv + vec2(0.0, delta));

            // Derive intense surface slopes to generate mirror reflection vectors
            vec3 normal = normalize(vec3((h - hX) / delta, (h - hY) / delta, 0.04));

            // Cinematic high-contrast studio light placement vectors
            vec3 lightDir1 = normalize(vec3(0.3, 0.8, 0.5));
            vec3 lightDir2 = normalize(vec3(-0.4, -0.2, 0.6));
            vec3 viewDir = vec3(0.0, 0.0, 1.0);

            // Calculate hyper-polished specular gloss reflections
            float spec1 = pow(max(dot(reflect(-lightDir1, normal), viewDir), 0.0), 64.0);
            float spec2 = pow(max(dot(reflect(-lightDir2, normal), viewDir), 0.0), 32.0);
            float diffuse = max(dot(normal, lightDir1), 0.0);

            // COLOR PALETTE: Pitch Black Obsidian Void to Pure Platinum White Highlights
            vec3 pureVoidBlack = vec3(0.0, 0.0, 0.0);
            vec3 metallicSilver = vec3(0.65, 0.67, 0.72);
            vec3 pureWhiteShine = vec3(1.0, 1.0, 1.0);

            // Construct composite surface lighting
            vec3 finalColor = mix(pureVoidBlack, metallicSilver, diffuse * 0.35);
            finalColor += (spec1 * 1.2 + spec2 * 0.5) * pureWhiteShine;

            // Extreme high-contrast curve mapping to give it that hard, liquid metal edge
            finalColor = smoothstep(0.02, 0.98, finalColor);

            gl_FragColor = vec4(finalColor, 1.0);
          }
        `}
      />
    </mesh>
  );
}