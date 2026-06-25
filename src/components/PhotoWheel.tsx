import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Environment, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

const PhotoWheel: React.FC = () => {
  const wheelGroupRef = useRef<THREE.Group>(null!);
  const framesGroupRef = useRef<THREE.Group>(null!);
  
  const { gl, viewport } = useThree();
  const isMobile = viewport.width < 5;

  const rotationRef = useRef<number>(0);
  const targetStepRef = useRef<number>(0);

  // Swipe & Wheel
  useEffect(() => {
    const handleGlobalWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 5) targetStepRef.current += e.deltaY > 0 ? 1 : -1;
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
      if (Math.abs(delta) > 15) {
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

  const radius = 3.8;
  const numFrames = 6;

  useFrame((_, delta) => {
    const target = (targetStepRef.current * (Math.PI * 2)) / numFrames;
    rotationRef.current = THREE.MathUtils.lerp(rotationRef.current, target, 1 - Math.exp(-14 * delta));

    if (wheelGroupRef.current) wheelGroupRef.current.rotation.z = rotationRef.current;

    if (framesGroupRef.current) {
      framesGroupRef.current.children.forEach((child, i) => {
        const currentAngle = (i * Math.PI * 2) / numFrames + rotationRef.current;
        child.position.x = Math.sin(currentAngle) * radius;
        child.position.y = Math.cos(currentAngle) * radius;
        child.rotation.z = 0;
      });
    }
  });

  const chromeSpokeMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#ffffff', metalness: 1.0, roughness: 0.02 }), []);
  const titaniumFrameMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#121214', metalness: 0.8, roughness: 0.25 }), []);
  const redArrowMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#ef4444', metalness: 0.7, roughness: 0.15 }), []);

  return (
    <>
      <Environment preset="studio" />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={2.2} />
      <pointLight position={[0, 0, 2]} intensity={1.5} color="#ffffff" />

      <group position={[0, isMobile ? 2.35 : 2.8, isMobile ? -2.2 : -1.8]}>

        {/* CENTER HUB */}
        <mesh material={chromeSpokeMat}>
          <sphereGeometry args={[0.45, 32, 32]} />
        </mesh>

        {/* LEFT ARROW */}
        <mesh 
          position={[-0.85, 0, 0.1]} 
          rotation={[0, 0, Math.PI / 2]} 
          material={redArrowMat}
          onPointerDown={(e) => { e.stopPropagation(); targetStepRef.current -= 1; }}
        >
          <coneGeometry args={[0.08, 0.22, 4]} />
        </mesh>

        {/* RIGHT ARROW */}
        <mesh 
          position={[0.85, 0, 0.1]} 
          rotation={[0, 0, -Math.PI / 2]} 
          material={redArrowMat}
          onPointerDown={(e) => { e.stopPropagation(); targetStepRef.current += 1; }}
        >
          <coneGeometry args={[0.08, 0.22, 4]} />
        </mesh>

        {/* SPINNING SPOKES */}
        <group ref={wheelGroupRef}>
          {Array.from({ length: numFrames }).map((_, i) => {
            const angle = (i * Math.PI * 2) / numFrames;
            return (
              <group key={i} rotation={[0, 0, angle]}>
                <mesh position={[0, radius * 0.48, 0]} material={chromeSpokeMat}>
                  <cylinderGeometry args={[0.025, 0.025, radius * 1.05, 16]} />
                </mesh>
              </group>
            );
          })}
        </group>

        {/* UPRIGHT FRAMES */}
        <group ref={framesGroupRef}>
          {Array.from({ length: numFrames }).map((_, i) => {
            const startAngle = (i * Math.PI * 2) / numFrames;
            const startX = Math.sin(startAngle) * radius;
            const startY = Math.cos(startAngle) * radius;

            return (
              <group key={i} position={[startX, startY, 0]}>
                <mesh material={titaniumFrameMat}>
                  <boxGeometry args={[1.72, 2.35, 0.18]} />
                </mesh>
                <mesh position={[0, 0, 0.095]} material={chromeSpokeMat}>
                  <boxGeometry args={[1.56, 2.19, 0.01]} />
                </mesh>
                <mesh position={[0, 0, 0.1]}>
                  <planeGeometry args={[1.52, 2.15]} />
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
            );
          })}
        </group>
      </group>
    </>
  );
};

export default PhotoWheel;