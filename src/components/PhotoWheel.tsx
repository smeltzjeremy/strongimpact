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
  const [rawUrls, setRawUrls] = useState<string[]>(Array(6).fill(''));
  const [version, setVersion] = useState(0);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

  const loadWheelPhotos = async () => {
    try {
      const { data } = await supabase.storage.from('gallery').list('wheel', {
        sortBy: { column: 'name', order: 'asc' }
      });

      const urls: string[] = Array(6).fill('');
      const timestamp = Date.now();

      data?.forEach((file) => {
        const match = file.name.match(/slot-(\d{2})/);
        if (match) {
          const slotIndex = parseInt(match[1]) - 1;
          if (slotIndex >= 0 && slotIndex < 6) {
            const rawUrl = supabase.storage.from('gallery').getPublicUrl(`wheel/${file.name}`).data.publicUrl;
            urls[slotIndex] = `${rawUrl}?t=${timestamp}`;
          }
        }
      });

      setRawUrls(urls);

      const loader = new THREE.TextureLoader();
      loader.setCrossOrigin('anonymous');

      const textures = await Promise.all(
        urls.map(url => url ? new Promise((resolve) => {
          loader.load(url, (texture) => {
            texture.flipY = true;
            texture.flipX = false;
            texture.needsUpdate = true;
            resolve(texture);
          }, undefined, () => resolve(null));
        }) : Promise.resolve(null))
      );

      setImageTextures(textures);
      setVersion(v => v + 1);
    } catch (err) {
      console.error("Load failed:", err);
    }
  };

  useEffect(() => {
    loadWheelPhotos();
  }, []);

  useEffect(() => {
    const handleGlobalWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 8) targetStepRef.current += Math.sign(e.deltaY);
    };

    let touchStartX = 0;
    let hasSwipedThisTouch = false;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      hasSwipedThisTouch = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (hasSwipedThisTouch) return;
      const delta = touchStartX - e.touches[0].clientX;
      if (Math.abs(delta) > 85) {
        targetStepRef.current += delta > 0 ? 1 : -1;
        hasSwipedThisTouch = true;
      }
    };

    const handleTouchEnd = () => hasSwipedThisTouch = false;

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
      framesGroupRef.current.children.forEach((childNode, i) => {
        const child = childNode as THREE.Group;
        const currentAngle = (i * Math.PI * 2) / numFrames - rotationRef.current;
        const normalizedAngle = ((currentAngle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
        const isFront = normalizedAngle < 0.4 || normalizedAngle > (Math.PI * 2 - 0.4);

        child.position.x = Math.sin(currentAngle) * radius;
        child.position.y = Math.cos(currentAngle) * radius;
        child.position.z = isFront ? 0.4 : 0;
        child.scale.setScalar(isFront ? 1.15 : 0.95);
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

      <group position={[0, isMobile ? 1.25 : 1.15, isMobile ? -1.4 : -1.8]} key={version}>
        <mesh material={chromeSpokeMat}>
          <sphereGeometry args={[0.45, 32, 32]} />
        </mesh>

        <group position={[-0.95, 0, 0.1]} onPointerDown={() => targetStepRef.current += 1}>
          <mesh rotation={[0, 0, Math.PI / 2]} material={redArrowMat}>
            <coneGeometry args={[0.12, 0.28, 4]} />
          </mesh>
        </group>

        <group position={[0.95, 0, 0.1]} onPointerDown={() => targetStepRef.current -= 1}>
          <mesh rotation={[0, 0, -Math.PI / 2]} material={redArrowMat}>
            <coneGeometry args={[0.12, 0.28, 4]} />
          </mesh>
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

      {/* Enlarge Button - always visible at bottom once loaded */}
      {rawUrls.some(url => url) && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-40">
          <button 
            onClick={() => {
              const currentUrl = rawUrls[(targetStepRef.current % 6 + 6) % 6];
              if (currentUrl) setEnlargedImage(currentUrl);
            }}
            className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white text-sm uppercase tracking-widest font-extrabold rounded-2xl border border-white/20 shadow-[0_0_30px_rgba(239,68,68,0.3)] transition transform hover:scale-105 active:scale-95"
          >
            🔍 Enlarge Current Photo
          </button>
        </div>
      )}

      {/* Enlarged Modal */}
      {enlargedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-3xl flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setEnlargedImage(null)}
        >
          <div className="relative w-full max-w-md aspect-[4/5] bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src={enlargedImage} 
              alt="Enlarged" 
              className="w-full h-full object-cover select-none"
            />
            <button 
              className="absolute top-4 right-4 bg-black/60 hover:bg-black border border-white/20 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold transition"
              onClick={() => setEnlargedImage(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoWheel;