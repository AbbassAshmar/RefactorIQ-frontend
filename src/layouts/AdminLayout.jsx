import { Outlet } from "react-router-dom";
import { Sidebar, ADMIN_NAV_SECTIONS } from "@/components/sidebar";
import { useAuth } from "@/context/AuthProvider";
import { Menu, Settings, LogOut } from "lucide-react";
import { useLogout } from "@/hooks";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const logout = useLogout();

  function handleToggleSidebar() {
    setSidebarOpen((prev) => !prev);
  }

  function handleCloseSidebar() {
    setSidebarOpen(false);
  }

  return (
    <div className="min-h-screen bg-background-primary text-text-primary">
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border-default bg-background-secondary px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={handleToggleSidebar}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border-default bg-background-primary text-text-secondary hover:bg-background-hover hover:text-text-primary"
            aria-label="Toggle sidebar"
          >
            <Menu size={18} />
          </button>
          <div>
            <p className="text-small-1 uppercase tracking-[0.2em] text-text-tertiary">
              Admin dashboard
            </p>
            <h1 className="text-h5 font-semibold text-text-primary">
              Welcome back, {user?.username || user?.email || "Administrator"}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/admin/settings")}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border-default bg-background-primary text-text-secondary hover:bg-background-hover hover:text-text-primary"
            aria-label="Open settings"
          >
            <Settings size={18} />
          </button>
          <button
            onClick={() =>
              logout.mutate(undefined, {
                onSettled: () => navigate("/login", { replace: true }),
              })
            }
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-border-default bg-background-primary px-4 text-small-1 font-semibold text-text-secondary hover:bg-background-hover hover:text-text-primary"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </header>

      <Sidebar
        isOpen={sidebarOpen}
        onClose={handleCloseSidebar}
        sections={ADMIN_NAV_SECTIONS}
        basePath="/admin"
        brandName="RefactorIQ"
        lastScanLabel="Live commerce operations"
        roleLabel="Admin"
      />

      <main className="min-h-[calc(100vh-3rem)]">
        <Outlet />
      </main>
    </div>
  );
}
