<template>
    <el-container>
        <SideMenu></SideMenu>
        <el-container direction="vertical">
            <TopHeader></TopHeader>
            <el-main>
                <RouterView></RouterView>
            </el-main>
        </el-container>
    </el-container>
</template>
<script setup>
import TopHeader from '../components/mainbox/TopHeader.vue'
import SideMenu from '../components/mainbox/SideMenu.vue';

</script>
<style lang="scss" scoped>
.el-main {
    overflow: auto;
    height: calc(100vh - 60px);
}
</style>