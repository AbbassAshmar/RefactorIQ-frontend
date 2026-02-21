import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '@/pages/Home/Home';
import Login from '@/pages/Login/Login';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Redirect root to /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Catch-all — redirect unknown routes to /login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
