<!--
 * @作者: kerwin
-->
<template>
    <div id="myeditor">
        
    </div>
</template>

<script setup>

import { onMounted } from 'vue';
import E from 'wangeditor'

onMounted(() => {
    const editor = new E('#myeditor')
    // 或者 const editor = new E( document.getElementById('div1') )
    editor.create()
    editor.txt.html("<p>hello kerwin</p>")
    editor.config.onchange = (newHtml)=>{
        console.log(newHtml)
    }
})
</script>