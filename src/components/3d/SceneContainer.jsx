import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import MenuRing from './MenuRing';

export default function SceneContainer() {
  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      position: 'absolute', 
      top: 0, 
      left: 0,
      zIndex: 1,
      /* Creates a deep CSS backdrop vignette to layer behind the transparent WebGL canvas */
      background: 'radial-gradient(circle at center, #1a2333 0%, #080b11 100%)'
    }}>
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 60 }}
        gl={{ 
          antialias: true, 
          alpha: true,                  /* Allows our rich backdrop gradient to show through */
          powerPreference: "high-performance" 
        }}
      >
        {/* Dynamic Studio Lighting Rig for Glass Reflections */}
        {/* Ambient light fills the scene shadows with a sleek deep blue tone */}
        <ambientLight intensity={0.6} color="#1d293d" />
        
        {/* Primary key light to create sharp glossy glints on the glass clearcoat */}
        <directionalLight 
          position={[5, 5, 4]} 
          intensity={1.5} 
          color="#ffffff" 
          castShadow={false}
        />

        {/* Secondary fill light casting a subtle colored edge tint across the ring */}
        <pointLight 
          position={[-4, -3, 2]} 
          intensity={1.2} 
          color="#00ffcc" 
        />

        {/* Ambient space star dust layer */}
        <Stars 
          radius={100} 
          depth={50} 
          count={2500} 
          factor={4} 
          saturation={0.5} 
          fade 
          speed={1} 
        />

        {/* Interactive Glass Menu Ring */}
        <MenuRing />

        {/* Viewport controls */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 2.3}
          maxPolarAngle={Math.PI / 1.7}
        />
      </Canvas>
    </div>
  );
}