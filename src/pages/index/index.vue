<template>
  <view class="search_input section_conatiner">
    <navigator
      url="/pages/search/search"
      open-type="navigate"
      class="navigator"
    >
      <uni-icons type="search" size="20" color="#c0c4cc"></uni-icons>
      <text class="placeholder_text">搜索</text>
    </navigator>
  </view>

  <!-- 歌曲推荐 -->
  <SongList
    :dataList="newSongList"
    main-text="歌曲推荐"
    :navigator="navigatorFunc"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getNewsong } from "@/api/music";
import SongList from "@/components/SongList.vue";
import { musicStore } from "@/store/index";
const musicinfo = musicStore();

const newSongList = ref<songTypes[]>([]);
getNewsong(5).then((res) => {
  newSongList.value = res;
});

function navigatorFunc(song: songTypes) {
  musicinfo.setSong(song);
  uni.navigateTo({
    url: "/pages/playing/playing",
  });
}
</script>

<style lang="scss" scoped>
$containerPadding: 10px;
.search_input {
  height: 90rpx;
  padding: 0 $containerPadding;
}
.search_input .navigator {
  background-color: #fff;
  box-sizing: border-box;
  height: 36px;
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
