import type { Request, Response, NextFunction } from 'express';

export function mockStudentAuth(request: Request, response: Response, next: NextFunction) {
  const email = request.header('x-student-email');
  if (!email) {
    response.status(401).json({ message: 'Missing x-student-email header' });
    return;
  }
  if (!email.endsWith('.edu')) {
    response.status(403).json({ message: 'School email required' });
    return;
  }
  next();
}
