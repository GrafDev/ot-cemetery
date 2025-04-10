import axios, { AxiosInstance} from 'axios';

export const API_URL = import.meta.env.VITE_API_BASE_URL || 'https://test-task-api.allfuneral.com';

const apiClient: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const setAuthToken = (token: string): void => {
    apiClient.interceptors.request.use((config) => {
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });
};

export default apiClient;
