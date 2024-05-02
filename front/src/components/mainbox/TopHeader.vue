<template>
    <el-header>
        <div>学生学业质量分析系统</div>
        <div>
            <span style="line-height: 40px">欢迎{{ username }}回来</span>
            <el-dropdown>
                <!-- <el-avatar :size="40" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" /> -->
                <el-avatar :size="40" :src="avatar"></el-avatar>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>{{ roleName }}</el-dropdown-item>
                        <el-dropdown-item @click="handleExit">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </el-header>
</template>

<script setup>
import { useRouter } from 'vue-router';
import useRouterStore from '../../store/useRouterStore';
import useUserStore from '../../store/useUserStore';
const router = useRouter();
const { changeRouter } = useRouterStore();
const {
    changeUser,
    user: {
        role: { roleName },
        username,
    },
} = useUserStore();
const handleExit = () => {
    changeUser({});
    changeRouter(false);
    router.push('/login');
};
</script>

<style lang="scss" scoped>
.el-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #0d47a1;
    color: white;
}
</style>
