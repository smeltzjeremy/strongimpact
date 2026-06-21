import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function DynamicChromeShader() {
  const meshRef = useRef();
  const { size, mouse } = useThree();

  const targetMouse = useRef(new THREE.Vector2(0.5, 0.5));

  // INITIALIZATION FIX: Explicitly setup all matching structural properties natively
  const shaderUniforms = useMemo(() => ({
    u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
    u_time: { value: 0.0 }
  }), []);

  useFrame((state) => {
    if (meshRef.current) {
      const dTime = Math.min(state.delta, 0.1);
      const lerpSpeed = 1.0 - Math.exp(-9.0 * dTime);
      targetMouse.current.lerp(mouse, lerpSpeed);

      meshRef.current.material.uniforms.u_mouse.value.copy(targetMouse.current);
      meshRef.current.material.uniforms.u_time.value = state.clock.getElapsedTime();
      meshRef.current.material.uniforms.u_resolution.value.set(
        size.width || window.innerWidth,
        size.height || window.innerHeight
      );
    }
  });

  return (
    <mesh ref={meshRef}>
      {/* GEOMETRY FIX: Added explicit dimensions so the GPU engine draws across the full screen */}
      <planeGeometry args={[2, 2, 1, 1]} />
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
          uniform vec2 u_mouse;
          uniform float u_time;
          varying vec2 vUv;

          float microTexture(vec2 p) {
            return sin(p.x * 12.0 + sin(p.y * 8.0)) * cos(p.y * 12.0 + cos(p.x * 8.0)) * 0.12;
          }

          float getChromeHeight(vec2 uv, vec2 mouseOffset) {
            vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
            vec2 p = (uv - 0.5) * aspect * vec2(3.6, 7.6) + (mouseOffset * 0.45);

            p.x *= 0.44;
            p.y *= 1.32;

            float microWarp = microTexture(p * 1.5);
            p += vec2(microWarp * 0.14, -microWarp * 0.1);

            float wave1 = sin(p.x * 2.18 + p.y * 1.42);
            float wave2 = cos(p.y * 2.08 - p.x * 1.18 + wave1 * 0.72);
            float wave3 = sin(p.x * 1.52 + wave2 * 1.28) * 0.48;

            return (wave1 * 0.54 + wave2 * 0.46 + wave3 * 0.28) * 0.58 + 0.5;
          }

          void main() {
            vec2 uv = vUv;
            vec2 mouseOffset = (u_mouse - 0.5) * 0.38;

            float delta = 0.0015;
            float h  = getChromeHeight(uv, mouseOffset);
            float hX = getChromeHeight(uv + vec2(delta, 0.0), mouseOffset);
            float hY = getChromeHeight(uv + vec2(0.0, delta), mouseOffset);

            vec3 normal = normalize(vec3(
              (h - hX) / delta * 245.0,
              (h - hY) / delta * 245.0,
              1.0
            ));

            float slowDrift = u_time * 0.05;
            vec3 lightDir1 = normalize(vec3(0.32 + sin(slowDrift) * 0.02, 0.76, 0.56 + cos(slowDrift) * 0.02));
            vec3 lightDir2 = normalize(vec3(-0.52, -0.12, 0.38));
            vec3 viewDir = vec3(0.0, 0.0, 1.0);

            float diff = max(dot(normal, lightDir1), 0.0);
            float spec1 = pow(max(dot(reflect(-lightDir1, normal), viewDir), 0.0), 148.0);
            float spec2 = pow(max(dot(reflect(-lightDir2, normal), viewDir), 0.0), 36.0);

            float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 4.8);

            vec3 base = vec3(0.0, 0.0, 0.0);
            vec3 mid = vec3(0.38, 0.40, 0.44);
            vec3 highlight = vec3(1.0, 1.0, 1.0);

            vec3 color = mix(base, mid, diff * 0.20);
            color += (spec1 * 4.6 + spec2 * 0.75) * highlight;
            color += fresnel * 0.42 * highlight;

            color = smoothstep(0.06, 0.94, color);
            color = pow(color, vec3(1.0 / 2.2));

            gl_FragColor = vec4(color, 1.0);
          }
        `}
      />
    </mesh>
  );
}