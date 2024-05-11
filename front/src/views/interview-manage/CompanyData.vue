<template>
    <div id="companyData">
        <dv-border-box10>
            <el-row :gutter="20">
                <el-col :span="8">
                    <dv-border-box11 title="最受欢迎的公司" :title-width="400" :animate="false">
                        <Welcompany :datalist="datalist" class="company_data"></Welcompany>
                    </dv-border-box11>
                </el-col>
                <el-col :span="8">
                    <dv-border-box8 :dur="5">
                        <dv-decoration-7 style="width: 100%; height: 50px">
                            <div style="font-size: 20px; color: white">最不差钱的公司</div>
                        </dv-decoration-7>
                        <RichCompany :datalist="datalist" class="company_data"></RichCompany>
                    </dv-border-box8>
                </el-col>

                <el-col :span="8">
                    <dv-border-box11 title="最近入职的公司" :title-width="400" :animate="false">
                        <EntryCompany :datalist="datalist" class="company_data"></EntryCompany>
                    </dv-border-box11>
                </el-col>
            </el-row>
        </dv-border-box10>
    </div>
</template>
<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import Welcompany from '../../components/company/Welcompany.vue';
import RichCompany from '../../components/company/RichCompany.vue';
import EntryCompany from '../../components/company/EntryCompany.vue';
const datalist = ref([]);
onMounted(() => {
    getList();
});

const getList = async () => {
    var res = await axios.get('/adminapi/companystudents');
    datalist.value = res.data;
};
</script>
<style scoped lang="scss">
#companyData {
    background: url('../../assets/bg.png') center no-repeat;
    background-size: 100% 100%;
    padding: 10px;
    height: 500px;

    .company_data {
        position: absolute;
        top: 80px;
        width: 100%;
        color: white;
        text-align: center;
    }
}

.el-row {
    height: 500px;
    padding: 30px;
}
</style>
