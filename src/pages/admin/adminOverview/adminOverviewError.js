export function getAdminOverviewErrorMessage(error, fallback) {
    return error?.response?.data?.error?.message || fallback;
}
