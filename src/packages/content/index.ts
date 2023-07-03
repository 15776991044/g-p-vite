export function saveMyUrl(){
	console.log('saveMyUrl',chrome.runtime);
  chrome.runtime.sendMessage(
      {
      type: 'post',
      url: "https://xxxx.com/api/users/login",
      data: {
          url: 'test'
      }
      },
      function response(res) {
          console.log("回调...")
          console.log(res)
      }
  )
}


