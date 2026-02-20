import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '@/pages/Home/Home';
import Login from '@/pages/Login/Login';
import Register from '@/pages/Register/Register';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Redirect root to /home */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Catch-all — redirect unknown routes to /home */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
