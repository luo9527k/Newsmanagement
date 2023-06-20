<template>
    <div>
        <el-card>
        <el-page-header content="用户列表" icon="" title="用户管理" />
        <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="username" label="用户名" width="180" />

    <el-table-column label="头像" width="180">
    <template #default="scope">
            <div v-if="scope.row.avatar">
                <el-avatar :size="50" :src="'http://localhost:3000'+scope.row.avatar"></el-avatar>
            </div>
            <div v-else>
                <el-avatar :size="50" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
            </div>
      </template>
    </el-table-column>

    <el-table-column label="角色">
        <template #default="scope">
            <!-- {{ scope.row.role===1 ? '管理员' : '编辑' }} -->
            <el-tag v-if="scope.row.role===1" class="ml-2" type="success">管理员</el-tag>
            <el-tag v-else="scope.row.role===2">编辑</el-tag>
        </template>
    </el-table-column>

    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" @click="handleEdit( scope.row)"
          >编辑</el-button
        >
        <el-popconfirm title="您确定要删除？"
        confirm-button-text="确定"
        cancel-button-text="取消"
        @confirm="handleDelete(scope.row)"
        >
        <template #reference>
        <el-button
          size="small"
          type="danger"
          >删除</el-button>
          </template>
    </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>


  <el-dialog
    v-model="dialogVisible"
    title="编辑用户"
    width="50%"
  >

  <el-form ref="userFormRef" :model="userForm" :rules="userFormRules" label-width="120px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
            <el-input v-model="userForm.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <!-- autocomplete="off" -->
            <el-input v-model="userForm.password" type="password" />
        </el-form-item>
        <el-form-item label="角色" prop="role">
            <el-select v-model="userForm.role" class="m-2" placeholder="Select" size="small">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </el-form-item>

        <el-form-item label="个人简介" prop="intorduction">
            <el-input v-model="userForm.intorduction" type="textarea" />
        </el-form-item>
    </el-form>  

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleEditConfirm()">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>

    </el-card>
    </div>
</template>
<script setup>
import { ref ,onMounted,reactive} from 'vue'
import axios from 'axios'


const dialogVisible = ref(false)
const userFormRef = ref()
const userForm = reactive({
    username: "",
    password: "",
    role: 2,
    intorduction: ""
})

// userFormRules规则
const userFormRules = reactive({
    username: [
        { required: true, message: '请输入您的名字', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入您的密码', trigger: 'blur' },
    ],
    role: [
        {
            required: true, message: "请切换您的权限", trigger: 'blur'
        }
    ],
    intorduction: [
        { required: true, message: '请输入您的介绍', trigger: 'blur' },
    ]
})

const options = [{
    label: "管理员",
    value: 1
},
{
    label: "编辑",
    value: 2
}
]

const tableData = ref([])
onMounted(() => {
    getTableData()
})

const getTableData = async () => {
    const res = await axios.get("/adminapi/user/list")
    // console.log(res.data)
    tableData.value=res.data.data
}

//编辑按钮
const handleEdit =async data => {
    // console.log(data)
    const res = await axios.get(`/adminapi/user/list/${data._id}`)
    // userForm.value= res.data.data[0]

    // 方案二
    Object.assign(userForm,res.data.data[0])
    dialogVisible.value=true
}

//编辑确认回调
const handleEditConfirm = () => {
    userFormRef.value.validate(async (valid) => {
        if (valid) {
            //更新后端
            await axios.put(`/adminapi/user/list/${userForm._id}`, userForm)
            //dialog隐藏
            dialogVisible.value = false
            //重新获取数据更新
            getTableData()
        }
    })
}

//删除按钮
const handleDelete =async data => {
    // console.log(data)
    await axios.delete(`/adminapi/user/list/${data._id}`)

    // 删除数据
    getTableData()
}
</script>

<style lang="scss" scoped>
.el-table{
    margin-top: 50px;
}
</style>