import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Environment, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

const PhotoWheel: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null!);
  const { gl, viewport } = useThree();

  const isMobile = viewport.width < 5;

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

  const chromeSpokeMat = useMemo(() => 
    new THREE.MeshStandardMaterial({ color: '#ffffff', metalness: 1.0, roughness: 0.02 }), []
  );

  const titaniumFrameMat = useMemo(() => 
    new THREE.MeshStandardMaterial({ color: '#121214', metalness: 0.8, roughness: 0.25 }), []
  );

  const radius = 3.8;
  const numFrames = 6;

  return (
    <>
      <Environment preset="studio" />

      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={2.0} />

      <group 
        ref={groupRef} 
        position={[0, isMobile ? 2.35 : 2.8, isMobile ? -2.2 : -1.8]} // tuned for mobile
      >
        {/* Center Hub */}
        <mesh material={chromeSpokeMat}>
          <sphereGeometry args={[0.45]} />
        </mesh>

        {Array.from({ length: numFrames }).map((_, i) => {
          const angle = (i * Math.PI * 2) / numFrames;
          return (
            <group key={i} rotation={[0, 0, angle]}>
              {/* Spoke */}
              <mesh position={[0, radius * 0.48, 0]} material={chromeSpokeMat}>
                <cylinderGeometry args={[0.025, 0.025, radius * 1.05, 16]} />
              </mesh>

              {/* Photo Frame */}
              <group position={[0, radius, 0]} rotation={[0, 0, -angle]}>
                <mesh material={titaniumFrameMat}>
                  <boxGeometry args={[2.35, 1.72, 0.18]} />
                </mesh>

                <mesh position={[0, 0, 0.1]}>
                  <planeGeometry args={[2.15, 1.52]} />
                  <MeshTransmissionMaterial
                    backside
                    samples={4}
                    thickness={0.2}
                    chromaticAberration={0.05}
                    anisotropy={0.1}
                    distortion={0.0}
                    clearcoat={1}
                    attenuationDistance={0.5}
                    attenuationColor="#ffffff"
                    color="#ffffff"
                    roughness={0.15}
                    transmission={0.6}
                  />
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