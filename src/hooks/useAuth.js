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

	return useMutation({
		mutationFn: authApi.adminLogin,
		onSuccess: (...args) => {
			qc.invalidateQueries({ queryKey: ['auth', 'me'] });
			options.onSuccess?.(...args);
		},
		...options,
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
		onSuccess: () => {
			qc.clear();
		},
	});
}
