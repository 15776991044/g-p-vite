export const resStatusDict = {
  401: {
    msg: '后台登录状态已失效，请重新登录'
  },
  //没有cookie
  9998: { msg: '请先前往后台系统，登录后，重试' },
  //没有注册后台链接
  9999: { msg: '请填写后台链接，并登录后台' },
  // 没有找到该方法或api
  unknown: {
    msg: '没有找到该方法，请联系管理员'
  }
}
// 通过返回结果，认识
export function getFeedback(data) {
  const { code, status } = data || {}
  if (resStatusDict[status]) {
    return { ...resStatusDict[status], code: status }
  } else if (resStatusDict[code]) {
    return { ...resStatusDict[code], code: code }
  }
}