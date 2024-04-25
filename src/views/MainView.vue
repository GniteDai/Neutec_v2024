<script setup lang="ts">
import sideMenu from '@/components/side-Menu.vue'
import FlashingGrid from '@/components/FlashingGrid.vue'
</script>

<template>
  <div class="main-view">
    <div class="header">
      <sideMenu></sideMenu>
    </div>
    <FlashingGrid></FlashingGrid>
  </div>
</template>

<style>
.main-view {
  width: 100%;
  height: 100%;
  background-color: #d6d6d6;
  display: flex;
  flex-direction: column;

  .header {
    position: relative;
    background-color: #ffffff;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
