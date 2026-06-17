import React from 'react';

export default function Lights() {
  return (
    <>
      {/* Ambient background baseline - low intensity to keep contrast high */}
      <ambientLight intensity={0.2} />

      {/* Key Light: Primary high-intensity light casting crisp forms */}
      <directionalLight
        position={[5, 10, 7]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />

      {/* Fill Light: Soft, cool light from the opposite side to open up dark shadows */}
      <pointLight 
        position={[-5, -2, -2]} 
        intensity={0.8} 
        color="#3355ff" 
      />

      {/* Rim Light: High-intensity backlight to pop objects off the dark background */}
      <directionalLight 
        position={[0, 5, -10]} 
        intensity={2.0} 
        color="#ffffff" 
      />
    </>
  );
}