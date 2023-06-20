<template>
    <el-page-header content="添加产品" icon="" title="产品管理" />
    <el-form ref="productFormRef" :model="productFrom" :rules="productFormRules" label-width="120px" class="demo-ruleForm">
        <el-form-item label="产品名称" prop="title">
            <el-input v-model="productFrom.title" />
        </el-form-item>

        <el-form-item label="产品简要描述" prop="introduction">
            <el-input v-model="productFrom.introduction" type="textarea" />
        </el-form-item>

        <el-form-item label="产品详情" prop="detail">
            <el-input v-model="productFrom.detail" type="textarea" />
        </el-form-item>

        <el-form-item label="封面" prop="cover">
            <Upload :avatar="productFrom.cover" @change="handleChange" />
        </el-form-item>

        <el-button class="btn" type="primary" @click="submitForm()">添加产品</el-button>
    </el-form>
</template>
<script setup>
import { ref, reactive } from 'vue'
import Upload from '@/components/upload/Upload.vue';
import upload from '@/util/upload';
import {useRouter } from 'vue-router';

const productFormRef = ref()
const productFrom = reactive({
    title: "",
    introduction: "",
    detail: "",
    cover: "",
    file: null,
})

const productFormRules = reactive({
    title: [
        { required: true, message: '请输入您的标题', trigger: 'blur' },
    ],
    introduction: [
        { required: true, message: '请输入您的产品描述', trigger: 'blur' },
    ],
    detail: [
        {
            required: true, message: "请输入您的产品详情", trigger: 'blur'
        }
    ],
    cover: [
        { required:true, message:"请添加您的产品封面", trigger:'blur'},
    ]
})


//选择图片后的回调
const handleChange = file => {
    productFrom.cover = URL.createObjectURL(file)
    productFrom.file = file
}

const router=useRouter()
const submitForm = () => {
    productFormRef.value.validate(async (valid) => {
        if (valid) {
            //提交到后端
            // console.log(productFrom)

            await upload("/adminapi/product/add",productFrom )
            router.push(`/product-manage/productlist`)
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