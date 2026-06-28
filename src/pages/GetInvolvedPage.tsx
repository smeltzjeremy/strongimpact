import React from 'react';
import ParentHubLayout from '../components/premium/ParentHubLayout';
import ParentHubCard, { type ParentHubItem } from '../components/premium/ParentHubCard';

const hubs: ParentHubItem[] = [
  {
    name: 'Volunteer Portal',
    description: 'Sign up to assist on-field camp logistics or local food drives.',
    path: '/get-involved/details',
    gridSpan: 'col-span-1 h-[130px]',
    icon: '🤝',
    pillarLabel: 'Volunteer',
  },
  {
    name: 'Sponsorship Tiers',
    description: 'Review corporate backing pathways and community tiers.',
    path: '/get-involved/details',
    gridSpan: 'col-span-1 h-[130px]',
    icon: '🏢',
    pillarLabel: 'Sponsor',
  },
  {
    name: 'Donation Processor',
    description: 'Secure digital portal to fuel foundation resource networks directly.',
    path: '/get-involved/details',
    gridSpan: 'col-span-2 h-[125px]',
    icon: '💳',
    pillarLabel: 'Donate',
  },
];

export default function GetInvolvedPage(): React.JSX.Element {
  return (
    <ParentHubLayout
      stepLabel="Stepping Stone 05"
      eyebrow="Support Infrastructure"
      titleLine1="GET"
      titleAccent="INVOLVED"
      subtitle="Support Infrastructure"
    >
      {hubs.map((hub) => (
        <ParentHubCard key={hub.name} hub={hub} />
      ))}
    </ParentHubLayout>
  );
}