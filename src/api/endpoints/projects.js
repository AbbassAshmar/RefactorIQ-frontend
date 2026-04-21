import apiClient from '@/api/client';


const projectsApi = {
	list: () =>
		apiClient.get('/projects/').then((r) => r.data),

	create: (payload) =>
		apiClient.post('/projects/', payload).then((r) => r.data),
};

export default projectsApi;
