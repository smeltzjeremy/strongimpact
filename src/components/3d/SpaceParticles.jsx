import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';

export default function SpaceParticles() {
  const ref = useRef();
  
  const [positions] = useState(() => {
    const arr = new Float32Array(2000 * 3);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = (Math.random() - 0.5) * 3.5;
    }
    return arr;
  });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta * 0.01;
      ref.current.rotation.y -= delta * 0.01;
    }
  });

  return (
    <group rotation={[0, 0, 0]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00ffcc"
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.9}
        />
      </Points>
    </group>
  );
}