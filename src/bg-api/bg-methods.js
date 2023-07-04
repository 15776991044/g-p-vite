function storageBgUrl(data){
  return new Promise(function (resolve, reject) {
    try {
      console.log('storageBgUrl',data)
      resolve(data);    
    } catch (error) {
      reject(error)
    }

  });
}

export default {storageBgUrl}