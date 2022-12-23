<template>
  <view class="search_input">
    <navigator
      url="/pages/search/search"
      open-type="navigate"
      class="navigator"
    >
      <uni-icons type="search" size="20" color="#c0c4cc"></uni-icons>
      <text class="placeholder_text">搜索</text>
    </navigator>
  </view>
</template>

<script setup lang="ts"></script>

<style lang="less">
.search_input {
  height: 90rpx;
  padding: 10rpx;
}
.search_input .navigator {
  background-color: #fff;
  box-sizing: border-box;
  height: 36px;
  padding: 5px 8px 5px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15rpx;
  color: #999;
  font-size: 32rpx;
  border-radius: 100rpx;

  .placeholder_text {
    margin-left: 10rpx;
  }
}
</style>
