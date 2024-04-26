<script setup lang="ts">
import TreeNode from './Tree-Node.vue'
// import { type MenuData } from '@/services/menu'
import { useMenuStore } from '@/stores/menu'

const menuStore = useMenuStore()

const props = defineProps(['menu', 'children', 'depth'])

const menuSelect = () => {
  // 側邊選單 - 點擊後該項目的子層級存在, 自動全選子層級所有.
  // const ans: string[] = []
  // const queue: MenuData[] = [props.menu]
  // while (queue.length) {
  //   const curr: MenuData = queue.shift()
  //   ans.push(curr.key)
  //   if (curr.children?.length) {
  //     queue.push(...curr.children)
  //   }
  // }
  // emit('itemClick', ans)
  menuStore.setCurrItem(props.menu)
}
</script>

<template>
  <div
    class="menu-item"
    :class="{ active: menuStore.highlightList?.includes(menu.key) }"
    :style="{ transform: `translateX(${depth * 4}px)` }"
  >
    <div @click="menuSelect">{{ menu.text }}</div>

    <template v-if="menuStore.highlightList?.includes(menu.key)">
      <TreeNode
        v-for="child of children"
        :key="child.key"
        :menu="child"
        :children="child.children"
        :depth="depth + 1"
      ></TreeNode>
    </template>
  </div>
</template>

<style>
.menu-item {
  padding: 4px 8px;
  color: #ffffff;
  &.active {
    color: yellow;
    background-color: #808080;
  }
}
</style>
