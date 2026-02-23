import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '@/pages/Home/Home';
import Login from '@/pages/Login/Login';
import ProtectedRoute from '@/router/ProtectedRoute';

export default function AppRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route
					path="/dashboard"
					element={(
						<ProtectedRoute allowedRoles={['client']}>
							<Home />
						</ProtectedRoute>
					)}
				/>
				<Route
					path="/admin/dashboard"
					element={(
						<ProtectedRoute allowedRoles={['admin']}>
							<Home />
						</ProtectedRoute>
					)}
				/>
				<Route path="/home" element={<Navigate to="/dashboard" replace />} />

				<Route path="/" element={<Navigate to="/dashboard" replace />} />
				<Route path="*" element={<Navigate to="/dashboard" replace />} />
			</Routes>
		</BrowserRouter>
	);
}
