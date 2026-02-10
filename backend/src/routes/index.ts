import { Router } from 'express';
import { z } from 'zod';
import { randomUUID } from 'node:crypto';
import { db } from '../services/data.js';
import { mockStudentAuth } from '../middleware/auth.js';

const ratingSchema = z.object({
  building: z.string().min(1),
  floor: z.string().min(1),
  cleanliness: z.number().min(1).max(5),
  smell: z.number().min(1).max(5),
  supplies: z.number().min(1).max(5),
  maintenance: z.number().min(1).max(5),
  status: z.enum(['Clean', 'Okay', 'Dirty', 'Avoid']),
  comment: z.string().min(1),
  photoUrl: z.string().optional()
});

export const apiRouter = Router();

apiRouter.get('/health', (_request, response) => {
  response.json({ status: 'ok', service: 'campusconnect-api' });
});

apiRouter.get('/dashboard', (_request, response) => {
  response.json({
    restrooms: db.restrooms,
    clubs: db.clubs,
    news: db.news
  });
});

apiRouter.post('/restrooms/ratings', mockStudentAuth, (request, response) => {
  const parsed = ratingSchema.safeParse(request.body);
  if (!parsed.success) {
    response.status(400).json({ errors: parsed.error.flatten() });
    return;
  }

  const entry = { id: randomUUID(), ...parsed.data, createdAt: new Date().toISOString() };
  db.restrooms.unshift(entry);
  response.status(201).json(entry);
});

apiRouter.get('/safety-guides', (_request, response) => {
  response.json([
    { type: 'fire', steps: ['Activate alarm', 'Use nearest safe exit', 'Meet at assembly point'] },
    { type: 'lockdown', steps: ['Lock door', 'Lights off', 'Silence phones', 'Wait for all-clear'] },
    { type: 'tornado', steps: ['Move to interior hall', 'Cover head and neck', 'Wait for instructions'] }
  ]);
});

apiRouter.get('/map/locations', (_request, response) => {
  response.json(db.mapLocations);
});

apiRouter.get('/forum/threads', (_request, response) => {
  response.json(db.forumThreads);
});

apiRouter.get('/admin/analytics', (_request, response) => {
  response.json({
    restroomReports: db.restrooms.length,
    averageCleanliness: Number((db.restrooms.reduce((sum, entry) => sum + entry.cleanliness, 0) / db.restrooms.length).toFixed(2)),
    clubFollowers: db.clubs.filter((club) => club.followed).length,
    forumThreads: db.forumThreads.length
  });
});
