<template>
  <div>
    <span v-for="(item,index) in pathList" :key="index" class="nav-item">
      <router-link :to="item.path">
        【{{ item.title||item.name||item.path }}】
      </router-link>
    </span>
  </div>

</template>


<script lang="ts" setup>
import { useRouter } from 'vue-router'
let router = useRouter()
const pathList = ref(router.options.routes)

</script>

<style scoped>
.nav-item{
  display: inline-block;
  padding-right: 30px;
}
</style>
