import { useState } from "react";
import { Outlet } from "react-router-dom";
import { AuthenticatedNavbar } from "@/components/navbar";
import { Sidebar, ADMIN_NAV_SECTIONS } from "@/components/sidebar";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function handleToggleSidebar() {
    setSidebarOpen((prev) => !prev);
  }

  function handleCloseSidebar() {
    setSidebarOpen(false);
  }

  return (
    <div className="min-h-screen bg-background-primary text-text-primary">
      <AuthenticatedNavbar onToggleSidebar={handleToggleSidebar} />

      <Sidebar
        isOpen={sidebarOpen}
        onClose={handleCloseSidebar}
        sections={ADMIN_NAV_SECTIONS}
        basePath="/admin"
        brandName="RefactorIQ"
        lastScanLabel="Last scan: Feb 10, 2026 14:23"
        roleLabel="Admin"
      />

      <main className="min-h-[calc(100vh-3rem)]">
        <Outlet />
      </main>
    </div>
  );
}
