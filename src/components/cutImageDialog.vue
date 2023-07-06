<template>
  <div id="demo">
    <div
      v-show="panel"
      class="father"
    >
      <div class="container">
        <div
          id="cropper" 
          style="
            margin-top: 1%;    
            margin-left: 1%;              
            margin-right: 1%; 
            height: 85%;
            margin-bottom: 1%;
          " 
        >
          <img
            id="image"
            :src="url"
            alt="Picture"
          >
        </div>    
        <div> 
          <div style="float: left; margin-left: 1%">
            双击图片，可移动图片
          </div>
          <div style="float: right; margin-right: 1%">
            <el-button
              :icon="ZoomOut"
              circle
              @click="zoom(-1)"
            />
            <el-button
              :icon="ZoomIn"
              circle
              @click="zoom(1)"
            />
            <el-button
              :icon="Refresh"
              circle
              @click="rotate"
            />
            <el-button
              type="success"
              :icon="Check"
              circle
              @click="crop"
            />
            <el-button
              type="danger"
              :icon="Close"
              circle
              @click="panel = false"
            />
          </div>
        </div>
      </div>
    </div>
    <div>
      <!-- <div>
        <input
          id="change"
          type="file"
          accept="image/*"
          style="display: none"
          @change="change"
        >
        <div
          class="show"
          @mouseover="addClassload"
          @mouseout="removeClassload"
          @click="upload"
        >
          <div class="upload-btn-wrap">
            <img
              :src="uploadImage"
              alt=""
              style="display: inline-block"
            >
            <br>
            上传照片
          </div>
        </div>
      </div> -->
      <el-button type="primary" style="margin-left: 16px" @click="editPic">
        编辑
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Check,Close,ZoomIn,ZoomOut,Refresh} from '@element-plus/icons-vue'
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';
// import api from '@/api/conf.js'
import {getImgDate} from "@/utils/canvasImg"
const props = withDefaults(defineProps<{
  img_path?:undfined|string,
}>(),{
  img_path:'',
})
const headerImage = ref('')
const picValue = ref('')
const cropper = ref('')
const croppable = ref(false)
const panel = ref(false)
const url = ref('')
const color = ref('#d9d9d9')
const current = ref(0)
const uploadImage = '@/assets/images/upload-img.png'

async function editPic(){
  const params= {src:props.img_path}
  const blob = await getImgDate(params)
  console.log('blob',blob)
  panel.value = true
  picValue.value = blob
  url.value = blob
  // 每次替换图片要重新得到新的url
  if (cropper.value) {
    cropper.value.replace(url.value)
  }
  // console.log(url.value)
  panel.value = true
}
function addClassload(){
  color.value = '#1b95e0'
}
function removeClassload() {
  color.value = '#d9d9d9'
}
    // 点击按钮自动执行选择文件事件
function upload() {
  url.value = ''
  current.value = 0
  document.getElementById('change').value = null
  document.getElementById('change').click()
}
    // 旋转
function rotate() {
  // alert(cropper.value.image)
  current.value = (current.value + 90) % 360
  cropper.value.rotate(current.value)
}
// 缩放
function zoom(num) {
  num = num || 1
  cropper.value.zoom(num)
}

function getObjectURL(file) {
  var url = null
  if (window.createObjectURL !== undefined) {
    // basic
    url = window.createObjectURL(file)
  } else if (window.URL !== undefined) {
    // mozilla(firefox)
    url = window.URL.createObjectURL(file)
  } else if (window.webkitURL !== undefined) {
    // webkit or chrome
    url = window.webkitURL.createObjectURL(file)
  }
  return url
}
function change(e) {
  console.log(e.target.files[0].size, '图片大小')
  const files = e.target.files || e.dataTransfer.files
  if (!files.length) return
  panel.value = true
  picValue.value = files[0]
  url.value = getObjectURL(picValue.value)
  // 每次替换图片要重新得到新的url
  if (cropper.value) {
    cropper.value.replace(url.value)
  }
  // console.log(url.value)
  panel.value = true
}
function crop() {
  panel.value = false
  var croppedCanvas
  if (!croppable.value) {
    return
  }
  // Crop
  croppedCanvas = cropper.value.getCroppedCanvas()

  // croppedCanvas canvas的宽高
  headerImage.value = croppedCanvas.toDataURL('image/jpeg')

  postImg()
}
function dataURLtoFile(dataurl, filename = 'file') {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const suffix = mime.split('/')[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], `${filename}.${suffix}`, { type: mime })
}
function postImg() {
  // 图片的上传
  const file = dataURLtoFile(headerImage.value)
  const fileItem = {
    url: headerImage.value,
    file: file
  }
  download(headerImage.value)
  console.log('fileItem',fileItem)
}
function download(blob) {
  const {img_path} = props.resData||{}
  const a = document.createElement('a')
  a.download = ('1.png' || '111')
  a.href = blob
  a.click()
  a.remove()
}
onMounted(()=>{
    // 初始化这个裁剪框
    var image = document.getElementById('image')
    cropper.value = new Cropper(image, {
      aspectRatio: 1 / 1.4, // 裁剪比例
      // viewMode: 1,
      zoomOnWheel: true, // 是否允许通过鼠标滚轮来缩放图片
      background: true, // 是否在容器上显示网格背景
      rotatable: true, // 是否允许旋转图片
      autoCropArea: 1,
      ready: ()=> {
        croppable.value = true
      }
    })
})
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

.father {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 999999;
}
.i {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
#demo .show {
  cursor: pointer;
  border: 1px solid #d9d9d9;
  // border-radius: 10%;
  width: 120px;
  height: calc(120px * 1.4);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: inline-block;
  text-align: center;
  outline: none;
  background-position: center center;
  background-repeat: no-repeat;
  /* background-size: cover; */

  .upload-btn-wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    text-align: center;
    font-size: 14px;
    color: #909399;
    transform: translate(-50%, -50%);
  }
}
#demo .container {
  z-index: 99;
  height: 500px;
  width: 600px;
  position: fixed;
  /*padding-top: 60px;*/
  left: 30%;
  top: 20%;

  background-color: white;
}
#demo #image {
  max-width: 100%;
}
/* .cropper-view-box,.cropper-face {
    border-radius: 100%; 圆形截图设置
  }*/
/*!
   * Cropper.js v1.0.0-rc
   * https://github.com/fengyuanchen/cropperjs
   *
   * Copyright (c) 2017 Fengyuan Chen
   * Released under the MIT license
   *
   * Date: 2017-03-25T12:02:21.062Z
   */
.cropper-container {
  font-size: 0;
  line-height: 0;
  position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  direction: ltr;
  -ms-touch-action: none;
  touch-action: none;
}

.cropper-container img {
  /* Avoid margin top issue (Occur only when margin-top <= -height) */
  display: block;
  min-width: 0 !important;
  max-width: none !important;
  min-height: 0 !important;
  max-height: none !important;
  width: 100%;
  height: 100%;
  image-orientation: 0deg;
}
.cropper-wrap-box,
.cropper-canvas,
.cropper-drag-box,
.cropper-crop-box,
.cropper-modal {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.cropper-wrap-box {
  overflow: hidden;
}
.cropper-drag-box {
  opacity: 0;
  background-color: #fff;
}
.cropper-modal {
  opacity: 0.5;
  background-color: #000;
}
.cropper-view-box {
  display: block;
  overflow: hidden;
  width: 100%;
  height: 100%;
  outline: 1px solid #39f;
  outline-color: rgba(51, 153, 255, 0.75);
}

.cropper-dashed {
  position: absolute;
  display: block;
  opacity: 0.5;
  border: 0 dashed #eee;
}
.cropper-dashed.dashed-h {
  top: 33.33333%;
  left: 0;
  width: 100%;
  height: 33.33333%;
  border-top-width: 1px;
  border-bottom-width: 1px;
}
.cropper-dashed.dashed-v {
  top: 0;
  left: 33.33333%;
  width: 33.33333%;
  height: 100%;
  border-right-width: 1px;
  border-left-width: 1px;
}
.cropper-center {
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  width: 0;
  height: 0;
  opacity: 0.75;
}
.cropper-center:before,
.cropper-center:after {
  position: absolute;
  display: block;
  content: " ";
  background-color: #eee;
}
.cropper-center:before {
  top: 0;
  left: -3px;
  width: 7px;
  height: 1px;
}
.cropper-center:after {
  top: -3px;
  left: 0;
  width: 1px;
  height: 7px;
}
.cropper-face,
.cropper-line,
.cropper-point {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  opacity: 0.1;
}
.cropper-face {
  top: 0;
  left: 0;
  background-color: #fff;
}
.cropper-line {
  background-color: #39f;
}
.cropper-line.line-e {
  top: 0;
  right: -3px;
  width: 5px;
  cursor: e-resize;
}
.cropper-line.line-n {
  top: -3px;
  left: 0;
  height: 5px;
  cursor: n-resize;
}
.cropper-line.line-w {
  top: 0;
  left: -3px;
  width: 5px;
  cursor: w-resize;
}
.cropper-line.line-s {
  bottom: -3px;
  left: 0;
  height: 5px;
  cursor: s-resize;
}
.cropper-point {
  width: 5px;
  height: 5px;

  opacity: 0.75;
  background-color: #39f;
}
.cropper-point.point-e {
  top: 50%;
  right: -3px;
  margin-top: -3px;
  cursor: e-resize;
}
.cropper-point.point-n {
  top: -3px;
  left: 50%;
  margin-left: -3px;
  cursor: n-resize;
}
.cropper-point.point-w {
  top: 50%;
  left: -3px;
  margin-top: -3px;
  cursor: w-resize;
}
.cropper-point.point-s {
  bottom: -3px;
  left: 50%;
  margin-left: -3px;
  cursor: s-resize;
}
.cropper-point.point-ne {
  top: -3px;
  right: -3px;
  cursor: ne-resize;
}
.cropper-point.point-nw {
  top: -3px;
  left: -3px;
  cursor: nw-resize;
}
.cropper-point.point-sw {
  bottom: -3px;
  left: -3px;
  cursor: sw-resize;
}
.cropper-point.point-se {
  right: -3px;
  bottom: -3px;
  width: 20px;
  height: 20px;
  cursor: se-resize;
  opacity: 1;
}
@media (min-width: 768px) {
  .cropper-point.point-se {
    width: 15px;
    height: 15px;
  }
}
@media (min-width: 992px) {
  .cropper-point.point-se {
    width: 10px;
    height: 10px;
  }
}
@media (min-width: 1200px) {
  .cropper-point.point-se {
    width: 5px;
    height: 5px;
    opacity: 0.75;
  }
}
.cropper-point.point-se:before {
  position: absolute;
  right: -50%;
  bottom: -50%;
  display: block;
  width: 200%;
  height: 200%;
  content: " ";
  opacity: 0;
  background-color: #39f;
}
.cropper-invisible {
  opacity: 0;
}
.cropper-bg {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMzTjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC");
}
.cropper-hide {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
}
.cropper-hidden {
  display: none !important;
}
.cropper-move {
  cursor: move;
}
.cropper-crop {
  cursor: crosshair;
}
.cropper-disabled .cropper-drag-box,
.cropper-disabled .cropper-face,
.cropper-disabled .cropper-line,
.cropper-disabled .cropper-point {
  cursor: not-allowed;
}
</style>
