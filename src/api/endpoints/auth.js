import apiClient from '@/api/client';


const authApi = {
  adminLogin: (credentials) =>
    apiClient.post('/auth/admin/login', credentials).then((r) => r.data),

  githubAuthorize: () =>
    apiClient.get('/auth/github/authorize').then((r) => r.data),

  logout: () =>
    apiClient.post('/auth/logout').then((r) => r.data),

  me: () =>
    apiClient.get('/auth/me').then((r) => r.data),
};

export default authApi;
