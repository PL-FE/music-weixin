<template>
  <view v-if="cursong.name">
    <view class="main-text text" :style="titleStyle">
      <text>{{ cursong.name }}</text>
    </view>
    <view class="text-center sub-text text ellipsis">{{
      cursong.artists.map((a) => a.name).join(" ")
    }}</view>
    <view
      class="img-play-container"
      :style="{ width: imgSize + 'px', height: imgSize + 'px' }"
    >
      <cover-image :src="clacSrc"></cover-image>
    </view>
  </view>
  <view class="playing-container-bg_filter" v-if="cursong.name"></view>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import { musicStore } from "@/store/index";

const musicinfo = musicStore();
const bgUrl = ref("");
const cursong = ref({} as songTypes);

const res = uni.getMenuButtonBoundingClientRect();

const titleStyle = ref({
  paddingTop: res.top + "px",
  lineHeight: res.height + "px",
});

const imgSize = 144;
const clacSrc = computed(() => {
  return cursong.value.album.picUrl + `?param=${imgSize}y${imgSize}`;
});

watchEffect(() => {
  if (musicinfo.curSong) {
    cursong.value = <songTypes>musicinfo.curSong;
    createBgMusic(cursong.value);
  }
  const _bgUrl = cursong.value?.album?.picUrl;
  if (_bgUrl) {
    bgUrl.value = `url(${_bgUrl}?param=${imgSize}y${imgSize})`;
  }
});

function createBgMusic(cursong: songTypes) {
  const bgAudioManager = uni.getBackgroundAudioManager();
  bgAudioManager.title = cursong.name;
  bgAudioManager.singer = cursong.artists.map((a) => a.name).join(" ");
  bgAudioManager.coverImgUrl = cursong.album.blurPicUrl;
  bgAudioManager.src = `https://music.163.com/song/media/outer/url?id=${cursong.id}.mp3`;
}
</script>

<style lang="scss">
.text {
  color: #fff;
}
.main-text {
  margin: 0 auto;
  text-align: center;
  width: 50%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.img-play-container {
  margin: 0 auto;
  margin-top: 20px;
  cover-image {
    border-radius: 10px;
  }
}
.playing-container-bg_filter {
  height: 100vh;
  width: 100vw;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: v-bind(bgUrl);
  filter: blur(20px);
  position: absolute;
  top: 0;
  z-index: -1;
}
</style>
