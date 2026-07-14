import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { refactorQueueApi } from '@/api';


export const REFACTOR_QUEUE_QUERY_KEY = ['refactor-queue'];

export function useRefactorQueue(projectId, options = {}) {
    return useQuery({
        queryKey: [...REFACTOR_QUEUE_QUERY_KEY, projectId],
        queryFn: () => refactorQueueApi.list(projectId),
        enabled: Boolean(projectId),
        ...options,
    });
}

export function useAddRefactorQueueItem(options = {}) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: refactorQueueApi.add,
        ...options,
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: [...REFACTOR_QUEUE_QUERY_KEY, variables.projectId] });
            options.onSuccess?.(data, variables, context);
        },
    });
}

export function useMoveRefactorQueueItem(projectId, options = {}) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: refactorQueueApi.move,
        ...options,
        onSettled: (...args) => {
            if (projectId) {
                queryClient.invalidateQueries({ queryKey: [...REFACTOR_QUEUE_QUERY_KEY, projectId] });
            }
            options.onSettled?.(...args);
        },
    });
}

export function useDeleteRefactorQueueItem(projectId, options = {}) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: refactorQueueApi.remove,
        ...options,
        onSuccess: (data, variables, context) => {
            if (projectId) {
                queryClient.invalidateQueries({ queryKey: [...REFACTOR_QUEUE_QUERY_KEY, projectId] });
            }
            options.onSuccess?.(data, variables, context);
        },
    });
}
