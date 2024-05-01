<!--
 * @作者: kerwin
-->
<template>
    <div>
        <dv-scroll-board :config="computedConfig" style="width:100%;height:300px;box-sizing: border-box;padding: 10px;" />
    </div>
</template>
<script  setup>
import { computed } from 'vue'
const props = defineProps(["datalist"])

const computedConfig = computed(() => {
    let {datalist} = props
    let data = datalist.sort((item1,item2)=>Date.parse(item2.employ_date) -Date.parse(item1.employ_date) )

    // console.log(data)
    const configObj = {}
    data.forEach(item=>{
        configObj[item.studentname] = item.company
    })
   
    return {
        header: ['学生', '公司',],
        data:Object.entries(configObj),
        headerBGC: "rgba(0,0,0,0)",
        oddRowBGC: "rgba(0,0,0,0)",
        evenRowBGC: "rgba(0,0,0,0)",
        carousel: "page",
        index: true,
        columnWidth: [50],
        align: ['center'],
    }
})

</script>
  