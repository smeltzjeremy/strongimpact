import React from 'react';
import ParentHubLayout from '../components/premium/ParentHubLayout';
import ParentHubCard, { type ParentHubItem } from '../components/premium/ParentHubCard';

const hubs: ParentHubItem[] = [
  {
    name: 'Youth Development',
    description: 'Football camps, athletic training, and leadership workshops.',
    path: '/programs/details',
    gridSpan: 'col-span-1 h-[130px]',
    icon: '🏈',
    pillarLabel: 'Pillar One',
  },
  {
    name: 'Education & Mentorship',
    description: 'Academic tracking, college readiness, and guest speakers.',
    path: '/programs/details',
    gridSpan: 'col-span-1 h-[130px]',
    icon: '🎓',
    pillarLabel: 'Pillar Two',
  },
  {
    name: 'Community Outreach',
    description: 'Holiday givebacks, school supply drives, and family support.',
    path: '/programs/details',
    gridSpan: 'col-span-2 h-[125px]',
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
      // Wide horizontal + vertical gaps so the 3 cards never touch (mobile + desktop)
      gridClassName="grid grid-cols-2 gap-x-5 gap-y-8 sm:gap-x-6 sm:gap-y-10"
    >
      {hubs.map((hub) => (
        <ParentHubCard key={hub.name} hub={hub} />
      ))}
    </ParentHubLayout>
  );
}
