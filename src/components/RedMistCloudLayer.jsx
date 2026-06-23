// src/components/RedMistCloudLayer.jsx
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
          vec2 uv = vUv * 1.6;
          float t = uTime * 0.035;
          
          float n1 = noise(uv * 0.65 + vec2(t*0.18, t*0.12));
          float n2 = noise(uv * 1.35 + vec2(t*0.4, -t*0.08));
          
          float clouds = n1 * 0.65 + n2 * 0.35;
          clouds = smoothstep(0.32, 0.78, clouds);
          
          vec3 redMist = vec3(0.72, 0.12, 0.18);
          vec3 color = redMist * clouds * uIntensity;
          
          gl_FragColor = vec4(color, clouds * 0.48);
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
    <mesh ref={meshRef} position={[0, 0, 0.2]}>
      <planeGeometry args={[2, 2]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}