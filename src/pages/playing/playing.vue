<template>
  <scroll-view scroll-y="true" class="scroll-Y" v-if="cursong.name">
    <view class="main-text text" :style="titleStyle">
      <text>{{ cursong.name }}</text>
    </view>
    <view class="text-center sub-text text ellipsis">{{
      cursong.artists.map((a) => a.name).join(" ")
    }}</view>

    <!-- 图片 -->
    <view
      class="img-play-container"
      @click="togetherPlay"
      :style="{
        backgroundImage: `url(${clacSrc})`,
        width: imgSize + 'rpx',
        height: imgSize + 'rpx',
      }"
    >
      <cover-image
        v-show="!musicinfo.isPlaying"
        src="/static/playCircle.png"
        class="icon"
      ></cover-image>
      <cover-image
        v-show="musicinfo.isPlaying"
        src="/static/pauseCircle.png"
        class="icon"
      ></cover-image>
    </view>

    <!-- 歌词 -->
    <LyricScrollView></LyricScrollView>

    <!-- 相似推荐 -->
    <SongList
      isDark
      :dataList="simiSongList"
      main-text="相似推荐"
      :navigator="navigatorFunc"
    />
  </scroll-view>
  <view class="playing-container-bg" v-if="cursong.name">
    <view class="playing-container-bg_filter"></view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import { musicStore } from "@/store/index";
import LyricScrollView from "@/components/LyricScrollView.vue";
import { getSimiSong } from "@/api/music";
import SongList from "@/components/SongList.vue";
const musicinfo = musicStore();
const bgUrl = ref("");
const bgUrlMini = ref("");
const cursong = ref({} as songTypes);
let bgAudioManager: any = null;

const res = uni.getMenuButtonBoundingClientRect();

const titleStyle = ref({
  paddingTop: res.top + "px",
  lineHeight: res.height + "px",
});

const imgSize = 440;
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
    bgUrlMini.value = `url(${_bgUrl}?param=10y10)`;
  }
});

function togetherPlay() {
  if (bgAudioManager.paused) {
    bgAudioManager.play();
  } else {
    bgAudioManager.pause();
  }
}

function createBgMusic(cursong: songTypes) {
  bgAudioManager = uni.getBackgroundAudioManager();
  musicinfo.setBgAudioManager(bgAudioManager);
  bgAudioManager.title = cursong.name;
  bgAudioManager.singer = cursong.artists.map((a) => a.name).join(" ");
  bgAudioManager.coverImgUrl = cursong.album.blurPicUrl;
  bgAudioManager.src = `https://music.163.com/song/media/outer/url?id=${cursong.id}.mp3`;
  bgAudioManager.onPlay(play);
  bgAudioManager.onPause(stop);
  bgAudioManager.onStop(stop);
  bgAudioManager.onEnded(stop);
  bgAudioManager.onTimeUpdate(onTimeUpdate);
  function play() {
    musicinfo.setPlay(true);
  }
  function stop() {
    musicinfo.setPlay(false);
  }
  function onTimeUpdate() {
    musicinfo.setSongTime(bgAudioManager.currentTime);
  }
}

// 相似歌曲

const simiSongList = ref<songTypes[]>([]);

getSimiSong(cursong.value.id).then((res) => {
  console.log(333, res);
  simiSongList.value = res.songs.slice(0, 3);
});
function navigatorFunc(song: songTypes) {
  musicinfo.setSong(song);
  uni.redirectTo({
    url: "/pages/playing/playing",
  });
}
</script>

<style lang="scss" scoped>
.text {
  color: #fff !important;
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
  margin-top: 40rpx;
  position: relative;
  border-radius: 20rpx;
  .icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 108rpx;
    height: 108rpx;
  }
}
.playing-container-bg {
  height: 100vh;
  width: 100vw;
  filter: brightness(0.3);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: v-bind(bgUrlMini);
  background-position: center;
  position: absolute;
  top: 0;
  z-index: -1;
  .playing-container-bg_filter {
    height: 100%;
    width: 100%;
    backdrop-filter: blur(60rpx);
  }
}
</style>
