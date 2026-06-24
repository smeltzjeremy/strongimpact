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
      const direction = e.deltaY > 0 ? 1 : -1;
      targetStepRef.current += direction;
    };

    const canvas = gl.domElement as HTMLCanvasElement;
    canvas.addEventListener('wheel', handleWheel, { passive: false });

    return () => canvas.removeEventListener('wheel', handleWheel);
  }, [gl]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      const targetRotation = (targetStepRef.current * (Math.PI * 2)) / 6;
      
      // Platinum easing - frame rate independent
      rotationRef.current = THREE.MathUtils.lerp(
        rotationRef.current,
        targetRotation,
        1 - Math.exp(-10 * delta)
      );

      groupRef.current.rotation.z = rotationRef.current;   // Changed to .z for new orientation
    }
  });

  const spokeMaterial = new THREE.MeshBasicMaterial({ color: '#e0e0e0' });
  const frameMaterial = new THREE.MeshBasicMaterial({ color: '#222222' });
  const photoMaterial = new THREE.MeshBasicMaterial({ color: '#111111' });

  const radius = 3.4;
  const numFrames = 6;

  return (
    <group ref={groupRef} position={[0, -0.6, -3.2]}>
      {/* Central axle / hub */}
      <mesh rotation={[0, 0, Math.PI / 2]} material={spokeMaterial}>
        <cylinderGeometry args={[0.35, 0.35, 1.6, 32]} />
      </mesh>

      {Array.from({ length: numFrames }).map((_, i) => {
        const angle = (i * Math.PI * 2) / numFrames;
        return (
          <group key={i} rotation={[0, 0, angle]}>   {/* Changed rotation axis */}
            {/* Spoke */}
            <mesh
              position={[0, radius * 0.55, 0]}
              rotation={[Math.PI / 2, 0, 0]}
              material={spokeMaterial}
            >
              <cylinderGeometry args={[0.1, 0.1, radius * 1.1, 20]} />
            </mesh>

            {/* Photo Frame */}
            <group position={[0, radius, 0]}>
              <mesh material={frameMaterial}>
                <boxGeometry args={[2.55, 1.85, 0.22]} />
              </mesh>
              <mesh position={[0, 0, 0.13]} material={photoMaterial}>
                <planeGeometry args={[2.3, 1.6]} />
              </mesh>
            </group>
          </group>
        );
      })}
    </group>
  );
};

export default PhotoWheel;