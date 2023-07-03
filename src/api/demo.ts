import {post} from '@/utils/request';
import { AxiosPromise } from 'axios';

export function demo(data: object|undefined): AxiosPromise {
  return post('/demo', data, false)
}