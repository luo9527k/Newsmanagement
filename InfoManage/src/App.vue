<template>
  <RouterView></RouterView>
</template>

<style lang="scss">
* {
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
