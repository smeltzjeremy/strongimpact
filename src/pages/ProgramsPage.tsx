import React from 'react';
import ParentHubLayout from '../components/premium/ParentHubLayout';
import ParentHubCard, { type ParentHubItem } from '../components/premium/ParentHubCard';
const hubs: ParentHubItem[] = [
  {
    name: 'Youth Development',
    description: 'Football camps, athletic training, and leadership workshops.',
    path: '/programs/details',
    // Horizontal gap like About; extra bottom margin keeps pair clear of Community
    gridSpan: 'col-span-1 h-[130px] mr-3 mb-10',
    icon: '🏈',
    pillarLabel: 'Pillar One',
  },
  {
    name: 'Education & Mentorship',
    description: 'Academic tracking, college readiness, and guest speakers.',
    path: '/programs/details',
    // Horizontal gap like About; extra bottom margin keeps pair clear of Community
    gridSpan: 'col-span-1 h-[130px] ml-3 mb-10',
    icon: '🎓',
    pillarLabel: 'Pillar Two',
  },
  {
    name: 'Community Outreach',
    description: 'Holiday givebacks, school supply drives, and family support.',
    path: '/programs/details',
    // Nudge down so it sits clearly separate from the top pair
    gridSpan: 'col-span-2 h-[125px] mt-2',
    icon: '🤝',
    pillarLabel: 'Pillar Three',
  },
];
export default function ProgramsPage(): React.JSX.Element {
  return (
    <ParentHubLayout
      stepLabel="Stepping Stone 03"
      eyebrow="Core Framework Pillars"
      titleLine1="OUR"
      titleAccent="PROGRAMS"
      subtitle="Empowerment Pillars"
    >
      {hubs.map((hub) => (
        <ParentHubCard key={hub.name} hub={hub} />
      ))}
    </ParentHubLayout>
  );
}