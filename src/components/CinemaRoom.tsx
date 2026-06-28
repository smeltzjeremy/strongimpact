import React, { useEffect, useMemo } from 'react';
import { useVideoTexture, RoundedBox, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface CinemaRoomProps {
  videoUrl: string;
  isPlaying: boolean;
  isMuted: boolean;
}

const VELVET_DEEP = '#3a0c18';
const VELVET_MID = '#5c1428';
const VELVET_HIGH = '#7a2040';

function useVelvetMaterial(color: string): THREE.MeshPhysicalMaterial {
  return useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color,
        roughness: 0.88,
        metalness: 0.0,
        sheen: 1.0,
        sheenRoughness: 0.5,
        sheenColor: new THREE.Color('#a03050'),
        envMapIntensity: 0.55,
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
  const wallX = 5.85;

  const folds = useMemo(() => {
    return Array.from({ length: foldCount }, (_, i) => {
      const t = i / (foldCount - 1);
      const z = -4.85 + t * 5.6;
      const waveA = Math.sin(i * 0.72 + 0.4) * 0.14;
      const waveB = Math.sin(i * 0.28) * 0.06;
      const bulge = waveA + waveB;
      const x = sign * (wallX - bulge * sign);
      const rotY = sign * (0.18 + Math.sin(i * 0.55) * 0.1);
      const rotZ = Math.sin(i * 0.4) * 0.03;
      const depth = 0.07 + Math.abs(Math.sin(i * 0.65)) * 0.04;
      const width = 0.24 + Math.abs(Math.cos(i * 0.5)) * 0.05;
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
        const sag = Math.sin(t * Math.PI) * 0.28;
        return (
          <mesh
            key={`${side}-swag-${i}`}
            position={[sign * (5.15 + sag), 3.55, z]}
            rotation={[0.3 * sign, sign * 0.28, 0]}
            material={material}
          >
            <boxGeometry args={[0.48, 0.18, 0.2]} />
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
    <group position={[x, 0, 0]} rotation={[0, Math.PI, 0]}>
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
          <meshStandardMaterial color="#4a1020" roughness={0.95} />
        </mesh>
      ))}

      {/* Backrest — faces rear of auditorium (+Z) */}
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
          <meshStandardMaterial color="#6c1830" roughness={0.88} />
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
  const velvetDarkMat = useVelvetMaterial(VELVET_DEEP);
  const velvetLightMat = useVelvetMaterial(VELVET_HIGH);

  const seatFabricMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#6c1830',
        roughness: 0.84,
        metalness: 0.0,
        sheen: 0.85,
        sheenRoughness: 0.55,
        sheenColor: new THREE.Color('#b04060'),
        envMapIntensity: 0.5,
      }),
    [],
  );

  const leatherMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1e1a22',
        roughness: 0.5,
        metalness: 0.1,
      }),
    [],
  );

  const plasticMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#16141a',
        roughness: 0.65,
        metalness: 0.15,
      }),
    [],
  );

  const carpetMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1a1218',
        roughness: 0.96,
        metalness: 0.0,
      }),
    [],
  );

  const wallMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#141820',
        roughness: 0.9,
        metalness: 0.02,
      }),
    [],
  );

  const woodMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#4d2210',
        roughness: 0.42,
        metalness: 0.05,
      }),
    [],
  );

  const frameMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#141a28',
        roughness: 0.32,
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
      <color attach="background" args={['#0a0a14']} />
      <fog attach="fog" args={['#0a0a14', 12, 24]} />
      <Environment preset="night" environmentIntensity={0.48} />

      {/* Cinematic lighting rig — brighter but still moody */}
      <ambientLight intensity={0.42} color="#2a2430" />
      <hemisphereLight intensity={0.3} color="#3a3048" groundColor="#141018" />

      {/* Overhead house lights */}
      <spotLight
        position={[0, 5.5, 1]}
        angle={0.6}
        penumbra={0.8}
        intensity={0.7}
        color="#fff0e0"
        castShadow
        shadow-mapSize={[512, 512]}
      />

      {/* Aisle wash lights */}
      <pointLight position={[0, 2.8, 1.5]} intensity={0.55} color="#ffe8d8" distance={10} decay={2} />
      <pointLight position={[0, 1.5, -0.5]} intensity={0.4} color="#e8e0f0" distance={8} decay={2} />

      {/* Screen spill — key light from projection */}
      <pointLight position={[0, 1.2, -3.8]} intensity={3.2} color="#e8eeff" distance={11} decay={2} />
      <rectAreaLight
        position={[0, 1.0, -4.85]}
        width={6.8}
        height={3.8}
        intensity={4.8}
        color="#d0e0ff"
        onUpdate={(self) => self.lookAt(0, 1, 0)}
      />

      {/* Curtain accent — warm footlights */}
      <pointLight position={[-4.2, -0.4, -3.2]} intensity={1.5} color="#a02848" distance={6.5} decay={2} />
      <pointLight position={[4.2, -0.4, -3.2]} intensity={1.5} color="#a02848" distance={6.5} decay={2} />

      {/* Side wall sconces */}
      <pointLight position={[-6.0, 1.8, -2]} intensity={0.55} color="#ffeedd" distance={5} />
      <pointLight position={[6.0, 1.8, -2]} intensity={0.55} color="#ffeedd" distance={5} />

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
          <meshBasicMaterial color="#88aaff" transparent opacity={0.07} />
        </mesh>

        {/* FLOOR — carpeted auditorium */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.82, -0.5]} receiveShadow>
          <planeGeometry args={[16, 14]} />
          <primitive object={carpetMat} attach="material" />
        </mesh>

        {/* Raked seating platform */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.45, -2.1]} receiveShadow>
          <planeGeometry args={[7.2, 2.2]} />
          <meshStandardMaterial color="#1a1418" roughness={0.94} />
        </mesh>

        {/* CEILING */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 3.35, -1]}>
          <planeGeometry args={[16, 14]} />
          <meshStandardMaterial color="#101018" roughness={0.94} />
        </mesh>

        {/* Back wall behind screen */}
        <mesh position={[0, 0.8, -5.35]} receiveShadow>
          <planeGeometry args={[16, 7]} />
          <primitive object={wallMat} attach="material" />
        </mesh>

        {/* Side walls — pushed outward past curtains */}
        <mesh position={[-6.4, 0.7, -1]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
          <planeGeometry args={[14, 6.8]} />
          <primitive object={wallMat} attach="material" />
        </mesh>
        <mesh position={[6.4, 0.7, -1]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
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

        {/* Realistic draped velvet curtains — hugging side walls */}
        <CurtainWing side="left" material={velvetMat} />
        <CurtainWing side="right" material={velvetMat} />

        {/* Inner curtain leading edges — frame the screen opening */}
        <mesh position={[-3.35, 0.72, -4.55]} rotation={[0, 0.28, 0]} castShadow>
          <boxGeometry args={[0.32, 6.8, 0.1]} />
          <primitive object={velvetDarkMat} attach="material" />
        </mesh>
        <mesh position={[3.35, 0.72, -4.55]} rotation={[0, -0.28, 0]} castShadow>
          <boxGeometry args={[0.32, 6.8, 0.1]} />
          <primitive object={velvetDarkMat} attach="material" />
        </mesh>

        {/* PLUSH CINEMA SEATING ROW — faces screen (-Z) */}
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
        <mesh position={[-6.2, -1.72, -1]} castShadow receiveShadow>
          <boxGeometry args={[0.1, 0.18, 14]} />
          <primitive object={woodMat} attach="material" />
        </mesh>
        <mesh position={[6.2, -1.72, -1]} castShadow receiveShadow>
          <boxGeometry args={[0.1, 0.18, 14]} />
          <primitive object={woodMat} attach="material" />
        </mesh>
      </group>
    </>
  );
}