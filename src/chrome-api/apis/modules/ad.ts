import { post } from '@/chrome-api/utils/request';
import { AxiosPromise } from 'axios';

// 获取广告列表
const getAdvList = async function (data: object | undefined) {
  const res = await post('/adv/search', data, false)
  return res
}

// 获取广告列表
const geta = async function (data: object | undefined) {
  const res = await post('/taskapi/detail/search', data, false)
  return res
}


export default { getAdvList, geta }
