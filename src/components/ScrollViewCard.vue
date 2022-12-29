<template>
  <view class="section_conatiner song_recommendation" :class="{ dark: isDark }">
    <view class="section_conatiner-top">
      <uni-title type="h1" :title="props.mainText"></uni-title>

      <!-- <view class="flex-center sub-text">
        <text>更多 </text>
        <uni-icons type="forward" size="15" color="#999"></uni-icons>
      </view> -->
    </view>
    <scroll-view scroll-x class="scroll-view-container">
      <view
        v-for="item in dataList"
        :key="item.id"
        @click="navigator(item)"
        open-type="navigate"
        class="playlist-body"
        :style="{ width: '240rpx' }"
      >
        <view class="playlist-card">
          <SongAvatar
            class="playlist-img"
            :src="item.coverImgUrl"
            :size="240"
          ></SongAvatar>
          <text class="playCount"> {{ wrapCount(item.playCount) }}</text>
        </view>
        <view class="playlist-name">
          {{ item.name }}
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import SongAvatar from "./SongAvatar.vue";
interface Props {
  dataList: playListTypes[];
  mainText?: string;
  isDark?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  dataList: () => [],
  mainText: "",
  isDark: false,
});

const navigator = (item: playListTypes) => {
  uni.navigateTo({
    url: "/pages/playlists/playlists",
  });
};

function wrapCount(count: number) {
  let s = count + "";
  const len = s.length;
  if (len > 9) {
    return s.slice(0, -9) + "亿";
  } else if (len > 4) {
    return s.slice(0, -4) + "万";
  } else {
    return s;
  }
}
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

.scroll-view-container {
  white-space: nowrap;

  .playlist-body {
    overflow: hidden;
    margin: 20rpx;
    display: inline-flex;
    overflow: hidden;
    flex-direction: column;

    .playlist-card {
      display: inline-flex;
      align-items: center;
      border-radius: 20rpx;
      position: relative;

      .playlist-img {
        font-size: 0;
      }

      .playCount {
        background-color: rgba(0, 0, 0, 0.4);
        border-radius: 20rpx;
        font-size: 24rpx;
        color: #fff;
        padding: 4rpx 18rpx;
        position: absolute;
        bottom: 0;
        right: 0;
      }
    }
    .playlist-name {
      white-space: normal;
    }
  }
}
</style>
