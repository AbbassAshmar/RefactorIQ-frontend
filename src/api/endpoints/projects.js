import apiClient from '@/api/client';
import {
    ADMIN_PROJECTS_ENDPOINT,
    ADMIN_PROJECTS_OVER_TIME_ENDPOINT,
} from '@/utils/constants';


const projectsApi = {
	list: () =>
		apiClient.get('/projects/').then((r) => r.data),

	create: (payload) =>
		apiClient.post('/projects/', payload).then((r) => r.data),

	adminList: (params = {}) =>
		apiClient.get(ADMIN_PROJECTS_ENDPOINT, { params }).then((response) => response.data),

    adminOverTime: () =>
        apiClient.get(ADMIN_PROJECTS_OVER_TIME_ENDPOINT).then((response) => response.data),
};

export default projectsApi;
