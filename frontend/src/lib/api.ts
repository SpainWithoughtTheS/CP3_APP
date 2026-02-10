import type { Club, NewsPost, RestroomRating } from '../types';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000/api';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {})
    }
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const api = {
  getDashboard: () => request<{ restrooms: RestroomRating[]; clubs: Club[]; news: NewsPost[] }>('/dashboard'),
  submitRestroomRating: (payload: Omit<RestroomRating, 'id' | 'createdAt'>) =>
    request<RestroomRating>('/restrooms/ratings', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),
  getSafetyGuides: () => request('/safety-guides'),
  getMapLocations: () => request('/map/locations'),
  getForumThreads: () => request('/forum/threads')
};
