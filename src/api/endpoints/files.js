import apiClient from '@/api/client';
import { INCLUDE_SUMMARY_QUERY_KEY, SCAN_QUERY_KEY } from '@/utils/queryParams';


const filesApi = {
    list: (scanId) => apiClient.get('/files', {
        params: { [SCAN_QUERY_KEY]: scanId },
    }).then((response) => response.data),

    details: ({ fileId, includeSummary = false }) => apiClient.get(`/files/${fileId}`, {
        params: { [INCLUDE_SUMMARY_QUERY_KEY]: includeSummary },
    }).then((response) => response.data),
};

export default filesApi;
