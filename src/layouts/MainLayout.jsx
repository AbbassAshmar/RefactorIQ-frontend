import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--background-primary)',
        color: 'var(--text-primary)',
      }}
    >
      <main>
        <Outlet />
      </main>
    </div>
  );
}
