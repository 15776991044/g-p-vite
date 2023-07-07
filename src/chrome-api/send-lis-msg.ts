type Id = number
type Msg = object
type Opts = object
type BackCall = () => void

//加工发送msg,追加来源和目标，因为
function packageMsg(msg: object, default_msg: object) {
  return { ...(msg || {}), ...default_msg }
}

function chromeTabMsgApi(tabId: Id, msg: Msg, opts: Opts, callback: BackCall) {
  return chrome.tabs.sendMessage(
    tabId,
    msg,
    opts,
    callback
  )
}

function chromeRuntimeMsgApi(msg: Msg, callback: BackCall) {
  return chrome.runtime.sendMessage(
    msg,
    callback
  )
}

// bg & popup,主动发给web
export async function bgToTab(tabdata: { id?: Id, tabId?: Id }, msg: Msg, opts: Opts, callback: BackCall) {
  try {
    const { id, tabId } = tabdata || {}
    const default_msg = { source: 'bg', target: 'tab' }
    await chromeTabMsgApi(
      tabId || id,
      packageMsg(msg, default_msg),
      opts || {},
      callback || (() => { })
    )
  } catch (error) {
    console.log('bgToTab-err', error, tabdata, msg, opts, callback)
  }
}
export async function popToTab(tabdata: { id?: Id, tabId?: Id }, msg: Msg, opts: Opts, callback: BackCall) {
  try {
    const default_msg = { source: 'pop', target: 'tab' }
    const { id, tabId } = tabdata || {}
    await chromeTabMsgApi(
      tabId || id,
      packageMsg(msg, default_msg),
      opts || {},
      callback || (() => { })
    )
  } catch (error) {
    console.log('popToTab-err', error, tabdata, msg, opts, callback)
  }
}

// bg,主动发给popup,chrome.runtime.sendMessage,注意参数多了,id,opts
export async function bgToPop(extensionData: { id?: Id }, msg: Msg, opts: Opts, callback: BackCall) {
  try {
    const { id } = extensionData || {}
    const default_msg = { source: 'bg', target: 'pop' }
    await chrome.runtime.sendMessage(
      id,
      packageMsg(msg, default_msg),
      opts || {},
      callback || (() => { })
    )
  } catch (error) {
    console.log('bgToPop-err', error, extensionData, msg, opts, callback)
  }
}

//pop发消息给bg  
export async function popToBg(msg: Msg, callback: BackCall) {
  try {
    const default_msg = { source: 'pop', target: 'bg' }
    await chromeRuntimeMsgApi(
      packageMsg(msg, default_msg),
      callback || (() => { })
    )
  } catch (error) {
    console.log('TabToBg-err', error, msg, callback)
  }
}
// web发消息, bg & popup 都能监听到
export async function tabToBg(msg: Msg, callback: BackCall) {
  try {
    const default_msg = { source: 'tab', target: 'bg' }
    await chromeRuntimeMsgApi(
      packageMsg(msg, default_msg),
      callback || (() => { })
    )
  } catch (error) {
    console.log('TabToBg-err', error, msg, callback)
  }
}

export async function tabToPop(msg: Msg, callback: BackCall) {
  try {
    const default_msg = { source: 'tab', target: 'pop' }
    await chromeRuntimeMsgApi(
      packageMsg(msg, default_msg),
      callback || (() => { })
    )
  } catch (error) {
    console.log('TabToBg-err', error, msg, callback)
  }
}

// web监听
export function tabAddListen() {
  try {
    chrome.runtime.onMessage.addListener(
      (res) => {
        console.log('web监听到数据', res)
      }
    )
  } catch (error) {
    console.log('TabAddListen-err', error)
  }
}

//popup监听
export function popAddListen() {
  try {
    chrome.runtime.onMessage.addListener(
      (request, sender, sendResponse) => {
        console.log('popAddListen', request, sender, sendResponse)
      }
    )
  } catch (error) {
    console.log('TabAddListen-err', error)
  }
}
// chrome.runtime.onMessage.addListener(
//   (request, sender, sendResponse) => {
//     request = '发送过来的数据'
//     sender = '发送方，tab或者bg'
//     sendResponse('要发送的数据') = '调用方法可以直接返回数据给发送方'
//   }
// )


//bg监听--消息--这个同popup监听一致
export function bgAddListen() {
  try {
    chrome.runtime.onMessage.addListener(
      (request, sender, sendResponse) => {
        console.log('bgAddListen', request, sender, sendResponse)
      }
    )
  } catch (error) {
    console.log('TabAddListen-err', error)
  }
}
// chrome.runtime.onMessage.addListener(
//   (request, sender, sendResponse) => {
//     request = '发送过来的数据'
//     sender = '发送方，tab或者bg'
//     sendResponse('要发送的数据') = '调用方法可以直接返回数据给发送方'
//   }
// )

//bg监听--有tab,active
export function bgAddAcTabListen() {
  try {
    chrome.tabs.onActivated.addListener((tabData, b, c, d) => {
      console.log('bgAddAcTabListen', tabData, b, c, d)
      const { tabId, url } = tabData || {}
      // chrome.tabs.sendMessage(sendQuery);
    });
  } catch (error) {
    console.log('TabAddListen-err', error)
  }
}
// chrome.tabs.onActivated.addListener((tabData) => {
//   const { tabId, url } = tabData || {}
//   chrome.tabs.sendMessage(sendQuery);
// });   
