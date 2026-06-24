import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function PhotoWheel() {
  const groupRef = useRef();
  const { gl, scene } = useThree();
  const rotationRef = useRef(0);

  // Scroll control
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.08 : 0.08;
      rotationRef.current += delta * 5.5;
    };

    const canvas = gl.domElement;
    canvas.addEventListener('wheel', handleWheel, { passive: false });
    return () => canvas.removeEventListener('wheel', handleWheel);
  }, [gl]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x = rotationRef.current;
    }
  });

  const spokeMaterial = new THREE.MeshStandardMaterial({
    color: '#aaaaaa',
    metalness: 1.0,
    roughness: 0.15,
    envMapIntensity: 1.2
  });

  const frameMaterial = new THREE.MeshStandardMaterial({
    color: '#111111',
    metalness: 0.9,
    roughness: 0.3,
    envMapIntensity: 1.0
  });

  const rimMaterial = new THREE.MeshStandardMaterial({
    color: '#888888',
    metalness: 1.0,
    roughness: 0.1
  });

  const numFrames = 6;
  const radius = 4.8;

  return (
    <group ref={groupRef} position={[0, 0.6, -1.5]}>
      {/* Main central axle / hub */}
      <mesh position={[0, 0, 0]} material={spokeMaterial}>
        <cylinderGeometry args={[0.45, 0.45, 1.2, 64]} />
      </mesh>

      {/* Outer rim ring (for structural feel) */}
      <mesh position={[0, 0, 0]} material={rimMaterial} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius + 0.6, 0.25, 32, 64]} />
      </mesh>

      {/* Spokes + Photo Frames */}
      {Array.from({ length: numFrames }).map((_, i) => {
        const angle = (i * Math.PI * 2) / numFrames;
        
        return (
          <group key={i} rotation={[angle, 0, 0]}>
            {/* Thick structural spoke */}
            <mesh position={[0, radius * 0.6, 0]} material={spokeMaterial}>
              <cylinderGeometry args={[0.18, 0.18, radius * 1.1, 32]} />
            </mesh>

            {/* Beveled 3D photo frame chassis */}
            <group position={[0, radius, 0]}>
              {/* Frame backing (depth) */}
              <mesh position={[0, 0, 0]} material={frameMaterial}>
                <boxGeometry args={[2.8, 2.1, 0.25]} />
              </mesh>
              
              {/* Inner photo plane */}
              <mesh position={[0, 0, 0.18]} material={new THREE.MeshStandardMaterial({ color: '#0a0a0a' })}>
                <planeGeometry args={[2.5, 1.85]} />
              </mesh>
            </group>
          </group>
        );
      })}
    </group>
  );
}