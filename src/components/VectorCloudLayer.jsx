import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';

export default function VectorCloudLayer({ 
  zPos = 0, 
  solidColor = '#c23d55', 
  shadowOpacity = 0.45,
  seed = 1.0 
}) {
  const containerRef = useRef();

  // Your exact, locked geometric curves
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

  // Main Color Face Material (Your untouched golden baseline)
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

  // NEW: Dedicated Bottom Shading Overlay Layer
  const overlayShadowMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vLocalPosition;
        void main() {
          vLocalPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vLocalPosition;
        void main() {
          // Tracks height up the mesh space
          float normalizedY = clamp((vLocalPosition.y + 4.5) / 5.5, 0.0, 1.0);
          
          // Tight power curve ensures the shading fades out rapidly as it climbs
          float fadeUp = pow(normalizedY, 2.5);
          
          // Fades from a clean 35% black tint at the baseline to 0% transparency at the top
          float alpha = mix(0.35, 0.0, fadeUp);
          
          gl_FragColor = vec4(vec3(0.0), alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending
    });
  }, []);

  // Crisp, step-darker red outline lip
  const rimMaterial = useMemo(() => {
    const darkEdgeColor = new THREE.Color(solidColor).clone();
    darkEdgeColor.multiplyScalar(0.65);
    
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

  // Flag to check if this is our second cloud layer from the front
  const isTargetLayer = (zPos === 0.65);

  return (
    <group ref={containerRef}>
      {/* Mesh 1: Ambient Drop Shadow Backer */}
      <mesh geometry={geometry} material={shadowMaterial} position={[0, -0.12, zPos - 0.08]} />
      
      {/* Mesh 2: Dark Rim Outline Lip */}
      <mesh geometry={geometry} material={rimMaterial} position={[0, 0, zPos]} />
      
      {/* Mesh 3: Main Base Red Face Sheet */}
      <mesh geometry={geometry} material={colorMaterial} position={[0, -0.045, zPos + 0.02]} />

      {/* Mesh 4: NEW Separate Gradient Shading Layer (Isolated to target layer) */}
      {isTargetLayer && (
        <mesh 
          geometry={geometry} 
          material={overlayShadowMaterial} 
          position={[0, -0.075, zPos + 0.03]} // Shifted slightly down (Y) and forward (Z)
        />
      )}
    </group>
  );
}