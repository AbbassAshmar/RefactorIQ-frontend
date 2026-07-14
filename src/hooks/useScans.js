import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { scansApi } from '@/api';
import {
    ADMIN_OVERVIEW_QUERY_KEYS,
    SCANS_QUERY_KEYS,
} from '@/utils/constants';


export function useScansList(params = {}, options = {}) {
    return useQuery({
        queryKey: [SCANS_QUERY_KEYS.ROOT, SCANS_QUERY_KEYS.LIST, params],
        queryFn: () => scansApi.list(params),
        placeholderData: keepPreviousData,
        ...options,
    });
}

export function useScansOverTime(projectId = null, options = {}) {
    return useQuery({
        queryKey: [SCANS_QUERY_KEYS.ROOT, SCANS_QUERY_KEYS.OVER_TIME, projectId],
        queryFn: () => scansApi.overTime(projectId),
        ...options,
    });
}

export function useScanStatusCounts(projectId = null, options = {}) {
    return useQuery({
        queryKey: [SCANS_QUERY_KEYS.ROOT, SCANS_QUERY_KEYS.STATUS_COUNTS, projectId],
        queryFn: () => scansApi.statusCounts(projectId),
        enabled: Boolean(projectId),
        ...options,
    });
}

export function useScanRiskTrend(projectId = null, options = {}) {
    return useQuery({
        queryKey: [SCANS_QUERY_KEYS.ROOT, SCANS_QUERY_KEYS.RISK_TREND, projectId],
        queryFn: () => scansApi.riskTrend(projectId),
        enabled: Boolean(projectId),
        ...options,
    });
}

export function useScanDurationTrend(projectId = null, options = {}) {
    return useQuery({
        queryKey: [SCANS_QUERY_KEYS.ROOT, SCANS_QUERY_KEYS.DURATION_TREND, projectId],
        queryFn: () => scansApi.durationTrend(projectId),
        enabled: Boolean(projectId),
        ...options,
    });
}

export function useAdminScansList(params = {}, options = {}) {
    return useQuery({
        queryKey: [
            ADMIN_OVERVIEW_QUERY_KEYS.ROOT,
            ADMIN_OVERVIEW_QUERY_KEYS.ADMIN_SCANS,
            params,
        ],
        queryFn: () => scansApi.adminList(params),
        placeholderData: keepPreviousData,
        ...options,
    });
}

export function useCreateScan(options = {}) {
    const queryClient = useQueryClient();
    const { onSuccess, ...restOptions } = options;

    return useMutation({
        mutationFn: scansApi.create,
        onSuccess: (...args) => {
            queryClient.invalidateQueries({ queryKey: [SCANS_QUERY_KEYS.ROOT] });
            onSuccess?.(...args);
        },
        ...restOptions,
    });
}
