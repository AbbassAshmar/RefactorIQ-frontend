import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '@/router/ProtectedRoute';

/* ── Layouts ── */
import AuthLayout from '@/layouts/AuthLayout';
import ClientLayout from '@/layouts/ClientLayout';
import AdminLayout from '@/layouts/AdminLayout';

/* ── Auth pages ── */
import Login from '@/pages/Login/Login';

/* ── Client pages ── */
import ClientOverview from '@/pages/client/Overview';
import RepoExplorer from '@/pages/client/RepoExplorer';
import Dependencies from '@/pages/client/Dependencies';
import ClientScansList from '@/pages/client/ScansList';
import ScansDashboard from '@/pages/client/ScansDashboard';
import RefactorQueue from '@/pages/client/RefactorQueue';
import RefactorSuggestions from '@/pages/client/RefactorSuggestions';
import CommitHistory from '@/pages/client/CommitHistory';
import FileEvolution from '@/pages/client/FileEvolution';
import Analytics from '@/pages/client/Analytics';
import Projects from '@/pages/client/Projects';

/* ── Admin pages ── */
import AdminOverview from '@/pages/admin/Overview';
import UsersOverview from '@/pages/admin/UsersOverview';
import UsersList from '@/pages/admin/UsersList';
import AdminScansOverview from '@/pages/admin/ScansOverview';
import AdminScansList from '@/pages/admin/ScansList';
import ReposOverview from '@/pages/admin/ReposOverview';
import ReposList from '@/pages/admin/ReposList';

export default function AppRouter() {
	return (
		<BrowserRouter>
			<Routes>
				{/* ────────────────────────────────────────── */}
				{/*  Unauthenticated routes (AuthLayout)      */}
				{/* ────────────────────────────────────────── */}
				<Route element={<AuthLayout />}>
					<Route path="/login" element={<Login />} />
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
					{/* Home */}
					<Route path="/dashboard/overview" element={<ClientOverview />} />

					{/* Code */}
					<Route path="/dashboard/code/repo-explorer" element={<RepoExplorer />} />

					{/* Architecture */}
					<Route path="/dashboard/architecture/dependencies" element={<Dependencies />} />

					{/* Scans */}
					<Route path="/dashboard/scans/list" element={<ClientScansList />} />
					<Route path="/dashboard/scans/dashboard" element={<ScansDashboard />} />

					{/* Refactoring */}
					<Route path="/dashboard/refactoring/queue" element={<RefactorQueue />} />
					<Route path="/dashboard/refactoring/suggestions" element={<RefactorSuggestions />} />

					{/* History */}
					<Route path="/dashboard/history/commits" element={<CommitHistory />} />
					<Route path="/dashboard/history/file-evolution" element={<FileEvolution />} />

					{/* Dashboard */}
					<Route path="/dashboard/dashboard/analytics" element={<Analytics />} />

					{/* Projects */}
					<Route path="/dashboard/projects" element={<Projects />} />

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
					<Route path="/admin/users/overview" element={<UsersOverview />} />
					<Route path="/admin/users/list" element={<UsersList />} />

					{/* Scans */}
					<Route path="/admin/scans/overview" element={<AdminScansOverview />} />
					<Route path="/admin/scans/list" element={<AdminScansList />} />

					{/* Repos */}
					<Route path="/admin/repos/overview" element={<ReposOverview />} />
					<Route path="/admin/repos/list" element={<ReposList />} />

					{/* Default admin redirect */}
					<Route path="/admin" element={<Navigate to="/admin/overview" replace />} />
				</Route>

				{/* ────────────────────────────────────────── */}
				{/*  Fallbacks                                 */}
				{/* ────────────────────────────────────────── */}
				<Route path="/home" element={<Navigate to="/dashboard/overview" replace />} />
				<Route path="/" element={<Navigate to="/dashboard/overview" replace />} />
				<Route path="*" element={<Navigate to="/dashboard/overview" replace />} />
			</Routes>
		</BrowserRouter>
	);
}
