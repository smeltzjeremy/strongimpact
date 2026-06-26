import React from 'react';

export default function CinemaRoom() {
  return (
    <>
      {/* Cinematic Studio Space Illumination Profile */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[0, 4, 3]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-6, -1.5, -1]} intensity={0.5} color="#ef4444" distance={10} />
      <pointLight position={[6, -1.5, -1]} intensity={0.5} color="#ef4444" distance={10} />

      <group position={[0, 0, 0]}>
        {/* Physical structural shadow backdrop behind the video screen container */}
        <mesh position={[0, 0, -2]}>
          <planeGeometry args={[3.2, 1.8]} />
          <meshStandardMaterial color="#020204" roughness={0.9} />
        </mesh>

        {/* Premium Outer Bezel Border Bezel Trim */}
        <mesh position={[0, 0, -2.02]}>
          <planeGeometry args={[3.4, 2.0]} />
          <meshStandardMaterial color="#0c0c12" roughness={0.5} metalness={0.6} />
        </mesh>

        {/* Studio Room Floor Stage */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]}>
          <planeGeometry args={[12, 10]} />
          <meshStandardMaterial color="#08080d" roughness={0.8} />
        </mesh>

        {/* Main Rear Wall Matrix */}
        <mesh position={[0, 1.5, -3]}>
          <planeGeometry args={[14, 7]} />
          <meshStandardMaterial color="#040406" roughness={0.95} />
        </mesh>
      </group>
    </>
  );
}