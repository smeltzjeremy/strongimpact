import React from 'react';
import SceneContainer from './components/3d/SceneContainer';

export default function App() {
  return (
    <main style={{ width: '100vw', height: '100vh', margin: 0, padding: 0, overflow: 'hidden' }}>
      <SceneContainer />
    </main>
  );
}