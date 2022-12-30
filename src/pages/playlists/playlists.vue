<template>
  <scroll-view v-if="playlist" scroll-y class="playlists-conatiner">
    <view
      class="image-conatiner"
      :style="{ backgroundImage: `url(${playlist.coverImgUrl})` }"
    >
      <view class="bg-filter"></view>
      <view class="image-details-container">
        <view class="image-details-body">
          <image :src="playlist.coverImgUrl" class="img left"></image>
          <view class="right">
            <view class="">
              <text>{{ playlist.name }}</text>
              <view :style="{ marginTop: '20rpx' }">{{
                playlist.creator.nickname
              }}</view>
            </view>
            <view>简介</view>
          </view>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
import { getPlaylistDetail } from "@/api/music";
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";

const playlist = ref<playListTypes | null>(null);

onLoad((options: any) => {
  const id = +options.id;
  getPlaylistDetail(id).then((res) => {
    playlist.value = res.playlist;
  });
});
</script>

<style lang="scss" scoped>
.playlists-conatiner {
  height: 100vh;
}
.image-conatiner {
  position: relative;
  height: 400rpx;
  background-size: cover;
  background-repeat: no-repeat;
  .bg-filter {
    backdrop-filter: brightness(0.5);
    width: 100%;
    position: absolute;
    height: 100%;
  }
  .image-details-container {
    display: flex;
    align-items: center;
    position: relative;
    height: 100%;
    padding: 0 40rpx;
    .image-details-body {
      flex: 1;
      display: flex;

      .right {
        flex: 1;
        color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .img {
        width: 240rpx;
        height: 240rpx;
        border-radius: 40rpx;
        margin-right: 40rpx;
      }
    }
  }
}
</style>
