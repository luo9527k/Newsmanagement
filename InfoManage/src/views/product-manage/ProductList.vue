<template>
    <div>
        <el-page-header content="产品列表" icon="" title="产品管理"/>
        <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="title" label="产品名称" width="180" />

    
    <el-table-column prop="introduction" label="产品名称" width="180" />

    <el-table-column  label="更新时间" width="180">
        <template #default="scope">
        {{ timeFormat.getTime(scope.row.editTime) }}
        </template>
    </el-table-column>

    <el-table-column label="操作">
      <template #default="scope">
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


    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import timeFormat from '@/util/timeFormat'
import {DeleteFilled,EditPen } from '@element-plus/icons-vue'
//导入跳转路由钩子
import { useRouter } from 'vue-router'

const router=useRouter()
const tableData = ref([])


onMounted(() => {
    getTableData()
})

const getTableData =async () => {
    const res = await axios.get(`/adminapi/product/list`)
    // console.log(res.data.data)
    tableData.value=res.data.data
}




// 删除数据
const handleDelete = async(item) => {
    await axios.delete(`/adminapi/product/list/${item._id}`)
    await getTableData()
}


//编辑回调
const handleEdit = (item) => {
    //跳转到/news-mamage/editnews/：id
    router.push(`/product-manage/editproduct/${item._id}`)
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