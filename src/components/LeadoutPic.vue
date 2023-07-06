<template>
  <div>
    <el-link
      type="primary"
      style="padding:0px 10px"
      @click="leadoutPic"
    >导出带框图片 </el-link>
  </div>
</template>

<script setup lang="ts">
import {getImgDate} from "@/utils/canvasImg"
const props = withDefaults(defineProps<{
  resData?:undfined|object,
}>(),{
  resData:()=>{return{}},
})
const btnLoading= ref(false)
const imgDict = ref({})
async function leadoutPic(){
  const {img_path} = props.resData||{}
  const params= {src:img_path}
  const blob = await getImgDate(params)
  console.log('blob',blob)
  download(blob)
}
function download(blob) {
  const {img_path} = props.resData||{}
  const a = document.createElement('a')
  a.download = ('1.png' || '111')
  a.href = blob
  a.click()
  a.remove()
}

</script>
