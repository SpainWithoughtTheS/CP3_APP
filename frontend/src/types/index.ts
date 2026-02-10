export type RestroomStatus = 'Clean' | 'Okay' | 'Dirty' | 'Avoid';

export interface RestroomRating {
  id: string;
  building: string;
  floor: string;
  cleanliness: number;
  smell: number;
  supplies: number;
  maintenance: number;
  status: RestroomStatus;
  comment: string;
  photoUrl?: string;
  createdAt: string;
}

export interface Club {
  id: string;
  name: string;
  description: string;
  meetingTime: string;
  location: string;
  contactEmail: string;
  followed: boolean;
}

export interface NewsPost {
  id: string;
  title: string;
  category: 'announcement' | 'event' | 'alert';
  content: string;
  publishedAt: string;
}
