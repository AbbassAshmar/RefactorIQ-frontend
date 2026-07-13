import apiClient from '@/api/client';
import { ADMIN_ANALYTICS_ENDPOINTS } from '@/utils/constants';
import { LIMIT_QUERY_KEY, PROJECT_QUERY_KEY } from '@/utils/queryParams';


const adminAnalyticsApi = {
    kpis: () =>
        apiClient.get(ADMIN_ANALYTICS_ENDPOINTS.KPIS).then((response) => response.data),

    scansOverTime: (projectId = null) =>
        apiClient.get(ADMIN_ANALYTICS_ENDPOINTS.SCANS_OVER_TIME, {
            params: { [PROJECT_QUERY_KEY]: projectId || undefined },
        }).then((response) => response.data),

    scanStatusDistribution: () =>
        apiClient.get(ADMIN_ANALYTICS_ENDPOINTS.SCAN_STATUS_DISTRIBUTION).then((response) => response.data),

    failedScans: (limit) =>
        apiClient.get(ADMIN_ANALYTICS_ENDPOINTS.FAILED_SCANS, {
            params: { [LIMIT_QUERY_KEY]: limit },
        }).then((response) => response.data),
};

export default adminAnalyticsApi;
