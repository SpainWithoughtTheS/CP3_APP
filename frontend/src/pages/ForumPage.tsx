import { useEffect, useState } from 'react';
import { api } from '../lib/api';

interface Thread {
  id: string;
  title: string;
  content: string;
  upvotes: number;
}

export function ForumPage() {
  const [threads, setThreads] = useState<Thread[]>([]);

  useEffect(() => {
    api.getForumThreads().then((data) => setThreads(data as Thread[]));
  }, []);

  return (
    <div className="page-grid">
      {threads.map((thread) => (
        <article className="card" key={thread.id}>
          <h3>{thread.title}</h3>
          <p>{thread.content}</p>
          <p>{thread.upvotes} upvotes · Moderated with profanity filter + reports</p>
        </article>
      ))}
    </div>
  );
}
