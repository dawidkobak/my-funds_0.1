<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <div class="w-full">
      <div class="flex flex-col">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped>
#app {
  width: 100%;
  min-height: 100vh;
  background-image: url('./assets/money.jpg');
}
</style>
