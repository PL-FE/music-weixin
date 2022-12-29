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
.ellipsis-2 {
  overflow: hidden;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.sign-text {
  font-size: 18rpx;
  border: 1px solid;
  padding: 0px 2rpx;
  font-weight: 900;

  &.vip {
    color: #21d49b;
    border-color: #21d49b;
  }
  &.sq {
    color: #e5b046;
    border-color: #e5b046;
  }
}
</style>
