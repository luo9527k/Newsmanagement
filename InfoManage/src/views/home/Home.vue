<template>
  <el-page-header content="首页" icon="" title="新闻管理系统" />

  <div class="mianbox">
    <el-tabs type="border-card" class="demo-tabs" style="margin-top: 20px;">
      <el-tab-pane>
        <template #label>
          <span class="custom-tabs-label">
            <span>用户属性</span>
          </span>
        </template>
        <el-card class="box-card">
          <el-row>
            <el-col :span="4">
              <el-avatar :size="100" :src="avatarUrl" /></el-col>
            <el-col :span="20">
              <h3 style="line-height: 100px;">欢迎{{ store.state.userInfo.username }}回来</h3>
            </el-col>
          </el-row>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="Config">Config</el-tab-pane>
      <el-tab-pane label="Role">Role</el-tab-pane>
      <el-tab-pane label="Task">Task</el-tab-pane>
    </el-tabs>
  </div>


  <!-- 轮播图 -->
  <div class="card-header">
    <!-- <span>新闻热点图片</span> -->
    <el-card class="box-card">
      新闻热点图片
    </el-card>
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in loopList" :key="item._id">
        <div :style="{ backgroundImage: `url(http://localhost:3000${item.cover})`, backgroundSize: 'cover' }">
          <h3 text="2xl" justify="center" class="title">{{ item.title }}</h3>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script setup>
import { useStore } from 'vuex'
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'


const loopList = ref([])
const store = useStore()


const avatarUrl = computed(() => store.state.userInfo.avatar ? 'http://localhost:3000' + store.state.userInfo.avatar : `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`)


onMounted(() => {
  getData()
})

const getData = async () => {
  const res = await axios.get(`/adminapi/product/list`)
  // console.log(res.data.data)
  loopList.value = res.data.data
  console.log(loopList.value)
}
</script>
<style lang="scss" scoped>
.box-card {
  margin: 10px;
}


.card-header {
  margin-top: 60px;

  span {
    margin: 30px 0;
  }
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0;
  line-height: 200px;
  height: 100%;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

</style>