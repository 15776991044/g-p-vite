
import {handleCookie} from "@/utils/getCookies"
import {storageBgUrl} from "@/bg-api/index"
function handleInstall(details){
  console.log('chrome',chrome,chrome.tabs)
  handleCookie()
}
handleInstall()


try {
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    console.log("addListener...")
    console.log(request, sender, sendResponse)
    storageBgUrl(request, sender, sendResponse)
    return true;

  })
} catch (error) {
  console.log(error,data,bgMethods)
  const request=data
  switch(request.type) {
    // 你可以定义任意内容，使用sendResponse()来返回它
    case 'methods':
        {
          const {url,data} = request;
          console.log(res,url,data,bgMethods?.[url])

          if(bgMethods?.[url]){
            bgMethods?.[url]?.(data).tnen((res)=>{
              console.log(res)
              sendResponse(res)
            }).catch(err=>{
              console.log(url,'err',err)
            })
          }
        
        }
    break;
}      
}
