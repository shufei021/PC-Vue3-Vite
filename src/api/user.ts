import { get, post } from '@/utils/request'

export const getUserInfo = () => {
  return get('/user/info') // 自动请求 /api/user/info
}

export const getUserList = (params: { page: number; size: number }) => {
  return get('/user/list', params)
}

export const login = (data: { username: string; password: string }) => {
  return post('/user/login', data)
}

// 超时接口测试
export const slow = (params?: unknown) => {
  return get('/slow-data', params, { timeout: 5000 })
}
