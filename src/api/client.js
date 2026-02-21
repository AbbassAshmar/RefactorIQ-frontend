import axios from 'axios';


const apiClient = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
	timeout: 15000,
});

apiClient.interceptors.request.use(
	(config) => {
		return config;
	},
	(error) => Promise.reject(error),
);


apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		return Promise.reject(error);
	},
);

export default apiClient;
