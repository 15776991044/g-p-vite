<!-- setup 无法设置组件名称，组件名称keepAlive必须 -->
<script lang="ts">

export default {
  name: "home",
};
</script>
<script setup lang="ts">
// import {post} from '@/utils/request';
// post(`/taskapi/detail/search`, {page:1,page_size:3,status:[0]}, false)
</script>

<template>
  <div>home

    <div v-actionpermission="'[system:user:add]'">按钮权限</div>
  </div>
</template>

