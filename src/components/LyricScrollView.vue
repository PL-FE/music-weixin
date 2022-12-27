<template>
  <scroll-view
    :scroll-top="scrollTop"
    scroll-with-animation
    scroll-y="true"
    class="lyricView-container"
    :style="{ height: rowHeight * row + 'px' }"
    @scroll="handlerScroll"
  >
    <block v-if="lyrics.length">
      <view
        v-for="(row, idx) in lyrics"
        :key="row.time + idx"
        :style="{ lineHeight: rowHeight + 'px' }"
        class="row ellipsis"
        :class="{ highlightLyricIndex: highlightLyricIndex === idx }"
      >
        {{ row.lyric }}
      </view>
    </block>
    <view v-else class="g-no-data">暂无歌词..</view>
  </scroll-view>
</template>

<script setup lang="ts">
import { getLyric } from "@/api/music";
import { musicStore } from "@/store/index";
import { ref, watchEffect } from "vue";

interface lyricsType {
  lyric: string;
  time: number;
}

const musicInfo = musicStore();
const lyrics = ref<lyricsType[]>([]);
const highlightLyricIndex = ref(0);
const scrollTop = ref(0);
const rowHeight = 30;
const row = 3;
watchEffect(() => {
  const playSongId = musicInfo.curSong.id;
  if (!playSongId) return;
  getLyric(+playSongId).then((res: any) => {
    try {
      lyrics.value = useLyric(res.lrc.lyric);
    } catch (error) {
      console.error(error);
    }
  });
});
watchEffect(() => {
  const currentTime = musicInfo.songTime;

  if (!lyrics.value.length) return;
  for (let index in lyrics.value) {
    let idx = Number(index) - 1;
    const lyric = lyrics.value[index];
    // 匹配当前时间和歌词的时间
    if (currentTime + 0.5 <= lyric.time) {
      highlightLyricIndex.value = idx;
      // 拖动滚动条时，取消自动滚动
      if (!isScroll.value) {
        scrollTop.value = rowHeight * idx - rowHeight;
      }
      break;
    }
  }
});

const isScroll = ref(false);
let timer: any = null;
const handlerScroll = () => {
  isScroll.value = true;
  clearInterval(timer);
  timer = setTimeout(() => {
    isScroll.value = false;
  }, 1000);
};

function useLyric(lyric: string): lyricsType[] {
  const lyricList = lyric.split("\n");
  const lyricsObjArr = recordLyricTime(lyricList);
  return lyricsObjArr;
}

function recordLyricTime(lyricList: string[]) {
  const regTime = /\[\d{2}:\d{2}.\d{2,3}\]/;
  let lyricsObjArr: any[] = [];
  lyricList.forEach((item) => {
    if (item === "") return;
    const obj = {
      lyric: "",
      time: 0,
    };
    const time = item.match(regTime);

    obj.lyric =
      item.split("]")[1].trim() === "" ? "" : item.split("]")[1].trim();
    obj.time = time ? formatLyricTime(time[0].slice(1, time[0].length - 1)) : 0;
    if (obj.lyric === "") {
    } else {
      lyricsObjArr.push(obj);
    }
  });
  return lyricsObjArr;
}

function formatLyricTime(time: any) {
  // 格式化歌词的时间 转换成 sss:ms
  const regMin = /.*:/;
  const regSec = /:.*\./;
  const regMs = /\./;

  const min = parseInt(time.match(regMin)[0].slice(0, 2));
  let sec = parseInt(time.match(regSec)[0].slice(1, 3));
  const ms = time.slice(
    time.match(regMs).index + 1,
    time.match(regMs).index + 3
  );
  if (min !== 0) {
    sec += min * 60;
  }
  return Number(sec + "." + ms);
}
</script>

<style lang="scss" scoped>
.lyricView-container {
  overflow: auto;
  scroll-behavior: smooth;
  box-sizing: border-box;
  margin-top: 40rpx;
  color: #fff;
  text-align: center;
}

.row {
  opacity: 0.6;
}

.highlightLyricIndex {
  opacity: 1;
  color: #fff;
  font-weight: 700;
}
</style>
