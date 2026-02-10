import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import type { NewsPost } from '../types';

export function NewsPage() {
  const [posts, setPosts] = useState<NewsPost[]>([]);

  useEffect(() => {
    api.getDashboard().then((response) => setPosts(response.news));
  }, []);

  return (
    <div className="page-grid">
      {posts.map((post) => (
        <article key={post.id} className="card">
          <small>{post.category.toUpperCase()}</small>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p>{new Date(post.publishedAt).toLocaleString()}</p>
        </article>
      ))}
    </div>
  );
}
