import React, { useRef, useEffect, useMemo, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';
import { supabase } from '../lib/supabaseClient';

const PhotoWheel: React.FC = () => {
  const wheelGroupRef = useRef<THREE.Group>(null!);
  const framesGroupRef = useRef<THREE.Group>(null!);
  
  const { viewport } = useThree();
  const isMobile = viewport.width < 5;

  const rotationRef = useRef<number>(0);
  const targetStepRef = useRef<number>(0);

  const [imageTextures, setImageTextures] = useState<(THREE.Texture | null)[]>(Array(6).fill(null));

  const loadWheelPhotos = async () => {
    try {
      const { data } = await supabase.storage.from('gallery').list('wheel', { 
        limit: 6, 
        sortBy: { column: 'name', order: 'asc' } 
      });
      
      const urls: string[] = Array(6).fill('');
      const timestamp = Date.now();   // ← Cache busting

      data?.forEach((file, index) => {
        if (index < 6) {
          const rawUrl = supabase.storage.from('gallery').getPublicUrl(`wheel/${file.name}`).data.publicUrl;
          urls[index] = `${rawUrl}?t=${timestamp}`;
        }
      });

      const loader = new THREE.TextureLoader();
      const textures = await Promise.all(
        urls.map(url => 
          url ? new Promise<THREE.Texture>((resolve) => loader.load(url, resolve)) : Promise.resolve(null)
        )
      );
      setImageTextures(textures);
    } catch (err) {
      console.error("Failed to load wheel photos:", err);
    }
  };

  useEffect(() => {
    loadWheelPhotos();
  }, []);

  // Swipe & Wheel Controls (unchanged)
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
      if (Math.abs(delta) > 18) {
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
    rotationRef.current = THREE.MathUtils.lerp(rotationRef.current, target, 1 - Math.exp(-16 * delta));

    if (wheelGroupRef.current) wheelGroupRef.current.rotation.z = rotationRef.current;

    if (framesGroupRef.current) {
      framesGroupRef.current.children.forEach((child, i) => {
        const currentAngle = (i * Math.PI * 2) / numFrames - rotationRef.current;
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

      <group position={[0, isMobile ? 1.35 : 1.15, isMobile ? -2.2 : -1.8]}>
        <mesh material={chromeSpokeMat}>
          <sphereGeometry args={[0.45, 32, 32]} />
        </mesh>

        <group position={[-0.95, 0, 0.1]} onPointerDown={() => targetStepRef.current += 1}>
          <mesh rotation={[0, 0, Math.PI / 2]} material={redArrowMat}>
            <coneGeometry args={[0.12, 0.28, 4]} />
          </mesh>
          <mesh><boxGeometry args={[0.4, 0.4, 0.3]} /><meshBasicMaterial visible={false} /></mesh>
        </group>

        <group position={[0.95, 0, 0.1]} onPointerDown={() => targetStepRef.current -= 1}>
          <mesh rotation={[0, 0, -Math.PI / 2]} material={redArrowMat}>
            <coneGeometry args={[0.12, 0.28, 4]} />
          </mesh>
          <mesh><boxGeometry args={[0.4, 0.4, 0.3]} /><meshBasicMaterial visible={false} /></mesh>
        </group>

        <group ref={wheelGroupRef}>
          {Array.from({ length: numFrames }).map((_, i) => (
            <group key={i} rotation={[0, 0, (i * Math.PI * 2) / numFrames]}>
              <mesh position={[0, radius * 0.48, 0]} material={chromeSpokeMat}>
                <cylinderGeometry args={[0.025, 0.025, radius * 1.05, 16]} />
              </mesh>
            </group>
          ))}
        </group>

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

                <mesh position={[0, 0, 0.11]}>
                  <planeGeometry args={[1.52, 2.15]} />
                  {imageTextures[i] ? (
                    <meshBasicMaterial map={imageTextures[i]} side={THREE.DoubleSide} />
                  ) : (
                    <meshBasicMaterial color="#1f1f1f" />
                  )}
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