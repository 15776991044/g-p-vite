<template>
  <div style="width: 800px;">
    <el-button type="primary" @click="handleAdd()" >
      修改
    </el-button>
    <AddDia ref="refAddDia" @handleUpdate="getAuditList" />
  </div>
</template>

<script setup lang="ts">
import AddDia from "./components/AddDia.vue"
const refAddDia = ref<InstanceType<typeof AddDia> | null>(null)

// 更新页面
function getAuditList(){
}

//新增
function handleAdd(){
  refAddDia.value?.showPage?.()
}


onMounted(() => {
  getAuditList()
})

</script>