import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

export const getTodayApod = async () => {
    const response = await api.get('/apod/today');
    return response.data;
};

export const getApodByDate = async (date) => {
    const response = await api.get(`/apod/date/${date}`);
    return response.data;
};

export const getRecentApods = async (count = 12) => {
    const response = await api.get('/apod/recent', { params: { count } });
    return response.data;
};

export default api;
