<template>
  <Navbar/>
  <router-view></router-view>
</template>
<script setup lang='ts'>
import Navbar from './components/Navbar.vue';
</script>
<style lang=less scoped>
*{
  margin: 0;
  padding: 0;
}
html{
  margin: 0;
  padding: 0;
}

::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  position: absolute;
}

::-webkit-scrollbar-thumb {
  background-color: #77bdff;
}

::-webkit-scrollbar-track {
  background-color: #ddd;
}
</style>