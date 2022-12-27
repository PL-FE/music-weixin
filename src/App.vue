<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style lang="scss">
page {
  background-color: #fafafa;
}
.sub-text {
  font-size: 24rpx;
  opacity: 0.6;
}
.main-text {
  font-weight: 700;
  font-size: 32rpx;
}
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.text-center {
  text-align: center;
}
.ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
