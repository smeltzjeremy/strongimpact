import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function DynamicChromeShader() {
  const meshRef = useRef();
  const { viewport, mouse } = useThree();

  // Mouse target for smooth lerp
  const targetMouse = useRef(new THREE.Vector2(0.5, 0.5));

  useFrame((state) => {
    if (meshRef.current) {
      // Smooth mouse lerp
      targetMouse.current.lerp(mouse, 0.08);
      meshRef.current.material.uniforms.u_mouse.value.copy(targetMouse.current);
      meshRef.current.material.uniforms.u_time.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        uniforms={{
          u_time: { value: 0 },
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
          uniform float u_time;
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

            float t = u_time * 0.35;

            // Mouse influence
            vec2 mouseOffset = (u_mouse - 0.5) * 1.5;

            vec2 p = uv * 4.0;
            p.x += sin(p.y * 2.5 + t * 1.2) * 0.6 + mouseOffset.x * 0.8;
            p.y += cos(p.x * 2.0 + t * 0.9) * 0.4 + mouseOffset.y * 0.6;

            float height = fbm(p + vec2(t * 0.4, t * 0.3));

            // Normals
            float eps = 0.005;
            float nx = fbm(p + vec2(eps, 0) + vec2(t * 0.4, t * 0.3)) - height;
            float ny = fbm(p + vec2(0, eps) + vec2(t * 0.4, t * 0.3)) - height;
            vec3 normal = normalize(vec3(-nx * 60.0, -ny * 60.0, 1.0));

            // Lighting
            vec3 lightDir = normalize(vec3(0.5, 0.9, 1.4));
            float diff = max(dot(normal, lightDir), 0.0);
            float spec = pow(max(dot(normal, normalize(lightDir + vec3(0.0, 0.0, 1.0))), 0.0), 48.0);

            // Metallic ramp
            vec3 base = vec3(0.03, 0.03, 0.06);
            vec3 mid = vec3(0.68, 0.70, 0.74);
            vec3 highlight = vec3(1.0, 1.0, 1.0);

            vec3 color = mix(base, mid, diff * 0.85);
            color = mix(color, highlight, spec * 0.9);

            float flow = sin(p.x * 4.0 + t * 2.0) * 0.12 + 0.5;
            color = mix(color, highlight * 0.85, flow * 0.22);

            gl_FragColor = vec4(color, 1.0);
          }
        `}
      />
    </mesh>
  );
}