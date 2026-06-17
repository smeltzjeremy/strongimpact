import React from 'react';
import SceneContainer from './components/3d/SceneContainer';
import UIOverlay from './components/UIOverlay';

export default function App() {
  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      position: 'relative', 
      margin: 0, 
      padding: 0,
      overflow: 'hidden'
    }}>
      {/* 3D Render Layer */}
      <SceneContainer />
      
      {/* User Interface Interaction Layer */}
      <UIOverlay />
    </div>
  );
}