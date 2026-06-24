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

  // Upgraded metallic materials
  const spokeMat = new THREE.MeshStandardMaterial({ color: '#f1f5f9', metalness: 0.95, roughness: 0.05 });
  const frameMat = new THREE.MeshStandardMaterial({ color: '#18181b', metalness: 0.85, roughness: 0.15 });
  const photoMat = new THREE.MeshStandardMaterial({ color: '#09090b', metalness: 0.1, roughness: 0.5 });
  const hubMat = new THREE.MeshStandardMaterial({ color: '#cbd5e1', metalness: 0.95, roughness: 0.05 });

  const radius = 3.8;
  const numFrames = 6;

  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[0, 5, 5]} intensity={1.8} />

      <group ref={groupRef} position={[0, 2.0, -2.0]}>
        {/* Center hub */}
        <mesh material={hubMat}>
          <sphereGeometry args={[0.45]} />
        </mesh>

        {Array.from({ length: numFrames }).map((_, i) => {
          const angle = (i * Math.PI * 2) / numFrames;
          return (
            <group key={i} rotation={[0, 0, angle]}>
              {/* Thin metallic spoke - fixed orientation */}
              <mesh
                position={[0, radius * 0.52, 0]}
                material={spokeMat}
              >
                <cylinderGeometry args={[0.06, 0.06, radius * 1.05, 16]} />
              </mesh>

              {/* Photo Frame - counter-rotated to stay upright */}
              <group position={[0, radius, 0]} rotation={[0, 0, -angle]}>
                <mesh material={frameMat}>
                  <boxGeometry args={[2.4, 1.75, 0.18]} />
                </mesh>
                <mesh position={[0, 0, 0.1]} material={photoMat}>
                  <planeGeometry args={[2.2, 1.55]} />
                </mesh>
              </group>
            </group>
          );
        })}
      </group>
    </>
  );
};

export default PhotoWheel;