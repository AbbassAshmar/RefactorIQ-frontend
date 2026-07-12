import apiClient from "@/api/client";

function unwrap(response) {
  return response?.data?.data ?? response?.data ?? response;
}

async function requestWithFallback(request, fallback) {
  try {
    const response = await request();
    return unwrap(response);
  } catch (error) {
    if (import.meta.env.PROD) {
      throw error;
    }
    return typeof fallback === "function" ? fallback() : fallback;
  }
}

export const authService = {
  login: (payload) => apiClient.post("/auth/admin/login", payload).then(unwrap),
  me: () => apiClient.get("/auth/me").then(unwrap),
  logout: () => apiClient.post("/auth/logout").then(unwrap),
};

export const dashboardService = {
  summary: () =>
    requestWithFallback(
      () =>
        apiClient.get("/overview/scan-summary", {
          params: { scan_id: "current" },
        }),
      () => ({
        totals: {
          users: 1248,
          products: 386,
          orders: 924,
          revenue: 184250,
        },
      }),
    ),
};

export const usersService = {
  list: (params) => apiClient.get("/users", { params }).then(unwrap),
  getById: (id) => apiClient.get(`/users/${id}`).then(unwrap),
  update: (id, payload) =>
    apiClient.patch(`/users/${id}`, payload).then(unwrap),
  remove: (id) => apiClient.delete(`/users/${id}`).then(unwrap),
};

export const productsService = {
  list: () =>
    requestWithFallback(() => apiClient.get("/products").then(unwrap), []),
  getById: (id) =>
    requestWithFallback(
      () => apiClient.get(`/products/${id}`).then(unwrap),
      null,
    ),
  create: (payload) =>
    requestWithFallback(
      () => apiClient.post("/products", payload).then(unwrap),
      payload,
    ),
  update: (id, payload) =>
    requestWithFallback(
      () => apiClient.patch(`/products/${id}`, payload).then(unwrap),
      { id, ...payload },
    ),
  remove: (id) =>
    requestWithFallback(
      () => apiClient.delete(`/products/${id}`).then(unwrap),
      { id },
    ),
};

export const ordersService = {
  list: () =>
    requestWithFallback(() => apiClient.get("/orders").then(unwrap), []),
  getById: (id) =>
    requestWithFallback(
      () => apiClient.get(`/orders/${id}`).then(unwrap),
      null,
    ),
  updateStatus: (id, status) =>
    requestWithFallback(
      () => apiClient.patch(`/orders/${id}`, { status }).then(unwrap),
      { id, status },
    ),
};

export const categoriesService = {
  list: () =>
    requestWithFallback(() => apiClient.get("/categories").then(unwrap), []),
  create: (payload) =>
    requestWithFallback(
      () => apiClient.post("/categories", payload).then(unwrap),
      payload,
    ),
  update: (id, payload) =>
    requestWithFallback(
      () => apiClient.patch(`/categories/${id}`, payload).then(unwrap),
      { id, ...payload },
    ),
  remove: (id) =>
    requestWithFallback(
      () => apiClient.delete(`/categories/${id}`).then(unwrap),
      { id },
    ),
};

export default {
  auth: authService,
  dashboard: dashboardService,
  users: usersService,
  products: productsService,
  orders: ordersService,
  categories: categoriesService,
};
