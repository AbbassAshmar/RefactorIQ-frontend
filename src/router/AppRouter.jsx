import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '@/router/ProtectedRoute';
import { useAuth } from '@/context/AuthProvider';
import { roleHomePath } from '@/router/roleHomePath';

/* ── Layouts ── */
import AuthLayout from '@/layouts/AuthLayout';
import ClientLayout from '@/layouts/ClientLayout';
import AdminLayout from '@/layouts/AdminLayout';

/* ── Auth pages ── */
import Login from '@/pages/Login/Login';

/* ── Client pages ── */
import Projects from '@/pages/client/projects/Projects';
import ClientOverview from '@/pages/client/overview/Overview';
import RepoExplorer from '@/pages/client/repoExplorer/RepoExplorer';
import Dependencies from '@/pages/client/dependencies/DependenciesPage';
import ClientScans from '@/pages/client/scans/Scans';
import RefactorQueue from '@/pages/client/refactorQueue/RefactorQueue';

/* ── Admin pages ── */
import AdminOverview from '@/pages/admin/adminOverview/AdminOverview';
import AdminScans from '@/pages/admin/adminScans/AdminScans';
import AdminUsers from '@/pages/admin/adminUsers/AdminUsers';
import AdminProjects from '@/pages/admin/adminProjects/AdminProjects';

function RoleHomeRedirect() {
	const { isCheckingAuth, isAuthenticated, role } = useAuth();

	if (isCheckingAuth) {
		return null;
	}

	if (!isAuthenticated) {
		return <Navigate to="/login" replace />;
	}

	return <Navigate to={roleHomePath(role)} replace />;
}

function PublicOnlyRoute({ children }) {
	const { isCheckingAuth, isAuthenticated, role } = useAuth();

	if (isCheckingAuth) {
		return null;
	}

	if (isAuthenticated) {
		return <Navigate to={roleHomePath(role)} replace />;
	}

	return children;
}

export default function AppRouter() {
	return (
		<BrowserRouter>
			<Routes>
				{/* ────────────────────────────────────────── */}
				{/*  Unauthenticated routes (AuthLayout)      */}
				{/* ────────────────────────────────────────── */}
				<Route element={<AuthLayout />}>
					<Route path="/login" element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
				</Route>

				{/* ────────────────────────────────────────── */}
				{/*  Client routes (ClientLayout)             */}
				{/* ────────────────────────────────────────── */}
				<Route
					element={(
						<ProtectedRoute allowedRoles={['client']}>
							<ClientLayout />
						</ProtectedRoute>
					)}
				>
					<Route path="/dashboard/projects" element={<Projects />} />

					{/* Home */}
					<Route path="/dashboard/overview" element={<ClientOverview />} />

					{/* Code */}
					<Route path="/dashboard/code/repo-explorer" element={<RepoExplorer />} />

					{/* Architecture */}
					<Route path="/dashboard/architecture/dependencies" element={<Dependencies />} />

					{/* Scans */}
					<Route path="/dashboard/scans" element={<ClientScans />} />

					{/* Refactoring */}
					<Route path="/dashboard/refactoring/queue" element={<RefactorQueue />} />

					{/* Default client redirect */}
					<Route index element={<Navigate to="/dashboard/overview" replace />} />
					<Route path="/dashboard" element={<Navigate to="/dashboard/overview" replace />} />
				</Route>

				{/* ────────────────────────────────────────── */}
				{/*  Admin routes (AdminLayout)               */}
				{/* ────────────────────────────────────────── */}
				<Route
					element={(
						<ProtectedRoute allowedRoles={['admin']}>
							<AdminLayout />
						</ProtectedRoute>
					)}
				>
					{/* Home */}
					<Route path="/admin/overview" element={<AdminOverview />} />

					{/* Users */}
					<Route path="/admin/users/overview" element={<AdminUsers />} />

					{/* Projects */}
					<Route path="/admin/projects" element={<AdminProjects />} />

					{/* Scans */}
					<Route path="/admin/scans" element={<AdminScans />} />

					{/* Default admin redirect */}
					<Route path="/admin" element={<Navigate to="/admin/overview" replace />} />
				</Route>

				{/* ────────────────────────────────────────── */}
				{/*  Fallbacks                                 */}
				{/* ────────────────────────────────────────── */}
				<Route path="/home" element={<RoleHomeRedirect />} />
				<Route path="/" element={<RoleHomeRedirect />} />
				<Route path="*" element={<RoleHomeRedirect />} />
			</Routes>
		</BrowserRouter>
	);
}
