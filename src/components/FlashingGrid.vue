<script setup lang="ts">
import { ref, watch } from 'vue'
const dataList: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const target = ref<number[]>([3, 5, 9])
const randomFlash = ref<boolean>(false)
let flashInterval: ReturnType<typeof setInterval> = 0

watch(randomFlash, (newVal) => {
  if (newVal) {
    flashInterval = setInterval(() => {
      target.value = []
      const temp: number[] = []
      while (temp.length < 3) {
        const randomNum = Math.floor(Math.random() * 9) + 1
        if (temp.includes(randomNum)) {
          continue
        }
        temp.push(randomNum)
      }
      target.value = temp
    }, 2 * 1000)
  } else {
    clearInterval(flashInterval)
  }
})

const balls = ref([1, 3, 7, 9])
</script>

<template>
  <div class="flashing-grid-area">
    <div @click="randomFlash = !randomFlash">random {{ randomFlash ? 'stop' : 'start' }}</div>
    <div class="flashing-grid">
      <div
        v-for="data of dataList"
        :ref="`box-${data}`"
        :key="data"
        class="flashing-item"
        :class="{ flashing: target.includes(data) }"
      ></div>
      <div v-for="ball of balls" :key="`ball-${ball}`" class="ball">0</div>
    </div>
  </div>
</template>

<style>
.flashing-grid-area {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.flashing-grid {
  position: relative;
  width: 100%;
  padding: 0.5rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;

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
.flashing-item {
  position: relative;
  height: 100px;
  border: black solid 2px;
  background: radial-gradient(circle, rgba(113, 81, 95, 1) 81%, rgba(0, 0, 0, 1) 100%);
}
.flashing {
  animation: flash 1s infinite;
}

@keyframes flash {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}
</style>
