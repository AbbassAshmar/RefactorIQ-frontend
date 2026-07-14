import apiClient from '@/api/client';
import { FILE_ENDPOINTS } from '@/utils/constants';
import { INCLUDE_SUMMARY_QUERY_KEY, PROJECT_QUERY_KEY, SCAN_QUERY_KEY } from '@/utils/queryParams';


const filesApi = {
    list: (scanId) => apiClient.get(FILE_ENDPOINTS.LIST, {
        params: { [SCAN_QUERY_KEY]: scanId },
    }).then((response) => response.data),

    details: ({ fileId, includeSummary = false }) => apiClient.get(`${FILE_ENDPOINTS.LIST}/${fileId}`, {
        params: { [INCLUDE_SUMMARY_QUERY_KEY]: includeSummary },
    }).then((response) => response.data),

    dependencies: (scanId) => apiClient.get(FILE_ENDPOINTS.DEPENDENCIES, {
        params: { [SCAN_QUERY_KEY]: scanId },
    }).then((response) => response.data),

    circularDependencies: (scanId) => apiClient.get(FILE_ENDPOINTS.CIRCULAR_DEPENDENCIES, {
        params: { [SCAN_QUERY_KEY]: scanId },
    }).then((response) => response.data),

    priorityDistribution: (projectId) => apiClient.get(FILE_ENDPOINTS.ANALYTICS_PRIORITY_DISTRIBUTION, {
        params: { [PROJECT_QUERY_KEY]: projectId },
    }).then((response) => response.data),

    analyzedTrend: (projectId) => apiClient.get(FILE_ENDPOINTS.ANALYTICS_ANALYZED_TREND, {
        params: { [PROJECT_QUERY_KEY]: projectId },
    }).then((response) => response.data),
};

export default filesApi;
