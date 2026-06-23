import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function CloudLayer({ 
  intensity = 0.22, 
  position = [0, 0, 0], 
  scale = [2, 2, 1],
  speed = 0.25,
  noiseScale = [2.0, 3.5],
  layerColor = [0.68, 0.08, 0.12],
  layerOffset = 0.0 
}) {
  const meshRef = useRef();

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uIntensity: { value: intensity },
        uSpeed: { value: speed },
        uNoiseScale: { value: new THREE.Vector2(noiseScale[0], noiseScale[1]) },
        uLayerColor: { value: new THREE.Color(...layerColor) },
        uLayerOffset: { value: layerOffset }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uIntensity;
        uniform float uSpeed;
        uniform vec2 uNoiseScale;
        uniform vec3 uLayerColor;
        uniform float uLayerOffset;
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
          float t = (uTime * uSpeed) + uLayerOffset;
          
          float warp = noise(uv * 2.5 + vec2(t * 0.15, 0.0));
          vec2 cloudUV = uv * uNoiseScale + vec2(t * 0.2, warp * 0.35);
          
          float n1 = noise(cloudUV * 0.85);
          float n2 = noise(cloudUV * 2.15);
          float cloudDensity = n1 * 0.68 + n2 * 0.32;
          
          float verticalMask = smoothstep(0.75, 0.1, uv.y);
          cloudDensity = smoothstep(0.2, 0.8, cloudDensity) * verticalMask;
          
          float finalAlpha = cloudDensity * uIntensity;
          vec3 finalColor = uLayerColor * finalAlpha;
          
          gl_FragColor = vec4(finalColor, finalAlpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, [intensity, speed, noiseScale, layerColor, layerOffset]);

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.getElapsedTime();
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <planeGeometry args={[1, 1]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}