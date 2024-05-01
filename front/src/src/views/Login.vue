<!--
 * @作者: kerwin
-->
<template>
    <div>
        <Particles id="tsparticles" :particlesInit="particlesInit" :particlesLoaded="particlesLoaded" :options="options">

        </Particles>
        <div class="formContainer">
            <h3>智慧校园-学生学业质量分析系统</h3>
            <el-form ref="loginFormRef" :model="loginForm" :rules="rules" label-width="120px" class="demo-ruleForm"
                status-icon>
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="loginForm.username" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="loginForm.password" type="password" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm(loginFormRef)">
                        登录
                    </el-button>

                </el-form-item>

            </el-form>
        </div>

    </div>
</template>
<script setup>
import { useUserStore } from '../store/useUserStore';
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
//导入loadFull
import { loadFull } from "tsparticles";
import options from '../util/config'
import axios from 'axios';
import { ElMessage } from 'element-plus'

const particlesInit = async engine => {
    await loadFull(engine);
};

const particlesLoaded = async container => {
    // console.log("Particles container loaded", container);
};

const router = useRouter()
const { changeUser } = useUserStore()

const loginFormRef = ref()

const loginForm = reactive({
    username: "",
    password: ""
})

const rules = reactive({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ],
})

//登录校验方法
const submitForm = async (formEl) => {
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            //Promise.all 
            //Promise.race
            //Promise.any
            try {
                const res = await Promise.any([axios.post("/adminapi/users/login", loginForm), axios.post("/adminapi/students/login", {
                    studentname: loginForm.username,
                    password: loginForm.password
                })])
                // console.log(res.data)
                let { ActionType, data } = res.data
                if (ActionType === "OK") {
                    changeUser(data)
                    router.push("/index")
                } else {
                    ElMessage.error('用户名密码不匹配')

                }
            } catch (error) {
                ElMessage.error('用户名密码不匹配')
            }
        } else {
            console.log('error submit!', fields)
        }
    })
}

</script>

<style lang="scss" scoped>
.formContainer {
    width: 500px;
    height: 300px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba($color: #fff, $alpha: 0.2);
    color: white;
    text-align: center;
    padding: 20px;

    h3 {
        font-size: 30px;
    }

    .demo-ruleForm {
        margin-top: 50px;
    }

    :deep(.el-form-item__label) {
        color: white;
    }
}
</style>