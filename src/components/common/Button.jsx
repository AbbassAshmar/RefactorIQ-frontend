/**
 * Placeholder — shared Button component.
 * Replace with a fully styled version later.
 */
export default function Button({ children, variant = 'primary', ...props }) {
  const baseStyles = {
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '0.875rem',
    transition: 'background-color 150ms ease',
  };

  const variants = {
    primary: {
      backgroundColor: 'var(--brand-primary)',
      color: 'var(--text-inverse)',
    },
    secondary: {
      backgroundColor: 'var(--surface-secondary)',
      color: 'var(--text-primary)',
      border: '1px solid var(--border-default)',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--text-primary)',
    },
  };

  return (
    <button style={{ ...baseStyles, ...variants[variant] }} {...props}>
      {children}
    </button>
  );
}
