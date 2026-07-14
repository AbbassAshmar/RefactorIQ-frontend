import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { usersApi } from '@/api';


export function useAdminUsersList(params = {}, options = {}) {
    return useQuery({
        queryKey: ['admin-users', 'list', params],
        queryFn: () => usersApi.getAll(params),
        placeholderData: keepPreviousData,
        ...options,
    });
}
