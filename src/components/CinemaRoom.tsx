import React, { useEffect, useMemo } from 'react';
import { useVideoTexture, RoundedBox, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface CinemaRoomProps {
  videoUrl: string;
  isPlaying: boolean;
  isMuted: boolean;
}

const VELVET_DEEP = '#2a0810';
const VELVET_MID = '#4a0e1c';
const VELVET_HIGH = '#6b1830';

function useVelvetMaterial(color: string, sheen = 0.35): THREE.MeshPhysicalMaterial {
  return useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color,
        roughness: 0.92,
        metalness: 0.0,
        sheen: 1.0,
        sheenRoughness: 0.55,
        sheenColor: new THREE.Color('#8b2040'),
        envMapIntensity: 0.35,
      }),
    [color],
  );
}

interface CurtainWingProps {
  side: 'left' | 'right';
  material: THREE.MeshPhysicalMaterial;
}

function CurtainWing({ side, material }: CurtainWingProps): React.JSX.Element {
  const foldCount = 16;
  const sign = side === 'left' ? 1 : -1;

  const folds = useMemo(() => {
    return Array.from({ length: foldCount }, (_, i) => {
      const t = i / (foldCount - 1);
      const z = -4.85 + t * 5.6;
      const waveA = Math.sin(i * 0.72 + 0.4) * 0.22;
      const waveB = Math.sin(i * 0.28) * 0.1;
      const bulge = waveA + waveB;
      const x = sign * (4.55 - bulge * sign);
      const rotY = sign * (0.22 + Math.sin(i * 0.55) * 0.14);
      const rotZ = Math.sin(i * 0.4) * 0.04;
      const depth = 0.07 + Math.abs(Math.sin(i * 0.65)) * 0.05;
      const width = 0.26 + Math.abs(Math.cos(i * 0.5)) * 0.06;
      return { x, z, rotY, rotZ, depth, width };
    });
  }, [sign]);

  return (
    <group>
      {folds.map((fold, i) => (
        <mesh
          key={`${side}-fold-${i}`}
          position={[fold.x, 0.72, fold.z]}
          rotation={[0, fold.rotY, fold.rotZ]}
          material={material}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[fold.width, 6.75, fold.depth]} />
        </mesh>
      ))}

      {/* Gathered swag at top */}
      {Array.from({ length: 6 }).map((_, i) => {
        const t = i / 5;
        const z = -4.7 + t * 1.4;
        const sag = Math.sin(t * Math.PI) * 0.35;
        return (
          <mesh
            key={`${side}-swag-${i}`}
            position={[sign * (3.85 + sag), 3.55, z]}
            rotation={[0.35 * sign, sign * 0.35, 0]}
            material={material}
          >
            <boxGeometry args={[0.5, 0.18, 0.22]} />
          </mesh>
        );
      })}
    </group>
  );
}

interface CinemaSeatProps {
  x: number;
  fabricMat: THREE.MeshPhysicalMaterial;
  leatherMat: THREE.MeshStandardMaterial;
  plasticMat: THREE.MeshStandardMaterial;
}

function CinemaSeat({ x, fabricMat, leatherMat, plasticMat }: CinemaSeatProps): React.JSX.Element {
  return (
    <group position={[x, 0, 0]}>
      {/* Seat base / riser block */}
      <RoundedBox args={[0.68, 0.14, 0.62]} radius={0.04} smoothness={4} position={[0, -1.28, 0.04]} castShadow receiveShadow>
        <primitive object={plasticMat} attach="material" />
      </RoundedBox>

      {/* Lower cushion */}
      <RoundedBox args={[0.64, 0.2, 0.56]} radius={0.06} smoothness={5} position={[0, -1.14, 0.06]} castShadow receiveShadow>
        <primitive object={fabricMat} attach="material" />
      </RoundedBox>

      {/* Tufted seat surface */}
      <RoundedBox args={[0.6, 0.1, 0.52]} radius={0.05} smoothness={5} position={[0, -1.0, 0.08]} castShadow>
        <primitive object={fabricMat} attach="material" />
      </RoundedBox>

      {/* Tuft indent lines */}
      {[-0.18, 0, 0.18].map((tx) => (
        <mesh key={`tuft-seat-${tx}`} position={[tx, -0.94, 0.22]} rotation={[0.15, 0, 0]}>
          <boxGeometry args={[0.04, 0.02, 0.18]} />
          <meshStandardMaterial color="#3a0a14" roughness={0.95} />
        </mesh>
      ))}

      {/* Backrest */}
      <RoundedBox args={[0.64, 0.88, 0.16]} radius={0.07} smoothness={5} position={[0, -0.55, -0.2]} rotation={[-0.12, 0, 0]} castShadow receiveShadow>
        <primitive object={fabricMat} attach="material" />
      </RoundedBox>

      {/* Headrest crown */}
      <RoundedBox args={[0.58, 0.18, 0.14]} radius={0.08} smoothness={5} position={[0, -0.08, -0.22]} rotation={[-0.18, 0, 0]} castShadow>
        <primitive object={fabricMat} attach="material" />
      </RoundedBox>

      {/* Tuft buttons on back */}
      {[-0.16, 0, 0.16].map((tx, i) => (
        <mesh key={`tuft-back-${i}`} position={[tx, -0.35 - i * 0.22, -0.1]} rotation={[-0.12, 0, 0]}>
          <sphereGeometry args={[0.035, 10, 10]} />
          <meshStandardMaterial color="#5c1428" roughness={0.88} />
        </mesh>
      ))}

      {/* Left armrest */}
      <RoundedBox args={[0.1, 0.42, 0.5]} radius={0.03} smoothness={4} position={[-0.36, -1.02, 0.08]} castShadow>
        <primitive object={leatherMat} attach="material" />
      </RoundedBox>
      <RoundedBox args={[0.12, 0.05, 0.42]} radius={0.02} smoothness={3} position={[-0.36, -0.78, 0.08]}>
        <primitive object={plasticMat} attach="material" />
      </RoundedBox>

      {/* Right armrest */}
      <RoundedBox args={[0.1, 0.42, 0.5]} radius={0.03} smoothness={4} position={[0.36, -1.02, 0.08]} castShadow>
        <primitive object={leatherMat} attach="material" />
      </RoundedBox>
      <RoundedBox args={[0.12, 0.05, 0.42]} radius={0.02} smoothness={3} position={[0.36, -0.78, 0.08]}>
        <primitive object={plasticMat} attach="material" />
      </RoundedBox>
    </group>
  );
}

export default function CinemaRoom({ videoUrl, isPlaying, isMuted }: CinemaRoomProps): React.JSX.Element {
  const texture = useVideoTexture(videoUrl, {
    unsuspended: 'canplay',
    crossOrigin: 'anonymous',
    muted: isMuted,
    loop: true,
    playsInline: true,
  });

  const velvetMat = useVelvetMaterial(VELVET_MID);
  const velvetDarkMat = useVelvetMaterial(VELVET_DEEP, 0.25);
  const velvetLightMat = useVelvetMaterial(VELVET_HIGH, 0.45);

  const seatFabricMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#5c1228',
        roughness: 0.88,
        metalness: 0.0,
        sheen: 0.8,
        sheenRoughness: 0.6,
        sheenColor: new THREE.Color('#9a3050'),
      }),
    [],
  );

  const leatherMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#141214',
        roughness: 0.55,
        metalness: 0.08,
      }),
    [],
  );

  const plasticMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#0c0b0e',
        roughness: 0.7,
        metalness: 0.15,
      }),
    [],
  );

  const carpetMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#120c10',
        roughness: 0.98,
        metalness: 0.0,
      }),
    [],
  );

  const wallMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#0a0c12',
        roughness: 0.92,
        metalness: 0.02,
      }),
    [],
  );

  const woodMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#3d1a0c',
        roughness: 0.45,
        metalness: 0.05,
      }),
    [],
  );

  const frameMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#0b0f18',
        roughness: 0.35,
        metalness: 0.4,
      }),
    [],
  );

  useEffect(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
      const video = texture.image as HTMLVideoElement;
      if (video) {
        if (isPlaying) {
          video.play().catch((err) => console.log('3D media play wait:', err));
        } else {
          video.pause();
        }
        video.muted = isMuted;

        const handleVideoEnd = () => {
          video.currentTime = 0;
          video.play().catch((err) => console.log('Loop restart wait:', err));
        };

        video.addEventListener('ended', handleVideoEnd);
        return () => {
          video.removeEventListener('ended', handleVideoEnd);
        };
      }
    }
  }, [texture, isPlaying, isMuted]);

  const seatPositions = [-2.28, -0.76, 0.76, 2.28];

  return (
    <>
      <color attach="background" args={['#030308']} />
      <fog attach="fog" args={['#030308', 6, 18]} />
      <Environment preset="night" environmentIntensity={0.22} />

      {/* Cinematic lighting rig */}
      <ambientLight intensity={0.18} color="#1a1520" />
      <hemisphereLight intensity={0.12} color="#2a2030" groundColor="#08060a" />

      {/* Overhead house lights (dim) */}
      <spotLight
        position={[0, 5.5, 1]}
        angle={0.55}
        penumbra={0.85}
        intensity={0.35}
        color="#ffe8d0"
        castShadow
        shadow-mapSize={[512, 512]}
      />

      {/* Screen spill — key light from projection */}
      <pointLight position={[0, 1.2, -3.8]} intensity={1.8} color="#dfe8ff" distance={9} decay={2} />
      <rectAreaLight
        position={[0, 1.0, -4.85]}
        width={6.8}
        height={3.8}
        intensity={2.5}
        color="#c8d8ff"
        onUpdate={(self) => self.lookAt(0, 1, 0)}
      />

      {/* Curtain accent — warm footlights */}
      <pointLight position={[-3.8, -0.6, -3.2]} intensity={0.9} color="#8b2038" distance={5.5} decay={2} />
      <pointLight position={[3.8, -0.6, -3.2]} intensity={0.9} color="#8b2038" distance={5.5} decay={2} />

      {/* Side wall sconces */}
      <pointLight position={[-5.2, 1.8, -2]} intensity={0.25} color="#ffeedd" distance={4} />
      <pointLight position={[5.2, 1.8, -2]} intensity={0.25} color="#ffeedd" distance={4} />

      <group>
        {/* SCREEN */}
        <mesh position={[0, 1.0, -5.03]} receiveShadow>
          <planeGeometry args={[7.35, 4.25]} />
          <primitive object={frameMat} attach="material" />
        </mesh>

        <mesh position={[0, 1.0, -5.0]}>
          <planeGeometry args={[7.05, 3.95]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>

        {/* Screen glow halo */}
        <mesh position={[0, 1.0, -4.98]}>
          <planeGeometry args={[7.5, 4.4]} />
          <meshBasicMaterial color="#88aaff" transparent opacity={0.04} />
        </mesh>

        {/* FLOOR — carpeted auditorium */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.82, -0.5]} receiveShadow>
          <planeGeometry args={[14, 14]} />
          <primitive object={carpetMat} attach="material" />
        </mesh>

        {/* Raked seating platform */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.45, -2.1]} receiveShadow>
          <planeGeometry args={[7.2, 2.2]} />
          <meshStandardMaterial color="#0e0a0e" roughness={0.95} />
        </mesh>

        {/* CEILING */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 3.35, -1]}>
          <planeGeometry args={[14, 14]} />
          <meshStandardMaterial color="#06060c" roughness={0.95} />
        </mesh>

        {/* Back wall behind screen */}
        <mesh position={[0, 0.8, -5.35]} receiveShadow>
          <planeGeometry args={[14, 7]} />
          <primitive object={wallMat} attach="material" />
        </mesh>

        {/* Side walls */}
        <mesh position={[-5.6, 0.7, -1]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
          <planeGeometry args={[14, 6.8]} />
          <primitive object={wallMat} attach="material" />
        </mesh>
        <mesh position={[5.6, 0.7, -1]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
          <planeGeometry args={[14, 6.8]} />
          <primitive object={wallMat} attach="material" />
        </mesh>

        {/* Pelmet / valance above screen */}
        <mesh position={[0, 3.15, -4.9]} castShadow>
          <boxGeometry args={[8.2, 0.35, 0.45]} />
          <primitive object={velvetDarkMat} attach="material" />
        </mesh>
        <mesh position={[0, 2.85, -4.75]} rotation={[0.15, 0, 0]}>
          <boxGeometry args={[7.8, 0.2, 0.35]} />
          <primitive object={velvetLightMat} attach="material" />
        </mesh>

        {/* Realistic draped velvet curtains */}
        <CurtainWing side="left" material={velvetMat} />
        <CurtainWing side="right" material={velvetMat} />

        {/* Outer curtain leading edge — thicker border panels */}
        <mesh position={[-3.2, 0.72, -4.6]} rotation={[0, 0.35, 0]} castShadow>
          <boxGeometry args={[0.35, 6.8, 0.12]} />
          <primitive object={velvetDarkMat} attach="material" />
        </mesh>
        <mesh position={[3.2, 0.72, -4.6]} rotation={[0, -0.35, 0]} castShadow>
          <boxGeometry args={[0.35, 6.8, 0.12]} />
          <primitive object={velvetDarkMat} attach="material" />
        </mesh>

        {/* PLUSH CINEMA SEATING ROW */}
        <group position={[0, -0.35, -2.35]} rotation={[-0.1, 0, 0]}>
          {seatPositions.map((x) => (
            <CinemaSeat
              key={`seat-${x}`}
              x={x}
              fabricMat={seatFabricMat}
              leatherMat={leatherMat}
              plasticMat={plasticMat}
            />
          ))}
        </group>

        {/* Wood aisle trim */}
        <mesh position={[-5.5, -1.72, -1]} castShadow receiveShadow>
          <boxGeometry args={[0.1, 0.18, 14]} />
          <primitive object={woodMat} attach="material" />
        </mesh>
        <mesh position={[5.5, -1.72, -1]} castShadow receiveShadow>
          <boxGeometry args={[0.1, 0.18, 14]} />
          <primitive object={woodMat} attach="material" />
        </mesh>
      </group>
    </>
  );
}