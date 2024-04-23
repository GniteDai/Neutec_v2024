<script setup lang="ts">
import NavMenu from '@/components/NavMenu.vue'
import FlashingGrid from '@/components/FlashingGrid.vue'
</script>

<template>
  <div class="main-view">
    <div class="header">
      <NavMenu></NavMenu>
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
  }
}
</style>
