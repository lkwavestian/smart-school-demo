<!--
 * @作者: kerwin
-->
<template>
    <div>
        <dv-capsule-chart :config="computedConfig" style="width:100%;height:300px;box-sizing: border-box;padding: 10px;" />

    </div>
</template>

<script setup>
import {computed} from 'vue'
import _ from 'lodash'
const props = defineProps(["datalist"])
// console.log(props.datalist)
 
const computedConfig = computed(() => {
    let {datalist} = props
    let groundObj = _.groupBy(datalist,item=>item.company)

    let configData = []
    for(let item in groundObj){
        configData.push({
            name:item,
            value:groundObj[item].length
        })
    }

    // console.log(configData)
    const data = configData.sort((item1,item2)=>item2.value-item1.value).slice(0,7)
    // console.log(data)
    return {
        data:data,
        colors: ['#e062ae', '#fb7293', '#e690d1', '#32c5e9', '#96bfff'],
        unit: '人数'
    }
})

</script>