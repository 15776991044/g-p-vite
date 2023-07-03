import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { getToken, removeToken } from '@/utils/auth'

// 创建 axios 实例
const service = axios.create({
  baseURL: '',
});

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken()
    if (token) {
      config.headers['X-Token'] = token
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);
let messageBoxFlag = true

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, msg } = response?.data||{};
    if (code == '0') {
      return response.data;
    }
    // 响应数据为二进制流处理(Excel导出)
    if (response.data instanceof ArrayBuffer) {
      return response;
    }

    ElMessage({
      showClose: true,
      message: response.data?.msg || 'Error',
      type: 'error',
    });
    return Promise.reject(new Error(msg || 'Error'));
  },
  (error: any) => {
    if(error.response&&error.response.status === 401){
      if(messageBoxFlag){
        messageBoxFlag = false
        ElMessageBox.confirm('当前页面已失效，请重新登录', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          showClose: false,
          closeOnClickModal: false,
          distinguishCancelAndClose: true,
          type: 'warning'
        }).then(() => {
          removeToken()
          location.reload()
        });
 
      }
    }else {
      ElMessage({
        message: (error.response?.data ?.msg) || error.message || 'Error',
        type: 'error',
        duration: 5 * 1000,
        showClose: true
      })
      return Promise.reject(error)
    }
  }
);

export function get(url = '', params = {}) {
  return service.get(url, { params })
}


export function post(url = '', data = {}, isForm = true) {
  if (isForm) {
    const form = new FormData()
    for (const key in data) {
      form.append(key, data[key])
    }
    data = form
  }
  return service.post(url, data)
}
export const publicPath = '/child/vite'

// 导出 axios 实例
export default service;
