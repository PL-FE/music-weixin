<template>
  <view>
    <uni-search-bar
      :focus="true"
      bgColor="#fff"
      v-model="searchKey"
      placeholder="搜索"
    ></uni-search-bar>
    {{ searchKey }}
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
const searchKey = ref("");
</script>

<style lang="less"></style>
