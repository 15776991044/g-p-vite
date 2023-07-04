<template>
  <div>
      qqq
      <span @click="()=>{storageBgUrl({type: 'methods',url: 'storageBgUrl', data: {a:1} })}">
          sss
      </span>
      <span @click="()=>{storageBgUrl({type: 'methods',url: 'getbgCookie'})}">
        getbgCookie
      </span>
      <span @click="()=>{storageBgUrl({type: 'methods',url: 'getLocal', data:'bg_url'  })}">
          sss
      </span>            
  </div>
</template>

<script setup>
import {storageBgUrl} from "@/bg-api/index"
</script>

<style lang="scss">
</style>