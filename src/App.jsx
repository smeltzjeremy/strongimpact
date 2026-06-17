import React from 'react';
import SceneContainer from './components/3d/SceneContainer';
import UIOverlay from './components/UIOverlay';

function App() {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', background: '#0a0a0a', overflow: 'hidden' }}>
      {/* Background Layer: High-performance 3D graphics scene */}
      <SceneContainer />

      {/* Foreground Layer: Clean, interactive HTML layout text and buttons */}
      <UIOverlay />
    </div>
  );
}

export default App;