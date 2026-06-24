import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const PhotoWheel: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null!);
  const { gl } = useThree();

  const rotationRef = useRef<number>(0);
  const targetStepRef = useRef<number>(0);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetStepRef.current += e.deltaY > 0 ? 1 : -1;
    };

    const canvas = gl.domElement as HTMLCanvasElement;
    canvas.addEventListener('wheel', handleWheel, { passive: false });
    return () => canvas.removeEventListener('wheel', handleWheel);
  }, [gl]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      const target = targetStepRef.current * (Math.PI * 2) / 6;
      rotationRef.current = THREE.MathUtils.lerp(rotationRef.current, target, 1 - Math.exp(-12 * delta));
      groupRef.current.rotation.z = rotationRef.current;
    }
  });

  const brightMat = new THREE.MeshBasicMaterial({ color: '#ff00ff' });
  const frameMat = new THREE.MeshBasicMaterial({ color: '#00ffff' });

  const radius = 4;

  return (
    <>
      {/* Local lights for the wheel only */}
      <ambientLight intensity={1.5} />
      <directionalLight position={[0, 5, 5]} intensity={2.0} />

      {/* Main wheel group */}
      <group ref={groupRef} position={[0, 2.2, -2.0]}>
        {/* Big central hub */}
        <mesh material={brightMat}>
          <sphereGeometry args={[0.8]} />
        </mesh>

        {/* Test frames */}
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i * Math.PI * 2) / 6;
          return (
            <group key={i} rotation={[0, 0, angle]}>
              <mesh position={[0, radius, 0]} material={frameMat}>
                <boxGeometry args={[2.8, 2.0, 0.3]} />
              </mesh>
            </group>
          );
        })}
      </group>
    </>
  );
};

export default PhotoWheel;