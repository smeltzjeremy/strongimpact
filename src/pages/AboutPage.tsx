import React from 'react';
import ParentHubLayout from '../components/premium/ParentHubLayout';
import ParentHubCard, { type ParentHubItem } from '../components/premium/ParentHubCard';

const hubs: ParentHubItem[] = [
  {
    name: 'Our Story',
    description: 'Founded by Jazmond Strong to create community pathways.',
    path: '/about/details?section=story',
    gridSpan: 'col-span-2 h-[125px]',
    icon: '📖',
    pillarLabel: 'Pillar One',
  },
  {
    name: 'Core Values',
    description: 'Leadership, Accountability, Service, Discipline, Excellence.',
    path: '/about/details?section=values',
    gridSpan: 'col-span-1 h-[130px]',
    icon: '🛡️',
    pillarLabel: 'Pillar Two',
  },
  {
    name: 'Meet Our Team',
    description: 'Connect with our directors, board members, and volunteers.',
    path: '/about/details?section=team',
    gridSpan: 'col-span-1 h-[130px]',
    icon: '👥',
    pillarLabel: 'Pillar Three',
  },
];

export default function AboutPage(): React.JSX.Element {
  return (
    <ParentHubLayout
      stepLabel="Stepping Stone 02"
      eyebrow="Foundation Archive"
      titleLine1="ABOUT"
      titleAccent="US"
      subtitle="The Vision & Foundation"
    >
      {hubs.map((hub) => (
        <ParentHubCard key={hub.name} hub={hub} />
      ))}
    </ParentHubLayout>
  );
}