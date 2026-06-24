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
      rotationRef.current += (e.deltaY > 0 ? -0.06 : 0.06) * 4;
    };
    const canvas = gl.domElement;
    canvas.addEventListener('wheel', handleWheel, { passive: false });
    return () => canvas.removeEventListener('wheel', handleWheel);
  }, [gl]);

  useFrame(() => {
    if (groupRef.current) groupRef.current.rotation.x = rotationRef.current;
  });

  const metalMat = new THREE.MeshStandardMaterial({
    color: '#cccccc',
    metalness: 0.95,
    roughness: 0.1,
  });

  const frameMat = new THREE.MeshStandardMaterial({
    color: '#111111',
    metalness: 0.8,
    roughness: 0.3,
  });

  const radius = 3.4;
  const numFrames = 6;

  return (
    <group ref={groupRef} position={[0, 0.5, -1.55]}>
      {/* Central hub */}
      <mesh material={metalMat}>
        <cylinderGeometry args={[0.4, 0.4, 1.8, 48]} />
      </mesh>

      {Array.from({ length: numFrames }).map((_, i) => {
        const angle = (i * Math.PI * 2) / numFrames;
        return (
          <group key={i} rotation={[angle, 0, 0]}>
            {/* Spoke */}
            <mesh position={[0, radius * 0.55, 0]} material={metalMat}>
              <cylinderGeometry args={[0.12, 0.12, radius * 1.1, 24]} />
            </mesh>

            {/* Photo frame with depth */}
            <group position={[0, radius, 0]}>
              <mesh material={frameMat}>
                <boxGeometry args={[2.6, 1.9, 0.25]} />
              </mesh>
              <mesh position={[0, 0, 0.15]} material={new THREE.MeshStandardMaterial({ color: '#222222' })}>
                <planeGeometry args={[2.3, 1.65]} />
              </mesh>
            </group>
          </group>
        );
      })}
    </group>
  );
}