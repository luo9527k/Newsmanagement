<template>
    <div>
        <el-page-header content="新闻列表" icon="" title="新闻管理"/>
        <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="title" label="标题" width="180" />

    <el-table-column prop="category" label="分类" width="180">
        <template #default="scope">
        {{ categoryFormat(scope.row.category) }}
        </template>
    </el-table-column>

    <el-table-column  label="更新时间" width="180">
        <template #default="scope">
        {{ timeFormat.getTime(scope.row.editTime) }}
        </template>
    </el-table-column>

    <el-table-column  label="是否发布" width="180">
        <template #default="scope">
            <el-switch v-model="scope.row.isPublish" 
            :active-value="1" :inactive-value="0"
            @change="handleSwithChange(scope.row)"
            />
        </template>
    </el-table-column>

    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" circle :icon="View" color="#ccc" @click="handlePreview(scope.row)"></el-button>
        <!-- 编辑新闻 -->
        <el-button size="small" circle :icon="EditPen" @click="handleEdit(scope.row)">
        
        </el-button>
        <el-popconfirm title="您确定要删除？"
        confirm-button-text="确定"
        cancel-button-text="取消"
        @confirm="handleDelete(scope.row)"
        >
        <template #reference>
        <el-button size="small" circle :icon="DeleteFilled" type="danger"></el-button>
        </template>
    </el-popconfirm>

      </template>
    </el-table-column>
</el-table>

<el-dialog
    v-model="dialogVisible"
    title="预览新闻"
    width="50%">
    <div>
    <h2>{{ previewData.title }}</h2>
    <span style="color:gray; size: 6px;"> {{ timeFormat.getTime(previewData.editTime) }}</span>

    <el-divider>
      <el-icon><star-filled /></el-icon>
    </el-divider>

    <div v-html="previewData.content" class="htmlImg"></div>
    </div>
</el-dialog>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import timeFormat from '@/util/timeFormat'
import {View,DeleteFilled,EditPen ,StarFilled} from '@element-plus/icons-vue'
//导入跳转路由钩子
import { useRouter } from 'vue-router'

const router=useRouter()
const tableData = ref([])
const previewData=ref({})
const dialogVisible=ref(false)

onMounted(() => {
    getTableData()
})

const getTableData =async () => {
    const res = await axios.get(`/adminapi/news/list`)
    // console.log(res.data.data)
    tableData.value=res.data.data
}

// 将信息格式化
const categoryFormat = (category) => {
    const arr = ["最新动态", "典型案例", "通知公告"]
    return arr[category-1]
}


// 开关回调函数
const handleSwithChange =async (item) => {
    // console.log(item)
    await axios.put(`/adminapi/news/publish`, { _id: item._id, isPublish: item.isPublish })
  await  getTableData()
}

// 预览
const handlePreview = (data) => {
    previewData.value = data
    dialogVisible.value=true
}

// 删除数据
const handleDelete = async(item) => {
    await axios.delete(`/adminapi/news/list/${item._id}`)
    await getTableData()
}


//编辑回调
const handleEdit = (item) => {
    //跳转到/news-mamage/editnews/：id
    router.push(`/news-manage/editnews/${item._id}`)
}
</script>

<style lang="scss">
.el-table{
    margin-top: 50px;
}
::v-deep .htmlImg{
img{max-width: 100%;}
}
</style>