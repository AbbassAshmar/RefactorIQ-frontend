import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "@/router/ProtectedRoute";

import AuthLayout from "@/layouts/AuthLayout";
import AdminLayout from "@/layouts/AdminLayout";

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

        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
