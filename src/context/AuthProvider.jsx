import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useCurrentUser } from '@/hooks';

const DEFAULT_USER = {
    id: null,
    email: '',
    username: '',
    role: null,
    github_username: null,
    is_active: false,
    created_at: null,
    updated_at: null,
};

const AuthContext = createContext({
    user: DEFAULT_USER,
    role: null,
    isAuthenticated: false,
    isCheckingAuth: true,
    refreshUser: async () => {},
});

function normalizeRole(role) {
    return typeof role === 'string' ? role.toLowerCase() : null;
}

function extractUserFromMeResponse(response) {
    const data = response?.data ?? response;
    if (!data || typeof data !== 'object') {
        return null;
    }

    if (data.user && typeof data.user === 'object') {
        return data.user;
    }

    return data;
}

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(DEFAULT_USER);
    const [isHydrated, setIsHydrated] = useState(false);

    const currentUserQuery = useCurrentUser({
        retry: false,
    });

    const { data, isLoading, isFetching, isError, refetch } = currentUserQuery;

    useEffect(() => {
        if (data) {
            const currentUser = extractUserFromMeResponse(data);
            setUser(currentUser ?? DEFAULT_USER);
            setIsHydrated(true);
            return;
        }

        if (isError || (!isLoading && !isFetching && !data)) {
            setUser(DEFAULT_USER);
            setIsHydrated(true);
        }
    }, [data, isError, isFetching, isLoading]);

    const role = normalizeRole(user?.role);
    const isAuthenticated = Boolean(user?.id);
    const isCheckingAuth = !isHydrated || (isLoading && !isAuthenticated);

    const value = useMemo(
        () => ({
            user,
            role,
            isAuthenticated,
            isCheckingAuth,
            refreshUser: refetch,
        }),
        [isAuthenticated, isCheckingAuth, refetch, role, user],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export { DEFAULT_USER };
