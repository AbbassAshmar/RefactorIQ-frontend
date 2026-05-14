import apiClient from "@/api/client";

const authApi = {
  adminLogin: (credentials) =>
    apiClient.post("/auth/admin/login", credentials).then((r) => r.data),

  githubAuthorize: () =>
    apiClient.get("/auth/github/authorize").then((r) => r.data),

  logout: () => apiClient.post("/auth/logout").then((r) => r.data),

  me: async () => {
    try {
      const response = await apiClient.get("/auth/me");
      return response.data;
    } catch (error) {
      const status = error?.response?.status;
      if (status === 401 || status === 403) {
        return null;
      }
      throw error;
    }
  },
};

export default authApi;
