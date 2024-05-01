<!--
 * @作者: kerwin
-->
<template>
    <div>
        <el-page-header icon="" content="个人中心" title="学生学业质量分析系统"></el-page-header>

        <el-row :gutter="10" class="el-row">
            <el-col :span="8">
                <el-card style="text-align: center;">
                    <el-avatar :size="100" :src="circleUrl" />
                    <h3>{{ store.user.username }}</h3>
                    <h5>{{ roleName }}</h5>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-card>
                    <el-form ref="userFormRef" :model="userForm" :rules="rules" label-width="120px" class="demo-ruleForm"
                        status-icon>
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="userForm.username" />
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input v-model="userForm.password" type="password" />
                        </el-form-item>
                        <el-form-item label="性别" prop="gender">
                            <el-select style="width: 100%;" v-model="userForm.gender">
                                <el-option v-for="item in options" :key="item.label" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="简介" prop="introduction">
                            <el-input v-model="userForm.introduction" type="textarea" />
                        </el-form-item>
                        <el-form-item label="头像" prop="avatar">
                            <kerwin-upload :avatar="userForm.avatar" @change="handleChange"></kerwin-upload>
                            <!-- <el-upload class="avatar-uploader"
                                
                                :show-file-list="false" 
                                :auto-upload ="false"
                                :on-change="handleChange"
                                >
                                <img v-if="userForm.avatar" :src="avatarComputed" class="avatar" />
                                <el-icon v-else class="avatar-uploader-icon">
                                    <Plus />
                                </el-icon>
                            </el-upload> -->
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm(userFormRef)">
                                更新
                            </el-button>

                        </el-form-item>

                    </el-form>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script setup>
import { useUserStore } from '../../store/useUserStore';
import { reactive, ref,computed } from 'vue'
import kerwinupload from '../../util/kerwinupload'
import KerwinUpload from '../../components/center/KerwinUpload.vue';
const store = useUserStore()
const { user: { role: { roleName }, username,_id,gender,introduction,avatarUrl } ,changeUser} = useUserStore()
//计算属性
const circleUrl = computed(()=>

store.user.avatarUrl?'http://localhost:5000'+store.user.avatarUrl:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
)

//登录相关字段
const userFormRef = ref()

const userForm = reactive({
    username,
    password: "",
    gender,//下拉列表
    introduction,
    avatar:avatarUrl,
    file:null
})

const options = [
    {
        label: "保密",
        value: 0
    },
    {
        label: "男",
        value: 1
    },
    {
        label: "女",
        value: 2
    }
]

const rules = reactive({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ],
    gender: [
        { required: true, message: '请选择性别', trigger: 'blur' },
    ],
    introduction: [
        { required: true, message: '请输入简介', trigger: 'blur' },
    ],
    avatar: [
        { required: true, message: '请选择头像', trigger: 'blur' },
    ],
})



//文件选择

const handleChange = (evt)=>{
    console.log(evt.raw)
    userForm.file = evt.raw
    userForm.avatar = URL.createObjectURL(evt.raw)
}

const submitForm = () => {
    userFormRef.value.validate(async (valid)=>{
        if(valid){
            // console.log(userForm)
            //multipart/form-data

            var res=  await kerwinupload(`/adminapi/students/${_id}/upload`,userForm)
            // console.log(res.data)
            //改变pinia store
            changeUser({
                ...store.user,
                username:res.data.studentname,
                ...res.data
            })
        }
    })
}
</script>
<style scoped lang="scss">
.el-row {
    margin-top: 20px;
}
</style>