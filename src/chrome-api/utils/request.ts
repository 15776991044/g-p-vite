import { getFeedback } from "@/chrome-api/msg-status"
import allApis from "@/chrome-api/apis/index"
import { getDomain } from "@/chrome-api/utils/cookie"

export async function post(url = '', data = {}) {
  const { bgCookie, bg_url } = (await allApis.getLoginCookie() || {})?.data || {}
  const domain = getDomain(bg_url)
  return new Promise((resolve, reject) => {
    console.log(`${domain}${url}`, bgCookie)
    fetch(`${domain}${url}`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-Token': bgCookie || ''
      },
      body: JSON.stringify(data || {})
    })
      .then(function (response) {
        console.log('1', response)
        const errBack = getFeedback(response);
        if (errBack) {
          return errBack
        } else {
          return response.json()
        }
      })
      .then(function (json) {
        console.log('2', json)
        resolve(json)
      })
      .catch(function (error) {
        console.log(3, error)
        const errBack = getFeedback(error);
        resolve(errBack)
      });
  })

}
