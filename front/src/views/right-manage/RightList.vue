<template>
    <el-table :data="tableData" stripe style="width: 100%" row-key="path">
        <el-table-column prop="title" label="权限名称" width="180" />

        <el-table-column label="图标" width="180">
            <template #default="scope">
                <div style="display: flex; align-items: center">
                    <el-icon size="20px">
                        <component :is="mapIcon[scope.row.icon]"></component>
                    </el-icon>

                    <!-- {{scope.row.icon}} -->
                </div>
            </template>
        </el-table-column>

        <el-table-column label="操作" width="180">
            <template #default="scope">
                <div style="display: flex; align-items: center">
                    <el-button round type="primary" @click="handleUpdate(scope.row)"
                        >更新</el-button
                    >

                    <el-popconfirm
                        title="你确定要删除吗？"
                        confirm-button-text="确定"
                        cancel-button-text="取消"
                        @confirm="handleDelete(scope.row)"
                    >
                        <template #reference>
                            <el-button round type="danger">删除</el-button>
                        </template>
                    </el-popconfirm>
                    <!-- {{scope.row.icon}} -->
                </div>
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
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

const tableData = ref([]);

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
onMounted(() => {
    getList();
});

const getList = async () => {
    const res = await axios.get('/adminapi/rights');
    tableData.value = res.data;
};
</script>
