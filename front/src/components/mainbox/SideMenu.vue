<template>
    <el-aside width="200px">
        <el-scrollbar>
            <el-menu
                class="el-menu-vertical-demo"
                style="height: 100vh"
                :router="true"
                :default-active="route.fullPath"
            >
                <template v-for="data in rightsList">
                    <el-sub-menu
                        :index="data.path"
                        v-if="data.children.length && checkAuth(data.path)"
                        :key="data.path"
                    >
                        <template #title>
                            <el-icon>
                                <component :is="mapIcon[data.icon]"></component>
                            </el-icon>
                            {{ data.title }}</template
                        >
                        <template v-for="item in data.children">
                            <el-menu-item
                                :index="item.path"
                                :key="item.path"
                                v-if="checkAuth(item.path)"
                            >
                                <el-icon>
                                    <component :is="mapIcon[item.icon]"></component>
                                </el-icon>
                                {{ item.title }}</el-menu-item
                            >
                        </template>
                    </el-sub-menu>
                    <el-menu-item
                        :index="data.path"
                        v-else-if="checkAuth(data.path)"
                        :key="data.path"
                    >
                        <el-icon>
                            <component :is="mapIcon[data.icon]"></component>
                        </el-icon>
                        <span>{{ data.title }}</span>
                    </el-menu-item>
                </template>
            </el-menu>
        </el-scrollbar>
    </el-aside>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import {
    TrendCharts,
    User,
    List,
    Key,
    Grid,
    OfficeBuilding,
    PieChart,
    School,
} from '@element-plus/icons-vue';
import { useRoute } from 'vue-router';
import useUserStore from '../../store/useUserStore';
const rightsList = ref([]);

const mapIcon = {
    TrendCharts,
    User,
    List,
    Key,
    Grid,
    OfficeBuilding,
    PieChart,
    School,
};

onMounted(async () => {
    var res = await axios.get('/rights.json');
    rightsList.value = res.data;
});

const route = useRoute();
const {
    user: {
        role: { rights },
    },
} = useUserStore();
const checkAuth = (path) => {
    return rights.includes(path);
};
</script>
