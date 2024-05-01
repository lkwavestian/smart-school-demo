<!--
 * @作者: kerwin
-->
<template>
    <div>
        <el-upload :auto-upload="false" :on-change="handleChange" style="width:100%" v-model:file-list="fileList" v-if="roleType!=3">

            <el-button class="ml-3" type="primary"> 
                选择就业excel数据
            </el-button>


        </el-upload>

        <el-table :data="computedTableData" style="width: 100%">
            <el-table-column label="学生名">
                <template #header>
                    <el-input v-model="search" size="small" placeholder="请输入公司的名字" />
                </template>
                <template #default="scope">
                    {{ scope.row.title }}
                </template>
            </el-table-column>
           
            <el-table-column label="操作">
                <template #default="scope">
                    <div style="display: flex; align-items: center;">
                        <el-button round type="primary" @click="handlePreview(scope.row)">面试题</el-button>
                        <el-button round type="warning" @click="handleUpdate(scope.row)" v-if="roleType!=3">更新题库</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <!-- 更新面试题对话框组件 -->
        <el-dialog v-model="dialogUpdateVisible" title="更新题库" width="80%">
            <Editor @event="handleUpdateEditorEvent" :content="currentItem['interview']" v-if="dialogUpdateVisible"></Editor>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogUpdateVisible = false">取消</el-button>
                    <el-button type="primary" @click="handleUpdateConfirm()">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>

        <!-- 预览对话框 -->
        <el-dialog v-model="dialogPreviewVisible" title="预览题库" width="80%">
            <el-card shadow="hover">
                <div v-html="currentItem.interview"></div>
            </el-card>
     
        </el-dialog>
    </div>
</template>

<script setup>
import ImportExcel from '../../util/ImportExcel'
import { ref, onMounted ,computed} from 'vue';
import axios from 'axios';
import Editor from '../../components/editor/Editor.vue'
import { useUserStore } from '../../store/useUserStore';

const {user:{role:{roleType}}} = useUserStore()
const fileList = ref([])
const search = ref("")

const dialogUpdateVisible = ref(false)
const dialogPreviewVisible = ref(false)

const handleChange = (ev) => {
    ImportExcel(ev.raw, async (data) => {
        // console.log(data)
        const list = data.map(item => ({ title: item.company }))
        //存储公司数据
        await axios.post("/adminapi/companys", list)
        //存储就业学生数据
        await axios.post("/adminapi/companystudents", data)

        setTimeout(() => {
            fileList.value = []
        }, 1000)

        getList()
    })
}

onMounted(() => {
    getList()
})
const tableData = ref([])
const getList = async () => {
    var res = await axios.get("/adminapi/companys")
    tableData.value = res.data
}

const computedTableData = computed(() => tableData.value.filter(
    data => data.title.toLowerCase().includes(search.value.toLowerCase())
))

//更新回调
const currentItem = ref({})
const handleUpdate = (item)=>{
    // console.log(item)
    currentItem.value = item
    dialogUpdateVisible.value = true
}
const handleUpdateEditorEvent = (data)=>{
    // console.log(data)
    currentItem.value["interview"] = data
}

const handleUpdateConfirm = async ()=>{
    await axios.put(`/adminapi/companys/${currentItem.value._id}`,currentItem.value)
    dialogUpdateVisible.value = false

    // await getlist()
}

//预览面试题

const handlePreview = (item)=>{
    // console.log(item)
    currentItem.value = item
    dialogPreviewVisible.value = true
}

</script>