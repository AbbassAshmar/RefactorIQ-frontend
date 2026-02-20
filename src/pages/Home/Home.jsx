import { useTheme } from '@/context/ThemeProvider';
import { Link } from 'react-router-dom';

export default function Home() {
  const { mode, toggleTheme } = useTheme();

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>
        Home
      </h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        Welcome to RefactorIQ. This is a placeholder home page.
      </p>

      <button
        onClick={toggleTheme}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: 'var(--brand-primary)',
          color: 'var(--text-inverse)',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          marginRight: '0.75rem',
        }}
      >
        Toggle Theme ({mode})
      </button>

      <nav style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        <Link to="/login" style={{ color: 'var(--text-link)' }}>Login</Link>
        <Link to="/register" style={{ color: 'var(--text-link)' }}>Register</Link>
      </nav>
    </div>
  );
}
