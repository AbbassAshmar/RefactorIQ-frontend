import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "@/router/ProtectedRoute";

import AuthLayout from "@/layouts/AuthLayout";
import AdminLayout from "@/layouts/AdminLayout";

<<<<<<< HEAD
import Login from "@/pages/Login/Login";
import DashboardHome from "@/pages/admin/Overview";
import UsersList from "@/pages/admin/UsersList";
import ProductsList from "@/pages/admin/ProductsList";
import OrdersList from "@/pages/admin/OrdersList";
import CategoriesList from "@/pages/admin/CategoriesList";
import SettingsPage from "@/pages/admin/Settings";
import UserDetailsPage from "@/pages/admin/UserDetails";
import ProductDetailsPage from "@/pages/admin/ProductDetails";
import OrderDetailsPage from "@/pages/admin/OrderDetails";
=======
/* ── Auth pages ── */
import Login from '@/pages/Login/Login';

/* ── Client pages ── */
import Projects from '@/pages/client/projects/Projects';
import ClientOverview from '@/pages/client/Overview';
import RepoExplorer from '@/pages/client/repoExplorer/RepoExplorer';
import Dependencies from '@/pages/client/Dependencies';
import ClientScans from '@/pages/client/scans/Scans';
import RefactorQueue from '@/pages/client/RefactorQueue';
import RefactorSuggestions from '@/pages/client/RefactorSuggestions';

/* ── Admin pages ── */
import AdminOverview from '@/pages/admin/Overview';
import UsersOverview from '@/pages/admin/UsersOverview';
import UsersList from '@/pages/admin/UsersList';
import AdminScansOverview from '@/pages/admin/ScansOverview';
import AdminScansList from '@/pages/admin/ScansList';
import ReposOverview from '@/pages/admin/ReposOverview';
import ReposList from '@/pages/admin/ReposList';
>>>>>>> 56b665b1edd597772241faf38565098c2bb85e59

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route
          element={
            <ProtectedRoute allowedRoles={["client"]}>
              <Navigate to="/login" replace />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin" replace />} />
        </Route>

        <Route
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="overview" element={<DashboardHome />} />
          <Route path="users" element={<UsersList />} />
          <Route path="users/:userId" element={<UserDetailsPage />} />
          <Route path="products" element={<ProductsList />} />
          <Route path="products/:productId" element={<ProductDetailsPage />} />
          <Route path="orders" element={<OrdersList />} />
          <Route path="orders/:orderId" element={<OrderDetailsPage />} />
          <Route path="categories" element={<CategoriesList />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>

<<<<<<< HEAD
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </BrowserRouter>
  );
=======
					{/* Code */}
					<Route path="/dashboard/code/repo-explorer" element={<RepoExplorer />} />

					{/* Architecture */}
					<Route path="/dashboard/architecture/dependencies" element={<Dependencies />} />

					{/* Scans */}
					<Route path="/dashboard/scans" element={<ClientScans />} />

					{/* Refactoring */}
					<Route path="/dashboard/refactoring/queue" element={<RefactorQueue />} />
					<Route path="/dashboard/refactoring/suggestions" element={<RefactorSuggestions />} />

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
>>>>>>> 56b665b1edd597772241faf38565098c2bb85e59
}
