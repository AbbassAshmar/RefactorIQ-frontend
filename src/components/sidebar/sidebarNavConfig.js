import {
  Home,
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Tags,
  Settings,
} from "lucide-react";

/**
 * Sidebar navigation configuration.
 *
 * Each section has:
 *   - key:      unique identifier
 *   - title:    display label
 *   - icon:     lucide-react icon component
 *   - pages:    array of { key, label, path, icon }
 *
 * Paths are relative to the role prefix (/dashboard or /admin/dashboard).
 * The layout will prepend the correct base path.
 */

export const CLIENT_NAV_SECTIONS = [
  {
    key: "home",
    title: "Home",
    icon: Home,
    pages: [{ key: "overview", label: "Overview", path: "/overview" }],
  },
  {
    key: "code",
    title: "Code",
    icon: Code,
    pages: [
      {
        key: "repo-explorer",
        label: "Repository Explorer",
        path: "/code/repo-explorer",
      },
    ],
  },
  {
    key: "architecture",
    title: "Architecture",
    icon: Network,
    pages: [
      {
        key: "dependencies",
        label: "Dependencies",
        path: "/architecture/dependencies",
      },
    ],
  },
  {
    key: "scans",
    title: "Scans",
    icon: ScanSearch,
    pages: [
      { key: "scans-list", label: "Scans List", path: "/scans/list" },
      {
        key: "scans-dashboard",
        label: "Scans Dashboard",
        path: "/scans/dashboard",
      },
    ],
  },
  {
    key: "refactoring",
    title: "Refactoring",
    icon: Repeat2,
    pages: [
      {
        key: "refactor-queue",
        label: "Refactor Queue",
        path: "/refactoring/queue",
      },
      {
        key: "refactor-suggestions",
        label: "Refactor Suggestions",
        path: "/refactoring/suggestions",
      },
    ],
  },
  {
    key: "history",
    title: "History",
    icon: History,
    pages: [
      {
        key: "commit-history",
        label: "Commit History",
        path: "/history/commits",
      },
      {
        key: "file-evolution",
        label: "File Evolution",
        path: "/history/file-evolution",
      },
    ],
  },
  {
    key: "dashboard",
    title: "Dashboard",
    icon: LayoutDashboard,
    pages: [
      { key: "analytics", label: "Analytics", path: "/dashboard/analytics" },
    ],
  },
  {
    key: "projects-secondary",
    title: "Projects",
    icon: FolderKanban,
    pages: [{ key: "projects", label: "Projects", path: "/projects" }],
  },
];

export const ADMIN_NAV_SECTIONS = [
  {
    key: "home",
    title: "Dashboard",
    icon: Home,
    pages: [
      { key: "overview", label: "Overview", path: "/overview" },
      { key: "analytics", label: "Analytics", path: "/overview" },
    ],
  },
  {
    key: "users",
    title: "Users",
    icon: Users,
    pages: [{ key: "users-list", label: "User Management", path: "/users" }],
  },
  {
    key: "products",
    title: "Products",
    icon: Package,
    pages: [{ key: "products-list", label: "Catalog", path: "/products" }],
  },
  {
    key: "orders",
    title: "Orders",
    icon: ShoppingCart,
    pages: [{ key: "orders-list", label: "All Orders", path: "/orders" }],
  },
  {
    key: "categories",
    title: "Categories",
    icon: Tags,
    pages: [
      {
        key: "categories-list",
        label: "Category Settings",
        path: "/categories",
      },
    ],
  },
  {
    key: "settings",
    title: "Settings",
    icon: Settings,
    pages: [
      { key: "settings-page", label: "Admin Profile", path: "/settings" },
    ],
  },
];
