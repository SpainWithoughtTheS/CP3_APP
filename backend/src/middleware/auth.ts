import type { NextFunction, Request, Response } from 'express';
import { supabaseAuthClient } from '../services/supabase.js';

export async function requireAuth(request: Request, response: Response, next: NextFunction) {
  if (!supabaseAuthClient) {
    response.status(500).json({ message: 'Authentication is not configured on the server.' });
    return;
  }

  const authorization = request.header('authorization');

  if (!authorization?.startsWith('Bearer ')) {
    response.status(401).json({ message: 'Missing Bearer token' });
    return;
  }

  const token = authorization.replace('Bearer ', '').trim();

  const { data, error } = await supabaseAuthClient.auth.getUser(token);

  if (error || !data.user) {
    response.status(401).json({ message: 'Invalid or expired token' });
    return;
  }

  request.user = {
    id: data.user.id,
    email: data.user.email,
    role: typeof data.user.user_metadata?.role === 'string' ? data.user.user_metadata.role : 'student'
  };

  next();
}
