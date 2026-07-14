import apiClient from '@/api/client';
import { PROJECT_QUERY_KEY } from '@/utils/queryParams';


const refactorQueueApi = {
    list: (projectId) => apiClient.get('/refactor-queue', { params: { [PROJECT_QUERY_KEY]: projectId } }).then((response) => response.data),
    add: ({ projectId, filePath }) => apiClient.post('/refactor-queue', { project_id: projectId, file_path: filePath }).then((response) => response.data),
    move: ({ itemId, status, position }) => apiClient.patch(`/refactor-queue/${itemId}`, { status, position }).then((response) => response.data),
    remove: (itemId) => apiClient.delete(`/refactor-queue/${itemId}`).then((response) => response.data),
};

export default refactorQueueApi;
