<!--
 * @作者: kerwin
-->
<template>
    <div>
        
        <el-table :data="tableData" style="width: 100%" row-key="path">
            <el-table-column prop="title" label="权限名称" width="180" />
            <!-- <el-table-column prop="icon" label="图标" width="180" /> -->

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
                        <el-button round type="primary" @click="handleUpdate(scope.row)">更新</el-button>
                       
                        <el-popconfirm title="你确定要删除吗？" confirm-button-text="确定" cancel-button-text="取消" @confirm="handleDelete(scope.row)">
                            <template #reference>
                                <el-button round type="danger">删除</el-button>
                            </template>
                        </el-popconfirm>
                        <!-- {{scope.row.icon}} -->
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog v-model="dialogVisible" title="更新权限">
            <el-form :model="updateForm" status-icon>
                <el-form-item label="权限名称" prop="title">
                    <el-input v-model="updateForm.title" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="handleConfirm()">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script  setup>
import { ref, onMounted, reactive } from 'vue';
import axios from 'axios';
import { TrendCharts, User, List, Key, Grid, OfficeBuilding, PieChart, School } from '@element-plus/icons-vue'

//控制对话框显示隐藏
const dialogVisible = ref(false)

//保存当前更新的item
const currentItem = ref({})
//更新form
const updateForm = reactive({
    title: ""
})
const mapIcon = {
    TrendCharts, User, List, Key, Grid, OfficeBuilding, PieChart, School
}
const tableData = ref([])
onMounted(() => {
    getList()
})

const getList = async () => {
    var res = await axios.get("/adminapi/rights")
    // console.log(res.data)
    tableData.value = res.data
}

const handleUpdate = (item) => {
    // console.log(item)
    dialogVisible.value = true
    updateForm.title = item.title

    currentItem.value = item
}

const handleConfirm = async () => {
    dialogVisible.value = false

    await axios.put("/adminapi/rights", {
        data: currentItem.value,
        title: updateForm.title
    })

    await getList()
}

const handleDelete =async (item)=>{
    // console.log(item)
    await axios.delete("/adminapi/rights",{
        data:item
    })
    await getList()
}
</script>
