<template>
    <div>
        <Particles
            id="tsparticles"
            :particlesInit="particlesInit"
            :particlesLoaded="particlesLoaded"
            :options="options"
        >
        </Particles>
        <div class="formContainer">
            <h3>智慧校园-学生学业质量管理系统</h3>
            <el-form
                ref="loginFormRef"
                :model="loginForm"
                :rules="rules"
                label-width="120px"
                class="demo-loginForm"
                :size="formSize"
                status-icon
            >
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="loginForm.username" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="loginForm.password" type="password" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm(loginFormRef)"> 登录 </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import useUserStore from '../store/useUserStore';
//导入loadFull
import { loadFull } from 'tsparticles';
import options from '../util/config';

const particlesInit = async (engine) => {
    await loadFull(engine);
};

const particlesLoaded = async (container) => {
    // console.log("Particles container loaded", container);
};

const { user, changeUser } = useUserStore();
const router = useRouter();

const formSize = ref('default');
const loginFormRef = ref();
const loginForm = reactive({
    username: '',
    password: '',
});
const rules = reactive({
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
});

const submitForm = async (formEl) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            if (loginForm.name === 'admin') {
                handleLogin1();
            } else {
                handleLogin2();
            }
        } else {
            console.log('error submit!', fields);
        }
    });
};

const handleLogin1 = () => {
    changeUser({
        id: 1,
        username: 'admin',
        password: '123',
        role: {
            roleName: '管理员',
            roleType: 1,
            rights: [
                '/index',
                '/user-manage',
                '/user-manage/list',
                '/right-manage',
                '/right-manage/rolelist',
                '/right-manage/rightlist',
                '/tag-manage',
                '/tag-manage/list',
                '/interview-manage',
                '/interview-manage/companylist',
                '/interview-manage/companydata',
                '/student-manage',
                '/student-manage/studentlist',
                '/student-manage/gradelist',
            ],
        },
    });
    router.push('/');
};
const handleLogin2 = () => {
    changeUser({
        id: 2,
        username: 'kerwin',
        password: '123',
        role: {
            roleName: '讲师',
            roleType: 2,
            rights: [
                '/index',
                '/interview-manage',
                '/interview-manage/companylist',
                '/interview-manage/companydata',
                '/student-manage',
                '/student-manage/studentlist',
                '/student-manage/gradelist',
            ],
        },
    });
    router.push('/');
};
</script>

//
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
