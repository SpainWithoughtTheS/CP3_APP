import type { Club, NewsPost, RestroomRating } from '../types';
import { supabase } from './supabase';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000/api';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
    throw new Error('You must be logged in to access this data.');
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.access_token}`,
      ...(init?.headers ?? {})
    }
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(errorBody?.message ?? `API request failed: ${response.status}`);
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
