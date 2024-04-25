<script setup lang="ts">
import TreeNode from './Tree-Node.vue'
import { type MenuData } from '@/services/menu'

const props = defineProps(['menu', 'children', 'depth', 'currSelect'])
const emit = defineEmits(['itemClick'])

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

  emit('itemClick', [props.menu.key])
}
const childSelect = (item: string[]) => {
  item.unshift(props.menu.key)
  emit('itemClick', item)
}
</script>

<template>
  <div
    class="menu-item"
    :class="{ active: currSelect?.includes(menu.key) }"
    :style="{ transform: `translateX(${depth * 4}px)` }"
  >
    <div @click="menuSelect">{{ menu.text }}</div>

    <template v-if="currSelect?.includes(menu.key)">
      <TreeNode
        v-for="child of children"
        :key="child.key"
        :menu="child"
        :children="child.children"
        :depth="depth + 1"
        :currSelect="currSelect"
        @itemClick="childSelect"
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
