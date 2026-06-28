import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';

const MENU_ITEMS = [
  { id: 1, label: 'ABOUT US', path: '/about', color: '#00ffcc' },
  { id: 2, label: 'PROGRAMS', path: '/programs', color: '#3399ff' },
  { id: 3, label: 'EVENTS', path: '/events', color: '#ff3366' },
  { id: 4, label: 'GALLERY', path: '/gallery', color: '#ff3344' },
  { id: 5, label: 'GET INVOLVED', path: '/get-involved', color: '#b833ff' },
];

function MenuPanel({ item, angle, radius, ringRotationRef, isMobile }) {
  const meshRef = useRef();
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const [time, setTime] = useState(0);
  const frameTick = useRef(0);

  const x = radius * Math.cos(angle);
  const z = radius * Math.sin(angle);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();

    if (meshRef.current) {
      meshRef.current.position.y = hovered
        ? Math.sin(elapsed * 4) * 0.12 + 0.05
        : 0;

      const absoluteAngle = angle + ringRotationRef.current;
      meshRef.current.rotation.set(0, -absoluteAngle + Math.PI / 2, 0);
    }

    frameTick.current += 1;
    if (frameTick.current % 2 === 0) {
      setTime(elapsed);
    }
  });

  const handlePipelineLaunch = (e) => {
    e.stopPropagation();
    if (item.path) {
      navigate(item.path);
    }
  };

  const slowPulseScale = hovered ? 1.12 : 1 + Math.sin(time * 1.8) * 0.035;

  return (
    <group position={[x, 0, z]}>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[2.4, 1.0, 0.05]} />
        <meshPhysicalMaterial
          color="#d2d6e0"
          transmission={0.93}
          roughness={0.14}
          metalness={0.08}
          thickness={0.15}
          ior={1.54}
          clearcoat={1.0}
          clearcoatRoughness={0.01}
          envMapIntensity={2.3}
          transparent={true}
          opacity={hovered ? 0.95 : 0.70}
          side={THREE.DoubleSide}
        />
      </mesh>

      <Html position={[0, 0, 0.06]} center style={{ pointerEvents: 'none' }}>
        <span
          className="font-black text-xs tracking-widest uppercase select-none bg-black/70 px-4 py-1.5 rounded-full backdrop-blur-md border transition-all duration-300 shadow whitespace-nowrap"
          style={{
            color: hovered ? item.color : '#ffffff',
            borderColor: hovered ? `${item.color}44` : 'rgba(255,255,255,0.1)',
          }}
        >
          {item.label}
        </span>
      </Html>

      <Html position={[0, 0.65, 0]} center style={{ pointerEvents: 'auto' }}>
        <div className="flex flex-col items-center gap-1.5 select-none">
          <button
            onClick={handlePipelineLaunch}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="rounded-full border bg-zinc-950/90 backdrop-blur-2xl flex items-center justify-center cursor-pointer transition-all duration-500 group relative shadow-2xl"
            style={{
              width: isMobile ? '4.6rem' : '4rem',
              height: isMobile ? '2.3rem' : '2rem',
              transform: `scale(${slowPulseScale})`,
              borderColor: hovered ? item.color : 'rgba(255,255,255,0.25)',
              boxShadow: hovered
                ? `0 0 35px ${item.color}bb, inset 0 0 10px ${item.color}44`
                : '0 0 20px rgba(0,0,0,0.8)',
            }}
          >
            <div
              className="absolute inset-[-5px] rounded-full border transition-all duration-700 opacity-40 mix-blend-screen"
              style={{
                borderColor: item.color,
                boxShadow: `0 0 12px ${item.color}33`,
                transform: hovered ? 'scale(1.1)' : `scale(${1 + Math.sin(time * 1.8) * 0.04})`,
              }}
            />

            <div
              className="w-3 h-3 rounded-full transition-transform duration-500 group-hover:scale-110"
              style={{
                backgroundColor: item.color,
                boxShadow: `0 0 15px ${item.color}, inset 0 1px 2px rgba(255,255,255,0.5)`,
              }}
            />
          </button>

          <div
            className={`transition-all duration-300 transform pointer-events-none ${
              hovered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-1 scale-95'
            }`}
          >
            <span
              className="text-[9px] font-black tracking-[0.25em] px-2 py-0.5 rounded bg-zinc-950/95 border text-white shadow-xl"
              style={{ borderColor: `${item.color}33` }}
            >
              LAUNCH
            </span>
          </div>
        </div>
      </Html>
    </group>
  );
}

export default function MenuRing({ paused = false }) {
  const ringRef = useRef();
  const rotationRef = useRef(0);
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const isMobile = width < 768;

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const activeRadius = isMobile ? 2.3 : 2.6;

  useFrame((state, delta) => {
    if (!ringRef.current) return;

    if (!paused) {
      ringRef.current.rotation.y += delta * 0.08;
    }

    rotationRef.current = ringRef.current.rotation.y;
  });

  return (
    <group ref={ringRef}>
      {MENU_ITEMS.map((item, index) => {
        const angle = (index / MENU_ITEMS.length) * Math.PI * 2;
        return (
          <MenuPanel
            key={`${item.id}-${index}`}
            item={item}
            angle={angle}
            radius={activeRadius}
            ringRotationRef={rotationRef}
            isMobile={isMobile}
          />
        );
      })}
    </group>
  );
}