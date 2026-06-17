import React from 'react';
import SceneContainer from './components/3d/SceneContainer';

function App() {
  return (
    <div style={{ 
      position: 'relative', 
      width: '100vw', 
      height: '100vh', 
      overflow: 'hidden',
      background: '#05050f' 
    }}>
      {/* Immersive 3D Interactive WebGL Canvas Viewport Layer */}
      <SceneContainer />
    </div>
  );
}

export default App;