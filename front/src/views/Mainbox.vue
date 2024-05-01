<template>
    <div>
        <div>侧边栏</div>
        <div>导航栏</div>
        <button @click="handleExit()">退出登录</button>
        <router-view></router-view>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import useRouterStore from '../store/useRouterStore';
import useUserStore from '../store/useUserStore';

const router = useRouter()
const {changeUser} = useUserStore()
const {changeRouter} = useRouterStore()

    const handleExit = () => {
        changeUser({})
        changeRouter(false)
        router.push('/login')
    }
</script>
