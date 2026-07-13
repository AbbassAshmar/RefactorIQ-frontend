import { useQuery } from '@tanstack/react-query';
import { overviewApi } from '@/api';


function useOverviewResource(resource, scanId, options = {}) {
    return useQuery({
        queryKey: ['overview', resource, scanId],
        queryFn: () => overviewApi[resource](scanId),
        enabled: Boolean(scanId),
        ...options,
    });
}

export function useRiskTrend(scanId, options = {}) {
    return useOverviewResource('riskTrend', scanId, options);
}

export function useScanSummary(scanId, options = {}) {
    return useOverviewResource('scanSummary', scanId, options);
}

export function useTopRefactorFiles(scanId, options = {}) {
    return useOverviewResource('topFiles', scanId, options);
}

export function useRiskByDirectory(scanId, options = {}) {
    return useOverviewResource('riskByDirectory', scanId, options);
}

export function useDirectoryInsight(scanId, options = {}) {
    return useOverviewResource('directoryInsight', scanId, options);
}
