import apiClient from '@/api/client';
import { SCAN_QUERY_KEY } from '@/utils/queryParams';


function getOverviewResource(path, scanId) {
    return apiClient.get(path, {
        params: { [SCAN_QUERY_KEY]: scanId },
    }).then((response) => response.data);
}

const overviewApi = {
    riskTrend: (scanId) => getOverviewResource('/overview/risk-trend', scanId),
    scanSummary: (scanId) => getOverviewResource('/overview/scan-summary', scanId),
    topFiles: (scanId) => getOverviewResource('/overview/top-files', scanId),
    riskByDirectory: (scanId) => getOverviewResource('/overview/risk-by-directory', scanId),
};

export default overviewApi;
