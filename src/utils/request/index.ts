import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import asyncSameSource from '../lib/asyncSameSource'
import service from './request'

// 声明请求配置类型
interface RequestConfig extends AxiosRequestConfig {
  showLoading?: boolean // 是否显示加载中
  showError?: boolean // 是否显示错误提示
}

// 统一错误处理
const handleResponse = <T>(res: AxiosResponse<T>, url: string): T => {
  if (res && res.data) {
    return res.data
  } else {
    throw new Error(`Request failed: ${url}`)
  }
}

type Response<T = unknown> = Promise<T>

export const get = <T = unknown>(
  url: string,
  params?: unknown,
  config?: RequestConfig
): Response<T> => {
  return asyncSameSource.getResult(url + JSON.stringify(params), () =>
    service
      .get(url, { params: params ?? {}, ...config })
      .then((res) => handleResponse<T>(res, url))
  )
}

export const post = <T = unknown>(
  url: string,
  params?: unknown,
  config?: RequestConfig
): Response<T> => {
  return asyncSameSource.getResult(url + JSON.stringify(params), () =>
    service.post(url, params, config).then((res) => handleResponse<T>(res, url))
  )
}
