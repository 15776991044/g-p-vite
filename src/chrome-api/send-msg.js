import allApi from "./apis/index"

// 发送消息返回的统一处理
function handleRes(res, resolve, reject) {
  const { code, msg, data } = res || {};
  if (code == 9999) {
    console.log(res)
    ElMessageBox.prompt(`${msg || '填写后台链接'}`, 'Tip', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
    })
      .then(({ value }) => {
        setLoginLocal({ bg_url: value }).then((res) => {
          ElMessage({
            showClose: true,
            message: '保存成功',
            type: 'success',
          })
          reject(res)
        })
          .catch((err) => {
            console.log('err', err)
            ElMessage({
              showClose: true,
              message: '保存失败',
              type: 'error',
            })
            reject(res)

          })
      })
      .catch(() => {
        reject(res)
      })
  } else if (code == 9998) {
    const { url } = data || {}
    ElMessageBox.alert(
      `<a src="${url}">${url}</a>`,
      `${msg}`,
      {
        dangerouslyUseHTMLString: true,
      }
    )
    reject(res)
  } else if (code !== 0) {
    ElMessage({
      message: msg || '请求失败',
      type: 'error',
      duration: 5 * 1000,
      showClose: true
    })
    reject(res)
  } else {
    resolve(res)
  }
}

// 发送消息封装
export function sendMsgToBG(method_name, query, type) {
  return new Promise((resolve, reject) => {
    try {
      chrome.runtime.sendMessage(
        {
          method_name, query, type
        },
        (res) => {
          handleRes(res, resolve, reject)
        }
      )
    } catch (error) {
      handleRes(error, resolve, reject)
    }
  })
}
const BgUrlStorageKey = 'bg_url'
//前台，获取注册的后台地址
export function getLoginLocal() {
  return sendMsgToBG('getLoginLocal', BgUrlStorageKey)
}
//前台，注册的后台地址
export function setLoginLocal(data) {
  return sendMsgToBG('setLoginLocal', data)
}
//前台，获取Cookie，请求的时候用的那个X-token
export function getLoginCookie() {
  return sendMsgToBG('getLoginCookie', { key: BgUrlStorageKey })
}
//前台，向后台请求接口getAdvList
export function getAdvList() {
  return sendMsgToBG('getAdvList', { page: 1, page_size: 1 })
  // allApi.geta()
}
//前台，向后台请求接口getAdvList
export function geta() {
  return sendMsgToBG('geta', { page: 1, page_size: 1 })
}

