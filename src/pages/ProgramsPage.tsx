import React from 'react';

export default function ProgramsPage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#05050f', 
      padding: '100px 20px 60px',
      color: '#fff',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ 
          fontSize: '3.5rem', 
          textAlign: 'center', 
          marginBottom: '0.5rem',
          background: 'linear-gradient(90deg, #fff, #ff3366)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          PROGRAMS
        </h1>
        <p style={{ textAlign: 'center', color: '#aaa', marginBottom: '3rem' }}>
          Building stronger foundations through structured growth
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '2.5rem',           // ← This is the only change for separation
          marginTop: '2rem'
        }}>
          {/* Card 1 */}
          <div style={{
            background: 'rgba(15, 15, 30, 0.7)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px',
            padding: '2rem',
            backdropFilter: 'blur(12px)'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎯</div>
            <h3 style={{ marginBottom: '0.75rem' }}>Leadership Academy</h3>
            <p style={{ color: '#ccc' }}>
              Develop confident, values-driven leaders equipped to serve their communities.
            </p>
          </div>

          {/* Card 2 */}
          <div style={{
            background: 'rgba(15, 15, 30, 0.7)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px',
            padding: '2rem',
            backdropFilter: 'blur(12px)'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🌱</div>
            <h3 style={{ marginBottom: '0.75rem' }}>Youth Mentorship</h3>
            <p style={{ color: '#ccc' }}>
              Personalized guidance and skill-building for the next generation of change-makers.
            </p>
          </div>

          {/* Card 3 */}
          <div style={{
            background: 'rgba(15, 15, 30, 0.7)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px',
            padding: '2rem',
            backdropFilter: 'blur(12px)'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🤝</div>
            <h3 style={{ marginBottom: '0.75rem' }}>Community Impact</h3>
            <p style={{ color: '#ccc' }}>
              Real-world projects that strengthen neighborhoods and create lasting positive change.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}