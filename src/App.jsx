import React from 'react';
import SceneContainer from './components/3d/SceneContainer';
import UIOverlay from './components/UIOverlay';

export default function App() {
  return (
    <>
      {/* Global CSS Injector to smash browser margins, padding, and layout borders */}
      <style>{`
        * {
          box-sizing: border-box;
        }
        html, body, #root {
          margin: 0 !important;
          padding: 0 !important;
          width: 100vw !important;
          height: 100vh !important;
          overflow: hidden !important;
          background-color: #080b11;
        }
      `}</style>

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
    </>
  );
}