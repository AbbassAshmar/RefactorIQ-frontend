import { useQuery } from '@tanstack/react-query';
import { filesApi } from '@/api';
import { FILES_QUERY_KEYS } from '@/utils/constants';


export function useScanFiles(scanId, options = {}) {
    return useQuery({
        queryKey: [FILES_QUERY_KEYS.ROOT, FILES_QUERY_KEYS.LIST, scanId],
        queryFn: () => filesApi.list(scanId),
        enabled: Boolean(scanId),
        ...options,
    });
}

export function useFileDetails(fileId, includeSummary = false, options = {}) {
    return useQuery({
        queryKey: [FILES_QUERY_KEYS.ROOT, FILES_QUERY_KEYS.DETAILS, fileId, { includeSummary }],
        queryFn: () => filesApi.details({ fileId, includeSummary }),
        enabled: Boolean(fileId),
        staleTime: includeSummary ? 5 * 60 * 1000 : 30 * 1000,
        ...options,
    });
}

export function useScanDependencies(scanId, options = {}) {
    return useQuery({
        queryKey: [FILES_QUERY_KEYS.ROOT, FILES_QUERY_KEYS.DEPENDENCIES, scanId],
        queryFn: () => filesApi.dependencies(scanId),
        enabled: Boolean(scanId),
        ...options,
    });
}

export function useScanCircularDependencies(scanId, options = {}) {
    return useQuery({
        queryKey: [FILES_QUERY_KEYS.ROOT, FILES_QUERY_KEYS.CIRCULAR_DEPENDENCIES, scanId],
        queryFn: () => filesApi.circularDependencies(scanId),
        enabled: Boolean(scanId),
        ...options,
    });
}

export function useScanPriorityDistribution(projectId = null, options = {}) {
    return useQuery({
        queryKey: [FILES_QUERY_KEYS.ROOT, FILES_QUERY_KEYS.PRIORITY_DISTRIBUTION, projectId],
        queryFn: () => filesApi.priorityDistribution(projectId),
        enabled: Boolean(projectId),
        ...options,
    });
}

export function useFilesAnalyzedTrend(projectId = null, options = {}) {
    return useQuery({
        queryKey: [FILES_QUERY_KEYS.ROOT, FILES_QUERY_KEYS.ANALYZED_TREND, projectId],
        queryFn: () => filesApi.analyzedTrend(projectId),
        enabled: Boolean(projectId),
        ...options,
    });
}
