<template>
  <view class="section_conatiner song_recommendation" :class="{ dark: isDark }">
    <view class="section_conatiner-top">
      <uni-title type="h1" :title="props.mainText"></uni-title>
      <!-- <view class="flex-center sub-text">
        <text>更多 </text>
        <uni-icons type="forward" size="15" color="#999"></uni-icons>
      </view> -->
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
            <text v-if="song.sqMusic" class="sign-text sq"> SQ </text>
            <text v-if="song.fee === 1" class="sign-text vip"> vip </text>
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
interface Props {
  dataList: songTypes[];
  mainText?: string;
  navigator?: Function;
  isDark?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  dataList: () => [],
  mainText: "",
  isDark: false,
});

const musicinfo = musicStore();
const navigator = (song: songTypes) => {
  musicinfo.setSong(song);
  uni.navigateTo({
    url: "/pages/playing/playing",
  });
};
</script>

<style lang="scss">
$containerPadding: 20rpx;

.dark {
  color: #fff;
}

.section_conatiner {
  margin-top: 20rpx;
  .section_conatiner-top {
    padding: 0 $containerPadding;
    display: flex;
    justify-content: space-between;
    .left {
      font-weight: 700;
      font-size: 32rpx;
    }
  }
}

.song-card {
  margin: 20rpx;
  margin-bottom: 20rpx;
  display: flex;
  align-items: center;
  .song-img {
    padding-right: $containerPadding;
  }
  .song-details {
    flex: 1;
    overflow: hidden;
    padding-right: 10rpx;
  }
  .song-sub-details {
    white-space: nowrap;
    padding-top: 6rpx;
  }
}
</style>
