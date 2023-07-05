<template>
<div class="video-container">
   <video autoplay loop="true" preload="true" muted class="video" src="../assets/pexels-maksim-romashkin-12717007-3840x2160-25fps.mp4"></video>
    <div class="search-box">
        <a class="search-title" href="/">EXPLORE</a>
        <div class="search">
        <input type="text">
        <el-button size="large">搜索</el-button>
        </div>
    </div>
</div>
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="关注" name="first">关注</el-tab-pane>
        <el-tab-pane label="热点" name="second">热点</el-tab-pane>
        <el-tab-pane label="视频" name="third">视频</el-tab-pane>
        <el-tab-pane label="国际" name="fourth">国际</el-tab-pane>
      </el-tabs>
</template>
<script setup lang='ts'>
import { ref } from 'vue'
import {TabsPaneContext}  from 'vue';

const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
}
</script>
<style lang=less scoped>
.video-container{
     display: flex;
     height:0%;
    .video{
    position: relative;
    max-width: 100rem;
    max-height: 30rem;
    object-fit: cover;
    margin-inline:auto;
    background-size:100%;
    width: 100%;
    height: 39vh;
    min-height: 360px;
    z-index: 1;
    cursor: pointer;
    }
    .search-box{
        position: absolute;
        display: flex;
        flex-direction: column;
        transform: translate(50%,50%);
        width: 650px;
        height: 150px;
        z-index: 10;
        .search{
            display: flex;
            justify-content: space-between;
            justify-items: center;
            margin-left: 50px;
            width: 80%;
            height: 100%;
        }
        .search-title{
            display: block;
            font-size: 40px;
            margin:0 auto 20px;
            color: #fff;
            text-decoration: none;
        }
        .search input{ 
        display: flex;
        display: inline-block;
        flex-wrap: nowrap; 
        justify-content:space-between;
        margin: 0;
        width: 100%;
        height: 50%;
        line-height: 20px;
        border: 1px solid #fff;
        color: #222;
        background-color: #fff;
        border-radius: 8px;
        z-index: 10;
        outline: none;
        margin-right: 5px;
        }
    }
}

.el-tabs__item {
   padding: 0 50%;
}
</style>