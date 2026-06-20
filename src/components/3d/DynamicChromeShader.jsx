import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function DynamicChromeShader() {
  const meshRef = useRef();
  const { mouse } = useThree();

  // Mouse target for smooth interaction (kept for depth but no time movement)
  const targetMouse = useRef(new THREE.Vector2(0.5, 0.5));

  useFrame(() => {
    if (meshRef.current) {
      targetMouse.current.lerp(mouse, 0.08);
      meshRef.current.material.uniforms.u_mouse.value.copy(targetMouse.current);
      // u_time removed entirely to maintain frozen state execution
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        uniforms={{
          u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
          u_mouse: { value: new THREE.Vector2(0.5, 0.5) }
        }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec2 u_resolution;
          uniform vec2 u_mouse;
          varying vec2 vUv;

          float hash(vec2 p) {
            return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
          }

          float noise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            float a = hash(i);
            float b = hash(i + vec2(1.0, 0.0));
            float c = hash(i + vec2(0.0, 1.0));
            float d = hash(i + vec2(1.0, 1.0));
            vec2 u = f * f * (3.0 - 2.0 * f);
            return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
          }

          float fbm(vec2 p) {
            float v = 0.0;
            float a = 0.5;
            vec2 shift = vec2(100.0);
            for (int i = 0; i < 5; i++) {
              v += a * noise(p);
              p = p * 2.0 + shift;
              a *= 0.5;
            }
            return v;
          }

          void main() {
            vec2 uv = vUv;
            uv.x *= u_resolution.x / u_resolution.y;

            // Mouse influence for subtle depth (no time movement)
            vec2 mouseOffset = (u_mouse - 0.5) * 1.2;

            vec2 p = uv * 4.2;
            p.x += sin(p.y * 2.4) * 0.55 + mouseOffset.x * 0.8;
            p.y += cos(p.x * 1.9) * 0.4 + mouseOffset.y * 0.6;

            float height = fbm(p);

            // Steeper normals for deep carved look
            float eps = 0.004;
            float nx = fbm(p + vec2(eps, 0)) - height;
            float ny = fbm(p + vec2(0, eps)) - height;
            vec3 normal = normalize(vec3(-nx * 120.0, -ny * 120.0, 1.0));

            // Lighting
            vec3 lightDir = normalize(vec3(0.5, 0.9, 1.4));
            float diff = max(dot(normal, lightDir), 0.0);
            float spec = pow(max(dot(normal, normalize(lightDir + vec3(0.0, 0.0, 1.0))), 0.0), 64.0);

            // Blacker base + high-contrast metallic ramp
            vec3 base = vec3(0.0, 0.0, 0.0);           // Pure pitch black
            vec3 mid = vec3(0.55, 0.57, 0.62);         // Slick platinum
            vec3 highlight = vec3(1.0, 1.0, 1.0);      // Blinding white

            vec3 color = mix(base, mid, diff * 0.75);
            color = mix(color, highlight, spec * 0.95);

            gl_FragColor = vec4(color, 1.0);
          }
        `}
      />
    </mesh>
  );
}