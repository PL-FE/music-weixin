<template>
  <view class="section_conatiner song_recommendation">
    <view class="section_conatiner-top">
      <text class="main-text">歌曲推荐</text>
      <view class="flex-center sub-text">
        <text>更多 </text>
        <uni-icons type="forward" size="15" color="#999"></uni-icons>
      </view>
    </view>
    <view
      v-for="song in dataList"
      :key="song.id"
      @click="navigator(song)"
      :url="'/pages/playing/playing?id=' + song.id"
      open-type="navigate"
      class="navigator"
    >
      <view class="song-card">
        <SongAvatar class="song-img" :src="song.album.picUrl"></SongAvatar>
        <view class="song-details">
          <view
            ><text>{{ song.name }}</text>
          </view>
          <view class="song-sub-details sub-text">
            <text>{{ song.artists.map((a) => a.name).join("") }}</text
            >·
            <text>
              {{ song.album.name }}
            </text>
          </view>
        </view>
        <view class="sub-text">
          <uni-icons type="forward" size="20" color="#999"></uni-icons>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import SongAvatar from "./SongAvatar.vue";
import { musicStore } from "@/store/index";
const musicinfo = musicStore();
interface Props {
  dataList: songTypes[];
}
withDefaults(defineProps<Props>(), {
  dataList: () => [],
});

const navigator = (song: songTypes) => {
  musicinfo.setSong(song);
  uni.navigateTo({
    url: "/pages/playing/playing",
  });
};
</script>

<style lang="scss">
$containerPadding: 10px;

.section_conatiner {
  margin-top: 10px;
  .section_conatiner-top {
    padding: 0 $containerPadding;
    display: flex;
    justify-content: space-between;
    .left {
      font-weight: 700;
      font-size: 16px;
    }
  }
}

.song-card {
  margin: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  .song-img {
    padding-right: $containerPadding;
  }
  .song-details {
    flex: 1;
    overflow: hidden;
    padding-right: 5px;
  }
  .song-sub-details {
    white-space: nowrap;
    padding-top: 3px;
  }
}
</style>
