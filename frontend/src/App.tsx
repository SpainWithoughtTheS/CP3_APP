import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { RestroomsPage } from './pages/RestroomsPage';
import { ClubsPage } from './pages/ClubsPage';
import { NewsPage } from './pages/NewsPage';
import { MapPage } from './pages/MapPage';
import { ForumPage } from './pages/ForumPage';
import { AdminPage } from './pages/AdminPage';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/restrooms" element={<RestroomsPage />} />
        <Route path="/clubs" element={<ClubsPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/forum" element={<ForumPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Layout>
  );
}
