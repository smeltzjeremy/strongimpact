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

  const spokeMat = new THREE.MeshBasicMaterial({ color: '#dddddd' });
  const frameMat = new THREE.MeshBasicMaterial({ color: '#1a1a1c' });
  const photoMat = new THREE.MeshBasicMaterial({ color: '#0f0f11' });

  const radius = 3.8;   // closer to center
  const numFrames = 6;

  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[0, 5, 5]} intensity={1.8} />

      <group ref={groupRef} position={[0, 2.0, -2.0]}>
        {/* Center hub */}
        <mesh material={new THREE.MeshBasicMaterial({ color: '#aaaaaa' })}>
          <sphereGeometry args={[0.45]} />
        </mesh>

        {Array.from({ length: numFrames }).map((_, i) => {
          const angle = (i * Math.PI * 2) / numFrames;
          return (
            <group key={i} rotation={[0, 0, angle]}>
              {/* Thin metallic spoke */}
              <mesh
                position={[0, radius * 0.52, 0]}
                rotation={[Math.PI / 2, 0, 0]}
                material={spokeMat}
              >
                <cylinderGeometry args={[0.06, 0.06, radius * 1.05, 16]} />
              </mesh>

              {/* Photo Frame */}
              <group position={[0, radius, 0]}>
                <mesh material={frameMat}>
                  <boxGeometry args={[2.4, 1.75, 0.18]} />
                </mesh>
                {/* Photo placeholder */}
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