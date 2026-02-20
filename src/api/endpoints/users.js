import apiClient from '@/api/client';


const usersApi = {
	getAll: (params) =>
		apiClient.get('/users', { params }).then((r) => r.data),

	getById: (id) =>
		apiClient.get(`/users/${id}`).then((r) => r.data),

	update: (id, data) =>
		apiClient.patch(`/users/${id}`, data).then((r) => r.data),

	remove: (id) =>
		apiClient.delete(`/users/${id}`).then((r) => r.data),
};

export default usersApi;
