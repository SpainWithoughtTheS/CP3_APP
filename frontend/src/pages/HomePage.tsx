import { Card } from '../components/Card';

export function HomePage() {
  return (
    <div className="page-grid">
      <Card title="CampusConnect">
        <p>A mobile-first school companion app for transparency, communication, and student success.</p>
      </Card>
      <Card title="Bell Schedule">
        <p>Current period: 3rd period · Next bell in 12m · Today: A day</p>
      </Card>
      <Card title="Emergency & Drill Instructions (Offline Ready)">
        <ol>
          <li>Fire: Evacuate using nearest safe exit and check in at assembly point.</li>
          <li>Lockdown: Lights off, door locked, remain silent until all-clear.</li>
          <li>Tornado: Move to interior rooms away from windows and crouch low.</li>
        </ol>
      </Card>
      <Card title="Student Guide Tips">
        <p>Best lunch line: Cafeteria side B at 11:05 AM. Fastest route to science wing: library corridor.</p>
      </Card>
      <Card title="Courses & Academics">
        <ul>
          <li>AP Biology — Ms. Patel — Difficulty: High</li>
          <li>Algebra II — Mr. Cruz — Difficulty: Medium</li>
          <li>Graphic Design — Ms. Kim — Difficulty: Low</li>
        </ul>
      </Card>
    </div>
  );
}
