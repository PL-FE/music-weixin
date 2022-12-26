<template>
  <image
    :src="clacSrc"
    :style="{
      width: size + 'px',
      height: size + 'px',
    }"
  ></image>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  src: String,
  size: {
    type: Number,
    default: 50,
  },
});
const clacSrc = computed(() => {
  return props.src + `?param=${props.size}y${props.size}`;
});
</script>

<style lang="scss">
.content {
  color: red;
}
</style>
