//执行存储
export function setLocal(key, val) {
  chrome.storage.local.set({ [key]: val })
}

//获取存储
export function getLocal(key) {
  return new Promise(function (resolve, reject) {
    try {
      chrome.storage.local.get([key], (result) => {
        console.log('getLocal', result, result[key])
        resolve(result[key] || '')
      })
    } catch (error) {
      resolve('')
    }
  })

}

//删除存储
export function delLocal(key) {
  chrome.storage.local.remove(key)
}

// 监听storage变化
export function lsitenLocal() {
  chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
      //存储的名字
      console.log('存储的名字', key)
      //存储的类型local或者sync
      console.log('local或者sync', namespace)
      //存储更新前的数据,首次存储为undefined
      console.log('存储更新前的数据', oldValue)
      //存储更新后的数据
      console.log('存储更新后的数据', newValue)
      chrome.tabs.query({}, tabs => {
        tabs.forEach(element => {
          sendContent(element.id, { msg: `存储的名字${key},从${oldValue}改为${newValue}` })
        });
      });
    }

  })
}

async function sendContent(tabID, data) {
  const response = await chrome.tabs.sendMessage(tabID, data);
  console.log("sendContentResponse---", response);
}



