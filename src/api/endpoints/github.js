import apiClient from '@/api/client';


const githubApi = {
	getRepositories: (params) =>
		apiClient.get('/github/repositories', { params }).then((r) => r.data),

	getRepositoryBranches: (repoOwner, repoName, params) =>
		apiClient
			.get(`/github/repositories/${encodeURIComponent(repoOwner)}/${encodeURIComponent(repoName)}/branches`, { params })
			.then((r) => r.data),
};

export default githubApi;
