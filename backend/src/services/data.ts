import { randomUUID } from 'node:crypto';

const restrooms = [
  {
    id: randomUUID(),
    building: 'Science Hall',
    floor: '1',
    cleanliness: 4,
    smell: 4,
    supplies: 5,
    maintenance: 4,
    status: 'Clean',
    comment: 'Recently serviced and stocked.',
    createdAt: new Date().toISOString()
  }
];

const clubs = [
  { id: randomUUID(), name: 'Robotics Club', description: 'Build bots for competition.', meetingTime: 'Tue 4:00 PM', location: 'Lab B12', contactEmail: 'robotics@school.edu', followed: true },
  { id: randomUUID(), name: 'Debate Team', description: 'Policy and public forum debate.', meetingTime: 'Thu 3:45 PM', location: 'Room A8', contactEmail: 'debate@school.edu', followed: false }
];

const news = [
  { id: randomUUID(), title: 'Winter Formal Tickets On Sale', category: 'event', content: 'Tickets available in student portal through Friday.', publishedAt: new Date().toISOString() },
  { id: randomUUID(), title: 'Severe Weather Alert', category: 'alert', content: 'After-school activities canceled due to storm warning.', publishedAt: new Date().toISOString() }
];

const mapLocations = [
  { id: randomUUID(), label: 'Main Restroom A', type: 'bathroom', floor: '1' },
  { id: randomUUID(), label: 'Nurse Office', type: 'office', floor: '1' },
  { id: randomUUID(), label: 'Cafeteria', type: 'food', floor: '1' },
  { id: randomUUID(), label: 'Exit North', type: 'exit', floor: '1' }
];

const forumThreads = [
  { id: randomUUID(), title: 'Best study spots?', content: 'Where is it quiet after school?', upvotes: 22 },
  { id: randomUUID(), title: 'Lunch line hacks', content: 'Go 5 minutes late to avoid long lines.', upvotes: 17 }
];

export const db = { restrooms, clubs, news, mapLocations, forumThreads };
