export const dashboardMetrics = {
  totalUsers: 1248,
  totalProducts: 386,
  totalOrders: 924,
  revenue: 184250,
  revenueChange: 12.4,
  activeSessions: 328,
};

export const dashboardTrend = [
  { label: "Mon", revenue: 12000, orders: 42, users: 18 },
  { label: "Tue", revenue: 14100, orders: 55, users: 24 },
  { label: "Wed", revenue: 16500, orders: 60, users: 29 },
  { label: "Thu", revenue: 15300, orders: 52, users: 21 },
  { label: "Fri", revenue: 20100, orders: 68, users: 33 },
  { label: "Sat", revenue: 22450, orders: 74, users: 38 },
  { label: "Sun", revenue: 19750, orders: 71, users: 35 },
];

export const activityFeed = [
  {
    id: "act-1",
    title: "New enterprise user onboarded",
    detail: "Nova Retail completed account verification.",
    timestamp: "5 minutes ago",
    tone: "success",
  },
  {
    id: "act-2",
    title: "Product catalog updated",
    detail: "12 items were imported from the supplier feed.",
    timestamp: "32 minutes ago",
    tone: "info",
  },
  {
    id: "act-3",
    title: "Order status changed",
    detail: "Order #ORD-2048 moved to shipped.",
    timestamp: "1 hour ago",
    tone: "warning",
  },
];

export const users = [
  {
    id: "usr-1001",
    name: "Ava Johnson",
    email: "ava.johnson@nova.com",
    role: "Admin",
    status: "Active",
    country: "United States",
    createdAt: "2026-05-02",
  },
  {
    id: "usr-1002",
    name: "Liam Carter",
    email: "liam.carter@atlas.io",
    role: "Manager",
    status: "Active",
    country: "Canada",
    createdAt: "2026-04-19",
  },
  {
    id: "usr-1003",
    name: "Sofia Patel",
    email: "sofia.patel@marketly.co",
    role: "Support",
    status: "Pending",
    country: "United Kingdom",
    createdAt: "2026-06-14",
  },
  {
    id: "usr-1004",
    name: "Noah Kim",
    email: "noah.kim@peakcommerce.com",
    role: "Viewer",
    status: "Suspended",
    country: "South Korea",
    createdAt: "2026-03-22",
  },
];

export const products = [
  {
    id: "prd-2001",
    name: "Orion Smart Watch",
    category: "Wearables",
    price: 249,
    stock: 86,
    status: "Published",
    rating: 4.8,
  },
  {
    id: "prd-2002",
    name: "North Wind Jacket",
    category: "Apparel",
    price: 129,
    stock: 38,
    status: "Draft",
    rating: 4.5,
  },
  {
    id: "prd-2003",
    name: "Aero Speaker",
    category: "Audio",
    price: 179,
    stock: 22,
    status: "Published",
    rating: 4.7,
  },
  {
    id: "prd-2004",
    name: "Slate Desk Lamp",
    category: "Home",
    price: 64,
    stock: 140,
    status: "Archived",
    rating: 4.2,
  },
];

export const orders = [
  {
    id: "ord-9001",
    customer: "Ava Johnson",
    amount: 420,
    status: "Processing",
    items: 3,
    createdAt: "2026-07-09",
  },
  {
    id: "ord-9002",
    customer: "Sofia Patel",
    amount: 179,
    status: "Shipped",
    items: 1,
    createdAt: "2026-07-08",
  },
  {
    id: "ord-9003",
    customer: "Liam Carter",
    amount: 690,
    status: "Delivered",
    items: 5,
    createdAt: "2026-07-07",
  },
  {
    id: "ord-9004",
    customer: "Noah Kim",
    amount: 98,
    status: "Cancelled",
    items: 2,
    createdAt: "2026-07-06",
  },
];

export const categories = [
  { id: "cat-1", name: "Wearables", productCount: 24, status: "Active" },
  { id: "cat-2", name: "Apparel", productCount: 81, status: "Active" },
  { id: "cat-3", name: "Audio", productCount: 19, status: "Active" },
  { id: "cat-4", name: "Home", productCount: 47, status: "Hidden" },
];

export const currentAdmin = {
  id: "usr-admin",
  name: "Maya Anderson",
  email: "maya.anderson@refactoriq.com",
  role: "Administrator",
  phone: "+1 (415) 555-0198",
  location: "San Francisco, CA",
};
