import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { getFeedback } from "@/chrome-api/msg-status"
import allApis from "@/chrome-api/apis/index"
import { getDomain } from "@/chrome-api/utils/cookie"
// 创建 axios 实例
const service = axios.create({
  baseURL: '',
});

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, msg } = response?.data || {};
    if (code == '0') {
      return response.data;
    }
    // 响应数据为二进制流处理(Excel导出)
    if (response.data instanceof ArrayBuffer) {
      return response;
    }
    return response;
  },
  (error: any) => {
    if (error.response && error.response.status === 401) {
      return getFeedback(401);
    } else if (error.response && error.response.status) {
      return { code: error.response.status, msg: (error.response?.data?.msg) || error.message || 'Error' }
    } else {
      return { code: 'badFetch', msg: (error.response?.data?.msg) || error.message || 'Error' }
    }
  }
);

export async function get(url = '', params = {}) {
  const { bgCookie, bg_url } = (await allApis.getLoginCookie() || {})?.data || {}
  const domain = getDomain(bg_url)
  return await service.get(`${domain}/${url}`, {
    params,
    headers: {
      'X-Token': bgCookie || ''
    }
  })
}

export async function post(url = '', data = {}, isForm = true) {
  const { bgCookie, bg_url } = (await allApis.getLoginCookie() || {})?.data || {}
  const domain = getDomain(bg_url)
  if (isForm) {
    const form = new FormData()
    for (const key in data) {
      form.append(key, data[key])
    }
    data = form
  }
  return await service.post(`${domain}/${url}`, data, {
    headers: {
      'X-Token': bgCookie || ''
    }
  })
}
export const publicPath = '/child/vite'

// 导出 axios 实例
export default service;
