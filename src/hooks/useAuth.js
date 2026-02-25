import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/api";

const AUTH_TOKEN_KEY = "auth-token";

function resolveToken(payload) {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  return payload.access_token ?? payload.token ?? payload.jwt ?? null;
}

export function useCurrentUser(options = {}) {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: authApi.me,
    ...options,
  });
}

export function useAdminLogin(options = {}) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: authApi.adminLogin,
    onSuccess: (response, ...args) => {
      const token = resolveToken(response);
      if (token) {
        window.localStorage.setItem(AUTH_TOKEN_KEY, token);
      }
      qc.invalidateQueries({ queryKey: ["auth", "me"] });
      options.onSuccess?.(response, ...args);
    },
    ...options,
  });
}

export function useGitHubLogin(options = {}) {
  return useMutation({
    mutationFn: authApi.githubAuthorize,
    onSuccess: (response, ...rest) => {
      const authorizeUrl = response?.authorize_url;
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
      window.localStorage.removeItem(AUTH_TOKEN_KEY);
      qc.clear();
    },
  });
}
