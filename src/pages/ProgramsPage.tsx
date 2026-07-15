import React from 'react';
import ParentHubLayout from '../components/premium/ParentHubLayout';
import ParentHubCard, { type ParentHubItem } from '../components/premium/ParentHubCard';

const hubs: ParentHubItem[] = [
  {
    name: 'Youth Development',
    description: 'Football camps, athletic training, and leadership workshops.',
    path: '/programs/details',
    // Up + clear of Community; horizontal space from Education
    gridSpan: 'col-span-1 h-[130px] mr-3 mb-14',
    icon: '🏈',
    pillarLabel: 'Pillar One',
  },
  {
    name: 'Education & Mentorship',
    description: 'Academic tracking, college readiness, and guest speakers.',
    path: '/programs/details',
    // Up + clear of Community; horizontal space from Youth
    gridSpan: 'col-span-1 h-[130px] ml-3 mb-14',
    icon: '🎓',
    pillarLabel: 'Pillar Two',
  },
  {
    name: 'Community Outreach',
    description: 'Holiday givebacks, school supply drives, and family support.',
    path: '/programs/details',
    // Push down so it sits clearly below the top pair
    gridSpan: 'col-span-2 h-[125px] mt-6',
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
      // Extra row gap so top pair lifts clear of Community Outreach
      gridClassName="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-5 sm:gap-y-16"
    >
      {hubs.map((hub) => (
        <ParentHubCard key={hub.name} hub={hub} />
      ))}
    </ParentHubLayout>
  );
}
