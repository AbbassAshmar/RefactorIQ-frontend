import apiClient from '@/api/client';
import {
    ADMIN_PROJECTS_ENDPOINT,
    ADMIN_PROJECTS_OVER_TIME_ENDPOINT,
    PROJECT_ENDPOINTS,
} from '@/utils/constants';


const projectsApi = {
	list: () =>
		apiClient.get(PROJECT_ENDPOINTS.LIST).then((r) => r.data),

	create: (payload) =>
		apiClient.post(PROJECT_ENDPOINTS.LIST, payload).then((r) => r.data),

	remove: (projectId) =>
		apiClient.delete(`${PROJECT_ENDPOINTS.DETAIL}/${projectId}`).then((r) => r.data),

	adminList: (params = {}) =>
		apiClient.get(ADMIN_PROJECTS_ENDPOINT, { params }).then((response) => response.data),

    adminOverTime: () =>
        apiClient.get(ADMIN_PROJECTS_OVER_TIME_ENDPOINT).then((response) => response.data),
};

export default projectsApi;
