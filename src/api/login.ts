import { post } from '@/utils/request';

export const login = (data: unknown) => {
    return post('/api/login', data);
};
