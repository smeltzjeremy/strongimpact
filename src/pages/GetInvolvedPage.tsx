import React from 'react';
import ParentHubLayout from '../components/premium/ParentHubLayout';
import ParentHubCard, { type ParentHubItem } from '../components/premium/ParentHubCard';

const hubs: ParentHubItem[] = [
  {
    name: 'Volunteer Portal',
    description: 'Sign up to assist on-field camp logistics or local food drives.',
    path: '/get-involved/details',
    // Up + clear of Donation; horizontal space from Sponsorship
    gridSpan: 'col-span-1 h-[130px] mr-3 mb-14',
    icon: '🤝',
    pillarLabel: 'Volunteer',
  },
  {
    name: 'Sponsorship Tiers',
    description: 'Review corporate backing pathways and community tiers.',
    path: '/get-involved/details',
    // Up + clear of Donation; horizontal space from Volunteer
    gridSpan: 'col-span-1 h-[130px] ml-3 mb-14',
    icon: '🏢',
    pillarLabel: 'Sponsor',
  },
  {
    name: 'Donation Processor',
    description: 'Secure digital portal to fuel foundation resource networks directly.',
    path: '/get-involved/details',
    // Push down so it sits clearly below the top pair
    gridSpan: 'col-span-2 h-[125px] mt-6',
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
      // Extra row gap so top pair lifts clear of Donation
      gridClassName="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-5 sm:gap-y-16"
    >
      {hubs.map((hub) => (
        <ParentHubCard key={hub.name} hub={hub} />
      ))}
    </ParentHubLayout>
  );
}
