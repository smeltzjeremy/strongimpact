import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function RedMistCloudLayer({ intensity = 0.22 }) {
  const meshRef = useRef();

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uIntensity: { value: intensity },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uIntensity;
        varying vec2 vUv;

        float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453123); }
        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          float a = hash(i), b = hash(i + vec2(1.0,0.0)), c = hash(i + vec2(0.0,1.0)), d = hash(i + vec2(1.0,1.0));
          vec2 u = f*f*(3.0-2.0*f);
          return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
        }

        void main() {
          vec2 uv = vUv;
          float t = uTime * 0.25;
          
          float warp = noise(uv * 2.5 + vec2(t * 0.15, 0.0));
          vec2 cloudUV = uv * vec2(2.0, 3.5) + vec2(t * 0.2, warp * 0.35);
          
          float n1 = noise(cloudUV * 0.85);
          float n2 = noise(cloudUV * 2.15);
          float cloudDensity = n1 * 0.68 + n2 * 0.32;
          
          // Vertical mask - stronger in lower half
          float verticalMask = smoothstep(0.52, 0.08, uv.y);
          
          cloudDensity = smoothstep(0.25, 0.75, cloudDensity) * verticalMask;
          
          vec3 redMist = vec3(0.68, 0.08, 0.12);
          float finalAlpha = cloudDensity * uIntensity * 0.55;
          vec3 finalColor = redMist * finalAlpha;
          
          gl_FragColor = vec4(finalColor, finalAlpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, [intensity]);

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.getElapsedTime();
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0.25]}>
      <planeGeometry args={[2, 2]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}