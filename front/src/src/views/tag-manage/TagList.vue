<!--
 * @作者: kerwin
-->
<template>
    <div>
        <el-button type="primary" @click="dialogVisible = true">添加标签</el-button>
        <el-table :data="tableData" style="width: 100%" >
            <el-table-column label="阶段" width="180" :sortable="true" :sort-method="sort">
                <template #default="scope">
                    <el-tag :type="types[scope.row.grade-1]">{{names[scope.row.grade-1]}}</el-tag>
                  
                </template>
            </el-table-column>
            <el-table-column prop="title" label="标签名" width="180" />
            <el-table-column label="操作">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <el-button round type="primary" @click="handleUpdate(scope.row)"
                            :disabled="scope.row.default">更新</el-button>

                        <el-popconfirm title="你确定要删除吗？" confirm-button-text="确定" cancel-button-text="取消"
                            @confirm="handleDelete(scope.row)">
                            <template #reference>
                                <el-button round type="danger" :disabled="scope.row.default">删除</el-button>
                            </template>
                        </el-popconfirm>
                        <!-- {{scope.row.icon}} -->
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog v-model="dialogVisible" title="添加标签">
            <el-form :model="addForm" status-icon label-width="80px">
                <el-form-item label="标签名" prop="title">
                    <el-input v-model="addForm.title" />
                </el-form-item>
               
                <el-form-item label="阶段" prop="role">
                    <el-select v-model="addForm.grade" class="m-2" placeholder="请选择阶段" size="large" style="width:100%">
                        <el-option v-for="(item,index) in names" :key="index" :label="item" :value="index+1" />
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="handleAddConfirm()">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>

        <el-dialog v-model="dialogUpdateVisible" title="更新标签">
            <el-form :model="updateForm" status-icon label-width="80px">
                <el-form-item label="标签名" prop="title">
                    <el-input v-model="updateForm.title" />
                </el-form-item>
               
                <el-form-item label="阶段" prop="role">
                    <el-select v-model="updateForm.grade" class="m-2" placeholder="请选择阶段" size="large" style="width:100%">
                        <el-option v-for="(item,index) in names" :key="index" :label="item" :value="index+1" />
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogUpdateVisible = false">取消</el-button>
                    <el-button type="primary" @click="handleUpdateConfirm()">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted, reactive } from 'vue'
const tableData = ref([])
const roleList = ref([])

const names = ["第一阶段","第二阶段","第三阶段"]
const types = ["success","warning","danger"]
//添加对话框相关
const dialogVisible = ref(false)
const addForm = reactive({
    title: "",
    grade: "",
})
//更新对话框相关
const dialogUpdateVisible = ref(false)
const updateForm = reactive({
    title: "",
    grade: "",
})
const currentItem = ref({})
onMounted(() => {
    getList()
    
})
const getList = async () => {
    var res = await axios.get("/adminapi/tags")
    // console.log(res.data)
    tableData.value = res.data
}


//add确认方法
const handleAddConfirm =async ()=>{
    // console.log(addForm)
    dialogVisible.value = false
    //添加接口
    await axios.post("/adminapi/tags",addForm)
    //获取列表

    await getList()

    addForm.title = ""
    addForm.grade = ""
}

const handleUpdate = (item)=>{
    dialogUpdateVisible.value = true
    updateForm.title = item.title
    updateForm.grade = item.grade
    currentItem.value= item
}

const handleUpdateConfirm =async ()=>{
    dialogUpdateVisible.value = false
    // console.log(currentItem.value._id,updateForm)
    await axios.put(`/adminapi/tags/${currentItem.value._id}`,updateForm)

    await getList()
}

const handleDelete =async ({_id})=>{
    await axios.delete(`/adminapi/tags/${_id}`)
    await getList()
}

//排序
const  sort = (rowa,rowb)=>{
    return rowa.grade - rowb.grade
}
</script>