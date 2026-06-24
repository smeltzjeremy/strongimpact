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

  // 2. Main Color Face Material (Your untouched golden baseline)
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

  // 3. Precise Coordinate-Mapped Shading Overlay
  const overlayShadowMaterial = useMemo(() => {
    // We calculate the heights of your exact curve points to feed to the shader
    const h1 = -0.2 + Math.sin(seed) * 0.25;
    const h2 = 0.1 + Math.cos(seed) * 0.35;
    const h3 = -0.1 + Math.sin(seed * 2.5) * 0.25;

    return new THREE.ShaderMaterial({
      uniforms: {
        uH1: { value: h1 },
        uH2: { value: h2 },
        uH3: { value: h3 }
      },
      vertexShader: `
        varying vec3 vLocalPosition;
        void main() {
          vLocalPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vLocalPosition;
        uniform float uH1;
        uniform float uH2;
        uniform float uH3;

        void main() {
          // Approximate the target curve height matching your exact geometry segments
          float curveY = -4.5;
          if (vLocalPosition.x < -5.0) {
            float t = clamp((vLocalPosition.x + 12.0) / 7.0, 0.0, 1.0);
            curveY = mix(uH1 - 0.2, uH2, t);
          } else if (vLocalPosition.x < 1.0) {
            float t = clamp((vLocalPosition.x + 5.0) / 6.0, 0.0, 1.0);
            curveY = mix(uH2, uH3, t);
          } else {
            float t = clamp((vLocalPosition.x - 1.0) / 11.0, 0.0, 1.0);
            curveY = mix(uH3, uH2 - 0.1, t);
          }

          // Calculate distance from the exact bottom baseline (-4.5) up to the current pixel height
          float totalHeight = curveY - (-4.5);
          float localY = clamp((vLocalPosition.y + 4.5) / totalHeight, 0.0, 1.0);

          // Exponent keeps the shadow trapped exclusively at the bottom part
          float fadeUp = pow(localY, 2.5);

          // Apply a clean 40% black shade that fades completely out as it goes up
          float alpha = mix(0.40, 0.0, fadeUp);

          gl_FragColor = vec4(vec3(0.0), alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending
    });
  }, [seed]);

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

  // Isolate strictly to the target preview layer for safety
  const isTargetLayer = (zPos === 0.65);

  return (
    <group ref={containerRef}>
      {/* Mesh 1: Ambient Drop Shadow Backer */}
      <mesh geometry={geometry} material={shadowMaterial} position={[0, -0.12, zPos - 0.08]} />
      
      {/* Mesh 2: Dark Rim Outline Lip */}
      <mesh geometry={geometry} material={rimMaterial} position={[0, 0, zPos]} />
      
      {/* Mesh 3: Main Base Red Face Sheet */}
      <mesh geometry={geometry} material={colorMaterial} position={[0, -0.045, zPos + 0.02]} />

      {/* Mesh 4: Coordinate-Mapped Shader Overlay */}
      {isTargetLayer && (
        <mesh 
          geometry={geometry} 
          material={overlayShadowMaterial} 
          position={[0, 0, zPos + 0.04]} 
        />
      )}
    </group>
  );
}