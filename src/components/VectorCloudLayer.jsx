import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';

export default function VectorCloudLayer({ 
  zPos = 0, 
  solidColor = '#c23d55', 
  shadowOpacity = 0.45,
  seed = 1.0 
}) {
  const containerRef = useRef();

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-12.0, -4.5);
    
    const h1 = -0.2 + Math.sin(seed) * 0.25;
    const h2 = 0.1 + Math.cos(seed) * 0.35;
    const h3 = -0.1 + Math.sin(seed * 2.5) * 0.25;

    shape.bezierCurveTo(-9.0, h1 - 0.2, -7.0, h1 + 0.8, -5.0, h2);
    shape.bezierCurveTo(-3.0, h2 + 0.6, -1.0, h2 + 0.5, 1.0, h3);
    shape.bezierCurveTo(3.0, h3 + 0.9, 5.0, h1 + 0.7, 7.5, h2 - 0.1);
    shape.bezierCurveTo(9.0, h2 + 0.5, 10.5, h3 + 0.6, 12.0, -0.4);
    
    shape.lineTo(12.0, -4.5);
    shape.lineTo(-12.0, -4.5);
    shape.closePath();

    return new THREE.ShapeGeometry(shape);
  }, [seed]);

  // Main red with internal gradient
  const colorMaterial = useMemo(() => {
    const shadedBaseColor = new THREE.Color(solidColor).clone().multiplyScalar(0.45);

    return new THREE.ShaderMaterial({
      uniforms: {
        uColorTop: { value: new THREE.Color(solidColor) },
        uColorBottom: { value: shadedBaseColor }
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
        varying vec3 vLocalPosition;

        void main() {
          float normalizedY = clamp((vLocalPosition.y + 4.5) / 5.5, 0.0, 1.0);
          float shadeCurve = pow(normalizedY, 0.75);
          vec3 finalColor = mix(uColorBottom, uColorTop, shadeCurve);
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      transparent: false,
      depthWrite: true
    });
  }, [solidColor]);

  // Extra soft bottom shadow overlay (only on target cloud)
  const overlayShadowMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        void main() {
          float fadeUp = pow(vUv.y, 3.8);        // higher = tighter to bottom
          float alpha = mix(0.42, 0.0, fadeUp);  // darkness at bottom
          gl_FragColor = vec4(0.0, 0.0, 0.0, alpha);
        }
      `,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: THREE.NormalBlending
    });
  }, []);

  const rimMaterial = useMemo(() => {
    const darkEdgeColor = new THREE.Color(solidColor).clone().multiplyScalar(0.65);
    return new THREE.MeshBasicMaterial({
      color: darkEdgeColor,
      transparent: false,
      depthWrite: true
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

  return (
    <group ref={containerRef}>
      <mesh geometry={geometry} material={shadowMaterial} position={[0, -0.12, zPos - 0.08]} />
      <mesh geometry={geometry} material={rimMaterial} position={[0, 0, zPos]} />
      <mesh geometry={geometry} material={colorMaterial} position={[0, -0.045, zPos + 0.02]} />

      {/* Soft bottom shading overlay - only on second cloud from front */}
      {zPos === 0.65 && (
        <mesh 
          geometry={geometry} 
          material={overlayShadowMaterial} 
          position={[0, -0.08, zPos + 0.045]} 
          renderOrder={2}
        />
      )}
    </group>
  );
}