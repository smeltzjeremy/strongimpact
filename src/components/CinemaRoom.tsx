import React from 'react';
import { Html } from '@react-three/drei';

interface CinemaRoomProps {
  videoUrl: string;
}

export default function CinemaRoom({ videoUrl }: CinemaRoomProps) {
  return (
    <>
      {/* High-Contrast Lighting profile so you can see the structural 3D objects */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[0, 5, 5]} intensity={1.5} color="#ffffff" />
      
      {/* Glowing room corner aesthetics */}
      <pointLight position={[-8, -2, -2]} intensity={0.8} color="#ef4444" distance={15} />
      <pointLight position={[8, -2, -2]} intensity={0.8} color="#ef4444" distance={15} />

      <group position={[0, 0, 0]}>
        
        {/* THE 3D DISPLAY CONTAINER BOARD */}
        <group position={[0, 0.5, -4]}>
          
          {/* Real standard HTML5 player perfectly localized inside the 3D scene grid spatial metrics */}
          <Html
            transform
            occlude
            distanceFactor={4.2}
            position={[0, 0, 0.02]}
            className="select-none pointer-events-auto"
          >
            <div className="w-[800px] aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <video
                src={videoUrl}
                controls
                playsInline
                webkit-playsinline="true"
                crossOrigin="anonymous"
                className="w-full h-full object-contain"
              />
            </div>
          </Html>

          {/* Solid 3D Screen Border Frame/Bezel Background Mesh */}
          <mesh position={[0, 0, 0]}>
            <planeGeometry args={[7.4, 4.3]} />
            <meshStandardMaterial color="#0c0c12" roughness={0.4} metalness={0.7} />
          </mesh>
        </group>

        {/* CINEMA SPACE BASE LAYER STAGE FLOOR */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.2, 0]}>
          <planeGeometry args={[20, 16]} />
          <meshStandardMaterial color="#0a0a0f" roughness={0.8} />
        </mesh>

        {/* CINEMA ROOM BACKSTAGE STRUCTURE WALL */}
        <mesh position={[0, 2.5, -6]}>
          <planeGeometry args={[24, 12]} />
          <meshStandardMaterial color="#050508" roughness={0.95} />
        </mesh>
      </group>
    </>
  );
}