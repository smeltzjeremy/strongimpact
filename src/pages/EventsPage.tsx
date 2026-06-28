import React from 'react';
import ParentHubLayout from '../components/premium/ParentHubLayout';
import ParentHubCard, { type ParentHubItem } from '../components/premium/ParentHubCard';

const hubs: ParentHubItem[] = [
  {
    name: 'Upcoming Calendar',
    description: 'Track live administrative community camps and schedule blocks.',
    path: '/events/details',
    gridSpan: 'col-span-2 h-[125px]',
    icon: '📅',
    pillarLabel: 'Schedule Hub',
  },
  {
    name: 'Special Guests',
    description: 'Collegiate and professional consulting rosters.',
    path: '/events/details',
    gridSpan: 'col-span-1 h-[130px]',
    icon: '👤',
    pillarLabel: 'Guest Roster',
  },
  {
    name: 'Registration Hub',
    description: 'Secure baseline processing portal options.',
    path: '/events/details',
    gridSpan: 'col-span-1 h-[130px]',
    icon: '📝',
    pillarLabel: 'Action Portal',
  },
];

export default function EventsPage(): React.JSX.Element {
  return (
    <ParentHubLayout
      stepLabel="Stepping Stone 04"
      eyebrow="Foundation Events Archive"
      titleLine1="FOUNDATION"
      titleAccent="EVENTS"
      subtitle="Schedules & Action Hub"
    >
      {hubs.map((hub) => (
        <ParentHubCard key={hub.name} hub={hub} />
      ))}
    </ParentHubLayout>
  );
}