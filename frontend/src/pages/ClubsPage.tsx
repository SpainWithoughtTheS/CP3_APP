import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import type { Club } from '../types';

export function ClubsPage() {
  const [clubs, setClubs] = useState<Club[]>([]);

  useEffect(() => {
    api.getDashboard().then((response) => setClubs(response.clubs));
  }, []);

  return (
    <div className="page-grid">
      {clubs.map((club) => (
        <article key={club.id} className="card">
          <h3>{club.name}</h3>
          <p>{club.description}</p>
          <p>{club.meetingTime} · {club.location}</p>
          <p>{club.contactEmail}</p>
          <button>{club.followed ? 'Following' : 'Follow'}</button>
        </article>
      ))}
    </div>
  );
}
