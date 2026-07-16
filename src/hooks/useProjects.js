import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { projectsApi } from '@/api';
import {
    ADMIN_OVERVIEW_QUERY_KEYS,
    FILES_QUERY_KEYS,
    OVERVIEW_QUERY_KEYS,
    PROJECTS_QUERY_KEYS,
    REFACTOR_QUEUE_QUERY_KEYS,
    SCANS_QUERY_KEYS,
} from '@/utils/constants';


const PROJECTS_QUERY_KEY = [PROJECTS_QUERY_KEYS.ROOT, PROJECTS_QUERY_KEYS.LIST];

export function useProjectsList(options = {}) {
	return useQuery({
		queryKey: PROJECTS_QUERY_KEY,
		queryFn: projectsApi.list,
		...options,
	});
}


export function useAdminProjects(params = {}, options = {}) {
	return useQuery({
		queryKey: [ADMIN_OVERVIEW_QUERY_KEYS.ROOT, ADMIN_OVERVIEW_QUERY_KEYS.PROJECTS, params],
		queryFn: () => projectsApi.adminList(params),
		placeholderData: keepPreviousData,
		...options,
	});
}


export function useAdminProjectsOverTime(options = {}) {
	return useQuery({
		queryKey: [ADMIN_OVERVIEW_QUERY_KEYS.ROOT, ADMIN_OVERVIEW_QUERY_KEYS.PROJECTS_OVER_TIME],
		queryFn: projectsApi.adminOverTime,
		...options,
	});
}


export function useCreateProject(options = {}) {
	const queryClient = useQueryClient();
	const { onSuccess, ...restOptions } = options;

	return useMutation({
		mutationFn: projectsApi.create,
		onSuccess: (...args) => {
			queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
			onSuccess?.(...args);
		},
		...restOptions,
	});
}


export function useDeleteProject(options = {}) {
    const queryClient = useQueryClient();
    const { onSuccess, ...restOptions } = options;

    return useMutation({
        mutationFn: projectsApi.remove,
        onSuccess: (data, variables, context) => {
            queryClient.setQueryData(PROJECTS_QUERY_KEY, (current) => {
                const projects = current?.data?.projects;
                if (!Array.isArray(projects)) return current;
                return {
                    ...current,
                    data: {
                        ...current.data,
                        projects: projects.filter((project) => project.id !== variables),
                    },
                };
            });
            queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
            queryClient.invalidateQueries({ queryKey: [SCANS_QUERY_KEYS.ROOT] });
            queryClient.invalidateQueries({ queryKey: [FILES_QUERY_KEYS.ROOT] });
            queryClient.invalidateQueries({ queryKey: [OVERVIEW_QUERY_KEYS.ROOT] });
            queryClient.invalidateQueries({ queryKey: [REFACTOR_QUEUE_QUERY_KEYS.ROOT] });
            onSuccess?.(data, variables, context);
        },
        ...restOptions,
    });
}
