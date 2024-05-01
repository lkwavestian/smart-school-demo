<template>
    <div>
        login
        <el-button type="primary">登录</el-button>
        <button @click="handleLogin1()">登录-管理员</button>
        <button @click="handleLogin2()">登录-讲师</button>
        <el-form
            ref="ruleFormRef"
            style="max-width: 600px"
            :model="ruleForm"
            :rules="rules"
            label-width="auto"
            class="demo-ruleForm"
            :size="formSize"
            status-icon
        >
            <el-form-item label="Activity name" prop="name">
                <el-input v-model="ruleForm.name" />
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import useUserStore from '../store/useUserStore';
const { user, changeUser } = useUserStore();
const router = useRouter();

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
