import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  categoriesService,
  dashboardService,
  ordersService,
  productsService,
  usersService,
} from "@/services/api";
import {
  activityFeed,
  categories,
  dashboardMetrics,
  dashboardTrend,
  orders,
  products,
  users,
} from "@/services/mockAdminData";

const mockQueryOptions = {
  staleTime: 30_000,
  placeholderData: (previous) => previous,
};

function useFallbackQuery(queryKey, queryFn, fallback) {
  return useQuery({
    queryKey,
    queryFn: async () => {
      try {
        return await queryFn();
      } catch (error) {
        if (import.meta.env.PROD) {
          throw error;
        }
        return fallback;
      }
    },
    ...mockQueryOptions,
  });
}

export function useDashboardSummary() {
  return useFallbackQuery(
    ["admin", "dashboard", "summary"],
    dashboardService.summary,
    {
      ...dashboardMetrics,
      activities: activityFeed,
      trend: dashboardTrend,
    },
  );
}

export function useAdminUsers() {
  return useFallbackQuery(
    ["admin", "users"],
    () => usersService.list({ page: 1, size: 100 }),
    {
      items: users,
      total: users.length,
      page: 1,
      size: users.length,
      pages: 1,
    },
  );
}

export function useAdminProducts() {
  return useFallbackQuery(
    ["admin", "products"],
    () => productsService.list(),
    products,
  );
}

export function useAdminOrders() {
  return useFallbackQuery(
    ["admin", "orders"],
    () => ordersService.list(),
    orders,
  );
}

export function useAdminCategories() {
  return useFallbackQuery(
    ["admin", "categories"],
    () => categoriesService.list(),
    categories,
  );
}

export function useCurrentAdminProfile() {
  return useMemo(() => ({ ...users[0], ...{ name: "Maya Anderson" } }), []);
}

function optimisticMutation(serviceFn, queryKeys) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: serviceFn,
    onSuccess: async () => {
      await Promise.all(
        queryKeys.map((queryKey) =>
          queryClient.invalidateQueries({ queryKey }),
        ),
      );
    },
  });
}

export function useDeleteUser() {
  return optimisticMutation(
    (userId) => usersService.remove(userId),
    [["admin", "users"]],
  );
}

export function useSaveProduct() {
  return optimisticMutation(
    ({ id, ...payload }) =>
      id
        ? productsService.update(id, payload)
        : productsService.create(payload),
    [["admin", "products"]],
  );
}

export function useSaveOrderStatus() {
  return optimisticMutation(
    ({ id, status }) => ordersService.updateStatus(id, status),
    [["admin", "orders"]],
  );
}

export function useSaveCategory() {
  return optimisticMutation(
    ({ id, ...payload }) =>
      id
        ? categoriesService.update(id, payload)
        : categoriesService.create(payload),
    [["admin", "categories"]],
  );
}
