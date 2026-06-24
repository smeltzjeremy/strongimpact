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
      const delta = e.deltaY > 0 ? -0.12 : 0.12;
      rotationRef.current += delta * 6;
    };

    const canvas = gl.domElement;
    canvas.addEventListener('wheel', handleWheel, { passive: false });
    return () => canvas.removeEventListener('wheel', handleWheel);
  }, [gl]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = rotationRef.current;
    }
  });

  const metalMaterial = new THREE.MeshPhongMaterial({
    color: '#bbbbbb',
    shininess: 120,
    specular: '#ffffff',
    metalness: 0.95,
    emissive: '#111111'
  });

  return (
    <group 
      ref={groupRef} 
      position={[0, 0.8, -1.5]} 
      rotation={[Math.PI * -0.5, 0, 0]}   // upright
    >
      {/* Central metallic hub */}
      <mesh position={[0, 0, 0]} material={metalMaterial}>
        <sphereGeometry args={[0.65, 64, 64]} />
      </mesh>

      {/* Center dial panel */}
      <mesh position={[0, 0, 0.7]} material={new THREE.MeshBasicMaterial({ color: '#222222' })}>
        <planeGeometry args={[1.3, 0.4]} />
      </mesh>

      {/* Left / Right arrows */}
      <mesh position={[-0.7, 0, 0.75]} material={new THREE.MeshBasicMaterial({ color: '#ff3333' })}>
        <planeGeometry args={[0.3, 0.18]} />
      </mesh>
      <mesh position={[0.7, 0, 0.75]} material={new THREE.MeshBasicMaterial({ color: '#ff3333' })}>
        <planeGeometry args={[0.3, 0.18]} />
      </mesh>

      {/* 5 arms + frames */}
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i * Math.PI * 2) / 5;
        return (
          <group key={i} rotation={[0, angle, 0]}>
            <mesh position={[2.8, 0, 0]} material={metalMaterial}>
              <boxGeometry args={[4.2, 0.15, 0.15]} />
            </mesh>
            <mesh position={[5.4, 0, 0]} material={new THREE.MeshPhongMaterial({ color: '#0a0a0a', shininess: 60 })}>
              <planeGeometry args={[2.4, 1.8]} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}