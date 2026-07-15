import React from 'react';
import ParentHubLayout from '../components/layout/ParentHubLayout';
import ParentHubCard from '../components/ui/ParentHubCard';

export default function ProgramsPage() {
  return (
    <ParentHubLayout
      title="PROGRAMS"
      subtitle="Building stronger foundations through structured growth"
      stepLabel="02 — PROGRAMS"
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '2.25rem',           // ← This gives nice separation
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        <ParentHubCard
          icon="🎯"
          title="Leadership Academy"
          description="Develop confident, values-driven leaders equipped to serve their communities."
          gridSpan={1}
        />
        <ParentHubCard
          icon="🌱"
          title="Youth Mentorship"
          description="Personalized guidance and skill-building for the next generation of change-makers."
          gridSpan={1}
        />
        <ParentHubCard
          icon="🤝"
          title="Community Impact"
          description="Real-world projects that strengthen neighborhoods and create lasting positive change."
          gridSpan={1}
        />
      </div>
    </ParentHubLayout>
  );
}