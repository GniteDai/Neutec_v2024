<script setup lang="ts">
import { ref } from 'vue'
import { type MenuData } from '@/services/menu'
import { useMenuStore } from '@/stores/menu'

const menuStore = useMenuStore()
const isOpen = ref(false)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}
const closeDialog = () => {
  isOpen.value = false
}
const clickItem = (item: MenuData) => {
  menuStore.setCurrItem(item)
}
</script>

<template>
  <div class="dropdown" :class="{ open: isOpen }" v-click-outside="closeDialog">
    <div class="toggle" @click="toggleDropdown">
      <span>{{ menuStore.currItem ? menuStore.currItem.text : '請選擇' }}</span>
      <span class="arrow" :class="{ up: isOpen }"></span>
    </div>
    <ul class="drop-menu" v-if="isOpen">
      <li
        v-for="item of menuStore.dropdownList"
        :key="item.key"
        class="drop-menu-item"
        :class="{ highlight: menuStore.currItem?.key === item.key }"
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
  margin: 0 auto;
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
  max-height: 300px;
  overflow: auto;
  > li {
    padding: 2px 8px;
    &.highlight {
      color: yellow;
      background-color: gray;
    }
  }
}
</style>
