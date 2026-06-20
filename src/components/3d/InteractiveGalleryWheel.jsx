import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

// 🌊 REFINED LAYER 1: HIGH-SPEED CHROMIUM LIQUID SHADER
const ChromeWaveShader = {
  uniforms: {
    uTime: { value: 0 },
  },
  vertexShader: `
    uniform float uTime;
    varying vec2 vUv;
    varying float vElevation;
    void main() {
      vUv = uv;
      vec4 pos = modelMatrix * vec4(position, 1.0);
      float elevation = sin(pos.x * 0.6 + uTime * 1.2) * 0.45
                      + cos(pos.y * 0.5 + uTime * 0.8) * 0.35
                      + sin(pos.x * 1.1 + pos.y * 0.7 + uTime * 1.6) * 0.2;
      pos.y += elevation;
      vElevation = elevation;
      gl_Position = projectionMatrix * viewMatrix * pos;
    }
  `,
  fragmentShader: `
    varying float vElevation;
    void main() {
      float intensity = (vElevation + 0.8) * 0.9;
      intensity = smoothstep(0.2, 1.0, intensity);
      vec3 color = mix(vec3(0.02, 0.02, 0.04), vec3(1.0, 1.0, 1.0), intensity);
      gl_FragColor = vec4(color, 1.0);
    }
  `
};

export default function InteractiveGalleryWheel() {
  const chromeShaderRef = useRef();

  useFrame((state) => {
    // Drive the uniform clock at standard GPU delta time
    if (chromeShaderRef.current) {
      chromeShaderRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <group>
      {/* 🌊 LAYER 1: THE LIQUID CHROME LANDSCAPE MESH */}
      <mesh position={[0, 0, -6]} rotation={[-Math.PI / 3, 0, 0]}>
        <planeGeometry args={[28, 28, 50, 50]} />
        <shaderMaterial 
          ref={chromeShaderRef} 
          vertexShader={ChromeWaveShader.vertexShader}
          fragmentShader={ChromeWaveShader.fragmentShader}
          uniforms={ChromeWaveShader.uniforms}
        />
      </mesh>
    </group>
  );
}