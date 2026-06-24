import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function PhotoWheel() {
  const groupRef = useRef();
  const { viewport, gl } = useThree();
  const rotationRef = useRef(0);

  // Scroll control
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1; // one scroll = ~1 turn segment
      rotationRef.current += delta * 6; // tune sensitivity
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

  // Simple metallic material
  const metalMaterial = new THREE.MeshPhongMaterial({
    color: '#aaaaaa',
    shininess: 100,
    specular: '#ffffff',
    metalness: 0.9,
    emissive: '#222222'
  });

  return (
    <group ref={groupRef} position={[0, 0, -1.5]}>
      {/* Central Hub */}
      <mesh position={[0, 0, 0]} material={metalMaterial}>
        <sphereGeometry args={[0.6, 64, 64]} />
      </mesh>

      {/* Dial rectangle in center */}
      <mesh position={[0, 0, 0.65]} material={new THREE.MeshBasicMaterial({ color: '#333333' })}>
        <planeGeometry args={[1.1, 0.35]} />
      </mesh>

      {/* Left / Right Arrows */}
      <mesh position={[-0.6, 0, 0.7]} material={new THREE.MeshBasicMaterial({ color: '#ff4444' })}>
        <planeGeometry args={[0.25, 0.15]} />
      </mesh>
      <mesh position={[0.6, 0, 0.7]} material={new THREE.MeshBasicMaterial({ color: '#ff4444' })}>
        <planeGeometry args={[0.25, 0.15]} />
      </mesh>

      {/* 5 Arms + Photo Frames (like your drawing) */}
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i * Math.PI * 2) / 5;
        return (
          <group key={i} rotation={[0, angle, 0]} position={[0, 0, 0]}>
            {/* Arm */}
            <mesh position={[2.2, 0, 0]} material={metalMaterial}>
              <boxGeometry args={[3.8, 0.12, 0.12]} />
            </mesh>
            {/* Photo Frame */}
            <mesh position={[4.8, 0, 0]} material={new THREE.MeshPhongMaterial({ color: '#111111', shininess: 80 })}>
              <planeGeometry args={[2.2, 1.65]} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}