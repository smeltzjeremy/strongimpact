import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function DynamicChromeShader() {
  const meshRef = useRef();
  const { size } = useThree();

  // Establish fallback measurements during early context mount phases
  const shaderUniforms = useMemo(() => ({
    u_resolution: { value: new THREE.Vector2(size.width || window.innerWidth, size.height || window.innerHeight) }
  }), []);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.u_resolution.value.set(
        size.width || window.innerWidth, 
        size.height || window.innerHeight
      );
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
            // Using vUv directly keeps the scale completely square on any device screen
            vec2 p = (uv - 0.5) * 3.0;
            
            // Lock horizontal orientation to flatten the wave valleys into wide silk bands
            p.x *= 0.5;
            p.y *= 1.8;
            
            // Simple low-frequency macro equations to match the reference image flow
            float wave1 = sin(p.x * 2.5 + p.y * 1.5);
            float wave2 = cos(p.y * 2.0 - p.x * 1.0 + wave1 * 0.8);
            
            return (wave1 * 0.5 + wave2 * 0.5) * 0.5 + 0.5;
          }

          void main() {
            // Sample the mesh coordinate layer instead of the pixel screen layer
            vec2 uv = vUv;

            // Extremely small sampling delta forces razor-sharp light reflections
            float delta = 0.001; 
            float h = getSilkHeight(uv);
            float hX = getSilkHeight(uv + vec2(delta, 0.0));
            float hY = getSilkHeight(uv + vec2(0.0, delta));

            // High-contrast slope normal vector mapping
            vec3 normal = normalize(vec3((h - hX) / delta, (h - hY) / delta, 0.01));

            // Studio high-contrast light direction vectors
            vec3 lightDir = normalize(vec3(0.4, 0.8, 0.5));
            vec3 viewDir = vec3(0.0, 0.0, 1.0);

            // Tight, hyper-polished specular calculation to create wide chrome strips
            float spec = pow(max(dot(reflect(-lightDir, normal), viewDir), 0.0), 95.0);
            float diffuse = max(dot(normal, lightDir), 0.0);

            // COLOR PALETTE: Hard obsidian black to pure mercury white
            vec3 pureVoidBlack = vec3(0.0, 0.0, 0.0);
            vec3 metallicSilver = vec3(0.65, 0.67, 0.73);
            vec3 pureWhiteShine = vec3(1.0, 1.0, 1.0);

            // Construct composite light gradients
            vec3 finalColor = mix(pureVoidBlack, metallicSilver, diffuse * 0.35);
            finalColor += spec * 2.4 * pureWhiteShine;

            // Strict contrast threshold mapping to kill all foggy gray midtones
            finalColor = smoothstep(0.12, 0.88, finalColor);

            gl_FragColor = vec4(finalColor, 1.0);
          }
        `}
      />
    </mesh>
  );
}