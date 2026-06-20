import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

// 🌊 LAYER 1: VERTEX SHADER FOR CHROMATIC LIQUID MERCURY EFFECTS
const ChromeWaveShader = {
  uniforms: {
    uTime: { value: 0 },
    uColorBlack: { value: new THREE.Color('#030308') },
    uColorChrome: { value: new THREE.Color('#ffffff') }
  },
  vertexShader: `
    uniform float uTime;
    varying vec2 vUv;
    varying float vElevation;
    
    void main() {
      vUv = uv;
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      
      // Fluid math mimicking the reflective metallic bands of image_9.png
      float elevation = sin(modelPosition.x * 0.4 + uTime * 0.8) * 0.3
                      + cos(modelPosition.y * 0.3 + uTime * 0.5) * 0.2
                      + sin(modelPosition.x * 0.8 + modelPosition.y * 0.6 + uTime * 1.2) * 0.1;
      
      modelPosition.y += elevation;
      vElevation = elevation;
      
      vec4 viewPosition = viewMatrix * modelPosition;
      gl_Position = projectionMatrix * viewPosition;
    }
  `,
  fragmentShader: `
    uniform vec3 uColorBlack;
    uniform vec3 uColorChrome;
    varying float vElevation;
    varying vec2 vUv;

    void main() {
      float mixStrength = (vElevation + 0.6) * 0.8;
      mixStrength = smoothstep(0.1, 0.9, mixStrength);
      
      vec3 finalColor = mix(uColorBlack, uColorChrome, mixStrength);
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
};

export default function InteractiveGalleryWheel() {
  const wheelRef = useRef();
  const shaderRef = useRef();
  const [targetRotation, setTargetRotation] = useState(0);
  const [currentRotation, setCurrentRotation] = useState(0);

  // Drag Interaction Anchors
  const isDragging = useRef(false);
  const previousX = useRef(0);

  const frameCount = 6;
  const radius = 4.2;

  useFrame((state) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }

    if (wheelRef.current) {
      // Linear interpolation handles natural dragging inertia physics
      wheelRef.current.rotation.z = THREE.MathUtils.lerp(wheelRef.current.rotation.z, targetRotation, 0.1);
      setCurrentRotation(wheelRef.current.rotation.z);
    }
  });

  const handlePointerDown = (e) => {
    isDragging.current = true;
    previousX.current = e.clientX || e.touches?.[0]?.clientX || 0;
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    const clientX = e.clientX || e.touches?.[0]?.clientX || 0;
    const deltaX = clientX - previousX.current;
    
    setTargetRotation((prev) => prev + deltaX * 0.005);
    previousX.current = clientX;
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  return (
    <group
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* 🌊 LAYER 1: LIQUID CHROME BACKGROUND */}
      <mesh position={[0, 0, -6]} rotation={[-Math.PI / 3, 0, 0]}>
        <planeGeometry args={[30, 30, 60, 60]} />
        <shaderMaterial 
          ref={shaderRef} 
          vertexShader={ChromeWaveShader.vertexShader}
          fragmentShader={ChromeWaveShader.fragmentShader}
          uniforms={ChromeWaveShader.uniforms}
        />
      </mesh>

      {/* 🌫️ LAYER 2: DEEP ATMOSPHERE SUBTLE MIST LAYER */}
      <mesh position={[0, 0, -3]} rotation={[0.2, 0, 0]}>
        <planeGeometry args={[25, 25]} />
        <meshBasicMaterial color="#050515" transparent opacity={0.35} />
      </mesh>

      {/* ⚙️ LAYER 3 & 4: THE WHEEL ASSEMBLY & PREMIUM GLASS HOUSING */}
      <group ref={wheelRef}>
        {/* Core Steel Center Axle */}
        <mesh position={[0, 0, -0.2]}>
          <cylinderGeometry args={[0.7, 0.7, 0.25, 32]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.2} />
        </mesh>

        {Array.from({ length: frameCount }).map((_, idx) => {
          const angle = (idx / frameCount) * Math.PI * 2;
          const x = radius * Math.sin(angle);
          const y = radius * Math.cos(angle);

          return (
            <group key={idx} position={[x, y, 0]}>
              {/* Layer 3: Solid Metal Supporting Spokes */}
              <mesh position={[-x * 0.5, -y * 0.5, -0.2]} rotation={[0, 0, -angle]}>
                <cylinderGeometry args={[0.04, 0.05, radius, 8]} />
                <meshStandardMaterial color="#666666" metalness={1.0} roughness={0.15} />
              </mesh>

              {/* Layer 4: High-Fidelity Refractive Glass Frames */}
              <mesh rotation={[0, 0, -angle - currentRotation]}>
                <boxGeometry args={[1.9, 1.9, 0.08]} />
                <meshPhysicalMaterial
                  color="#ffffff"
                  transmission={0.96}
                  roughness={0.03}
                  thickness={0.3}
                  ior={1.54}
                  clearcoat={1.0}
                  clearcoatRoughness={0.01}
                  transparent={true}
                  opacity={0.85}
                />
                
                {/* Embedded Display Meta Elements */}
                <Html center distanceFactor={6} style={{ pointerEvents: 'none' }}>
                  <div className="w-28 h-28 bg-zinc-950/90 border border-white/10 flex flex-col items-center justify-center rounded-xl text-[9px] text-zinc-400 font-black tracking-[0.25em] select-none p-2 shadow-2xl">
                    <div className="w-full h-16 bg-zinc-900 rounded border border-white/5 mb-1.5 flex items-center justify-center text-[8px] text-zinc-600 font-mono">
                      [IMG STREAM]
                    </div>
                    STREAM_0{idx + 1}
                  </div>
                </Html>
              </mesh>
            </group>
          );
        })}
      </group>

      {/* 🕹️ LAYER 4 CONTROL INTERACTIVE HUD SYSTEM */}
      <Html position={[0, 0, 1.2]} center style={{ pointerEvents: 'auto' }}>
        <div className="flex items-center gap-3 bg-zinc-950/95 backdrop-blur-3xl border border-white/10 rounded-2xl px-4 py-2.5 shadow-[0_10px_50px_rgba(0,0,0,0.8)] select-none">
          <button 
            onClick={() => setTargetRotation((prev) => prev - (Math.PI * 2 / frameCount))}
            className="w-8 h-8 rounded-full border border-red-500/30 bg-red-500/10 text-red-500 flex items-center justify-center font-black active:scale-90 transition-all text-xs cursor-pointer hover:bg-red-500/20"
          >
            ◀
          </button>
          
          {/* Tactical Dial Cylinder Track */}
          <div className="w-20 h-9 bg-black rounded-xl border border-white/5 flex flex-col justify-between overflow-hidden relative p-1 shadow-inner">
            <div className="absolute inset-x-0 h-px bg-red-500/20 top-1/2 -translate-y-1/2 z-10" />
            <div className="text-[6.5px] text-zinc-500 font-mono text-center tracking-widest font-bold">RADIAL_POS</div>
            <div className="text-[10px] text-white font-mono text-center font-black tracking-tight">
              {Math.abs(Math.round(targetRotation * (180 / Math.PI)) % 360)}°
            </div>
          </div>

          <button 
            onClick={() => setTargetRotation((prev) => prev + (Math.PI * 2 / frameCount))}
            className="w-8 h-8 rounded-full border border-red-500/30 bg-red-500/10 text-red-500 flex items-center justify-center font-black active:scale-90 transition-all text-xs cursor-pointer hover:bg-red-500/20"
          >
            ▶
          </button>
        </div>
      </Html>
    </group>
  );
}