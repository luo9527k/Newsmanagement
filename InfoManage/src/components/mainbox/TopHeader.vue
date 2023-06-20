<template>
       <el-header>
              <div class="left">
                     <el-icon @click="handleCollapsed">
                            <Menu />
                     </el-icon>
                     <span style="margin-left:450px; font-size:20px;">新闻管理系统</span>
              </div>
              <div class="right">
                     <span>欢迎{{store.state.userInfo.username}}回来</span>

                     <el-dropdown>
                            <span class="el-dropdown-link">
                                   <el-icon size="30" color="white">
                                          <UserFilled />
                                   </el-icon>
                            </span>
                            <template #dropdown>
                                   <el-dropdown-menu>
                                          <el-dropdown-item @click="handleCenter">个人中心</el-dropdown-item>
                                          <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
                                   </el-dropdown-menu>
                            </template>
                     </el-dropdown>
              </div>
       </el-header>
</template>

<script setup>
import { Menu, UserFilled } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()


// 改变侧边栏状态
const handleCollapsed = () => {
       store.commit("changeCollapsed")
}

//路由进行跳转到center
const handleCenter = () => {
       router.push("/center")
}

//退出到登录页面
const handleLogout = () => {
       localStorage.removeItem("token")
       store.commit("clearUserInfo")
       router.push("/login")
}
</script>

<style lang="scss" scoped>
.el-header {
       background-color: #cccccc;
       width: 100%;
       height: 60px;
       line-height: 60px;
       display: flex;
       justify-content: space-between;
       align-items: center;
       color: white;
}

.left,
.right {
       display: flex;
}

.el-icon {
       margin: auto;
       cursor: pointer;
}

.el-dropdown {
       margin: auto;
       border: none;
}
</style>