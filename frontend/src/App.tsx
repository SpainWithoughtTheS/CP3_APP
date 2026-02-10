import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AuthGate } from './components/auth/AuthGate';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { RestroomsPage } from './pages/RestroomsPage';
import { ClubsPage } from './pages/ClubsPage';
import { NewsPage } from './pages/NewsPage';
import { MapPage } from './pages/MapPage';
import { ForumPage } from './pages/ForumPage';
import { AdminPage } from './pages/AdminPage';

function AppLayout({ children }: { children: React.ReactNode }) {
  return <Layout>{children}</Layout>;
}

export default function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <AuthGate>
            <LoginPage />
          </AuthGate>
        }
      />

      <Route element={<ProtectedRoute />}>
        <Route
          path="/dashboard"
          element={
            <AppLayout>
              <HomePage />
            </AppLayout>
          }
        />
        <Route
          path="/restrooms"
          element={
            <AppLayout>
              <RestroomsPage />
            </AppLayout>
          }
        />
        <Route
          path="/clubs"
          element={
            <AppLayout>
              <ClubsPage />
            </AppLayout>
          }
        />
        <Route
          path="/news"
          element={
            <AppLayout>
              <NewsPage />
            </AppLayout>
          }
        />
        <Route
          path="/map"
          element={
            <AppLayout>
              <MapPage />
            </AppLayout>
          }
        />
        <Route
          path="/forum"
          element={
            <AppLayout>
              <ForumPage />
            </AppLayout>
          }
        />
        <Route
          path="/admin"
          element={
            <AppLayout>
              <AdminPage />
            </AppLayout>
          }
        />
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
