import { useQuery } from '@tanstack/react-query';
import { adminAnalyticsApi } from '@/api';
import {
    ADMIN_OVERVIEW_QUERY_KEYS,
    ADMIN_OVERVIEW_TOP_PROJECT_LIMIT,
} from '@/utils/constants';


export function useAdminKpis(options = {}) {
    return useQuery({
        queryKey: [ADMIN_OVERVIEW_QUERY_KEYS.ROOT, ADMIN_OVERVIEW_QUERY_KEYS.KPIS],
        queryFn: adminAnalyticsApi.kpis,
        ...options,
    });
}

export function useAdminScansOverTime(projectId = null, options = {}) {
    return useQuery({
        queryKey: [
            ADMIN_OVERVIEW_QUERY_KEYS.ROOT,
            ADMIN_OVERVIEW_QUERY_KEYS.SCANS_OVER_TIME,
            projectId,
        ],
        queryFn: () => adminAnalyticsApi.scansOverTime(projectId),
        ...options,
    });
}

export function useAdminScanStatusDistribution(options = {}) {
    return useQuery({
        queryKey: [
            ADMIN_OVERVIEW_QUERY_KEYS.ROOT,
            ADMIN_OVERVIEW_QUERY_KEYS.SCAN_STATUS_DISTRIBUTION,
        ],
        queryFn: adminAnalyticsApi.scanStatusDistribution,
        ...options,
    });
}

export function useAdminFailedScans(
    limit = ADMIN_OVERVIEW_TOP_PROJECT_LIMIT,
    options = {},
) {
    return useQuery({
        queryKey: [
            ADMIN_OVERVIEW_QUERY_KEYS.ROOT,
            ADMIN_OVERVIEW_QUERY_KEYS.FAILED_SCANS,
            limit,
        ],
        queryFn: () => adminAnalyticsApi.failedScans(limit),
        ...options,
    });
}
