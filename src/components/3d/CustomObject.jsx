import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function CustomObject() {
  // Create a direct reference to our 3D mesh so we can animate it
  const meshRef = useRef();

  // useFrame runs on every single screen refresh frame (60fps+) directly via WebGL
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Smoothly rotate the object around its axes over time
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow position={[0, 0, 0]}>
      <torusKnotGeometry args={[0.8, 0.25, 120, 16]} />
      <meshStandardMaterial 
        color="#00ffcc" 
        roughness={0.2} 
        metalness={0.8} 
      />
    </mesh>
  );
}