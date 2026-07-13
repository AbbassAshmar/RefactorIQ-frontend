import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/api';

export function useCurrentUser(options = {}) {
	return useQuery({
		queryKey: ['auth', 'me'],
		queryFn: authApi.me,
		...options,
	});
}


export function useAdminLogin(options = {}) {
	const qc = useQueryClient();
	const { onSuccess, ...mutationOptions } = options;

	return useMutation({
		...mutationOptions,
		mutationFn: authApi.adminLogin,
		onSuccess: async (...args) => {
			await qc.refetchQueries({ queryKey: ['auth', 'me'], type: 'active' });
			await onSuccess?.(...args);
		},
	});
}


export function useGitHubLogin(options = {}) {
	return useMutation({
		mutationFn: authApi.githubAuthorize,
		onSuccess: (response, ...rest) => {
			const authorizeUrl = response?.data?.authorize_url;
			if (authorizeUrl) {
				window.location.assign(authorizeUrl);
				return;
			}

			options.onSuccess?.(response, ...rest);
		},
		...options,
	});
}


export function useLogout() {
	const qc = useQueryClient();

	return useMutation({
		mutationFn: authApi.logout,
		onSettled: () => {
			qc.clear();
		},
	});
}
