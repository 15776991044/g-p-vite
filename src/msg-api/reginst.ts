export function saveBgUrl(data: object|undefined) {
  return new Promise(function (resolve, reject) {
    try {
      chrome.runtime.sendMessage(
        {
        type: 'methods',
        url: "storageBgUrl",
        data: data||{}
        },
        function response(res) {
          console.log("回调...")
          console.log(res)
          resolve(res);
        }
      )     
    } catch (error) {
      reject(error)
    }

  });
}

export function getbgCookie(data: object|undefined) {
  return new Promise(function (resolve, reject) {
    try {
      chrome.runtime.sendMessage(
        {
        type: 'methods',
        url: "getbgCookie",
        data: data||{}
        },
        function response(res) {
          console.log("回调...")
          console.log(res)
          resolve(res);
        }
      )     
    } catch (error) {
      reject(error)
    }

  });
}

export function getbgUrl(data: object|undefined|string) {
  return new Promise(function (resolve, reject) {
    try {
      chrome.runtime.sendMessage(
        {
        type: 'methods',
        url: "getBgLocal",
        data: data||''
        },
        function response(res) {
          console.log("回调...")
          console.log(res)
          resolve(res);
        }
      )     
    } catch (error) {
      reject(error)
    }

  });
}

