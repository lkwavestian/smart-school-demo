<template>
    <div>
        <el-container style="height: 100vh">
            <SideMenu />
            <el-container direction="vertical">
                <button @click="handleExit">退出</button>
                <TopHeader />
                <el-main>
                    <el-scrollbar>
                        <router-view></router-view>
                    </el-scrollbar>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import useRouterStore from '../store/useRouterStore';
import useUserStore from '../store/useUserStore';
import SideMenu from '../components/mainbox/SideMenu.vue';
import TopHeader from '../components/mainbox/TopHeader.vue';

const router = useRouter();
const { changeUser } = useUserStore();
const { changeRouter } = useRouterStore();

const handleExit = () => {
    changeUser({});
    changeRouter(false);
    router.push('/login');
};
</script>
