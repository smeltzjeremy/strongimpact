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

  // Improved horizontal swipe
  useEffect(() => {
    const handleGlobalWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 5) {
        targetStepRef.current += e.deltaY > 0 ? 1 : -1;
      }
    };

    let touchStartX = 0;
    let isDragging = false;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      isDragging = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      const currentX = e.touches[0].clientX;
      const delta = touchStartX - currentX;

      if (Math.abs(delta) > 40) {
        targetStepRef.current += delta > 0 ? 1 : -1;
        touchStartX = currentX;
        isDragging = false;
      }
    };

    const handleTouchEnd = () => isDragging = false;

    window.addEventListener('wheel', handleGlobalWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleGlobalWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      const target = targetStepRef.current * (Math.PI * 2) / 6;
      rotationRef.current = THREE.MathUtils.lerp(rotationRef.current, target, 1 - Math.exp(-14 * delta));
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
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={2.2} />
      <pointLight position={[0, 0, 2]} intensity={1.5} color="#ffffff" />

      <group position={[0, isMobile ? 1.0 : 1.35, isMobile ? -2.2 : -1.8]}>

        {/* Stationary Hub */}
        <mesh material={chromeSpokeMat}>
          <sphereGeometry args={[0.45, 32, 32]} />
        </mesh>

        {/* Left Arrow */}
        <mesh position={[-0.75, 0, 0.1]} rotation={[0, 0, Math.PI / 2]} material={new THREE.MeshStandardMaterial({ color: '#ef4444', metalness: 0.7, roughness: 0.15 })}>
          <coneGeometry args={[0.06, 0.16, 4]} />
        </mesh>

        {/* Right Arrow */}
        <mesh position={[0.75, 0, 0.1]} rotation={[0, 0, -Math.PI / 2]} material={new THREE.MeshStandardMaterial({ color: '#ef4444', metalness: 0.7, roughness: 0.15 })}>
          <coneGeometry args={[0.06, 0.16, 4]} />
        </mesh>

        {/* Rotating Wheel */}
        <group ref={groupRef}>
          {Array.from({ length: numFrames }).map((_, i) => {
            const angle = (i * Math.PI * 2) / numFrames;
            return (
              <group key={i} rotation={[0, 0, angle]}>
                <mesh position={[0, radius * 0.48, 0]} material={chromeSpokeMat}>
                  <cylinderGeometry args={[0.025, 0.025, radius * 1.05, 16]} />
                </mesh>

                {/* UPRIGHT FRAME */}
                <group position={[0, radius, 0]} rotation={[0, 0, -angle - rotationRef.current]}>
                  <mesh material={titaniumFrameMat}>
                    <boxGeometry args={[2.35, 1.72, 0.18]} />
                  </mesh>

                  <mesh position={[0, 0, 0.095]} material={chromeSpokeMat}>
                    <boxGeometry args={[2.19, 1.56, 0.01]} />
                  </mesh>

                  <mesh position={[0, 0, 0.1]}>
                    <planeGeometry args={[2.15, 1.52]} />
                    <MeshTransmissionMaterial
                      backside
                      samples={6}
                      thickness={0.25}
                      chromaticAberration={0.06}
                      anisotropy={0.2}
                      clearcoat={1}
                      attenuationDistance={0.6}
                      color="#f8fafc"
                      roughness={0.12}
                      transmission={0.65}
                    />
                  </mesh>
                </group>
              </group>
            );
          })}
        </group>
      </group>
    </>
  );
};

export default PhotoWheel;