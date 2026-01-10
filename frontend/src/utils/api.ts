import axios from 'axios';

const API_BASE_URL = 'https://ai-fake-news-ygr0.onrender.com';

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const analyzeText = async (text: string) => {
    const response = await api.post('/news/analyze', { text });
    return response.data;
};

export const analyzeImage = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/images/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};

export const analyzeVideo = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/video/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};
