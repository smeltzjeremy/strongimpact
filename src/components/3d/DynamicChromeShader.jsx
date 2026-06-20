import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function DynamicChromeShader() {
  const meshRef = useRef();
  const { size } = useThree();

  // Memoize uniform map structure to maintain stable memory context
  const shaderUniforms = useMemo(() => ({
    u_resolution: { value: new THREE.Vector2(size.width, size.height) }
  }), []);

  // Dynamically update context on viewport resize ticks
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.u_resolution.value.set(size.width, size.height);
    }
  });

  return (
    <mesh ref={meshRef}>
      {/* 2x2 Plane pushed over the full-screen clip space */}
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        depthWrite={false}
        depthTest={false}
        uniforms={shaderUniforms}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            // Bypass camera transforms for absolute quad viewport coverage
            gl_Position = vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec2 u_resolution;
          varying vec2 vUv;

          // Huge, low-frequency curves to get wide silky bands
          float getSilkHeight(vec2 uv) {
            // Zoom way in so the waves are massive on screen
            vec2 p = (uv - 0.5) * 1.5;
            
            // Just two massive wave calculations to avoid micro-bumps
            float wave1 = sin(p.x * 2.2 + p.y * 1.5);
            float wave2 = cos(p.y * 2.5 - p.x * 1.0 + wave1 * 0.7);
            
            return (wave1 * 0.5 + wave2 * 0.5) * 0.5 + 0.5;
          }

          void main() {
            vec2 uv = gl_FragCoord.xy / u_resolution.xy;

            // Sharp, precise pixel sampling interval for crisp specular mapping
            float delta = 0.001; 
            float h = getSilkHeight(uv);
            float hX = getSilkHeight(uv + vec2(delta, 0.0));
            float hY = getSilkHeight(uv + vec2(0.0, delta));

            // Deepened normal z-axis modifier (0.01) forces extreme reflective contrast
            vec3 normal = normalize(vec3((h - hX) / delta, (h - hY) / delta, 0.01));

            // High contrast light directions mirroring a studio setup
            vec3 lightDir = normalize(vec3(0.3, 0.8, 0.4));
            vec3 viewDir = vec3(0.0, 0.0, 1.0);

            // Intense, tight specular gloss calculations for that wet chrome shine
            float spec = pow(max(dot(reflect(-lightDir, normal), viewDir), 0.0), 90.0);
            float diffuse = max(dot(normal, lightDir), 0.0);

            // High contrast colors
            vec3 pureVoidBlack = vec3(0.0, 0.0, 0.0);
            vec3 metallicSilver = vec3(0.7, 0.72, 0.78);
            vec3 pureWhiteShine = vec3(1.0, 1.0, 1.0);

            // Mix base liquid metal
            vec3 finalColor = mix(pureVoidBlack, metallicSilver, diffuse * 0.3);
            
            // Boost the bright specular bands heavily
            finalColor += spec * 2.2 * pureWhiteShine;

            // Hard edge contrast mapping to eliminate any gray fog
            finalColor = smoothstep(0.1, 0.9, finalColor);

            gl_FragColor = vec4(finalColor, 1.0);
          }
        `}
      />
    </mesh>
  );
}