import { Link, NavLink } from 'react-router-dom';
import { LogOut, Moon, School, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../hooks/useAuth';

const navItems = [
  ['/dashboard', 'Home'],
  ['/restrooms', 'Restrooms'],
  ['/clubs', 'Clubs'],
  ['/news', 'News'],
  ['/map', 'Map'],
  ['/forum', 'Forum'],
  ['/admin', 'Admin']
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useTheme();
  const { signOut, user } = useAuth();

  return (
    <div className="app-shell">
      <header className="topbar">
        <Link to="/dashboard" className="logo">
          <School size={20} /> CampusConnect
        </Link>

        <div className="topbar-actions">
          <span className="user-pill">{user?.email}</span>
          <button onClick={toggleTheme} className="icon-button" type="button" aria-label="toggle theme">
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button onClick={() => signOut()} className="icon-button" type="button" aria-label="logout">
            <LogOut size={18} />
          </button>
        </div>
      </header>
      <nav className="mobile-nav">
        {navItems.map(([href, label]) => (
          <NavLink key={href} to={href} className={({ isActive }) => (isActive ? 'active-link' : '')}>
            {label}
          </NavLink>
        ))}
      </nav>
      <main>{children}</main>
    </div>
  );
}
