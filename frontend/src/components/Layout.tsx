import { Link, NavLink } from 'react-router-dom';
import { Moon, School, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const navItems = [
  ['/', 'Home'],
  ['/restrooms', 'Restrooms'],
  ['/clubs', 'Clubs'],
  ['/news', 'News'],
  ['/map', 'Map'],
  ['/forum', 'Forum'],
  ['/admin', 'Admin']
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="app-shell">
      <header className="topbar">
        <Link to="/" className="logo">
          <School size={20} /> CampusConnect
        </Link>
        <button onClick={toggleTheme} className="icon-button" type="button" aria-label="toggle theme">
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>
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
