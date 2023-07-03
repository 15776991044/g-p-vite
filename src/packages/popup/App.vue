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
const navFlag = computed(() => {
  return  process.env.NODE_ENV == 'development'
})
</script>

<style lang="scss">
</style>