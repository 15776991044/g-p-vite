<template>
	<div class="head">
    <div class="tool-box">
      <el-button type="primary" style="margin-left: 16px" @click="drawer = true">
        查看图片列表
      </el-button>
      <el-button type="primary" style="margin-left: 16px" @click="getAdvList">
        发送请求
      </el-button> 
      <el-button type="primary" style="margin-left: 16px" @click="getaaa">
        geta
      </el-button> 
      <el-button type="primary" @click="getAuditList" >
        getAuditList
        {{ bg_url }}
      </el-button>
      <el-button type="primary" @click="getLoginCookie" >
        getLoginCookie
      </el-button>     
    </div>

    <el-drawer
      v-model="drawer"
      title="图片列表"
      :direction="rtl"
    >
      <el-button type="primary" style="margin-left: 16px" @click="getUrlList">
        更新图片列表
    </el-button>
    <div v-for="(item,index) in imgList" :key="index" >
      <img class="add-img" style="width: 100px; height: auto" :src="item.src"  />
      <span>{{ item.src }}</span>
      <el-button type="primary" style="margin-left: 16px" @click="()=>{dialog.visible=true}">
        编辑
      </el-button>
    </div>
    </el-drawer>  
    <el-dialog
      :title="'编辑'"
      v-model="dialog.visible"
      width="60%"
    >
     <AddEditPerson v-if="dialog.visible"/>  
    </el-dialog>
	</div>
</template>

<script setup>
import AddEditPerson from "@/packages/content/views/add-edit/index.vue"
import { getAdvList,geta,getLoginLocal,getLoginCookie  } from "@/chrome-api/send-msg"

const drawer = ref(false)
const imgList=ref([])
const bg_url=ref("")
function getUrlList(){
  imgList.value=document?.querySelectorAll('img:not(.add-img)')
  console.log('imgList.value',imgList.value)
}
async function getAuditList(){
  bg_url.value =await getLoginLocal('bg_url').catch(err=>{
    console.log(err)
  return ''})
  
}
async function getaaa(){
  console.log(await geta())
}
const dialog = reactive({
  visible: false,
});

</script>

<style lang="scss" scoped>
.tool-box{
  position: fixed;
  right:0;
  top:40px;
  padding: 40px;
  background: #fff;
  z-index: 2000;
}
</style>