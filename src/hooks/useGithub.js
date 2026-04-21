import { useQuery } from '@tanstack/react-query';
import { githubApi } from '@/api';


export function useGithubRepositories(options = {}) {
	const {
		perPage = 100,
		page = 1,
		...queryOptions
	} = options;

	return useQuery({
		queryKey: ['github', 'repositories', { perPage, page }],
		queryFn: () => githubApi.getRepositories({ per_page: perPage, page }),
		...queryOptions,
	});
}


export function useRepositoryBranches(repoOwner, repoName, options = {}) {
	const {
		enabled = true,
		perPage = 100,
		page = 1,
		...queryOptions
	} = options;

	const hasRepository = Boolean(repoOwner && repoName);

	return useQuery({
		queryKey: ['github', 'branches', repoOwner, repoName, { perPage, page }],
		queryFn: () => githubApi.getRepositoryBranches(repoOwner, repoName, { per_page: perPage, page }),
		enabled: hasRepository && enabled,
		...queryOptions,
	});
}
