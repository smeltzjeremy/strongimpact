// src/components/3d/MenuRing.jsx
import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

const MenuRing = ({ menuOpen }) => {
  const groupRef = useRef();
  const rotationRef = useRef(0);
  const autoRotateSpeed = 0.002;

  useEffect(() => {
    if (menuOpen) {
      // Pause auto rotation when menu is open
      rotationRef.current = groupRef.current?.rotation.y || 0;
    }
  }, [menuOpen]);

  useFrame((state) => {
    if (!groupRef.current) return;

    if (!menuOpen) {
      // Smooth auto rotation only when menu is closed
      rotationRef.current += autoRotateSpeed;
      groupRef.current.rotation.y = rotationRef.current;
    } else {
      // Keep current rotation while menu is open
      groupRef.current.rotation.y = rotationRef.current;
    }
  });

  const cards = [
    { label: "ABOUT US", color: "#ffffff", position: [0, 0, 0] },
    { label: "PROGRAMS", color: "#ffffff", position: [3.5, 0, 0] },
    { label: "EVENTS", color: "#ffffff", position: [0, 0, 3.5] },
    { label: "GALLERY", color: "#ffffff", position: [-3.5, 0, 0] },
    { label: "GET INVOLVED", color: "#ffffff", position: [0, 0, -3.5] },
  ];

  return (
    <group ref={groupRef}>
      {cards.map((card, index) => (
        <group 
          key={index} 
          position={card.position}
          rotation={[0, (index * (Math.PI * 2)) / 5, 0]} // Fixed pentagon positions
        >
          <Html 
            transform 
            occlude 
            distanceFactor={8}
            position={[0, 0, 0]}
          >
            <div 
              className="menu-card"
              style={{
                background: 'rgba(0,0,0,0.85)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.15)',
                padding: '12px 24px',
                borderRadius: '9999px',
                color: card.color,
                whiteSpace: 'nowrap',
                fontWeight: '600',
                pointerEvents: 'auto',
                boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
              }}
            >
              {card.label}
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
};

export default MenuRing;