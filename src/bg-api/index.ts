import bgMethods from "./bg-methods";
export function storageBgUrl(request, sender, sendResponse) {
    try {
      switch(request.type) {
        case 'get':
            fetch(request.url)
                .then(function(response) { sendResponse(response.json()) })
            .then(function(json) { sendResponse(json) })
            .catch(function(error) { sendResponse(null) });
        break;
        case 'post':
            fetch('http://face.dev.laningtech.net/personcollection/person/search', {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Token':'e24e46300bcbed3767150a1f238be72f'
                },
                body: JSON.stringify({page:1,page_size:1})
            })
                .then(function(response) { 
                    console.log(response)
                    sendResponse(response.json())
                })
                .then(function(json) {
                    console.log(json)
                    sendResponse(json)
                })
                .catch(function(error) {
                    console.log(error)
                    sendResponse(null)
                });
        break;
        // 你可以定义任意内容，使用sendResponse()来返回它
        case 'methods':
            {
              const {url,data} = request;
              console.log(url,data,bgMethods?.[url])
              if(bgMethods?.[url]){
                bgMethods?.[url]?.(data).then((res)=>{
                  console.log(res)
                  sendResponse(res)
                }).catch(err=>{
                  console.log(url,'err',err)
                })
              }
            
            }
        break;
      }
    } catch (error) {
      const {url,data} = request||{}
      console.log(url,error)
    }
    return true
}