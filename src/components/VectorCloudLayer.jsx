import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function VectorCloudLayer({ 
  zPos = 0, 
  colorTop = '#c23d55', 
  colorBottom = '#4a020c', 
  opacity = 0.7, 
  parallaxFactor = 0.05,
  seed = 1.0 
}) {
  const containerRef = useRef();

  // 1. Procedurally generate extra-wide papercut curves to guarantee zero viewport clipping
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    
    // Safety expansion to +/- 6.5 horizontally to cushion extreme 0.85 mouse parallax shifts
    shape.moveTo(-6.5, -4.5);
    
    const h1 = -0.2 + Math.sin(seed) * 0.25;
    const h2 = 0.1 + Math.cos(seed) * 0.35;
    const h3 = -0.1 + Math.sin(seed * 2.5) * 0.2;

    // Chain overlapping high-curvature loops to form the distinct paper-cut cloud layers
    shape.bezierCurveTo(-5.0, h1 - 0.2, -4.0, h1 + 0.8, -3.0, h2);
    shape.bezierCurveTo(-2.0, h2 + 0.6, -1.0, h2 + 0.5, 0.0, h3);
    shape.bezierCurveTo(1.0, h3 + 0.9, 2.0, h1 + 0.7, 3.5, h2 - 0.1);
    shape.bezierCurveTo(4.5, h2 + 0.5, 5.5, h3 + 0.6, 6.5, -0.4);
    
    // Deep structural base plate anchor completely below visibility window
    shape.lineTo(6.5, -4.5);
    shape.lineTo(-6.5, -4.5);
    shape.closePath();

    return new THREE.ShapeGeometry(shape);
  }, [seed]);

  // 2. High-Fidelity Custom Shader Material with advanced translucent pass-through blending
  const colorMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uColorTop: { value: new THREE.Color(colorTop) },
        uColorBottom: { value: new THREE.Color(colorBottom) },
        uOpacity: { value: opacity }
      },
      vertexShader: `
        varying vec3 vLocalPosition;
        void main() {
          vLocalPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColorTop;
        uniform vec3 uColorBottom;
        uniform float uOpacity;
        varying vec3 vLocalPosition;

        void main() {
          // Absolute local coordinate mapping: base (-4.5) to peak height (~1.0)
          float normalizedY = clamp((vLocalPosition.y + 4.5) / 5.5, 0.0, 1.0);
          vec3 finalColor = mix(uColorBottom, uColorTop, normalizedY);
          gl_FragColor = vec4(finalColor, uOpacity);
        }
      `,
      transparent: true,
      depthWrite: false,
      
      // Precision Custom WebGL Blend Architecture
      blending: THREE.CustomBlending,
      blendEquation: THREE.AddEquation,
      blendSrc: THREE.SrcAlphaFactor,
      blendDst: THREE.OneMinusSrcAlphaFactor,
      blendEquationAlpha: THREE.AddEquation,
      blendSrcAlpha: THREE.SrcAlphaFactor,
      blendDstAlpha: THREE.OneMinusSrcAlphaFactor
    });
  }, [colorTop, colorBottom, opacity]);

  // 3. Ambient Occlusion Pass Material
  const shadowMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: '#000000',
      transparent: true,
      opacity: 0.4,
      depthWrite: false,
      blending: THREE.NormalBlending
    });
  }, []);

  // 4. Parallax physics interpolation loop
  useFrame((state) => {
    if (!containerRef.current) return;
    
    // Smooth cinematic scaling window
    const targetX = state.pointer.x * parallaxFactor * 0.7;
    const targetY = state.pointer.y * parallaxFactor * 0.35;

    containerRef.current.position.x += (targetX - containerRef.current.position.x) * 0.05;
    containerRef.current.position.y += (targetY - containerRef.current.position.y) * 0.05;
  });

  return (
    <group ref={containerRef}>
      {/* SHADOW OCCLUSION PASS (Slightly deeper Z-offset + drop position) */}
      <mesh 
        geometry={geometry} 
        material={shadowMaterial} 
        position={[0, -0.08, zPos - 0.12]} 
      />

      {/* COLOR GRADIENT PASS */}
      <mesh 
        geometry={geometry} 
        material={colorMaterial} 
        position={[0, 0, zPos]} 
      />
    </group>
  );
}