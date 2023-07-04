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

