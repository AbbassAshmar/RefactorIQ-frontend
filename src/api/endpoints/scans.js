import apiClient from '@/api/client';
import { SCAN_ENDPOINTS } from '@/utils/constants';
import { PROJECT_QUERY_KEY } from '@/utils/queryParams';


const scansApi = {
    list: (params = {}) =>
        apiClient.get(SCAN_ENDPOINTS.LIST, { params }).then((response) => response.data),

    overTime: (projectId = null) =>
        apiClient.get(SCAN_ENDPOINTS.OVER_TIME, {
            params: { [PROJECT_QUERY_KEY]: projectId || undefined },
        }).then((response) => response.data),

    adminList: (params = {}) =>
        apiClient.get(SCAN_ENDPOINTS.ADMIN_LIST, { params }).then((response) => response.data),

    create: (projectId) =>
        apiClient.post(`/projects/${projectId}/scans`).then((response) => response.data),
};

export default scansApi;
