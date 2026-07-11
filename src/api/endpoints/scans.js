import apiClient from '@/api/client';


const scansApi = {
    list: (params = {}) =>
        apiClient.get('/scans', { params }).then((response) => response.data),

    create: (projectId) =>
        apiClient.post(`/projects/${projectId}/scans`).then((response) => response.data),
};

export default scansApi;
