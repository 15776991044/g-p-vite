import allApi from "./apis/index"
import { getFeedback } from "./msg-status"
export function msgHandler(request, sender, sendResponse) {
  const { method_name, query, type } = request || {}
  console.log('请求的方法名', method_name)
  console.log('请求的参数', query)
  console.log('请求的类型,默认api', type)
  console.log('请求的来源', sender)
  console.log('请求的回调', sendResponse)
  try {
    // 你可以定义任意内容，使用sendResponse()来返回信息给发送方
    switch (type) {
      case "api":
      default:
        if (allApi?.[method_name]) {
          allApi?.[method_name]?.(query).then((res) => {
            console.log(method_name, '返回', res)
            sendResponse(res)
          }).catch(err => {
            console.log(method_name, '--err', err)
            sendResponse(err)
          })
        } else {
          sendResponse(getFeedback('unknown'))
        }
    }
  } catch (error) {
    console.log(method_name, '--errAll', error)
  }
  return true
}