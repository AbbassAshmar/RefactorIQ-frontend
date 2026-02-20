import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <h1 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
        Login
      </h1>

      <form onSubmit={(e) => e.preventDefault()}>
        <div style={{ marginBottom: '1rem' }}>
          <label
            htmlFor="email"
            style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid var(--border-default)',
              borderRadius: '6px',
              backgroundColor: 'var(--surface-default)',
              color: 'var(--text-primary)',
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label
            htmlFor="password"
            style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid var(--border-default)',
              borderRadius: '6px',
              backgroundColor: 'var(--surface-default)',
              color: 'var(--text-primary)',
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '0.625rem',
            backgroundColor: 'var(--brand-primary)',
            color: 'var(--text-inverse)',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          Sign In
        </button>
      </form>

      <p style={{ marginTop: '1rem', color: 'var(--text-tertiary)', textAlign: 'center' }}>
        Don&apos;t have an account?{' '}
        <Link to="/register" style={{ color: 'var(--text-link)' }}>Register</Link>
      </p>
    </div>
  );
}
