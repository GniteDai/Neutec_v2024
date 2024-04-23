<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getMenu, type MenuData } from '@/services/menu'
import Tree from './Tree.vue'
const dialogShow = ref(false)
const menuList = ref<MenuData[]>([])
const currSelect = ref<String[]>([])
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
  dialogShow.value = false
}
const selectItem = (item: String[]) => {
  currSelect.value = item
  localStorage.setItem('menu-selected', JSON.stringify(item)) // 側邊選單 - 2.記憶功能
}
getMenu().then((dataList: MenuData[]) => {
  menuList.value = dataList
})

const clearLocalStorage = () => {
  localStorage.removeItem('menu-selected') // 側邊選單 - 2.記憶功能
}

onMounted(() => {
  if (localStorage.getItem('menu-selected')) {
    currSelect.value = JSON.parse(localStorage.getItem('menu_selected')) // 側邊選單 - 2.記憶功能
  }
})
</script>

<template>
  <div class="nav-box" v-click-outside="closeDialog">
    <div class="button" @click="dialogShow = !dialogShow">X</div>
    <Transition name="fade">
      <div v-if="dialogShow" class="dialog">
        <Tree
          v-for="menu of menuList"
          :key="menu.key"
          :menu="menu"
          :children="menu.children"
          :depth="0"
          :currSelect="currSelect"
          @itemClick="selectItem"
        ></Tree>
        <div @click="clearLocalStorage">Clear LocalStorage</div>
      </div>
    </Transition>
  </div>
</template>

<style>
.nav-box {
  min-width: 32px;
  min-height: 32px;
  background-color: #efefef;
  color: #000000;
  width: fit-content;
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.dialog {
  position: fixed;
  right: 0;
  top: 0;
  width: 40%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 5;
  .menu-item {
    color: #ffffff;
    &.active {
      color: yellow;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}

.fade-enter-to,
.fade-leave-from {
  transform: translateX(0%);
}

.fade-enter-from,
.fade-leave-to {
  transform: translateX(100%);
}
</style>
