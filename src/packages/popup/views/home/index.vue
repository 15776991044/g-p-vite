<template>
  <div style="width: 800px;">
    <div>
      后台地址：{{ bg_url }}
    </div>
    <el-button type="primary" @click="handleAdd()" >
      修改
    </el-button>
    <el-button type="primary" @click="getAuditList" >
      getAuditList
    </el-button>
    <el-button type="primary" @click="getbgCookie()" >
      getbgCookie
    </el-button>
    <AddDia ref="refAddDia" @handleUpdate="getAuditList" />
  </div>
</template>

<script setup lang="ts">
import { getbgUrl,getbgCookie } from "@/msg-api/reginst"

import AddDia from "./components/AddDia.vue"
const refAddDia = ref<InstanceType<typeof AddDia> | null>(null)
const bg_url=ref('')
// 更新页面
async function getAuditList(){
  bg_url.value =await getbgUrl('bg_url').catch(err=>{
    console.log(err)
    return ''})
  
}
try {
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    console.log("addListener...")
    console.log(request, sender, sendResponse)

  })
} catch (error) {
  console.log(error)
}

//新增
function handleAdd(){
  refAddDia.value?.showPage?.()
}


onMounted(() => {
  getAuditList()
})

</script>