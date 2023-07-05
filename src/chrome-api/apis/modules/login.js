import { setLocal, getLocal } from "@/chrome-api/utils/storage"
import { handleCookie, getCookieVlaue } from "@/chrome-api/utils/cookie"
import { getFeedback } from "@/chrome-api/msg-status"
// 存储后台链接
const getLoginLocal = async function (key) {
  const res = await getLocal(key)
  return { code: 0, data: { url: res } }
}
const setLoginLocal = async function (key) {
  const res = setLocal(key)
  return { code: 0, data: { url: res } }
}

// 存储后台cookie
const getLoginCookie = async function (data) {
  const { key = 'bg_url' } = data || {}
  const { url = 'http://192.168.1.14:6600' } = await getLoginLocal(key)
  if (!url) {
    return getFeedback({ code: 9999 })
  }
  const bgCookie = await getCookieVlaue(url, 'ADMINTOKEN') || { value: 222 }
  console.log('bgCookie', bgCookie)
  if (!bgCookie?.value) {
    return getFeedback({ code: 9998 })
  }
  return { code: 0, data: { bgCookie: bgCookie?.value, bg_url: url } }
}


export default {
  getLoginLocal,
  getLoginCookie,
  setLoginLocal
}