// src/components/ProceduralChromeBackground.jsx
import React, { useMemo, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ProceduralChromeBackground() {
  const { size } = useThree();

  // Cached uniforms - memory efficient + reactive to resize
  const uniforms = useMemo(() => ({
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
  }), [size.width, size.height]);

  // Update resolution every frame (cheap operation)
  useFrame(() => {
    uniforms.uResolution.value.set(size.width, size.height);
  });

  // ShaderMaterial with explicit cleanup
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

        void main() {
          vec2 uv = gl_FragCoord.xy / uResolution.xy;
          uv = uv * 2.0 - 1.0;
          uv.x *= uResolution.x / uResolution.y;

          // Pure black baseline (ready for chrome math)
          vec3 baseBlackVector = vec3(0.02, 0.02, 0.03);
          
          gl_FragColor = vec4(baseBlackVector, 1.0);
        }
      `,
      depthWrite: false,
      depthTest: false,
    });
  }, [uniforms]);

  // Explicit GPU memory cleanup on unmount (prevents leaks on route change)
  useEffect(() => {
    return () => {
      material.dispose();
    };
  }, [material]);

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}