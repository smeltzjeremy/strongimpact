import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function VectorCloudLayer({ 
  zPos = 0, 
  solidColor = '#c23d55', 
  shadowOpacity = 0.45,
  parallaxFactor = 0.05,
  seed = 1.0 
}) {
  const containerRef = useRef();

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    
    shape.moveTo(-6.5, -4.5);
    
    const h1 = -0.2 + Math.sin(seed) * 0.25;
    const h2 = 0.1 + Math.cos(seed) * 0.35;
    const h3 = -0.1 + Math.sin(seed * 2.5) * 0.25;

    shape.bezierCurveTo(-5.0, h1 - 0.2, -4.0, h1 + 0.8, -3.0, h2);
    shape.bezierCurveTo(-2.0, h2 + 0.6, -1.0, h2 + 0.5, 0.0, h3);
    shape.bezierCurveTo(1.0, h3 + 0.9, 2.0, h1 + 0.7, 3.5, h2 - 0.1);
    shape.bezierCurveTo(4.5, h2 + 0.5, 5.5, h3 + 0.6, 6.5, -0.4);
    
    shape.lineTo(6.5, -4.5);
    shape.lineTo(-6.5, -4.5);
    shape.closePath();

    return new THREE.ShapeGeometry(shape);
  }, [seed]);

  const colorMaterial = useMemo(() => {
    const darkBaseColor = new THREE.Color(solidColor).multiplyScalar(0.65);

    return new THREE.ShaderMaterial({
      uniforms: {
        uColorTop: { value: new THREE.Color(solidColor) },
        uColorBottom: { value: darkBaseColor },
        uOpacity: { value: 0.88 }
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
          float normalizedY = clamp((vLocalPosition.y + 4.5) / 5.5, 0.0, 1.0);
          vec3 finalColor = mix(uColorBottom, uColorTop, normalizedY);
          gl_FragColor = vec4(finalColor, uOpacity);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending
    });
  }, [solidColor]);

  const rimMaterial = useMemo(() => {
    const rimColor = new THREE.Color(solidColor);
    rimColor.addScalar(0.22);
    
    return new THREE.MeshBasicMaterial({
      color: rimColor,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
      blending: THREE.NormalBlending
    });
  }, [solidColor]);

  const shadowMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: '#000000',
      transparent: true,
      opacity: shadowOpacity,
      depthWrite: false,
      blending: THREE.NormalBlending
    });
  }, [shadowOpacity]);

  useFrame((state) => {
    if (!containerRef.current) return;
    
    const targetX = state.pointer.x * parallaxFactor * 0.7;
    const targetY = state.pointer.y * parallaxFactor * 0.35;

    containerRef.current.position.x += (targetX - containerRef.current.position.x) * 0.05;
    containerRef.current.position.y += (targetY - containerRef.current.position.y) * 0.05;
  });

  return (
    <group ref={containerRef} scale={[1.65, 1.0, 1.0]}>
      <mesh 
        geometry={geometry} 
        material={shadowMaterial} 
        position={[0, -0.08, zPos - 0.12]} 
      />

      <mesh 
        geometry={geometry} 
        material={rimMaterial} 
        position={[0, 0, zPos]} 
      />

      <mesh 
        geometry={geometry} 
        material={colorMaterial} 
        position={[0, -0.032, zPos + 0.02]} 
      />
    </group>
  );
}