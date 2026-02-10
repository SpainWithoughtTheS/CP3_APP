import { useEffect, useState } from 'react';
import { api } from '../lib/api';

interface Location {
  id: string;
  label: string;
  type: string;
  floor: string;
}

export function MapPage() {
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    api.getMapLocations().then((data) => setLocations(data as Location[]));
  }, []);

  return (
    <section className="card">
      <h2>Interactive Campus Map</h2>
      <input placeholder="Search room, office, or restroom" />
      <div className="map-grid">
        {locations.map((location) => (
          <button key={location.id} className="map-node">{location.label}<span>{location.type} · {location.floor}</span></button>
        ))}
      </div>
    </section>
  );
}
