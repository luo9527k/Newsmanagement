<template>
    <div>
        <el-page-header content="个人中心" icon="" title="新闻管理系统" />

        <el-row :gutter="20" class="el-row">
            <el-col :span="8">
                <el-card class="box-card">
                    <el-avatar :size="100" :src="avatarUrl" />
                    <h3>{{ store.state.userInfo.username }}</h3>
                    <h5>{{ store.state.userInfo.role == 1 ? '管理员' : '编辑' }}</h5>
                </el-card>
            </el-col>
            <!-- 表单 -->
            <el-col :span="16">
                <el-card>
                    <template #header>
                        <div class="card-header">
                            <span>个人信息</span>
                        </div>
                    </template>
                    <el-form ref="userFormRef" :model="userForm" :rules="userFormRules" label-width="120px"
                        class="demo-ruleForm">
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="userForm.username" />
                        </el-form-item>
                        <el-form-item label="性别" prop="gender">
                            <el-select v-model="userForm.gender" class="m-2" placeholder="Select" size="small">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="个人简介" prop="intorduction">
                            <el-input v-model="userForm.intorduction" type="textarea" />
                        </el-form-item>

                        <el-form-item label="头像" prop="avatar">
                           <Upload :avatar="userForm.avatar"
                           @change="handleChange"/>
                        </el-form-item>
                    </el-form>
                    <el-button class="btn" type="primary" @click="submitForm()">提交更改</el-button>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script setup>
import { useStore } from 'vuex'
import { computed, ref, reactive } from 'vue'

import { ElMessage } from 'element-plus';
import upload from '@/util/upload';
import Upload from '@/components/upload/Upload'

const store = useStore()
const avatarUrl = computed(() => store.state.userInfo.avatar ? 'http://localhost:3000' + store.state.userInfo.avatar : `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`)


const { username, gender, intorduction, avatar } = store.state.userInfo
const userFormRef = ref()
const userForm = reactive({
    username,
    gender,
    intorduction,
    avatar,
    file: null
})

const userFormRules = reactive({
    username: [
        { required: true, message: '请输入您的名字', trigger: 'blur' },
    ],
    gender: [
        { required: true, message: '请输入您的性别', trigger: 'blur' },
    ],
    intorduction: [
        { required: true, message: '请输入您的介绍', trigger: 'blur' },
    ],
    avatar: [
        { required: true, message: '请上传头像', trigger: 'blur' },
    ],
})

// 性别
const options = [
    {
        label: "秘密",
        value: 0
    },
    {
        label: "男",
        value: 1
    },
    {
        label: '女',
        value: 2
    }
]


//选择图片后的回调
const handleChange = file => {
    userForm.avatar = URL.createObjectURL(file)
    userForm.file = file
}

//提交更新
const submitForm = () => {
    userFormRef.value.validate(async (valid) => {
        if (valid) {
            // console.log("submit", userForm)
            const res = await upload("/adminapi/user/upload", userForm)
            if (res.ActionType == "OK") {
                store.commit("changeUserInfo", res.data)
                ElMessage.success("更新成功")
            }
        }
    })
}

</script>

<style lang="scss" scoped>
.el-row {
    margin-top: 30px;

    .box-card {
        width: 300px;
        height: 240px;
        border-radius: 40px;
        letter-spacing: 0.5em;
        display: flex;
        justify-content: center;
        justify-items: center;
        box-shadow: 0 0 30px 10px rgba(0, 0, 0, .3);
    }
}


</style>