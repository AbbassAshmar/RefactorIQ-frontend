import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/api';

export function useCurrentUser(options = {}) {
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: authApi.me,
    ...options,
  });
}


export function useLogin() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      if (data?.access_token) {
        localStorage.setItem('access_token', data.access_token);
      }
      qc.invalidateQueries({ queryKey: ['auth', 'me'] });
    },
  });
}


export function useRegister() {
  return useMutation({
    mutationFn: authApi.register,
  });
}


export function useLogout() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      localStorage.removeItem('access_token');
      qc.clear();
    },
  });
}
