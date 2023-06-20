<template>
    <el-page-header content="添加用户" icon="" title="用户管理" />
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

        <el-form-item label="头像" prop="avatar">
            <Upload :avatar="userForm.avatar" @change="handleChange" />
        </el-form-item>

        <el-button class="btn" type="primary" @click="submitForm()">添加用户</el-button>
    </el-form>
</template>
<script setup>
import { ref, reactive } from 'vue'
import Upload from '@/components/upload/Upload.vue';
import upload from '@/util/upload';
import {useRouter } from 'vue-router';

const userFormRef = ref()
const userForm = reactive({
    username: "",
    password: "",
    role: 2,
    intorduction: "",
    avatar: "",
    gender:0,
    file: null,
})

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
    ],
    avatar: [
        { required:true, message:"请添加您的头像", trigger:'blur'},
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

//选择图片后的回调
const handleChange = file => {
    userForm.avatar = URL.createObjectURL(file)
    userForm.file = file
}

const router=useRouter()
const submitForm = () => {
    userFormRef.value.validate(async (valid) => {
        if (valid) {
            //提交到后端
            // console.log(userForm)
            await upload("/adminapi/user/add", userForm)

            router.push(`/user-manage/userlist/`)
        }
    })
}
</script>
<style lang="scss" scoped>
.demo-ruleForm {
    margin-top: 80px;
}

.btn {
    margin: 0 30%;
}
</style>