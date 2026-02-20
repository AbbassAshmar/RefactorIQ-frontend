import apiClient from '@/api/client';


const authApi = {
    login: (credentials) =>
      apiClient.post('/auth/login', credentials).then((r) => r.data),


    register: (userData) =>
      apiClient.post('/auth/register', userData).then((r) => r.data),


    logout: () =>
      apiClient.post('/auth/logout').then((r) => r.data),


    me: () =>
      apiClient.get('/auth/me').then((r) => r.data),
};

export default authApi;
