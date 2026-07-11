import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { scansApi } from '@/api';


export function useScansList(params = {}, options = {}) {
    return useQuery({
        queryKey: ['scans', 'list', params],
        queryFn: () => scansApi.list(params),
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
            queryClient.invalidateQueries({ queryKey: ['scans', 'list'] });
            onSuccess?.(...args);
        },
        ...restOptions,
    });
}
