import {setLocal,getLocal} from "@/chrome-utiles/storage"
import {handleCookie,getCookieVlaue} from "@/chrome-utiles/getCookies"
// 存储后台链接
function storageBgUrl(data){
  return new Promise(function (resolve, reject) {
    try {
      console.log('storageBgUrl',data)
      for (let [key, value] of Object.entries(data||{})) {
        setLocal(key,value)
      }
      resolve(data);    
    } catch (error) {
      reject(error)
    }

  });
}


// 存储后台cookie
async function getbgCookie(data){
    const {key='bg_url'} = data||{}
    const bg_url_storage = await getBgLocal("bg_url")
    if(!bg_url_storage){
      return ({code:'9999',msg:'请填写后台链接，并登录后台'})
    }
    const bgCookie=await getCookieVlaue(bg_url_storage,'ADMINTOKEN')
    console.log('bgCookie',bgCookie)
    if(!bgCookie){
      return({code:'9998',msg:'请先前往后台系统，登录后，重试'})
    }
    return({code:0,msg:'',data:bgCookie})
  }

  async function getBgLocal(key){
    const res = await getLocal(key)
    console.log('getBgLocal',key,res)
    return res
  }



export default {storageBgUrl,getbgCookie,getBgLocal}