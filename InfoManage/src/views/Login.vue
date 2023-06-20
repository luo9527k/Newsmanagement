<template>
    <!-- 导入粒子背景 -->
    <div>
        <vue-particles class="lizi" color="#5f64c2" :particleOpacity="0.7" :particlesNumber="100" shapeType="star"
            :particleSize="6" linesColor="#48a3c2" :linesWidth="1" :lineLinked="true" :lineOpacity="0.4"
            :linesDistance="150" :moveSpeed="3" :hoverEffect="true" hoverMode="grab" :clickEffect="true" clickMode="push">
        </vue-particles>
    </div>
    <!-- 中心透明表单 -->
    <div class="fromContainer">
        <h3>新&nbsp闻&nbsp管&nbsp理&nbsp后&nbsp台</h3>
        <el-form ref="loginFormRef" :model="loginForm" status-icon :rules="loginRules" label-width="120px"
            class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="loginForm.username" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="loginForm.password" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item>
                <el-button class="btn" type="primary" @click="submitForm()">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router';
//导入axios解决跨域问题
import axios from 'axios'
import { ElMessage } from 'element-plus';
import { useStore } from 'vuex';


const store=useStore()
//表单绑定响应式对象
const loginForm = reactive({
    username: "",
    password: ""
})

//表单的引用对象
const loginFormRef = ref()

const loginRules = reactive({
    username: [
        {
            required: true, message: "请输入用户名", trigger: "blur"
        }
    ],
    password: [
        {
            required: true, message: "请输入密码", trigger: "blur"
        }
    ]
})

const router = useRouter()
// 提交表单回调函数
const submitForm = () => {
    // 提交流程：
    // 1.校验表单
    loginFormRef.value.validate((valid) => {
        console.log(valid)
        if (valid) {
            axios.post("/adminapi/user/login",loginForm).then(res => {
                console.log(res.data)
                if (res.data.ActionType === "OK") {
                    // console.log(res.data.data)
                    store.commit("changeUserInfo", res.data.data)
                    store.commit("changeGetterRouter",false)
                    router.push("/index")
                } else {
                    ElMessage.error("用户名与密码不匹配")
                }
            })
        }
    })
    // 2.拿取表单内容，提交后台

    // 3.设置token值

}


</script>
<style lang="scss" scoped>
#particles-js {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    // height: calc(100% - 100px);
    position: absolute;
}

.lizi {
    background: url('@/img/science.png');
}

.fromContainer {
    width: 500px;
    height: 300px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: rgba($color: #000000, $alpha: 0.4);
    padding: 20px;
    color: white;
    text-align: center;

    h3 {
        font-size: 30px;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }

    .demo-ruleForm {
        margin-top: 20px;
    }

    .btn {
        margin-left: 120px;
    }
}

::v-deep .el-form-item__label {
    color: white;
}
</style>