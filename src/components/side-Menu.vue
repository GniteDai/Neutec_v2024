<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getMenu, type MenuData } from '@/services/menu'
import { useMenuStore } from '@/stores/menu'
import TreeNode from './Tree-Node.vue'
import DropDown from '@/components/Drop-down.vue'

const menuStore = useMenuStore()
const dialogShow = ref(false)

const closeDialog = () => {
  dialogShow.value = false
}
const clearLocalStorage = () => {
  localStorage.removeItem('menu-selected')
  alert('success')
}

onMounted(() => {
  getMenu().then((dataList: MenuData[]) => {
    menuStore.setMenuList(dataList)
  })
})
</script>

<template>
  <div class="side-menu-box" v-click-outside="closeDialog">
    <div class="hamburger" @click="dialogShow = !dialogShow">
      <div class="bar"></div>
    </div>
    <Transition name="fade">
      <div v-if="dialogShow" class="dialog">
        <TreeNode
          v-for="menu of menuStore.menuList"
          :key="menu.key"
          :menu="menu"
          :children="menu.children"
          :depth="0"
        ></TreeNode>
        <div class="menu-item" @click="clearLocalStorage">Clear LocalStorage</div>
        <DropDown></DropDown>
      </div>
    </Transition>
  </div>
</template>

<style>
.side-menu-box {
  color: #000000;
}
.hamburger {
  margin-left: 8px;
  min-width: 32px;
  min-height: 32px;
  background-color: #efefef;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.bar,
.bar::after,
.bar::before {
  background: #222;
  content: '';
  display: block;
  height: 1px;
  position: absolute;
  transition: background ease .15s, top ease .15s .15s, transform ease .15s;
  width: 16px;
}
.bar::after {
  top: 6px;
}
.bar::before {
  top: -6px;
}
.dialog {
  position: fixed;
  right: 0;
  top: 0;
  width: 40%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 5;
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
