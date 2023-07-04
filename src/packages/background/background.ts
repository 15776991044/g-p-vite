
import {handleCookie} from "@/chrome-utiles/getCookies"
import {storageBgUrl} from "@/bg-api/index"
import {lsitenLocal} from "@/chrome-utiles/storage"

function handleInstall(details){
  console.log('chrome',chrome,chrome.tabs)
  handleCookie()
}
handleInstall()
// 监听
lsitenLocal()

try {
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    console.log("addListener...")
    console.log(request, sender, sendResponse)
    storageBgUrl(request, sender, sendResponse)
    return true;

  })
} catch (error) {
  console.log(error,data,bgMethods)
  storageBgUrl(request, sender, sendResponse)
    
}
