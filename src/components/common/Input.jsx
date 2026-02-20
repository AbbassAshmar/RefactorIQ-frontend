/**
 * Placeholder — shared Input component.
 * Replace with a fully styled version later.
 */
export default function Input({ label, id, ...props }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      {label && (
        <label
          htmlFor={id}
          style={{
            display: 'block',
            color: 'var(--text-secondary)',
            marginBottom: '0.25rem',
            fontSize: '0.875rem',
          }}
        >
          {label}
        </label>
      )}
      <input
        id={id}
        style={{
          width: '100%',
          padding: '0.5rem',
          border: '1px solid var(--border-default)',
          borderRadius: '6px',
          backgroundColor: 'var(--surface-default)',
          color: 'var(--text-primary)',
          fontSize: '0.875rem',
        }}
        {...props}
      />
    </div>
  );
}
