<!--
 * @作者: kerwin
-->
<template>
    <div>
        <dv-scroll-ranking-board :config="computedConfig" style="width:100%;height:300px;box-sizing: border-box;padding: 10px;" />

    </div>
</template>


<script setup>
import _ from 'lodash'
import { computed } from 'vue'
const props = defineProps(["datalist"])

const computedConfig = computed(() => {
    let {datalist} = props
    let groundObj = _.groupBy(datalist,item=>item.company)
    let configData = []
    for(let item in groundObj){
        configData.push({
            name:item,
            value:groundObj[item].reduce((total,item)=>total+Number(item.salary),0)/groundObj[item].length
        })
    }
    // console.log(configData)
    return {
        data: configData,
        color: 'rgb(29,193,245)',
        unit: "元"
    }
})
</script>