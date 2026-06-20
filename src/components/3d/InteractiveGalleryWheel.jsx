import React from 'react';

export default function InteractiveGalleryWheel() {
  return (
    <group>
      {/* 🌊 LAYER 1: PIXEL-PERFECT SMOOTH CHROMIUM RIBBONS */}
      <mesh position={[0, 0, -12]} rotation={[-Math.PI / 3, 0, 0]}>
        <planeGeometry args={[120, 120]} />
        <shaderMaterial 
          vertexShader={`
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            varying vec2 vUv;
            void main() {
              // Your optimized pixel-density wave formula
              float pattern = sin(vUv.x * 6.0 + vUv.y * 4.0) * 0.5 + cos(vUv.y * 5.0) * 0.3;
              
              // Smooth out the gradients completely
              pattern = smoothstep(0.2, 0.8, pattern);
              
              // Your precise color grading values (Obsidian to Chrome White)
              vec3 color = mix(vec3(0.04, 0.04, 0.08), vec3(0.95, 0.95, 1.0), pattern);
              gl_FragColor = vec4(color, 1.0);
            }
          `}
        />
      </mesh>
    </group>
  );
}