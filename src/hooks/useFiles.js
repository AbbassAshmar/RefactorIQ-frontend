import { useQuery } from '@tanstack/react-query';
import { filesApi } from '@/api';


export function useScanFiles(scanId, options = {}) {
    return useQuery({
        queryKey: ['files', 'list', scanId],
        queryFn: () => filesApi.list(scanId),
        enabled: Boolean(scanId),
        ...options,
    });
}

export function useFileDetails(fileId, includeSummary = false, options = {}) {
    return useQuery({
        queryKey: ['files', 'details', fileId, { includeSummary }],
        queryFn: () => filesApi.details({ fileId, includeSummary }),
        enabled: Boolean(fileId),
        staleTime: includeSummary ? 5 * 60 * 1000 : 30 * 1000,
        ...options,
    });
}
