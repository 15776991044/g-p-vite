import { setLocal, getLocal } from "@/chrome-api/utils/storage"
import { handleCookie, getCookieVlaue } from "@/chrome-api/utils/cookie"
import { getFeedback } from "@/chrome-api/msg-status"
// 存储后台链接
const getLoginLocal = async function (key) {
  const res = await getLocal(key)
  return { code: 0, data: { url: res } }
}
const setLoginLocal = async function (data) {
  for (let key in data || {}) {
    setLocal(key, data[key])
  }
  return { code: 0, data: {} }
}

// 存储后台cookie
const getLoginCookie = async function (data) {
  const { key = 'bg_url' } = data || {}
  const { url } = (await getLoginLocal(key) || {})?.data || {}
  if (!url) {
    return getFeedback({ code: 9999 })
  }
  const bgCookie = await getCookieVlaue(url, 'ADMINTOKEN') || {}
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