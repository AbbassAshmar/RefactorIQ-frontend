import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { projectsApi } from '@/api';
import { ADMIN_OVERVIEW_QUERY_KEYS } from '@/utils/constants';


const PROJECTS_QUERY_KEY = ['projects', 'list'];

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
