<script setup lang="ts">
import Tree from './Tree.vue'
const props = defineProps(['menu', 'children', 'depth', 'currSelect'])
const emit = defineEmits(['itemClick'])
const selectItem = (item: string[]) => {
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
    <div @click="$emit('itemClick', [menu.key])">{{ menu.text }}</div>

    <template v-if="currSelect?.includes(menu.key)">
      <Tree
        v-for="child of children"
        :key="child.key"
        :menu="child"
        :children="child.children"
        :depth="depth + 1"
        :currSelect="currSelect"
        @itemClick="selectItem"
      ></Tree>
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
