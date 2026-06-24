import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';

export default function VectorCloudLayer({ 
  zPos = 0, 
  solidColor = '#c23d55', 
  shadowOpacity = 0.45,
  seed = 1.0 
}) {
  const containerRef = useRef();

  // 1. Your exact, locked geometric curves
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

  // 2. Main Color Face Material (Completely clean, flat baseline)
  const colorMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color(solidColor),
      transparent: false,
      depthWrite: true
    });
  }, [solidColor]);

  // 3. One Clean Extra Shadow Mesh Material (Simple, basic linear fade overlay)
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
          // Exponent controls how fast it fades out as it moves up from the bottom (vUv.y = 0)
          float fadeUp = pow(vUv.y, 4.0);
          
          // Starts at 50% black at the bottom edge, fades completely to clear (0.0) at the top
          float alpha = mix(0.50, 0.0, fadeUp);
          
          gl_FragColor = vec4(vec3(0.0), alpha);
        }
      `,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: THREE.NormalBlending
    });
  }, []);

  // 4. Crisp, step-darker red outline lip
  const rimMaterial = useMemo(() => {
    const darkEdgeColor = new THREE.Color(solidColor).clone();
    darkEdgeColor.multiplyScalar(0.65);
    
    return new THREE.MeshBasicMaterial({
      color: darkEdgeColor,
      transparent: false,
      depthWrite: true
    });
  }, [solidColor]);

  // 5. Ambient Background Drop Shadow
  const shadowMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: '#000000',
      transparent: true,
      opacity: shadowOpacity,
      depthWrite: false,
      blending: THREE.NormalBlending
    });
  }, [shadowOpacity]);

  // Target look on just the second cloud from the front
  const isTargetLayer = (zPos === 0.65);

  return (
    <group ref={containerRef}>
      {/* Mesh 1: Ambient Drop Shadow Backer */}
      <mesh geometry={geometry} material={shadowMaterial} position={[0, -0.12, zPos - 0.08]} />
      
      {/* Mesh 2: Dark Rim Outline Lip */}
      <mesh geometry={geometry} material={rimMaterial} position={[0, 0, zPos]} />
      
      {/* Mesh 3: Main Base Red Face Sheet (Pure, flat color baseline) */}
      <mesh geometry={geometry} material={colorMaterial} position={[0, -0.045, zPos + 0.02]} />

      {/* Mesh 4: Your clean extra test shadow mesh layer */}
      {isTargetLayer && (
        <mesh 
          geometry={geometry} 
          material={overlayShadowMaterial} 
          position={[0, -0.045, zPos + 0.04]} // Perfect alignment on top of the red face plate
          renderOrder={1}                     // Force WebGL to draw it on top
        />
      )}
    </group>
  );
}