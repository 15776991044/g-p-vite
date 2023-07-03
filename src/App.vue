<template>
  <div>
    <el-config-provider namespace="ep">
      <Menu v-if="navFlag" />
      <router-view />
    </el-config-provider>
  </div>
</template>

<script setup>
import Menu from '@/components/Menu.vue'
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
const navFlag = computed(() => {
  return !qiankunWindow.__POWERED_BY_QIANKUN__ && process.env.NODE_ENV == 'development'
})
</script>

<style lang="scss">
</style>