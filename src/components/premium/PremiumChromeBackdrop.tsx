import React from 'react';
import { Canvas } from '@react-three/fiber';
import ProceduralChromeBackground from '../ProceduralChromeBackground';

/** Dark silver/chrome liquid metal — no crimson wash on the page background */
export default function PremiumChromeBackdrop(): React.JSX.Element {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 5], fov: 60 }}
          gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
          style={{ width: '100%', height: '100%', background: '#050508' }}
        >
          <ProceduralChromeBackground variant="default" intensity={1.0} />
        </Canvas>
      </div>

      <div className="pointer-events-none fixed inset-0 z-[1]" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 90% 72% at 50% 42%, transparent 22%, rgba(8,8,14,0.48) 58%, rgba(4,4,8,0.94) 100%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-30 mix-blend-screen"
          style={{
            background:
              'radial-gradient(ellipse 50% 35% at 82% 14%, rgba(200,210,225,0.07) 0%, transparent 68%), radial-gradient(ellipse 45% 30% at 10% 88%, rgba(140,150,170,0.06) 0%, transparent 62%)',
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:40px_40px] mix-blend-overlay opacity-24" />
      </div>
    </>
  );
}