<script setup lang="ts">
import NavMenu from '@/components/NavMenu.vue'
// import Jiugongge from '@/components/Jiugongge.vue'
</script>

<template>
  <main>
    <div class="header">
      <NavMenu></NavMenu>
    </div>
    <Jiugongge></Jiugongge>
  </main>
</template>

<style>
main {
  width: 100%;
  height: 100%;
  background-color: #d6d6d6;

  .header {
    position: relative;
    background-color: #ffffff;
  }
}
</style>
