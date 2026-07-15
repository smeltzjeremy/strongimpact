import React from 'react';
import ParentHubLayout from '../components/premium/ParentHubLayout';
import ParentHubCard, { type ParentHubItem } from '../components/premium/ParentHubCard';

const hubs: ParentHubItem[] = [
  {
    name: 'Our Story',
    description: 'Founded by Jazmond Strong to create community pathways.',
    path: '/about/details?section=story',
    // Added mb-6 to push the two bottom cards down cleanly
    gridSpan: 'col-span-2 h-[125px] mb-6',
    icon: '📖',
    pillarLabel: 'Pillar One',
  },
  {
    name: 'Core Values',
    description: 'Leadership, Accountability, Service, Discipline, Excellence.',
    path: '/about/details?section=values',
    // Added mr-3 to push it away from "Meet Our Team" horizontally
    gridSpan: 'col-span-1 h-[130px] mr-3',
    icon: '🛡️',
    pillarLabel: 'Pillar Two',
  },
  {
    name: 'Meet Our Team',
    description: 'Connect with our directors, board members, and volunteers.',
    path: '/about/details?section=team',
    // Added ml-3 to push it away from "Core Values" horizontally
    gridSpan: 'col-span-1 h-[130px] ml-3',
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