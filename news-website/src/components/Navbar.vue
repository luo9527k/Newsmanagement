<template>
<div class="navbar">
   <el-menu
        :default-active="route.fullPath"
        class="el-menu-demo"
        mode="horizontal"
        :router="true"
      >
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/news">新闻中心</el-menu-item>
        <el-menu-item index="/product">新闻管理</el-menu-item>
        <el-menu-item @click="handleClick" class="login">登录</el-menu-item>
    </el-menu>
</div>

</template>
<script setup lang='ts'>
import {useRoute} from 'vue-router';
const route=useRoute()

const handleClick=()=>{
  window.location.href = "http://localhost:8081"
}


</script>
<style lang=less scoped>
.navbar{
  margin: 0;
  padding: 0;
  position: sticky;
  top: 0;
  z-index: 9999;
  .login{
    position: fixed;
    height: 58px;
    top: 0;
    right: 20px;
    line-height: 58px;
    text-align: center;
  }
}

</style>