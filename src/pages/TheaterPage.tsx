import React from 'react';

export default function TheaterPage() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#000000',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ffffff',
      fontFamily: 'sans-serif'
    }}>
      <h1 style={{ letterSpacing: '0.2em', fontSize: '2rem', fontWeight: 'bold' }}>
        STRONG IMPACT THEATER
      </h1>
      <p style={{ color: '#52525b', fontSize: '0.75rem', letterSpacing: '0.2em', marginTop: '10px' }}>
        STAGING PHASE PLACEHOLDER
      </p>
    </div>
  );
}