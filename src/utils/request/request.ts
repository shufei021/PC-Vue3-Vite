import type {
    AxiosInstance,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from 'axios';
import axios from 'axios';

// 创建实例
const service: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API,
    timeout: 10000, // 10秒超时
    headers: {
        'Content-Type': 'application/json',
    },
});

// 请求拦截器
service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 可添加 token
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// 响应拦截器
service.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse | Promise<never> => {
        const { data } = response;

        if (data.code !== 200) {
            return Promise.reject(new Error(data.message || 'Error'));
        }

        return data;
    },
    (error) => {
        const { response, message } = error;

        if (response && response.status) {
            switch (response.status) {
                case 401:
                    localStorage.removeItem('token');
                    break;
                case 403:
                    console.error('权限不足');
                    break;
                case 404:
                    console.error('请求资源不存在');
                    break;
                default:
                    console.error('请求失败：', response.statusText || message);
            }
        } else {
            if (message.includes('timeout')) {
                console.error('请求超时');
            } else if (message.includes('Network Error')) {
                console.error('网络错误');
            }
        }

        return Promise.reject(error);
    },
);

export default service;
