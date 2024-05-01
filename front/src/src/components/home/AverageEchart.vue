<!--
 * @作者: kerwin
-->
<template>
    <div id="AverageEchart">
        AverageEchart
    </div>
</template>
<script setup>
import * as echarts from 'echarts'
import { onMounted } from 'vue';

const props = defineProps(["data"])

const handleData = ({ studentsData, tagsData, classData }) => {
    return {
        angleAxisData:tagsData.map(item=>item.title),
        series:getAverage(studentsData, tagsData)
    }
}
const getAverage = (studentsData, tagsData) => {
  
    const average = []

    tagsData.forEach(({ title }, index) => {
        var filterArr = studentsData.filter(item => item.score[title])

        average[index] = (filterArr.map(item => item.score[title]).reduce((total, item) => total + item, 0) / (filterArr.length || 1)).toFixed(2)
    })

    return average
}

onMounted(() => {
    var myChart = echarts.init(document.getElementById("AverageEchart"))
    let  {angleAxisData,series} = handleData(props.data)
    var option = {
        title: [
            {
                text: '技术Tag强弱图',
                textStyle:{
                    fontSize:14,
                    color:"#fff"
                }
            }
        ],
        polar: {
            radius: [30, '80%']
        },
        radiusAxis: {
            max: 5,
            axisLine:{
                lineStyle:{
                    color:"#fff"
                }
            }
        },
        angleAxis: {
            type: 'category',
            data: angleAxisData,
            startAngle: 75,
            axisLine:{
                lineStyle:{
                    color:"#fff"
                }
            }
        },
        tooltip: {},
        series: {
            type: 'bar',
            data: series,
            coordinateSystem: 'polar',
            label: {
                show: true,
                position: 'middle',
                formatter: ''
            }
        },
        colorBy:"data",
        color: ['#FCCE10', '#E87C25', '#27727B',
            '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
            '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'],
        animation: true

    }
    myChart.setOption(option);
})
</script>
<style scoped>
#AverageEchart {
    background: url("../../assets/t_bg.png") no-repeat center;
    background-size: 100% 100%;
    height: 100%;
}
</style>