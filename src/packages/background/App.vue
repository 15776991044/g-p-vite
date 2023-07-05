<template>
  <div>
      qqq
      <span @click="()=>{msgHandler({method_name: 'getAdvList', query: {page:1,page_size:10} })}">
        getAdvList
      </span>
      <span @click="()=>{msgHandler({method_name: 'getLoginCookie'})}">
        getbgCookie
      </span>
      <span @click="()=>{msgHandler({method_name: 'getLoginLocal', query:'bg_url'  })}">
        getLoginLocal
      </span>            
  </div>
</template>

<script setup>
import {msgHandler} from "@/chrome-api/index"
</script>

<style lang="scss">
</style>