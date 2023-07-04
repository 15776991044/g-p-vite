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
  const bg_url_storage = await getBgLocal("bg_url")
  return new Promise((resolve, reject)=> {
    const {key='bg_url'} = data||{}
    if(!bg_url_storage){
      resolve ({code:'9999',msg:'请填写后台链接，并登录后台'})
    }
    const bgCookie=getCookieVlaue(bg_url_storage,'ADMINTOKEN')
    if(!bgCookie){
      resolve({code:'9998',msg:'请先前往后台系统，登录后，重试'})
    }
      resolve({code:0,msg:'',data:bgCookie})
    })
  }

  async function getBgLocal(key){
    const res = await getLocal(key)
    console.log('getBgLocal',key,res)
    return res
  }



export default {storageBgUrl,getbgCookie,getBgLocal}