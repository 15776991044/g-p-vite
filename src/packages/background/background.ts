
import { msgHandler } from "@/chrome-api/index"
import { lsitenLocal } from "@/chrome-api/utils/storage"

// 监听background-storage有变动
lsitenLocal()

// 监听发来的消息
try {
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log("background收到消息")
    console.log(request, sender)
    msgHandler(request, sender, sendResponse)
    //因为上面是异步的，所以要有这个
    return true;

  })
} catch (error) {
  console.log('监听发来的消息-err', error)
  msgHandler(request, sender, sendResponse)

}


