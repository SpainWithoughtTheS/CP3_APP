import { useState } from 'react';
import { api } from '../lib/api';

export function RestroomsPage() {
  const [message, setMessage] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('');
    const form = new FormData(event.currentTarget);

    try {
      await api.submitRestroomRating({
        building: String(form.get('building')),
        floor: String(form.get('floor')),
        cleanliness: Number(form.get('cleanliness')),
        smell: Number(form.get('smell')),
        supplies: Number(form.get('supplies')),
        maintenance: Number(form.get('maintenance')),
        status: String(form.get('status')) as 'Clean' | 'Okay' | 'Dirty' | 'Avoid',
        comment: String(form.get('comment')),
        photoUrl: String(form.get('photoUrl') || '')
      });

      setMessage('Thanks! Your restroom report has been submitted.');
      event.currentTarget.reset();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to submit report.');
    }
  }

  return (
    <section className="card">
      <h2>Restroom Status & Reporting</h2>
      <p>Rate cleanliness, smell, supplies, and maintenance with optional photo URL evidence.</p>
      <form className="form-grid" onSubmit={handleSubmit}>
        <input name="building" placeholder="Building" required />
        <input name="floor" placeholder="Floor" required />
        <input name="cleanliness" type="number" min="1" max="5" placeholder="Cleanliness 1-5" required />
        <input name="smell" type="number" min="1" max="5" placeholder="Smell 1-5" required />
        <input name="supplies" type="number" min="1" max="5" placeholder="Supplies 1-5" required />
        <input name="maintenance" type="number" min="1" max="5" placeholder="Maintenance 1-5" required />
        <select name="status">
          <option>Clean</option>
          <option>Okay</option>
          <option>Dirty</option>
          <option>Avoid</option>
        </select>
        <input name="photoUrl" placeholder="Optional photo URL" />
        <textarea name="comment" placeholder="Comment" rows={3} required />
        <button type="submit">Submit report</button>
      </form>
      {message && <p className="success">{message}</p>}
    </section>
  );
}
