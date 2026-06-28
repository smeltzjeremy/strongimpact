import React from 'react';
import { Canvas } from '@react-three/fiber';
import ProceduralChromeBackground from '../ProceduralChromeBackground';

export default function PremiumCrimsonBackdrop(): React.JSX.Element {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 5], fov: 60 }}
          gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
          style={{ width: '100%', height: '100%', background: '#0a0406' }}
        >
          <ProceduralChromeBackground variant="crimson-iridescent" intensity={1.05} />
        </Canvas>
      </div>

      <div className="pointer-events-none fixed inset-0 z-[1]" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 90% 72% at 50% 42%, transparent 22%, rgba(10,4,6,0.45) 58%, rgba(6,1,3,0.88) 100%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-35 mix-blend-screen"
          style={{
            background:
              'radial-gradient(ellipse 50% 35% at 82% 14%, rgba(127,29,29,0.15) 0%, transparent 68%), radial-gradient(ellipse 45% 30% at 10% 88%, rgba(90,10,18,0.13) 0%, transparent 62%)',
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] mix-blend-overlay opacity-28" />
      </div>
    </>
  );
}