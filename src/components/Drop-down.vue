<script setup lang="ts">
import { ref } from 'vue'
import { getMenu, type MenuData } from '@/services/menu'

const isOpen = ref(false)
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}
const vClickOutside = {
  mounted: (el, binding) => {
    el.clickOutsideEvent = function (event) {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event)
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  beforeUnmount: (el) => {
    document.removeEventListener('click', el.clickOutsideEvent)
  }
}
const closeDialog = () => {
  isOpen.value = false
}

const items = ref<MenuData[]>([])
getMenu().then((dataList: MenuData[]) => {
  const res: MenuData[] = []
  const dfs = (node: MenuData) => {
    res.push(node)
    if (node.children) {
      node.children.forEach((child) => dfs(child))
    }
  }
  dataList.forEach((data) => dfs(data))
  items.value = res
})

const currItem = ref<MenuData>()
const clickItem = (item: MenuData) => {
  currItem.value = item
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="dropdown" :class="{ open: isOpen }" v-click-outside="closeDialog">
    <div class="toggle" @click="toggleDropdown">
      <span>{{ currItem ? currItem.text : '請選擇' }}</span>
      <span class="arrow" :class="{ up: isOpen }"></span>
    </div>
    <ul class="drop-menu" v-if="isOpen">
      <li
        v-for="item of items"
        :key="item.key"
        class="drop-menu-item"
        :class="{ highlight: currItem?.key === item.key }"
        @click="clickItem(item)"
      >
        {{ item.text }}
      </li>
    </ul>
  </div>
</template>

<style>
.dropdown {
  position: relative;
  width: 140px;
}

.toggle {
  cursor: pointer;
  padding: 4px 10px;
  background-color: #ffffff;
  border: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.arrow {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 5px 5px 0 5px;
  border-color: #000 transparent transparent transparent;
  transition: transform 0.3s;
  margin-left: 8px;
}

.arrow.up {
  transform: rotate(180deg);
}

.drop-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  z-index: 5;
  > li {
    padding: 2px 8px;
    &.highlight {
      color: yellow;
      background-color: gray;
    }
  }
}
</style>
