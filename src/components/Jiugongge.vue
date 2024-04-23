<script setup lang="ts">
import { ref } from 'vue'
const jiugongge = [1, 2, 3, 4, 5, 6, 7, 8, 9]
let target = ref([3, 5, 9])
const balls = ref([1, 3, 7, 9])
</script>

<template>
  <div class="jiugongge">
    <div
      v-for="item of jiugongge"
      :ref="`jiugongge-${item}`"
      :key="item"
      class="item"
      :class="{ target: target.includes(item) }"
    ></div>
    <div v-for="ball of balls" :key="`ball-${ball}`" class="ball">0</div>
  </div>
</template>

<style>
.jiugongge {
  position: relative;
  width: 100%;
  padding: 0.5rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  .item {
    position: relative;
    height: 100px;
    border: black solid 2px;
    background: radial-gradient(circle, rgba(113, 81, 95, 1) 81%, rgba(0, 0, 0, 1) 100%);
    &.target {
      &::after {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: #ffffff;
        animation: blink 1.5s infinite;
        content: '';
        opacity: 0;
      }
    }
  }
  .ball {
    width: 30px;
    height: 30px;
    background-color: #a5f12b;
    border-radius: 50%;
    position: absolute;
    left: 0;
    top: 0;
  }
}
@keyframes blink {
  25%,
  75% {
    opacity: 0.3;
  }

  0%,
  50%,
  100% {
    opacity: 0;
  }
}
</style>
