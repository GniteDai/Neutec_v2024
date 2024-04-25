<script setup lang="ts">
import { onMounted, ref, type Ref, watch } from 'vue'

const flashList = ref<number[]>([3, 5, 9])
const randomFlash = ref<boolean>(false)
let flashInterval: ReturnType<typeof setInterval> = 0
const flashingGrid: Ref<HTMLElement | null> = ref(null)
const balls: Ref<HTMLElement[]> = ref([])
const boxs: Ref<HTMLElement[]> = ref([])
let curr_Ball_Index: Ref<number> = ref(0)

watch(randomFlash, (newVal) => {
  if (newVal) {
    flashInterval = setInterval(() => {
      flashList.value = []
      const temp: number[] = []
      while (temp.length < 3) {
        const randomNum = Math.floor(Math.random() * 9) + 1
        if (temp.includes(randomNum)) {
          continue
        }
        temp.push(randomNum)
      }
      flashList.value = temp
    }, 2 * 1000)
  } else {
    clearInterval(flashInterval)
  }
})

const ballMove = (targets: number | number[]) => {
  if (typeof targets === 'number') {
    balls.value.forEach((ball) => {
      const ballRect = ball.getBoundingClientRect()
      ball.style.left = `${ballRect.left + targets}px`
    })
    return
  }
  if (Array.isArray(targets)) {
    const grid = flashingGrid.value?.getBoundingClientRect()
    if (!grid) {
      return
    }
    const boxsRect = targets.map((target) => boxs.value[target - 1].getBoundingClientRect())
    boxsRect.forEach((box, idx) => {
      balls.value[idx].style.left = `${calculateTargetPosition(box.left, grid.left, box.width)}px`
      balls.value[idx].style.top = `${calculateTargetPosition(box.top, grid.top, box.height)}px`
    })
    return
  }
}
const boxClick = (event: MouseEvent) => {
  if (curr_Ball_Index.value > 3) {
    curr_Ball_Index.value = 0
  }
  const grid = flashingGrid.value?.getBoundingClientRect()
  const box = (event.target as HTMLElement).getBoundingClientRect()
  if (!grid || !box) {
    return
  }
  balls.value[curr_Ball_Index.value].style.left =
    `${calculateTargetPosition(box.left, grid.left, box.width)}px`
  balls.value[curr_Ball_Index.value].style.top =
    `${calculateTargetPosition(box.top, grid.top, box.height)}px`
  curr_Ball_Index.value++
}
const randomMove = () => {
  const randomNum = Math.floor(Math.random() * 9) + 1 // random 1 ~ 9
  ballMove(new Array(4).fill(randomNum))
}
const calculateTargetPosition = (domAxis: number, parentGridAxis: number, domDimension: number) => {
  return domAxis - parentGridAxis + domDimension / 2
}

onMounted(() => {
  ballMove([1, 3, 7, 9])
})
</script>

<template>
  <div class="flashing-grid-area">
    <div class="example" @click="randomFlash = !randomFlash">
      <span class="hint">click here : </span>
      flashing random
      <span class="hint">{{ randomFlash ? 'stop' : 'start' }}</span>
    </div>
    <div class="example" @click="ballMove(270)">
      <span class="hint">click here : </span>
      All balls move to the right.
    </div>
    <div class="example" @click="randomMove">
      <span class="hint">click here : </span>
      Move all balls to random boxes.
    </div>

    <div class="flashing-grid" ref="flashingGrid">
      <div
        v-for="box in 9"
        :ref="(el) => boxs.push(el)"
        :key="box"
        class="flashing-item"
        :class="{ flashing: flashList.includes(box) }"
        @click="boxClick"
      ></div>
      <div v-for="ball in 4" :key="`ball-${ball}`" :ref="(el) => balls.push(el)" class="ball">
        {{ ball }}
      </div>
    </div>
    <span class="hint">hint: click box, ball move to box.</span>
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
.ball {
  width: 30px;
  height: 30px;
  background-color: #a5f12b;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  transition: all 1s linear;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate(-50%, -50%);
}
.example {
  padding: 4px 0;
}
.hint {
  color: red;
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
