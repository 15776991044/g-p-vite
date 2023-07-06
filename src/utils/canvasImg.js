function isExist(arg) {
  if (typeof arg === 'undefined' || arg === null || isNaN(arg) || arg === '') {
    return false
  } else {
    return true
  }
}

const per = 2
async function getImgDate(params = {}) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const res = await getImgObj(params).then(async (imgObj) => {
    console.log('imgObj', imgObj)
    canvas.width = imgObj.width * per
    canvas.height = imgObj.height * per
    canvas.style.width = imgObj.width * per + 'px'
    canvas.style.height = imgObj.height * per + 'px'
    ctx.drawImage(imgObj, 0, 0, imgObj.width * per, imgObj.height * per)
    var { box_y1, box_y2, box_x1, box_x2 } = params
    const scale = imgObj.width * per / 300
    if (isExist(box_y1) && isExist(box_y2) && isExist(box_x1) && isExist(box_x2)) {
      await drawLine(ctx, canvas, params, scale)
      await drawText(ctx, canvas, params, scale)
    }

    const url = canvas.toDataURL('image/jpeg', 1)
    return url
  }).catch(err => { return undefined })
  return res
}
async function getImgObj(params) {
  return new Promise((resolve, reject) => {
    var imgObj = new Image()
    imgObj.onload = () => {
      console.log(1)
      resolve(imgObj)
    }
    imgObj.onerror = async () => {
      console.log('getImgObj-error', imgObj)
      reject(imgObj)
    }
    imgObj.crossOrigin = 'Anonymous'
    imgObj.src = params.src
  })
}

async function drawLine(ctx, canvas, params, scale = 1) {
  const xyz = { box_x1: params.box_x1, box_x2: params.box_x2, box_y1: params.box_y1, box_y2: params.box_y2 }
  return new Promise((resolve, reject) => {
    ctx.strokeStyle = 'red'
    ctx.lineWidth = 1 * per * scale
    ctx.rect(xyz.box_x1 * per, xyz.box_y1 * per, (xyz.box_x2 - xyz.box_x1) * per, (xyz.box_y2 - xyz.box_y1) * per)
    ctx.stroke()
    resolve()
  })
}
async function drawText(ctx, canvas, params, scale = 1) {
  return new Promise((resolve, reject) => {
    ctx.fillStyle = params.fillStyle || 'yellow'
    ctx.strokeStyle = params.strokeStyle || '#000000'
    var fontSize = params.font * per * scale || 6 * scale
    // console.log('fontSize', fontSize)
    // if (fontSize < 9) {
    //   fontSize = 9
    // } else if (fontSize > 16) {
    //   fontSize = 16
    // }

    ctx.font = `normal normal bold ${fontSize * per}px SimHei` || "bold 20px '字体','字体','微软雅黑','宋体'"
    ctx.textBaseline = 'bottom'
    var left = params.box_x1
    var top = 0
    top = params.box_y1 < fontSize + 1 ? params.box_y2 + fontSize : top = params.box_y1 - 1

    ctx.fillText(params.person_name || '暂无', left * per, top * per)
    resolve()
  })
}

async function getImgWidth(params = {}) {
  const res = await getImgObj(params).then(imgObj => {
    console.log(imgObj)
    return { width: imgObj.width, height: imgObj.height }
  }).catch(err => { return {} })

  return res
}

// sleep
async function sleep(ms = 500) {
  return new Promise((resolve) => {
    try {
      setTimeout(() => { resolve() }, ms)
    } catch (e) {
      resolve()
    }
  })
}

export { getImgDate, getImgWidth }

