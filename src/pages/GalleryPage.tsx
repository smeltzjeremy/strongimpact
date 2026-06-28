import React from 'react';
import ParentHubLayout from '../components/premium/ParentHubLayout';
import ParentHubCard, { type ParentHubItem } from '../components/premium/ParentHubCard';

const PhotoIcon = (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const CinemaIcon = (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const hubs: ParentHubItem[] = [
  {
    name: 'Photos Hub',
    description: 'Captured Moments & Community Foundations',
    path: '/photos',
    gridSpan: 'col-span-2 h-[135px]',
    icon: PhotoIcon,
    pillarLabel: 'Photo Archive',
  },
  {
    name: '3D Cinema Suite',
    description: 'Interactive Video Archives & Highlights',
    path: '/theater',
    gridSpan: 'col-span-2 h-[135px]',
    icon: CinemaIcon,
    pillarLabel: 'Cinema Suite',
  },
];

export default function GalleryPage(): React.JSX.Element {
  return (
    <ParentHubLayout
      stepLabel="Stepping Stone 01"
      eyebrow="Media Gallery Archive"
      titleLine1="MEDIA"
      titleAccent="GALLERY"
      subtitle="Select an Archive Category"
    >
      {hubs.map((hub) => (
        <ParentHubCard key={hub.name} hub={hub} />
      ))}
    </ParentHubLayout>
  );
}