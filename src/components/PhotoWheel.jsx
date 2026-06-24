import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function PhotoWheel() {
  const groupRef = useRef();
  const { gl } = useThree();
  const rotationRef = useRef(0);

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.08 : 0.08;
      rotationRef.current += delta * 3.5;
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
    color: '#dddddd',
    metalness: 1.0,
    roughness: 0.12,
  });

  const frameMaterial = new THREE.MeshStandardMaterial({
    color: '#1a1a1c',
    metalness: 0.85,
    roughness: 0.22,
  });

  const numFrames = 6;
  const radius = 3.2;   // Much smaller & balanced

  return (
    <group ref={groupRef} position={[0, 0.4, -1.6]}>   {/* Tuned position + z-depth */}
      {/* Central axle / hub */}
      <mesh rotation={[0, 0, Math.PI / 2]} material={spokeMaterial}>
        <cylinderGeometry args={[0.32, 0.32, 1.4, 32]} />
      </mesh>

      {/* Spokes + Frames */}
      {Array.from({ length: numFrames }).map((_, i) => {
        const angle = (i * Math.PI * 2) / numFrames;
        return (
          <group key={i} rotation={[angle, 0, 0]}>
            {/* Structural spoke */}
            <mesh position={[0, 0, radius * 0.55]} rotation={[Math.PI / 2, 0, 0]} material={spokeMaterial}>
              <cylinderGeometry args={[0.09, 0.09, radius * 1.05, 16]} />
            </mesh>

            {/* 3D Photo Frame */}
            <group position={[0, 0, radius]}>
              <mesh material={frameMaterial}>
                <boxGeometry args={[2.4, 1.75, 0.22]} />
              </mesh>
              <mesh position={[0, 0, 0.13]} material={new THREE.MeshStandardMaterial({ color: '#0a0a0a' })}>
                <planeGeometry args={[2.15, 1.55]} />
              </mesh>
            </group>
          </group>
        );
      })}
    </group>
  );
}